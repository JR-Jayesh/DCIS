// Career predictor: weighted feature scoring and ranking. This is rule-based, not a trained ML model.
class MLPredictor {
  constructor() {
    this.weights = AIData.mlFeatureWeights;
    this.domains = Object.keys(this.weights);
  }

  predict(resumeData, githubData, formData) {
    const features = this._buildFeatureVector(resumeData, githubData, formData);
    const rawScores = {};
    this.domains.forEach(d => { rawScores[d] = this._scoreDomain(d, features); });

    // Normalize to 40–96
    const vals = Object.values(rawScores);
    const min = Math.min(...vals), max = Math.max(...vals);
    const range = max - min || 1;
    const normalized = {};
    this.domains.forEach(d => {
      normalized[d] = Math.round(40 + ((rawScores[d] - min) / range) * 56);
    });

    const ranked = Object.entries(normalized)
      .sort((a, b) => b[1] - a[1])
      .map(([domain, score], rank) => ({
        domain, score,
        confidence: rank === 0 ? 'High' : rank === 1 ? 'Medium' : 'Low',
        confidencePct: rank === 0 ? score : rank === 1 ? score - 8 : score - 18,
        label: CareerData.careerPaths[domain]?.label,
        icon: CareerData.careerPaths[domain]?.icon,
        color: CareerData.careerPaths[domain]?.color,
        reasons: this._reasons(domain, features)
      }));

    const topDomain = ranked[0].domain;
    const radarData = this._radar(features);
    const suitability = Math.min(97, Math.round(ranked[0].score * 0.8 + features.skillCount * 0.8));
    const predictedRole = this._predictRole(topDomain, features);
    const salaryRange = this._salary(topDomain, features);
    const missingSkills = this._missingSkills(topDomain, resumeData);
    const strengthAreas = this._strengthAreas(features);

    return { ranked, radarData, suitability, predictedRole, salaryRange, missingSkills, strengthAreas, features };
  }

