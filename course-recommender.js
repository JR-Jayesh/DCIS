// Course recommender: selects and ranks entries from the static course catalog.
class CourseRecommender {
  recommend(missingSkills, domain, features) {
    const catalog = AIData.courseCatalog;
    const seen = new Set();
    const results = [];
    if (!(AIData.domainTopCourses[domain] || []).length) {
      const label = CareerData.careerPaths[domain]?.label || domain;
      results.push({
        name: `${label} Foundations`,
        platform: "Professional Learning",
        cost: "Varies",
        duration: "Self-paced",
        difficulty: "Beginner",
        rating: 4.7,
        forSkill: "Domain Foundation",
        priority: 98,
        isTop: true
      });
      seen.add(`${label} Foundations`);
    }

    // Domain top courses first
    (AIData.domainTopCourses[domain] || []).forEach(c => {
      if (!seen.has(c.name)) { seen.add(c.name); results.push({ ...c, priority: 98, isTop: true }); }
    });

    // Gap skill courses
    missingSkills.slice(0, 8).forEach(skill => {
      const courses = catalog[skill] || catalog['General'] || [];
      courses.forEach(c => {
        if (!seen.has(c.name)) {
          seen.add(c.name);
          results.push({ ...c, forSkill: skill, priority: this._priority(skill, domain), isTop: false });
        }
      });
    });

    // Fill with general
    (catalog['General'] || []).forEach(c => {
      if (!seen.has(c.name)) { seen.add(c.name); results.push({ ...c, forSkill: 'Foundation', priority: 40, isTop: false }); }
    });

    return results.sort((a, b) => b.priority - a.priority);
  }

  _priority(skill, domain) {
    const roleKey = Object.keys(CareerData.roles).find(r => CareerData.roles[r].domain === domain);
    const roleSkills = roleKey ? Object.keys(CareerData.roles[roleKey].skills) : [];
    return roleSkills.some(rs => rs.toLowerCase().includes(skill.toLowerCase().split('/')[0].trim())) ? 88 : 65;
  }
}
