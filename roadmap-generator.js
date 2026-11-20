// Roadmap generator: combines career-specific predefined phases with missing skills.
class RoadmapGenerator {
  generate(domain, missingSkills, features) {
    const data = AIData.domainRoadmaps[domain] || {
      projects: [
        ["Foundational lab project","Technical literature review","Core tools practice"],
        ["Applied engineering prototype","Team design project","Technical report"],
        ["Industry-style solution","Safety and quality study","Portfolio case study"],
        ["Advanced interdisciplinary project","Research investigation","Professional presentation"],
        ["Specialist capstone","Leadership project","Published technical report"]
      ],
      certifications: [
        ["Domain fundamentals certificate","Safety and ethics course"],
        ["Professional tools certificate","Industry standards course"],
        ["Specialist certification","Project management course"],
        ["Advanced technical certification","Technical leadership course"],
        ["Senior professional credential","Industry fellowship"]
      ],
      milestones: [
        ["Complete core engineering foundations","Build the first portfolio project"],
        ["Complete an applied internship","Present a technical design"],
        ["Pass specialist technical assessment","Lead a design project"],
        ["Deliver an industry-style solution","Mentor a junior learner"],
        ["Target a specialist or engineering lead role","Present a professional portfolio"]
      ]
    };
    const phaseKeys = ['beginner','intermediate','advanced','expert','leadership'];
    const yoe = features?.experienceYears || 0;
    const startPhase = yoe < 1 ? 0 : yoe < 3 ? 1 : yoe < 6 ? 2 : yoe < 10 ? 3 : 4;

    return AIData.roadmapPhases.slice(startPhase).map((phase, idx) => {
      const absIdx = startPhase + idx;
      const domainSkills = AIData.domainSkillsByPhase[domain] || {};
      const phaseKey = phaseKeys[absIdx] || 'intermediate';
      const baseSkills = domainSkills[phaseKey] || [];
      const gapSkills = missingSkills.slice(idx * 3, idx * 3 + 3);
      const skills = [...new Set([...gapSkills, ...baseSkills])].slice(0, 6);
      return {
        ...phase, index: absIdx,
        skills,
        projects:       (data.projects[absIdx]       || data.projects[data.projects.length - 1] || []),
        certifications: (data.certifications[absIdx]  || data.certifications[data.certifications.length - 1] || []),
        milestones:     (data.milestones[absIdx]       || data.milestones[data.milestones.length - 1] || []),
        completedSkills: [],
        completedMilestones: []
      };
    });
  }
}