  _buildFeatureVector(resumeData, githubData, formData) {
    const skills = resumeData?.skills || [];
    const skillNames = skills.map(s => s.skill.toLowerCase());
    const categories = new Set(skills.map(s => s.category));

    const has = (keywords) => keywords.some(kw => skillNames.some(s => s.includes(kw)));

    return {
      skillCount:       skills.length,
      skillDiversity:   categories.size,
      hasAI:            has(['python','machine learning','tensorflow','pytorch','scikit','deep learning','nlp','llm','genai']),
      hasWeb:           has(['javascript','react','angular','vue','html','css','typescript','node','nextjs']),
      hasSecurity:      has(['security','penetration','cryptography','siem','ethical hacking','firewall','owasp']),
      hasCloud:         has(['aws','azure','gcp','cloud','terraform','kubernetes','docker']),
      hasDesign:        has(['figma','ux','ui','design','sketch','prototype','wireframe','adobe xd']),
      hasProduct:       has(['product','agile','scrum','roadmap','okr','jira','stakeholder','go-to-market']),
      hasMobile:        has(['android','ios','swift','swiftui','kotlin','flutter','react native','mobile']),
      hasDataEngineering: has(['etl','data pipeline','spark','kafka','airflow','dbt','warehouse','data engineering']),
      hasDevOps:        has(['devops','docker','kubernetes','terraform','jenkins','ci/cd','sre','prometheus']),
      hasBlockchain:    has(['blockchain','web3','solidity','ethereum','smart contract','crypto']),
      hasGame:          has(['unity','unreal','game development','game design','c++','godot']),
      hasCivil:         has(['civil','structural','construction','surveying','geotechnical','concrete','autocad']),
      hasMechanical:    has(['mechanical','thermodynamics','cad','autocad','solidworks','ansys','hvac','robotics']),
      hasElectrical:    has(['electrical','power systems','electrical machines','circuit','transformer','renewable energy']),
      hasECE:           has(['electronics','embedded','iot','vlsi','microcontroller','communication','antenna','fpga']),
      hasChemical:      has(['chemical','process engineering','reactor','petroleum','polymer','distillation']),
      hasAerospace:     has(['aerospace','aircraft','avionics','propulsion','aerodynamics','orbital']),
      hasBiomedical:    has(['biomedical','medical device','biomechanics','tissue','clinical','prosthetic']),
      hasEnvironmental: has(['environmental','wastewater','pollution','sustainability','gis','climate']),
      hasIndustrial:    has(['industrial','lean','six sigma','operations','supply chain','manufacturing']),
      hasPetroleum:     has(['petroleum','reservoir','drilling','oil','gas','petrophysics']),
      hasMetallurgy:    has(['metallurgy','metals','materials science','casting','welding','corrosion']),
      hasMarine:        has(['marine','naval','ship','offshore','ocean','hydrodynamics']),
      hasMining:        has(['mining','mine','geology','minerals','blasting','mine ventilation']),
      hasNuclear:       has(['nuclear','reactor','radiation','atomic','fusion','fission']),
      hasMechatronics:  has(['mechatronics','robotics','automation','plc','control systems','actuator']),
      hasAutomobile:    has(['automotive','vehicle','ev','powertrain','engine','car']),
      hasArchitecture:  has(['architecture','building design','bim','urban planning','revit','interior']),
      hasInstrumentation: has(['instrumentation','sensor','scada','process control','calibration','control']),
      hasTextile:       has(['textile','fabric','spinning','weaving','garment','knitting']),
      hasMaterials:     has(['materials','composite','nanomaterial','polymer','ceramic','semiconductor']),
      hasRenewable:     has(['solar','wind','renewable','battery','energy storage','hydrogen']),
      hasTransportation: has(['transportation','highway','traffic','rail','transit','urban mobility']),
      hasRailway:       has(['railway','rail','signalling','track','rolling stock','metro']),
      hasPetroleum:     has(['petroleum','reservoir','drilling','oil','gas','petrophysics']),
      hasMetallurgy:    has(['metallurgy','metals','materials science','casting','welding','corrosion']),
      hasMarine:        has(['marine','naval','ship','offshore','ocean','hydrodynamics']),
      hasMining:        has(['mining','mine','geology','minerals','blasting','mine ventilation']),
      hasNuclear:       has(['nuclear','reactor','radiation','atomic','fusion','fission']),
      hasAutomobile:    has(['automotive','vehicle','ev','powertrain','engine','car']),
      hasArchitecture:  has(['architecture','building design','bim','urban planning','revit','interior']),
      hasInstrumentation: has(['instrumentation','sensor','scada','process control','calibration','control']),
      hasTextile:       has(['textile','fabric','spinning','weaving','garment','knitting']),
      hasMaterials:     has(['materials','composite','nanomaterial','polymer','ceramic','semiconductor']),
      hasTransportation: has(['transportation','highway','traffic','rail','transit','urban mobility']),
      experienceYears:  resumeData?.experience?.years || parseInt(formData?.experience) || 0,
      educationScore:   resumeData?.education?.degreeScore || parseInt(formData?.education) || 0,
      projectCount:     resumeData?.projects?.count || parseInt(formData?.projects) || 0,
      certCount:        (resumeData?.certifications || []).length,
      githubScore:      githubData?.overallScore || 0,
      githubActivity:   githubData?.scores?.activity || 0,
      gpa:              resumeData?.education?.cgpa || parseFloat(formData?.gpa) / 10 || 0,
      overall:          Math.min(1, skills.length / 20)
    };
  }

  _scoreDomain(domain, f) {
    const w = this.weights[domain]; if (!w) return 50;
    let score = 0;
    const maxes = { skillCount: 25, skillDiversity: 6, experienceYears: 12, educationScore: 5, projectCount: 15, certCount: 6, githubScore: 100, githubActivity: 100, gpa: 1 };
    Object.entries(w).forEach(([feat, wt]) => {
      const val = f[feat];
      if (typeof val === 'boolean') score += val ? wt : 0;
      else if (typeof val === 'number') score += (val / (maxes[feat] || 100)) * wt;
    });
    return score;
  }

  _radar(f) {
    return {
      labels: ['Technical\nSkills','Experience','Projects','Education','GitHub\nActivity','Certifications'],
      values: [
        Math.min(100, f.skillCount * 4),
        Math.min(100, f.experienceYears * 10),
        Math.min(100, f.projectCount * 7),
        Math.min(100, f.educationScore * 20),
        Math.min(100, f.githubActivity),
        Math.min(100, f.certCount * 18)
      ]
    };
  }

