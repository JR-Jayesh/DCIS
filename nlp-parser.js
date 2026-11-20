// NLP parser: extracts skills, experience, education, projects, certifications, and sections.
class NLPParser {
  constructor() {
    this.dict = AIData.nlpSkillDictionary;
  }

  parse(text) {
    if (!text || text.trim().length < 20) return null;
    const lower = text.toLowerCase();
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    return {
      skills: this.extractSkills(lower),
      experience: this.extractExperience(text),
      education: this.extractEducation(text),
      projects: this.extractProjects(lower),
      certifications: this.extractCertifications(text),
      sections: this.detectSections(lines),
      wordCount: text.split(/\s+/).length,
      rawText: text
    };
  }

  extractSkills(text) {
    const found = [];
    Object.entries(this.dict).forEach(([skill, cfg]) => {
      const matched = cfg.patterns.some(p => {
        try { return new RegExp(`\\b${p}\\b`, 'i').test(text); } catch(e) { return text.includes(p); }
      });
      if (matched && !found.find(f => f.skill === skill)) {
        const freq = cfg.patterns.reduce((acc, p) => {
          try { return acc + (text.match(new RegExp(`\\b${p}\\b`, 'gi')) || []).length; } catch(e) { return acc; }
        }, 0);
        found.push({ skill, category: cfg.category, confidence: Math.min(0.99, 0.62 + freq * 0.1), weight: cfg.weight });
      }
    });
    return found.sort((a, b) => b.confidence - a.confidence);
  }

  extractExperience(text) {
    const yearPattern = /(\d+)\+?\s*(?:years?|yrs?)\s*(?:of\s+)?(?:experience|exp)/gi;
    const datePattern = /\b(20\d{2})\s*[-–—]\s*(20\d{2}|present|current|now)\b/gi;
    const jobTitlePattern = /(software|full.?stack|frontend|backend|data|ml|machine learning|devops|cloud|security|ux|product|senior|lead|principal|staff)\s+(engineer|developer|scientist|analyst|designer|manager|architect)/gi;

    let totalYears = 0;
    let m;
    while ((m = yearPattern.exec(text)) !== null) totalYears = Math.max(totalYears, parseInt(m[1]));

    const dateRanges = [];
    while ((m = datePattern.exec(text)) !== null) {
      dateRanges.push(m[0]);
      if (totalYears === 0) {
        const start = parseInt(m[1]);
        const end = /present|current|now/i.test(m[2]) ? new Date().getFullYear() : parseInt(m[2]);
        totalYears += Math.max(0, end - start);
      }
    }

    const roles = [];
    while ((m = jobTitlePattern.exec(text)) !== null) roles.push(m[0].trim());

    return { years: Math.min(totalYears, 25), dateRanges, roles: [...new Set(roles)].slice(0, 5) };
  }

  extractEducation(text) {
    const degreeMap = {
      phd:       { pattern: /\b(ph\.?d|doctorate|doctoral)\b/i,                score: 5 },
      masters:   { pattern: /\b(master'?s?|m\.?s\.?|m\.?tech|msc|mba)\b/i,    score: 4 },
      bachelors: { pattern: /\b(bachelor'?s?|b\.?s\.?|b\.?e\.?|b\.?tech|bsc)\b/i, score: 3 },
      associate: { pattern: /\b(associate'?s?|a\.?s\.?)\b/i,                   score: 2 },
      bootcamp:  { pattern: /\b(bootcamp|coding school|nanodegree)\b/i,         score: 1 },
    };
    let highestDegree = 'none', degreeScore = 0;
    Object.entries(degreeMap).forEach(([deg, cfg]) => {
      if (cfg.pattern.test(text) && cfg.score > degreeScore) { highestDegree = deg; degreeScore = cfg.score; }
    });

    const fieldPattern = /(computer science|information technology|software engineering|data science|mathematics|statistics|electrical engineering|physics)/gi;
    const fields = [...new Set((text.match(fieldPattern) || []).map(f => f.trim()))];
    const gpa = this.extractGPA(text);

    return { degree: highestDegree, degreeScore, fields, cgpa: gpa };
  }

  extractGPA(text) {
    const m = text.match(/(?:gpa|cgpa|grade)[:\s]*([0-9.]+)\s*(?:\/\s*([0-9.]+))?/i);
    if (m) {
      const val = parseFloat(m[1]);
      const max = m[2] ? parseFloat(m[2]) : (val > 5 ? 10 : 4);
      return Math.min(1, val / max);
    }
    return null;
  }

  extractProjects(text) {
    const keywords = ['built','developed','created','implemented','designed','deployed','shipped','architected','launched','led'];
    const count = keywords.reduce((acc, kw) => acc + (text.match(new RegExp(`\\b${kw}\\b`, 'g')) || []).length, 0);
    const links = (text.match(/github\.com\/[\w-]+\/[\w-]+/g) || []).length;
    return { count: Math.min(count + links, 20), links };
  }

  extractCertifications(text) {
    const certs = [
      { name: 'AWS Certification',     pattern: /aws\s+(?:certified|cloud practitioner|solutions architect|developer|machine learning)/i },
      { name: 'Google Certification',  pattern: /google\s+(?:cloud\s+certified|data analytics|professional certificate)|gcp\s+certified/i },
      { name: 'Azure Certification',   pattern: /azure\s+certified|microsoft\s+certified/i },
      { name: 'CKA / CKAD',            pattern: /\bcka\b|\bckad\b|kubernetes\s+certified/i },
      { name: 'CompTIA Security+',      pattern: /comptia\s+security|security\+/i },
      { name: 'CISSP',                  pattern: /\bcissp\b/i },
      { name: 'PMP',                    pattern: /\bpmp\b/i },
      { name: 'Scrum Master',           pattern: /\bcsm\b|certified\s+scrum\s+master/i },
      { name: 'OSCP',                   pattern: /\boscp\b/i },
      { name: 'TensorFlow Developer',   pattern: /tensorflow\s+developer/i },
    ];
    return certs.filter(c => c.pattern.test(text)).map(c => c.name);
  }

  detectSections(lines) {
    const sectionPatterns = {
      skills:          /^(skills?|technical skills?|core competencies|technologies)$/i,
      experience:      /^(experience|work experience|employment|professional experience)$/i,
      education:       /^(education|academic|qualifications)$/i,
      projects:        /^(projects?|portfolio|personal projects?)$/i,
      certifications:  /^(certifications?|certificates?|credentials?)$/i,
      summary:         /^(summary|objective|profile|about me|overview)$/i,
    };
    const found = [];
    lines.forEach(line => {
      if (line.length > 50) return;
      Object.entries(sectionPatterns).forEach(([name, p]) => { if (p.test(line)) found.push(name); });
    });
    return [...new Set(found)];
  }
}