  _reasons(domain, f) {
    const map = {
      'software-engineering': [
        f.hasWeb        && { icon: '🌐', text: 'Strong web technology skills detected' },
        f.hasCloud      && { icon: '☁️', text: 'Cloud / DevOps skills align with modern engineering' },
        f.githubScore > 55 && { icon: '🐙', text: 'Active GitHub presence shows consistent coding practice' },
        f.projectCount > 3 && { icon: '🛠️', text: 'Multiple shipped projects demonstrate hands-on ability' },
        f.experienceYears > 1 && { icon: '💼', text: `${f.experienceYears} year(s) of engineering experience found` },
      ],
      'data-science': [
        f.hasAI         && { icon: '🤖', text: 'AI / ML skills are a strong domain match' },
        f.educationScore >= 3 && { icon: '🎓', text: 'Advanced academic background suits research-heavy roles' },
        f.gpa > 0.75    && { icon: '📊', text: 'High academic performance signals strong analytical aptitude' },
        f.skillCount > 8 && { icon: '⚡', text: 'Diverse technical skill set detected in resume' },
      ],
      'cybersecurity': [
        f.hasSecurity   && { icon: '🔐', text: 'Security-focused skills identified in resume' },
        f.certCount > 0 && { icon: '🏅', text: 'Certifications validate domain knowledge' },
        f.hasCloud      && { icon: '☁️', text: 'Cloud security experience is highly valued' },
      ],
      'product-management': [
        f.hasProduct    && { icon: '🗺️', text: 'PM skills and vocabulary detected' },
        f.experienceYears > 2 && { icon: '💼', text: 'Experience is key for stakeholder management' },
        f.hasDesign     && { icon: '🎨', text: 'Design thinking skills complement PM role' },
      ],
      'ux-design': [
        f.hasDesign     && { icon: '🎨', text: 'Design tool proficiency detected (Figma, Sketch, etc.)' },
        f.hasWeb        && { icon: '🌐', text: 'Web knowledge enables design implementation' },
        f.projectCount > 2 && { icon: '💡', text: 'Portfolio of projects indicates creative output' },
      ],
      'cloud-devops': [
        f.hasDevOps     && { icon: '⚙️', text: 'DevOps and automation skills match cloud delivery work' },
        f.hasCloud      && { icon: '☁️', text: 'Cloud platform experience is a strong domain signal' },
        f.hasSecurity   && { icon: '🔐', text: 'Security awareness supports reliable infrastructure' },
      ],
      'data-engineering': [
        f.hasDataEngineering && { icon: '🔄', text: 'Data pipeline and platform skills were detected' },
        f.hasCloud      && { icon: '☁️', text: 'Cloud skills support scalable data platforms' },
        f.hasAI         && { icon: '📊', text: 'AI and analytics knowledge complements data engineering' },
      ],
      'mobile-development': [
        f.hasMobile     && { icon: '📱', text: 'Mobile development skills were detected' },
        f.hasWeb        && { icon: '🌐', text: 'Web development experience transfers to mobile products' },
        f.projectCount > 2 && { icon: '🚀', text: 'Projects show practical product-building experience' },
      ],
      'blockchain-web3': [
        f.hasBlockchain && { icon: '⛓️', text: 'Blockchain and Web3 technologies match this domain' },
        f.hasSecurity   && { icon: '🔐', text: 'Security knowledge is valuable for smart contracts' },
        f.hasWeb        && { icon: '🌐', text: 'Web skills support decentralised application development' },
      ],
      'game-development': [
        f.hasGame       && { icon: '🎮', text: 'Game engines or game programming skills were detected' },
        f.hasWeb        && { icon: '🧩', text: 'Interactive application experience supports game development' },
        f.projectCount > 2 && { icon: '🏆', text: 'A project portfolio supports creative technical roles' },
      ]
    };
    const fallback = [
      f.skillCount > 5 && { icon: '⚡', text: 'A broad technical skill profile supports this engineering domain' },
      f.projectCount > 2 && { icon: '🛠️', text: 'Hands-on project experience strengthens domain readiness' },
      f.educationScore >= 3 && { icon: '🎓', text: 'Academic preparation aligns with engineering specialisation' }
    ];
    return (map[domain] || fallback).filter(Boolean).slice(0, 3);
  }

  _predictRole(domain, f) {
    const yoe = f.experienceYears;
    const nodes = (CareerData.careerPaths[domain]?.nodes || []).sort((a, b) => a.level - b.level);
    if (!nodes.length) return 'Career Professional';
    if (yoe < 1)  return nodes[0]?.title;
    if (yoe < 3)  return nodes[Math.min(1, nodes.length-1)]?.title;
    if (yoe < 6)  return nodes[Math.min(2, nodes.length-1)]?.title;
    if (yoe < 10) return nodes[Math.min(3, nodes.length-1)]?.title;
    return nodes[Math.min(4, nodes.length-1)]?.title;
  }

  _salary(domain, f) {
    const bases = {
      'software-engineering': [65000,95000,130000,165000,200000],
      'data-science':         [70000,100000,135000,165000,200000],
      'cybersecurity':        [70000,95000,130000,160000,195000],
      'product-management':   [80000,110000,145000,180000,220000],
      'ux-design':            [60000,85000,115000,145000,180000],
      'cloud-devops':         [75000,105000,135000,170000,210000],
      'data-engineering':     [80000,110000,145000,175000,215000],
      'mobile-development':   [70000,100000,130000,160000,195000],
      'blockchain-web3':      [75000,105000,140000,180000,225000],
      'game-development':     [60000,85000,115000,145000,185000]
    };
    const tiers = bases[domain] || [65000,95000,125000,160000,195000];
    const tier = f.experienceYears < 1 ? 0 : f.experienceYears < 3 ? 1 : f.experienceYears < 6 ? 2 : f.experienceYears < 10 ? 3 : 4;
    const base = tiers[tier];
    const bonus = f.certCount * 2500 + (f.githubScore > 70 ? 6000 : 0);
    return { low: base + bonus, high: Math.round(base * 1.4 + bonus) };
  }

  _missingSkills(domain, resumeData) {
    const roleKey = Object.keys(CareerData.roles).find(r => CareerData.roles[r].domain === domain);
    if (!roleKey) return [];
    const required = Object.keys(CareerData.roles[roleKey].skills);
    const userSkills = (resumeData?.skills || []).map(s => s.skill.toLowerCase());
    return required.filter(s => !userSkills.some(us => us.includes(s.toLowerCase().split('/')[0].trim())));
  }

  _strengthAreas(f) {
    const areas = [];
    if (f.hasAI)         areas.push({ icon: '🤖', label: 'AI & Machine Learning' });
    if (f.hasWeb)        areas.push({ icon: '🌐', label: 'Web Development' });
    if (f.hasCloud)      areas.push({ icon: '☁️', label: 'Cloud & DevOps' });
    if (f.hasSecurity)   areas.push({ icon: '🔐', label: 'Security' });
    if (f.hasDesign)     areas.push({ icon: '🎨', label: 'Design & UX' });
    if (f.hasProduct)    areas.push({ icon: '🎯', label: 'Product Management' });
    if (f.hasCivil) areas.push({ icon: '🏗️', label: 'Civil Engineering' });
    if (f.hasMechanical) areas.push({ icon: '⚙️', label: 'Mechanical Engineering' });
    if (f.hasElectrical) areas.push({ icon: '⚡', label: 'Electrical Engineering' });
    if (f.hasECE) areas.push({ icon: '📡', label: 'ECE & Embedded Systems' });
    if (f.hasChemical) areas.push({ icon: '🧪', label: 'Chemical Engineering' });
    if (f.hasAerospace) areas.push({ icon: '✈️', label: 'Aerospace Engineering' });
    if (f.hasBiomedical) areas.push({ icon: '🧬', label: 'Biomedical Engineering' });
    if (f.hasEnvironmental) areas.push({ icon: '🌱', label: 'Environmental Engineering' });
    if (f.hasIndustrial) areas.push({ icon: '🏭', label: 'Industrial Engineering' });
    if (f.hasMechatronics) areas.push({ icon: '🤖', label: 'Mechatronics & Robotics' });
    if (f.hasRenewable) areas.push({ icon: '🔋', label: 'Renewable Energy' });
    if (f.githubScore > 60) areas.push({ icon: '🐙', label: 'Open Source Activity' });
    if (f.certCount > 0) areas.push({ icon: '🏅', label: 'Certified Professional' });
    return areas.slice(0, 5);
  }
}
