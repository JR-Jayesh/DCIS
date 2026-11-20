// ============================================================
// DYNAMIC CAREER INTELLIGENCE SYSTEM — Data Layer
// ============================================================

const CareerData = {

  // ── Career Paths ────────────────────────────────────────────
  careerPaths: {
    "software-engineering": {
      label: "Software Engineering",
      icon: "💻",
      color: "#6366f1",
      nodes: [
        { id: "intern", title: "Software Intern", level: 0, yoe: "0", salary: 35000, skills: ["HTML", "CSS", "JavaScript", "Git"], x: 0, y: 0 },
        { id: "junior-dev", title: "Junior Developer", level: 1, yoe: "0-2", salary: 65000, skills: ["JavaScript", "React", "Node.js", "SQL", "Git"], x: 0, y: 1 },
        { id: "mid-dev", title: "Mid-level Developer", level: 2, yoe: "2-5", salary: 95000, skills: ["TypeScript", "System Design", "AWS", "Docker", "Testing"], x: 0, y: 2 },
        { id: "senior-dev", title: "Senior Developer", level: 3, yoe: "5-8", salary: 130000, skills: ["Architecture", "Mentoring", "CI/CD", "Kubernetes", "Performance"], x: 0, y: 3 },
        { id: "staff-eng", title: "Staff Engineer", level: 4, yoe: "8-12", salary: 165000, skills: ["Cross-team Leadership", "RFC Writing", "Strategy", "OKRs"], x: -1, y: 4 },
        { id: "principal-eng", title: "Principal Engineer", level: 4, yoe: "10+", salary: 200000, skills: ["Technical Vision", "Executive Communication", "Innovation"], x: 0, y: 4 },
        { id: "tech-lead", title: "Tech Lead", level: 4, yoe: "8+", salary: 155000, skills: ["Team Leadership", "Roadmap Planning", "Code Review"], x: 1, y: 4 },
        { id: "em", title: "Engineering Manager", level: 5, yoe: "10+", salary: 175000, skills: ["People Management", "Hiring", "Budget", "OKRs"], x: 1, y: 5 },
        { id: "vp-eng", title: "VP of Engineering", level: 6, yoe: "15+", salary: 240000, skills: ["Org Design", "Culture", "P&L", "Executive Leadership"], x: 0, y: 6 },
        { id: "cto", title: "CTO", level: 7, yoe: "18+", salary: 320000, skills: ["Vision", "Fundraising", "Product Strategy", "Board Communication"], x: 0, y: 7 },
      ],
      edges: [
        ["intern", "junior-dev"], ["junior-dev", "mid-dev"], ["mid-dev", "senior-dev"],
        ["senior-dev", "staff-eng"], ["senior-dev", "principal-eng"], ["senior-dev", "tech-lead"],
        ["tech-lead", "em"], ["staff-eng", "vp-eng"], ["principal-eng", "vp-eng"],
        ["em", "vp-eng"], ["vp-eng", "cto"]
      ]
    },
    "data-science": {
      label: "Data Science & AI",
      icon: "🧠",
      color: "#8b5cf6",
      nodes: [
        { id: "ds-intern", title: "Data Analyst Intern", level: 0, yoe: "0", salary: 38000, skills: ["Excel", "SQL", "Python Basics", "Statistics"], x: 0, y: 0 },
        { id: "da", title: "Data Analyst", level: 1, yoe: "0-2", salary: 70000, skills: ["Python", "SQL", "Tableau", "Pandas", "Statistics"], x: 0, y: 1 },
        { id: "ds-junior", title: "Junior Data Scientist", level: 2, yoe: "1-3", salary: 90000, skills: ["Machine Learning", "Scikit-learn", "Feature Engineering", "A/B Testing"], x: 0, y: 2 },
        { id: "ds-mid", title: "Data Scientist", level: 3, yoe: "3-6", salary: 125000, skills: ["Deep Learning", "TensorFlow/PyTorch", "MLOps", "Experimentation"], x: 0, y: 3 },
        { id: "sr-ds", title: "Senior Data Scientist", level: 4, yoe: "6-9", salary: 155000, skills: ["Research", "Model Architecture", "Team Mentoring", "Stakeholder Mgmt"], x: 0, y: 4 },
        { id: "ml-eng", title: "ML Engineer", level: 4, yoe: "5+", salary: 160000, skills: ["Model Deployment", "Kubernetes", "Spark", "Real-time Inference"], x: 1, y: 4 },
        { id: "research-sci", title: "Research Scientist", level: 5, yoe: "8+", salary: 180000, skills: ["Novel Research", "Publications", "Grant Writing", "LLMs"], x: -1, y: 5 },
        { id: "head-ds", title: "Head of Data Science", level: 5, yoe: "10+", salary: 200000, skills: ["Strategy", "Org Building", "Roadmap", "Executive Communication"], x: 1, y: 5 },
        { id: "cdo", title: "Chief Data Officer", level: 6, yoe: "15+", salary: 280000, skills: ["Data Governance", "AI Strategy", "P&L", "Board Communication"], x: 0, y: 6 },
      ],
      edges: [
        ["ds-intern", "da"], ["da", "ds-junior"], ["da", "ds-mid"],
        ["ds-junior", "ds-mid"], ["ds-mid", "sr-ds"], ["ds-mid", "ml-eng"],
        ["sr-ds", "research-sci"], ["sr-ds", "head-ds"], ["ml-eng", "head-ds"],
        ["research-sci", "cdo"], ["head-ds", "cdo"]
      ]
    },
    "product-management": {
      label: "Product Management",
      icon: "🎯",
      color: "#ec4899",
      nodes: [
        { id: "pm-intern", title: "PM Intern", level: 0, yoe: "0", salary: 40000, skills: ["Market Research", "Wireframing", "Communication", "Excel"], x: 0, y: 0 },
        { id: "apm", title: "Associate PM", level: 1, yoe: "0-2", salary: 80000, skills: ["User Research", "Figma", "Agile", "SQL", "Roadmapping"], x: 0, y: 1 },
        { id: "pm", title: "Product Manager", level: 2, yoe: "2-5", salary: 110000, skills: ["Product Strategy", "Metrics", "A/B Testing", "Stakeholder Mgmt", "PRDs"], x: 0, y: 2 },
        { id: "sr-pm", title: "Senior PM", level: 3, yoe: "5-8", salary: 145000, skills: ["Cross-functional Leadership", "OKRs", "GTM Strategy", "Revenue Impact"], x: 0, y: 3 },
        { id: "gpm", title: "Group PM", level: 4, yoe: "8-11", salary: 175000, skills: ["Team Leadership", "Portfolio Mgmt", "Executive Alignment", "Hiring"], x: 0, y: 4 },
        { id: "dir-pm", title: "Director of Product", level: 5, yoe: "10-14", salary: 215000, skills: ["Vision Setting", "Org Design", "P&L", "Board Presentations"], x: 0, y: 5 },
        { id: "vp-pm", title: "VP of Product", level: 6, yoe: "14+", salary: 265000, skills: ["Company Strategy", "M&A", "Market Positioning", "Culture"], x: 0, y: 6 },
        { id: "cpo", title: "Chief Product Officer", level: 7, yoe: "18+", salary: 340000, skills: ["Corporate Vision", "Board Governance", "Fundraising", "Global Strategy"], x: 0, y: 7 },
      ],
      edges: [
        ["pm-intern", "apm"], ["apm", "pm"], ["pm", "sr-pm"],
        ["sr-pm", "gpm"], ["gpm", "dir-pm"], ["dir-pm", "vp-pm"], ["vp-pm", "cpo"]
      ]
    },
    "cybersecurity": {
      label: "Cybersecurity",
      icon: "🔐",
      color: "#10b981",
      nodes: [
        { id: "sec-intern", title: "Security Intern", level: 0, yoe: "0", salary: 36000, skills: ["Networking", "Linux", "Python", "Security Fundamentals"], x: 0, y: 0 },
        { id: "sec-analyst", title: "Security Analyst", level: 1, yoe: "0-3", salary: 75000, skills: ["SIEM", "Incident Response", "Threat Analysis", "Firewalls", "CompTIA Security+"], x: 0, y: 1 },
        { id: "pen-tester", title: "Penetration Tester", level: 2, yoe: "2-5", salary: 100000, skills: ["Ethical Hacking", "Metasploit", "Burp Suite", "CEH/OSCP"], x: -1, y: 2 },
        { id: "sec-eng", title: "Security Engineer", level: 2, yoe: "2-5", salary: 110000, skills: ["DevSecOps", "Cloud Security", "Zero Trust", "SAST/DAST"], x: 1, y: 2 },
        { id: "sr-sec", title: "Senior Security Engineer", level: 3, yoe: "5-8", salary: 145000, skills: ["Architecture", "Threat Modeling", "Red Team", "CISSP"], x: 0, y: 3 },
        { id: "sec-arch", title: "Security Architect", level: 4, yoe: "8-12", salary: 175000, skills: ["Enterprise Architecture", "Risk Management", "Compliance", "Zero Trust Design"], x: -1, y: 4 },
        { id: "ciso", title: "CISO", level: 5, yoe: "14+", salary: 260000, skills: ["Board Communication", "Risk Strategy", "Compliance Programs", "Team Building"], x: 0, y: 5 },
      ],
      edges: [
        ["sec-intern", "sec-analyst"], ["sec-analyst", "pen-tester"], ["sec-analyst", "sec-eng"],
        ["pen-tester", "sr-sec"], ["sec-eng", "sr-sec"], ["sr-sec", "sec-arch"],
        ["sec-arch", "ciso"], ["sr-sec", "ciso"]
      ]
    },
    "ux-design": {
      label: "UX / Product Design",
      icon: "🎨",
      color: "#f59e0b",
      nodes: [
        { id: "ux-intern", title: "UX Design Intern", level: 0, yoe: "0", salary: 34000, skills: ["Figma", "User Research Basics", "Wireframing", "Typography"], x: 0, y: 0 },
        { id: "jr-ux", title: "Junior UX Designer", level: 1, yoe: "0-2", salary: 62000, skills: ["Figma", "Prototyping", "Usability Testing", "Design Systems"], x: 0, y: 1 },
        { id: "ux-des", title: "UX Designer", level: 2, yoe: "2-5", salary: 88000, skills: ["Advanced Prototyping", "User Research", "Information Architecture", "Accessibility"], x: 0, y: 2 },
        { id: "sr-ux", title: "Senior UX Designer", level: 3, yoe: "5-8", salary: 118000, skills: ["Strategic Design", "Design Thinking", "Cross-functional Collab", "Mentoring"], x: 0, y: 3 },
        { id: "ux-lead", title: "UX Lead / Design Lead", level: 4, yoe: "7-10", salary: 145000, skills: ["Design System Ownership", "Roadmap", "Team Leadership", "Design Ops"], x: -1, y: 4 },
        { id: "prod-des", title: "Product Designer", level: 4, yoe: "5+", salary: 130000, skills: ["End-to-end Product Thinking", "Motion Design", "UX Writing", "Analytics"], x: 1, y: 4 },
        { id: "dir-design", title: "Director of Design", level: 5, yoe: "10-14", salary: 185000, skills: ["Org Design", "Brand Strategy", "Executive Presentations", "Hiring"], x: 0, y: 5 },
        { id: "vp-design", title: "VP of Design / CDO", level: 6, yoe: "15+", salary: 240000, skills: ["Company Vision", "Global Design Strategy", "Innovation Culture"], x: 0, y: 6 },
      ],
      edges: [
        ["ux-intern", "jr-ux"], ["jr-ux", "ux-des"], ["ux-des", "sr-ux"],
        ["sr-ux", "ux-lead"], ["sr-ux", "prod-des"],
        ["ux-lead", "dir-design"], ["prod-des", "dir-design"],
        ["dir-design", "vp-design"]
      ]
    },
    "cloud-devops": {
      label: "Cloud & DevOps",
      icon: "☁️",
      color: "#06b6d4",
      nodes: [
        { id: "cloud-intern", title: "Cloud Intern", level: 0, yoe: "0", salary: 45000, skills: ["Linux", "Networking", "Git", "Cloud Basics"], x: 0, y: 0 },
        { id: "devops-eng", title: "DevOps Engineer", level: 1, yoe: "0-3", salary: 90000, skills: ["Docker", "CI/CD", "Terraform", "AWS/Azure"], x: 0, y: 1 },
        { id: "cloud-eng", title: "Cloud Engineer", level: 2, yoe: "2-5", salary: 120000, skills: ["Kubernetes", "Cloud Architecture", "Monitoring", "Security"], x: 0, y: 2 },
        { id: "sre", title: "Site Reliability Engineer", level: 3, yoe: "5-8", salary: 155000, skills: ["SRE", "Observability", "Incident Response", "Automation"], x: 0, y: 3 },
        { id: "cloud-architect", title: "Cloud Architect", level: 4, yoe: "8+", salary: 195000, skills: ["Architecture", "FinOps", "Governance", "Leadership"], x: 0, y: 4 }
      ],
      edges: [["cloud-intern", "devops-eng"], ["devops-eng", "cloud-eng"], ["cloud-eng", "sre"], ["sre", "cloud-architect"]]
    },
    "data-engineering": {
      label: "Data Engineering",
      icon: "🔄",
      color: "#14b8a6",
      nodes: [
        { id: "data-intern", title: "Data Engineering Intern", level: 0, yoe: "0", salary: 45000, skills: ["SQL", "Python", "Linux", "Data Basics"], x: 0, y: 0 },
        { id: "data-eng", title: "Data Engineer", level: 1, yoe: "0-3", salary: 95000, skills: ["ETL", "SQL", "Python", "Airflow"], x: 0, y: 1 },
        { id: "big-data-eng", title: "Big Data Engineer", level: 2, yoe: "3-6", salary: 130000, skills: ["Spark", "Kafka", "Data Lakes", "Cloud"], x: 0, y: 2 },
        { id: "data-platform", title: "Data Platform Engineer", level: 3, yoe: "6-10", salary: 165000, skills: ["Architecture", "Governance", "Reliability", "Security"], x: 0, y: 3 },
        { id: "data-architect", title: "Data Architect", level: 4, yoe: "10+", salary: 205000, skills: ["Data Strategy", "Warehousing", "Leadership", "Governance"], x: 0, y: 4 }
      ],
      edges: [["data-intern", "data-eng"], ["data-eng", "big-data-eng"], ["big-data-eng", "data-platform"], ["data-platform", "data-architect"]]
    },
    "mobile-development": {
      label: "Mobile Development",
      icon: "📱",
      color: "#f97316",
      nodes: [
        { id: "mobile-intern", title: "Mobile Developer Intern", level: 0, yoe: "0", salary: 42000, skills: ["Programming", "Git", "UI Basics"], x: 0, y: 0 },
        { id: "mobile-dev", title: "Mobile Developer", level: 1, yoe: "0-3", salary: 85000, skills: ["Kotlin/Swift", "Flutter", "APIs", "Testing"], x: 0, y: 1 },
        { id: "senior-mobile", title: "Senior Mobile Developer", level: 2, yoe: "3-6", salary: 125000, skills: ["Architecture", "Performance", "Offline Apps", "Security"], x: 0, y: 2 },
        { id: "mobile-lead", title: "Mobile Tech Lead", level: 3, yoe: "6-10", salary: 155000, skills: ["Team Leadership", "Release Strategy", "Observability"], x: 0, y: 3 },
        { id: "mobile-architect", title: "Mobile Architect", level: 4, yoe: "10+", salary: 190000, skills: ["Platform Strategy", "Design Systems", "Technical Vision"], x: 0, y: 4 }
      ],
      edges: [["mobile-intern", "mobile-dev"], ["mobile-dev", "senior-mobile"], ["senior-mobile", "mobile-lead"], ["mobile-lead", "mobile-architect"]]
    },
    "blockchain-web3": {
      label: "Blockchain & Web3",
      icon: "⛓️",
      color: "#eab308",
      nodes: [
        { id: "web3-intern", title: "Web3 Developer Intern", level: 0, yoe: "0", salary: 50000, skills: ["JavaScript", "Cryptography", "Blockchain Basics"], x: 0, y: 0 },
        { id: "smart-contract", title: "Smart Contract Developer", level: 1, yoe: "0-3", salary: 100000, skills: ["Solidity", "Ethereum", "Testing", "Security"], x: 0, y: 1 },
        { id: "web3-eng", title: "Web3 Engineer", level: 2, yoe: "3-6", salary: 140000, skills: ["dApps", "Wallets", "Protocol APIs", "Auditing"], x: 0, y: 2 },
        { id: "protocol-eng", title: "Protocol Engineer", level: 3, yoe: "6-10", salary: 180000, skills: ["Distributed Systems", "Cryptography", "Consensus"], x: 0, y: 3 },
        { id: "web3-architect", title: "Web3 Architect", level: 4, yoe: "10+", salary: 220000, skills: ["Protocol Strategy", "Governance", "Leadership"], x: 0, y: 4 }
      ],
      edges: [["web3-intern", "smart-contract"], ["smart-contract", "web3-eng"], ["web3-eng", "protocol-eng"], ["protocol-eng", "web3-architect"]]
    },
    "game-development": {
      label: "Game Development",
      icon: "🎮",
      color: "#a855f7",
      nodes: [
        { id: "game-intern", title: "Game Developer Intern", level: 0, yoe: "0", salary: 38000, skills: ["Programming", "Game Design", "Git"], x: 0, y: 0 },
        { id: "game-dev", title: "Game Developer", level: 1, yoe: "0-3", salary: 75000, skills: ["Unity/Unreal", "C#", "3D Math", "Gameplay"], x: 0, y: 1 },
        { id: "senior-game", title: "Senior Game Programmer", level: 2, yoe: "3-6", salary: 105000, skills: ["Optimization", "Graphics", "AI", "Networking"], x: 0, y: 2 },
        { id: "game-lead", title: "Lead Game Engineer", level: 3, yoe: "6-10", salary: 135000, skills: ["Technical Direction", "Team Leadership", "Tools"], x: 0, y: 3 },
        { id: "technical-director", title: "Technical Director", level: 4, yoe: "10+", salary: 175000, skills: ["Studio Strategy", "Architecture", "Production Leadership"], x: 0, y: 4 }
      ],
      edges: [["game-intern", "game-dev"], ["game-dev", "senior-game"], ["senior-game", "game-lead"], ["game-lead", "technical-director"]]
    },
    "civil-engineering": {
      label: "Civil Engineering", icon: "🏗️", color: "#78716c",
      nodes: [
        { id:"civil-intern",title:"Civil Engineering Intern",level:0,yoe:"0",salary:38000,skills:["Surveying","AutoCAD","Construction"],x:0,y:0 },
        { id:"civil-eng",title:"Civil Engineer",level:1,yoe:"0-4",salary:80000,skills:["Structures","Soil","Concrete","Revit"],x:0,y:1 },
        { id:"sr-civil",title:"Senior Civil Engineer",level:2,yoe:"4-9",salary:115000,skills:["Design","BIM","Project Management"],x:0,y:2 },
        { id:"civil-head",title:"Civil Engineering Lead",level:3,yoe:"9+",salary:155000,skills:["Engineering Strategy","Contracts","Leadership"],x:0,y:3 }
      ], edges:[["civil-intern","civil-eng"],["civil-eng","sr-civil"],["sr-civil","civil-head"]]
    },
    "mechanical-engineering": {
      label:"Mechanical Engineering", icon:"⚙️", color:"#64748b",
      nodes:[
        {id:"mech-intern",title:"Mechanical Intern",level:0,yoe:"0",salary:40000,skills:["CAD","Drafting","Manufacturing"],x:0,y:0},
        {id:"mech-eng",title:"Mechanical Engineer",level:1,yoe:"0-4",salary:85000,skills:["SolidWorks","Thermodynamics","FEA"],x:0,y:1},
        {id:"sr-mech",title:"Senior Mechanical Engineer",level:2,yoe:"4-9",salary:120000,skills:["ANSYS","DFMEA","Design Validation"],x:0,y:2},
        {id:"mech-head",title:"Mechanical Engineering Lead",level:3,yoe:"9+",salary:160000,skills:["Technical Strategy","Team Leadership"],x:0,y:3}
      ],edges:[["mech-intern","mech-eng"],["mech-eng","sr-mech"],["sr-mech","mech-head"]]
    },
    "electrical-engineering": {
      label:"Electrical Engineering",icon:"⚡",color:"#eab308",
      nodes:[
        {id:"elec-intern",title:"Electrical Intern",level:0,yoe:"0",salary:42000,skills:["Circuits","Electrical Machines","MATLAB"],x:0,y:0},
        {id:"elec-eng",title:"Electrical Engineer",level:1,yoe:"0-4",salary:90000,skills:["Power Systems","Protection","ETAP"],x:0,y:1},
        {id:"sr-elec",title:"Senior Electrical Engineer",level:2,yoe:"4-9",salary:125000,skills:["Grid","Design","Commissioning"],x:0,y:2},
        {id:"elec-head",title:"Electrical Engineering Lead",level:3,yoe:"9+",salary:165000,skills:["Power Strategy","Safety","Leadership"],x:0,y:3}
      ],edges:[["elec-intern","elec-eng"],["elec-eng","sr-elec"],["sr-elec","elec-head"]]
    },
    "electronics-communication": {
      label:"Electronics & Communication",icon:"📡",color:"#6366f1",
      nodes:[
        {id:"ece-intern",title:"ECE Intern",level:0,yoe:"0",salary:40000,skills:["Electronics","Digital Logic","C"],x:0,y:0},
        {id:"ece-eng",title:"ECE Engineer",level:1,yoe:"0-4",salary:85000,skills:["Embedded","VLSI","DSP","IoT"],x:0,y:1},
        {id:"sr-ece",title:"Senior ECE Engineer",level:2,yoe:"4-9",salary:120000,skills:["FPGA","Wireless","PCB"],x:0,y:2},
        {id:"ece-head",title:"ECE Engineering Lead",level:3,yoe:"9+",salary:160000,skills:["Architecture","Standards","Leadership"],x:0,y:3}
      ],edges:[["ece-intern","ece-eng"],["ece-eng","sr-ece"],["sr-ece","ece-head"]]
    },
    "chemical-engineering": {
      label:"Chemical Engineering",icon:"🧪",color:"#0d9488",
      nodes:[
        {id:"chem-intern",title:"Chemical Engineering Intern",level:0,yoe:"0",salary:42000,skills:["Chemistry","Mass Balance","Process"],x:0,y:0},
        {id:"chem-eng",title:"Process Engineer",level:1,yoe:"0-4",salary:90000,skills:["Process Simulation","Reactors","Safety"],x:0,y:1},
        {id:"sr-chem",title:"Senior Process Engineer",level:2,yoe:"4-9",salary:125000,skills:["Plant Design","P&ID","HAZOP"],x:0,y:2},
        {id:"chem-head",title:"Chemical Engineering Manager",level:3,yoe:"9+",salary:165000,skills:["Operations","Strategy","Leadership"],x:0,y:3}
      ],edges:[["chem-intern","chem-eng"],["chem-eng","sr-chem"],["sr-chem","chem-head"]]
    },
    "aerospace-engineering": {
      label:"Aerospace Engineering",icon:"✈️",color:"#38bdf8",
      nodes:[
        {id:"aero-intern",title:"Aerospace Intern",level:0,yoe:"0",salary:45000,skills:["Aerodynamics","MATLAB","CAD"],x:0,y:0},
        {id:"aero-eng",title:"Aerospace Engineer",level:1,yoe:"0-4",salary:95000,skills:["Structures","Propulsion","CFD"],x:0,y:1},
        {id:"sr-aero",title:"Senior Aerospace Engineer",level:2,yoe:"4-9",salary:135000,skills:["Flight Systems","Avionics","Testing"],x:0,y:2},
        {id:"aero-head",title:"Aerospace Engineering Lead",level:3,yoe:"9+",salary:180000,skills:["Vehicle Architecture","Safety","Leadership"],x:0,y:3}
      ],edges:[["aero-intern","aero-eng"],["aero-eng","sr-aero"],["sr-aero","aero-head"]]
    },
    "biomedical-engineering": {
      label:"Biomedical Engineering",icon:"🧬",color:"#ec4899",
      nodes:[
        {id:"bio-intern",title:"Biomedical Intern",level:0,yoe:"0",salary:40000,skills:["Anatomy","Instrumentation","Research"],x:0,y:0},
        {id:"bio-eng",title:"Biomedical Engineer",level:1,yoe:"0-4",salary:85000,skills:["Medical Devices","Sensors","FDA Basics"],x:0,y:1},
        {id:"sr-bio",title:"Senior Biomedical Engineer",level:2,yoe:"4-9",salary:120000,skills:["Device Design","Clinical Testing","Risk"],x:0,y:2},
        {id:"bio-head",title:"Biomedical Engineering Lead",level:3,yoe:"9+",salary:160000,skills:["Product Strategy","Regulation","Leadership"],x:0,y:3}
      ],edges:[["bio-intern","bio-eng"],["bio-eng","sr-bio"],["sr-bio","bio-head"]]
    },
    "environmental-engineering": {
      label:"Environmental Engineering",icon:"🌱",color:"#10b981",
      nodes:[
        {id:"env-intern",title:"Environmental Intern",level:0,yoe:"0",salary:38000,skills:["GIS","Sampling","Sustainability"],x:0,y:0},
        {id:"env-eng",title:"Environmental Engineer",level:1,yoe:"0-4",salary:80000,skills:["Water Treatment","Pollution","Compliance"],x:0,y:1},
        {id:"sr-env",title:"Senior Environmental Engineer",level:2,yoe:"4-9",salary:115000,skills:["Impact Assessment","Remediation","EIA"],x:0,y:2},
        {id:"env-head",title:"Environmental Engineering Lead",level:3,yoe:"9+",salary:150000,skills:["Climate Strategy","Policy","Leadership"],x:0,y:3}
      ],edges:[["env-intern","env-eng"],["env-eng","sr-env"],["sr-env","env-head"]]
    },
    "industrial-engineering": {
      label:"Industrial Engineering",icon:"🏭",color:"#f97316",
      nodes:[
        {id:"ie-intern",title:"Industrial Engineering Intern",level:0,yoe:"0",salary:40000,skills:["Operations","Excel","Process Maps"],x:0,y:0},
        {id:"ie-eng",title:"Industrial Engineer",level:1,yoe:"0-4",salary:82000,skills:["Lean","Six Sigma","Supply Chain"],x:0,y:1},
        {id:"sr-ie",title:"Senior Industrial Engineer",level:2,yoe:"4-9",salary:115000,skills:["Simulation","Planning","Cost Reduction"],x:0,y:2},
        {id:"ie-head",title:"Industrial Engineering Manager",level:3,yoe:"9+",salary:155000,skills:["Operations Strategy","Leadership"],x:0,y:3}
      ],edges:[["ie-intern","ie-eng"],["ie-eng","sr-ie"],["sr-ie","ie-head"]]
    },
    "petroleum-engineering": {
      label:"Petroleum Engineering",icon:"🛢️",color:"#854d0e",
      nodes:[
        {id:"pet-intern",title:"Petroleum Intern",level:0,yoe:"0",salary:45000,skills:["Geology","Reservoir Basics","Safety"],x:0,y:0},
        {id:"pet-eng",title:"Petroleum Engineer",level:1,yoe:"0-4",salary:100000,skills:["Drilling","Reservoir","Production"],x:0,y:1},
        {id:"sr-pet",title:"Senior Petroleum Engineer",level:2,yoe:"4-9",salary:145000,skills:["Simulation","Field Planning","HSE"],x:0,y:2},
        {id:"pet-head",title:"Petroleum Engineering Lead",level:3,yoe:"9+",salary:190000,skills:["Asset Strategy","Leadership"],x:0,y:3}
      ],edges:[["pet-intern","pet-eng"],["pet-eng","sr-pet"],["sr-pet","pet-head"]]
    },
    "metallurgical-materials": {
      label:"Metallurgical & Materials Engineering",icon:"🔩",color:"#475569",
      nodes:[
        {id:"metal-intern",title:"Materials Intern",level:0,yoe:"0",salary:40000,skills:["Metals","Characterisation","Safety"],x:0,y:0},
        {id:"metal-eng",title:"Materials Engineer",level:1,yoe:"0-4",salary:85000,skills:["Metallurgy","Casting","Corrosion"],x:0,y:1},
        {id:"sr-metal",title:"Senior Materials Engineer",level:2,yoe:"4-9",salary:120000,skills:["Composites","Testing","Failure Analysis"],x:0,y:2},
        {id:"metal-head",title:"Materials Engineering Lead",level:3,yoe:"9+",salary:160000,skills:["Materials Strategy","R&D","Leadership"],x:0,y:3}
      ],edges:[["metal-intern","metal-eng"],["metal-eng","sr-metal"],["sr-metal","metal-head"]]
    },
    "marine-engineering": {
      label:"Marine & Naval Engineering",icon:"🚢",color:"#0284c7",
      nodes:[
        {id:"marine-intern",title:"Marine Intern",level:0,yoe:"0",salary:40000,skills:["Marine Basics","Safety","Drafting"],x:0,y:0},
        {id:"marine-eng",title:"Marine Engineer",level:1,yoe:"0-4",salary:90000,skills:["Ship Systems","Hydraulics","Propulsion"],x:0,y:1},
        {id:"sr-marine",title:"Senior Marine Engineer",level:2,yoe:"4-9",salary:125000,skills:["Naval Architecture","Offshore","Classification"],x:0,y:2},
        {id:"marine-head",title:"Marine Engineering Lead",level:3,yoe:"9+",salary:165000,skills:["Fleet Strategy","Compliance","Leadership"],x:0,y:3}
      ],edges:[["marine-intern","marine-eng"],["marine-eng","sr-marine"],["sr-marine","marine-head"]]
    },
    "mining-engineering": {
      label:"Mining Engineering",icon:"⛏️",color:"#a16207",
      nodes:[
        {id:"mine-intern",title:"Mining Intern",level:0,yoe:"0",salary:42000,skills:["Geology","Safety","Surveying"],x:0,y:0},
        {id:"mine-eng",title:"Mining Engineer",level:1,yoe:"0-4",salary:90000,skills:["Mine Planning","Ventilation","Blasting"],x:0,y:1},
        {id:"sr-mine",title:"Senior Mining Engineer",level:2,yoe:"4-9",salary:125000,skills:["Operations","Mineral Processing","HSE"],x:0,y:2},
        {id:"mine-head",title:"Mining Operations Lead",level:3,yoe:"9+",salary:165000,skills:["Mine Strategy","Leadership","ESG"],x:0,y:3}
      ],edges:[["mine-intern","mine-eng"],["mine-eng","sr-mine"],["sr-mine","mine-head"]]
    },
    "nuclear-engineering": {
      label:"Nuclear Engineering",icon:"☢️",color:"#84cc16",
      nodes:[
        {id:"nuclear-intern",title:"Nuclear Intern",level:0,yoe:"0",salary:48000,skills:["Radiation","Physics","Safety"],x:0,y:0},
        {id:"nuclear-eng",title:"Nuclear Engineer",level:1,yoe:"0-4",salary:105000,skills:["Reactor Systems","Shielding","NRC"],x:0,y:1},
        {id:"sr-nuclear",title:"Senior Nuclear Engineer",level:2,yoe:"4-9",salary:145000,skills:["Thermal Hydraulics","Licensing","Risk"],x:0,y:2},
        {id:"nuclear-head",title:"Nuclear Engineering Lead",level:3,yoe:"9+",salary:185000,skills:["Plant Strategy","Regulation","Leadership"],x:0,y:3}
      ],edges:[["nuclear-intern","nuclear-eng"],["nuclear-eng","sr-nuclear"],["sr-nuclear","nuclear-head"]]
    },
    "mechatronics-robotics": {
      label:"Mechatronics & Robotics",icon:"🤖",color:"#8b5cf6",
      nodes:[
        {id:"mechat-intern",title:"Mechatronics Intern",level:0,yoe:"0",salary:42000,skills:["Sensors","Microcontrollers","CAD"],x:0,y:0},
        {id:"mechat-eng",title:"Mechatronics Engineer",level:1,yoe:"0-4",salary:90000,skills:["Robotics","PLC","Control Systems"],x:0,y:1},
        {id:"sr-mechat",title:"Senior Robotics Engineer",level:2,yoe:"4-9",salary:125000,skills:["ROS","Vision","Actuation"],x:0,y:2},
        {id:"mechat-head",title:"Robotics Engineering Lead",level:3,yoe:"9+",salary:165000,skills:["Robot Architecture","Leadership"],x:0,y:3}
      ],edges:[["mechat-intern","mechat-eng"],["mechat-eng","sr-mechat"],["sr-mechat","mechat-head"]]
    },
    "automobile-engineering": {
      label:"Automobile & EV Engineering",icon:"🚗",color:"#ef4444",
      nodes:[
        {id:"auto-intern",title:"Automotive Intern",level:0,yoe:"0",salary:42000,skills:["Vehicle Basics","CAD","Testing"],x:0,y:0},
        {id:"auto-eng",title:"Automotive Engineer",level:1,yoe:"0-4",salary:88000,skills:["Powertrain","EV","CAN Bus"],x:0,y:1},
        {id:"sr-auto",title:"Senior Automotive Engineer",level:2,yoe:"4-9",salary:125000,skills:["Vehicle Integration","Diagnostics","BMS"],x:0,y:2},
        {id:"auto-head",title:"Vehicle Engineering Lead",level:3,yoe:"9+",salary:165000,skills:["Vehicle Strategy","Safety","Leadership"],x:0,y:3}
      ],edges:[["auto-intern","auto-eng"],["auto-eng","sr-auto"],["sr-auto","auto-head"]]
    },
    "architecture-engineering": {
      label:"Architecture & Built Environment",icon:"🏛️",color:"#d97706",
      nodes:[
        {id:"arch-intern",title:"Architecture Intern",level:0,yoe:"0",salary:36000,skills:["Drawing","Revit","Theory"],x:0,y:0},
        {id:"arch-eng",title:"Architect",level:1,yoe:"0-4",salary:75000,skills:["BIM","Building Codes","Rendering"],x:0,y:1},
        {id:"sr-arch",title:"Senior Architect",level:2,yoe:"4-9",salary:110000,skills:["Project Design","Urban Planning","Documentation"],x:0,y:2},
        {id:"arch-head",title:"Design Principal",level:3,yoe:"9+",salary:150000,skills:["Practice Strategy","Leadership","Client Work"],x:0,y:3}
      ],edges:[["arch-intern","arch-eng"],["arch-eng","sr-arch"],["sr-arch","arch-head"]]
    },
    "instrumentation-control": {
      label:"Instrumentation & Control",icon:"🎛️",color:"#06b6d4",
      nodes:[
        {id:"inst-intern",title:"Instrumentation Intern",level:0,yoe:"0",salary:40000,skills:["Sensors","Circuits","Calibration"],x:0,y:0},
        {id:"inst-eng",title:"Instrumentation Engineer",level:1,yoe:"0-4",salary:85000,skills:["SCADA","PLC","Control Loops"],x:0,y:1},
        {id:"sr-inst",title:"Senior Control Engineer",level:2,yoe:"4-9",salary:120000,skills:["Process Control","DCS","Safety Instrumented Systems"],x:0,y:2},
        {id:"inst-head",title:"Controls Engineering Lead",level:3,yoe:"9+",salary:160000,skills:["Automation Strategy","Leadership"],x:0,y:3}
      ],edges:[["inst-intern","inst-eng"],["inst-eng","sr-inst"],["sr-inst","inst-head"]]
    },
    "textile-engineering": {
      label:"Textile Engineering",icon:"🧵",color:"#db2777",
      nodes:[
        {id:"text-intern",title:"Textile Intern",level:0,yoe:"0",salary:32000,skills:["Fibres","Fabric Testing","Safety"],x:0,y:0},
        {id:"text-eng",title:"Textile Engineer",level:1,yoe:"0-4",salary:65000,skills:["Spinning","Weaving","Garment Processing"],x:0,y:1},
        {id:"sr-text",title:"Senior Textile Engineer",level:2,yoe:"4-9",salary:90000,skills:["Production","Quality","Dyeing"],x:0,y:2},
        {id:"text-head",title:"Textile Engineering Lead",level:3,yoe:"9+",salary:125000,skills:["Plant Strategy","Sustainability","Leadership"],x:0,y:3}
      ],edges:[["text-intern","text-eng"],["text-eng","sr-text"],["sr-text","text-head"]]
    },
    "materials-engineering": {
      label:"Materials Engineering",icon:"🧱",color:"#78716c",
      nodes:[
        {id:"mat-intern",title:"Materials Intern",level:0,yoe:"0",salary:40000,skills:["Characterisation","Polymers","Ceramics"],x:0,y:0},
        {id:"mat-eng",title:"Materials Engineer",level:1,yoe:"0-4",salary:85000,skills:["Composites","Testing","Semiconductors"],x:0,y:1},
        {id:"sr-mat",title:"Senior Materials Engineer",level:2,yoe:"4-9",salary:120000,skills:["Nanomaterials","Failure Analysis","R&D"],x:0,y:2},
        {id:"mat-head",title:"Materials Engineering Lead",level:3,yoe:"9+",salary:160000,skills:["Materials Strategy","Leadership"],x:0,y:3}
      ],edges:[["mat-intern","mat-eng"],["mat-eng","sr-mat"],["sr-mat","mat-head"]]
    },
    "renewable-energy-engineering": {
      label:"Renewable Energy Engineering",icon:"🔋",color:"#22c55e",
      nodes:[
        {id:"renew-intern",title:"Renewable Energy Intern",level:0,yoe:"0",salary:40000,skills:["Solar","Wind","Electrical Basics"],x:0,y:0},
        {id:"renew-eng",title:"Renewable Energy Engineer",level:1,yoe:"0-4",salary:88000,skills:["PV Systems","Battery","Grid Integration"],x:0,y:1},
        {id:"sr-renew",title:"Senior Energy Engineer",level:2,yoe:"4-9",salary:125000,skills:["System Design","Hydrogen","Storage"],x:0,y:2},
        {id:"renew-head",title:"Energy Engineering Lead",level:3,yoe:"9+",salary:165000,skills:["Energy Strategy","Leadership"],x:0,y:3}
      ],edges:[["renew-intern","renew-eng"],["renew-eng","sr-renew"],["sr-renew","renew-head"]]
    },
    "transportation-engineering": {
      label:"Transportation Engineering",icon:"🛣️",color:"#0891b2",
      nodes:[
        {id:"transport-intern",title:"Transportation Intern",level:0,yoe:"0",salary:38000,skills:["Surveying","Traffic Basics","GIS"],x:0,y:0},
        {id:"transport-eng",title:"Transportation Engineer",level:1,yoe:"0-4",salary:80000,skills:["Highway Design","Traffic Modelling","Transit"],x:0,y:1},
        {id:"sr-transport",title:"Senior Transportation Engineer",level:2,yoe:"4-9",salary:115000,skills:["Urban Mobility","Safety","BIM"],x:0,y:2},
        {id:"transport-head",title:"Transportation Engineering Lead",level:3,yoe:"9+",salary:155000,skills:["Transport Strategy","Leadership"],x:0,y:3}
      ],edges:[["transport-intern","transport-eng"],["transport-eng","sr-transport"],["sr-transport","transport-head"]]
    },
    "railway-engineering": {
      label:"Railway Engineering",icon:"🚆",color:"#3b82f6",
      nodes:[
        {id:"rail-intern",title:"Railway Intern",level:0,yoe:"0",salary:40000,skills:["Rail Basics","Safety","Drawing"],x:0,y:0},
        {id:"rail-eng",title:"Railway Engineer",level:1,yoe:"0-4",salary:85000,skills:["Signalling","Track","Rolling Stock"],x:0,y:1},
        {id:"sr-rail",title:"Senior Railway Engineer",level:2,yoe:"4-9",salary:120000,skills:["System Integration","Metro","Maintenance"],x:0,y:2},
        {id:"rail-head",title:"Railway Engineering Lead",level:3,yoe:"9+",salary:160000,skills:["Rail Strategy","Safety","Leadership"],x:0,y:3}
      ],edges:[["rail-intern","rail-eng"],["rail-eng","sr-rail"],["sr-rail","rail-head"]]
    }
  },

  // ── Skill Gap Roles ─────────────────────────────────────────
  roles: {
    "Frontend Developer": {
      domain: "software-engineering",
      skills: {
        "HTML/CSS": 80, "JavaScript": 85, "React": 85, "TypeScript": 75,
        "Git": 80, "REST APIs": 75, "Testing": 65, "Performance Optimization": 60,
        "Accessibility": 55, "UI/UX Principles": 60
      },
      salary: "$85,000 – $130,000",
      demand: "Very High",
      growth: "+18%"
    },
    "Backend Developer": {
      domain: "software-engineering",
      skills: {
        "Node.js / Python": 85, "SQL Databases": 80, "REST API Design": 85,
        "Docker": 75, "AWS / GCP": 70, "Microservices": 70, "Security Basics": 65,
        "Testing": 75, "Message Queues": 60, "Caching": 65
      },
      salary: "$90,000 – $140,000",
      demand: "High",
      growth: "+15%"
    },
    "Full Stack Developer": {
      domain: "software-engineering",
      skills: {
        "JavaScript / TypeScript": 90, "React": 80, "Node.js": 80, "SQL": 75,
        "Git / CI/CD": 80, "Docker": 70, "AWS": 65, "Testing": 70,
        "System Design": 60, "Security": 55
      },
      salary: "$95,000 – $150,000",
      demand: "Very High",
      growth: "+20%"
    },
    "Data Scientist": {
      domain: "data-science",
      skills: {
        "Python": 90, "Machine Learning": 85, "Statistics": 85, "SQL": 75,
        "Deep Learning": 70, "Data Visualization": 75, "Feature Engineering": 80,
        "A/B Testing": 70, "Communication": 65, "Domain Knowledge": 60
      },
      salary: "$110,000 – $165,000",
      demand: "High",
      growth: "+25%"
    },
    "ML Engineer": {
      domain: "data-science",
      skills: {
        "Python": 90, "MLOps": 85, "Docker / Kubernetes": 80, "TensorFlow / PyTorch": 85,
        "Cloud Platforms": 75, "Spark": 65, "Model Serving": 80,
        "Software Engineering": 80, "Data Pipelines": 75, "Monitoring": 65
      },
      salary: "$130,000 – $185,000",
      demand: "Very High",
      growth: "+32%"
    },
    "AI/LLM Engineer": {
      domain: "data-science",
      skills: {
        "Python": 90, "LLM APIs (OpenAI/Gemini)": 85, "Prompt Engineering": 80,
        "RAG Architecture": 75, "Vector Databases": 70, "Fine-tuning": 65,
        "LangChain / LlamaIndex": 75, "Evaluation Frameworks": 60,
        "Software Engineering": 80, "System Design": 70
      },
      salary: "$140,000 – $200,000",
      demand: "Explosive",
      growth: "+45%"
    },
    "Product Manager": {
      domain: "product-management",
      skills: {
        "Product Strategy": 85, "User Research": 80, "Data Analysis": 75,
        "Agile / Scrum": 80, "Roadmapping": 85, "Communication": 90,
        "SQL / Analytics": 65, "Figma Basics": 55, "Stakeholder Management": 85,
        "OKR Setting": 75
      },
      salary: "$100,000 – $160,000",
      demand: "High",
      growth: "+12%"
    },
    "Security Engineer": {
      domain: "cybersecurity",
      skills: {
        "Networking": 85, "Linux": 85, "Cloud Security": 80, "Python / Scripting": 75,
        "SIEM Tools": 70, "Incident Response": 75, "Threat Modeling": 70,
        "Penetration Testing": 65, "Compliance (SOC2/ISO)": 60, "DevSecOps": 65
      },
      salary: "$110,000 – $165,000",
      demand: "High",
      growth: "+28%"
    },
    "UX Designer": {
      domain: "ux-design",
      skills: {
        "Figma": 90, "User Research": 85, "Prototyping": 85, "Design Systems": 75,
        "Usability Testing": 80, "Information Architecture": 70, "Accessibility": 65,
        "Interaction Design": 75, "UX Writing": 55, "Analytics": 55
      },
      salary: "$80,000 – $130,000",
      demand: "High",
      growth: "+14%"
    },
    "DevOps Engineer": {
      domain: "software-engineering",
      skills: {
        "Docker / Kubernetes": 90, "CI/CD Pipelines": 85, "Terraform": 80,
        "AWS / GCP / Azure": 85, "Linux / Bash": 85, "Monitoring (Prometheus)": 75,
        "Networking": 70, "Security": 65, "Python / Go": 70, "Site Reliability": 75
      },
      salary: "$115,000 – $170,000",
      demand: "Very High",
      growth: "+22%"
    },
    "Cloud Architect": {
      domain: "cloud-devops",
      skills: {
        "AWS / Azure / GCP": 90, "Kubernetes": 85, "Terraform": 85, "Linux": 80,
        "Networking": 80, "CI/CD": 80, "Observability": 75, "Cloud Security": 75,
        "FinOps": 60, "Architecture": 80
      },
      salary: "$120,000 – $185,000",
      demand: "Very High",
      growth: "+25%"
    },
    "Data Engineer": {
      domain: "data-engineering",
      skills: {
        "Python": 85, "SQL": 90, "ETL Pipelines": 85, "Apache Spark": 80,
        "Kafka": 75, "Airflow": 75, "Data Warehousing": 80, "Cloud Platforms": 70,
        "Data Quality": 75, "Docker": 65
      },
      salary: "$105,000 – $175,000",
      demand: "Very High",
      growth: "+28%"
    },
    "Mobile Developer": {
      domain: "mobile-development",
      skills: {
        "Kotlin / Swift": 85, "Flutter / React Native": 80, "Mobile UI": 80,
        "REST APIs": 75, "App Testing": 75, "Git": 80, "App Store Deployment": 65,
        "Mobile Security": 60, "Performance": 70, "Offline Storage": 65
      },
      salary: "$90,000 – $155,000",
      demand: "High",
      growth: "+18%"
    },
    "Blockchain Developer": {
      domain: "blockchain-web3",
      skills: {
        "Solidity": 90, "Smart Contracts": 85, "Ethereum": 80, "Web3.js / Ethers.js": 80,
        "Cryptography": 75, "Security Auditing": 80, "dApp Development": 75,
        "Distributed Systems": 70, "Testing": 75, "JavaScript": 70
      },
      salary: "$105,000 – $190,000",
      demand: "Specialised",
      growth: "+20%"
    },
    "Game Developer": {
      domain: "game-development",
      skills: {
        "Unity / Unreal": 90, "C# / C++": 85, "Game Physics": 75, "3D Math": 75,
        "Gameplay Programming": 85, "Version Control": 75, "Optimization": 70,
        "Graphics": 65, "AI for Games": 60, "Game Design": 70
      },
      salary: "$75,000 – $145,000",
      demand: "High",
      growth: "+16%"
    },
    "Civil Engineer": {
      domain:"civil-engineering", skills:{"Surveying":85,"Structural Analysis":85,"AutoCAD":80,"Revit":75,"Concrete":75,"Construction Management":70},
      salary:"$70,000 – $120,000", demand:"High", growth:"+8%"
    },
    "Mechanical Engineer": {
      domain:"mechanical-engineering", skills:{"CAD":90,"SolidWorks":85,"Thermodynamics":85,"ANSYS":75,"Manufacturing":75,"DFMEA":70},
      salary:"$75,000 – $125,000", demand:"High", growth:"+10%"
    },
    "Electrical Engineer": {
      domain:"electrical-engineering", skills:{"Circuits":90,"Power Systems":85,"MATLAB":75,"Electrical Machines":80,"Protection":70,"ETAP":65},
      salary:"$80,000 – $135,000", demand:"High", growth:"+9%"
    },
    "ECE Engineer": {
      domain:"electronics-communication", skills:{"Embedded Systems":90,"Digital Electronics":85,"VLSI":75,"IoT":75,"DSP":70,"FPGA":70},
      salary:"$75,000 – $130,000", demand:"High", growth:"+12%"
    },
    "Process Engineer": {
      domain:"chemical-engineering", skills:{"Process Simulation":85,"Mass Transfer":80,"Reactors":80,"P&ID":75,"HAZOP":70,"Safety":75},
      salary:"$85,000 – $140,000", demand:"High", growth:"+10%"
    },
    "Aerospace Engineer": {
      domain:"aerospace-engineering", skills:{"Aerodynamics":90,"CFD":80,"Aircraft Structures":85,"Propulsion":80,"Avionics":70,"Flight Testing":65},
      salary:"$90,000 – $150,000", demand:"High", growth:"+7%"
    },
    "Biomedical Engineer": {
      domain:"biomedical-engineering", skills:{"Medical Devices":90,"Biomechanics":80,"Sensors":80,"Clinical Testing":70,"FDA Compliance":70,"Risk Management":65},
      salary:"$75,000 – $125,000", demand:"High", growth:"+10%"
    },
    "Environmental Engineer": {
      domain:"environmental-engineering", skills:{"Water Treatment":85,"Waste Management":80,"Environmental Impact":80,"GIS":75,"Sustainability":75,"Pollution Control":70},
      salary:"$70,000 – $115,000", demand:"High", growth:"+7%"
    },
    "Industrial Engineer": {
      domain:"industrial-engineering", skills:{"Lean":90,"Six Sigma":85,"Operations Research":80,"Supply Chain":80,"Simulation":70,"Manufacturing":75},
      salary:"$75,000 – $120,000", demand:"High", growth:"+12%"
    },
    "Petroleum Engineer": {
      domain:"petroleum-engineering", skills:{"Reservoir Engineering":90,"Drilling":85,"Production":80,"Petrophysics":75,"HSE":75,"Field Simulation":70},
      salary:"$95,000 – $180,000", demand:"Moderate", growth:"+5%"
    },
    "Materials Engineer": {
      domain:"metallurgical-materials", skills:{"Metallurgy":90,"Materials Testing":85,"Corrosion":75,"Casting":75,"Composites":75,"Failure Analysis":70},
      salary:"$75,000 – $125,000", demand:"High", growth:"+8%"
    },
    "Marine Engineer": {
      domain:"marine-engineering", skills:{"Naval Architecture":85,"Marine Propulsion":85,"Hydraulics":75,"Ship Systems":80,"Offshore":70,"Classification":65},
      salary:"$80,000 – $135,000", demand:"Moderate", growth:"+7%"
    },
    "Mining Engineer": {
      domain:"mining-engineering", skills:{"Mine Planning":90,"Geology":80,"Ventilation":75,"Blasting":75,"Mineral Processing":75,"Mine Safety":80},
      salary:"$85,000 – $145,000", demand:"Moderate", growth:"+5%"
    },
    "Nuclear Engineer": {
      domain:"nuclear-engineering", skills:{"Reactor Physics":90,"Radiation Protection":85,"Thermal Hydraulics":80,"Licensing":75,"Nuclear Safety":85,"Shielding":70},
      salary:"$100,000 – $165,000", demand:"Moderate", growth:"+4%"
    },
    "Mechatronics Engineer": {
      domain:"mechatronics-robotics", skills:{"Robotics":90,"PLC":85,"Control Systems":85,"Sensors":80,"ROS":75,"Actuators":75},
      salary:"$85,000 – $140,000", demand:"Very High", growth:"+18%"
    },
    "Automotive Engineer": {
      domain:"automobile-engineering", skills:{"Powertrain":85,"CAN Bus":80,"EV Systems":85,"Battery Management":75,"Vehicle Testing":80,"Automotive Safety":75},
      salary:"$80,000 – $135,000", demand:"High", growth:"+10%"
    },
    "Architect": {
      domain:"architecture-engineering", skills:{"Revit":90,"Building Codes":85,"BIM":85,"Architectural Design":90,"Urban Planning":75,"Construction Documentation":80},
      salary:"$70,000 – $130,000", demand:"High", growth:"+5%"
    },
    "Instrumentation Engineer": {
      domain:"instrumentation-control", skills:{"SCADA":85,"PLC":85,"Sensors":80,"Process Control":85,"DCS":75,"Calibration":75},
      salary:"$80,000 – $130,000", demand:"High", growth:"+9%"
    },
    "Textile Engineer": {
      domain:"textile-engineering", skills:{"Spinning":85,"Weaving":85,"Textile Testing":80,"Dyeing":75,"Garment Processing":75,"Quality":80},
      salary:"$50,000 – $90,000", demand:"Moderate", growth:"+6%"
    },
    "Materials Engineer": {
      domain:"materials-engineering", skills:{"Material Characterisation":90,"Composites":85,"Semiconductors":75,"Nanomaterials":70,"Failure Analysis":80,"Polymers":75},
      salary:"$75,000 – $125,000", demand:"High", growth:"+8%"
    },
    "Metallurgical Engineer": {
      domain:"metallurgical-materials", skills:{"Metallurgy":90,"Casting":85,"Corrosion":80,"Welding":75,"Heat Treatment":80,"Failure Analysis":75},
      salary:"$75,000 – $125,000", demand:"High", growth:"+8%"
    },
    "Renewable Energy Engineer": {
      domain:"renewable-energy-engineering", skills:{"Solar Systems":85,"Wind Systems":80,"Battery Storage":85,"Grid Integration":80,"Hydrogen":65,"Energy Modelling":75},
      salary:"$80,000 – $135,000", demand:"Very High", growth:"+18%"
    },
    "Transportation Engineer": {
      domain:"transportation-engineering", skills:{"Highway Design":85,"Traffic Modelling":85,"GIS":80,"Urban Mobility":75,"Transit Planning":75,"Road Safety":75},
      salary:"$75,000 – $120,000", demand:"High", growth:"+8%"
    },
    "Railway Engineer": {
      domain:"railway-engineering", skills:{"Signalling":90,"Track Engineering":85,"Rolling Stock":80,"Rail Safety":85,"Metro Systems":75,"System Integration":75},
      salary:"$80,000 – $130,000", demand:"High", growth:"+9%"
    }
  },

  // ── Job Market Trends ────────────────────────────────────────
  marketTrends: {
    salaryByDomain: {
      labels: ["Software Eng", "AI / ML", "DevOps", "Cybersecurity", "Product Mgmt", "UX Design", "Data Science", "Cloud Arch"],
      values: [128000, 155000, 135000, 130000, 125000, 95000, 138000, 148000],
      colors: ["#6366f1", "#8b5cf6", "#06b6d4", "#10b981", "#ec4899", "#f59e0b", "#8b5cf6", "#06b6d4"]
    },
    jobGrowth: {
      labels: ["AI/LLM Eng", "ML Engineer", "DevOps / SRE", "Security Eng", "Cloud Architect", "Data Scientist", "Full Stack", "Product Manager"],
      values: [45, 32, 22, 28, 26, 25, 20, 12],
    },
    topSkills2025: [
      { skill: "LLM / GenAI", demand: 98, category: "AI" },
      { skill: "Cloud (AWS/GCP)", demand: 94, category: "Cloud" },
      { skill: "Kubernetes", demand: 88, category: "DevOps" },
      { skill: "Python", demand: 96, category: "Programming" },
      { skill: "TypeScript", demand: 86, category: "Programming" },
      { skill: "React", demand: 84, category: "Frontend" },
      { skill: "Rust", demand: 72, category: "Programming" },
      { skill: "Terraform", demand: 82, category: "DevOps" },
      { skill: "RAG / Vector DB", demand: 79, category: "AI" },
      { skill: "Cybersecurity", demand: 90, category: "Security" },
      { skill: "Data Analysis", demand: 85, category: "Data" },
      { skill: "System Design", demand: 88, category: "Architecture" },
    ],
    hiringTrend: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        { label: "AI / ML", data: [820, 890, 940, 1020, 1100, 1230, 1380, 1450, 1520, 1610, 1700, 1850] },
        { label: "Software Eng", data: [3200, 3100, 3400, 3600, 3500, 3800, 3750, 3900, 4100, 4050, 4200, 4350] },
        { label: "Cybersecurity", data: [1100, 1150, 1200, 1280, 1350, 1400, 1480, 1550, 1620, 1700, 1780, 1900] },
      ]
    },
    remotePercent: {
      labels: ["Fully Remote", "Hybrid", "On-site"],
      values: [38, 42, 20]
    }
  },

  // ── Learning Resources ───────────────────────────────────────
  learningResources: {
    "Python": [
      { name: "Python for Everybody – Coursera", type: "Course", time: "8 weeks", level: "Beginner" },
      { name: "Real Python", type: "Platform", time: "Self-paced", level: "All Levels" },
    ],
    "Machine Learning": [
      { name: "Andrew Ng's ML Specialization", type: "Course", time: "3 months", level: "Intermediate" },
      { name: "Fast.ai Practical Deep Learning", type: "Course", time: "8 weeks", level: "Intermediate" },
    ],
    "React": [
      { name: "React Official Docs", type: "Docs", time: "2 weeks", level: "Beginner" },
      { name: "Scrimba React Course", type: "Course", time: "4 weeks", level: "Beginner" },
    ],
    "Docker / Kubernetes": [
      { name: "Docker Mastery – Udemy", type: "Course", time: "3 weeks", level: "Intermediate" },
      { name: "Kubernetes Up & Running – O'Reilly", type: "Book", time: "4 weeks", level: "Intermediate" },
    ],
    "System Design": [
      { name: "System Design Interview – Educative", type: "Course", time: "6 weeks", level: "Advanced" },
      { name: "Designing Data-Intensive Applications", type: "Book", time: "8 weeks", level: "Advanced" },
    ],
    "LLM APIs (OpenAI/Gemini)": [
      { name: "DeepLearning.AI LLM Courses", type: "Course", time: "4 weeks", level: "Intermediate" },
      { name: "Gemini API Docs + Codelabs", type: "Docs", time: "1 week", level: "Beginner" },
    ],
    "default": [
      { name: "Coursera", type: "Platform", time: "Self-paced", level: "All Levels" },
      { name: "YouTube Tutorials", type: "Free", time: "Self-paced", level: "All Levels" },
    ]
  },

  // ── Career Tips ──────────────────────────────────────────────
  careerTips: [
    { icon: "🚀", tip: "Build projects that solve real problems — your portfolio speaks louder than your degree." },
    { icon: "🤝", tip: "Network intentionally. 70% of jobs are filled through referrals and professional connections." },
    { icon: "📚", tip: "Dedicate 5 hours/week to learning new skills. Compound learning yields exponential career growth." },
    { icon: "🎯", tip: "Specialize before you generalize. Deep expertise in one area opens more doors than shallow knowledge in many." },
    { icon: "📊", tip: "Track your impact with numbers. 'Improved load time by 40%' is far stronger than 'Improved performance'." },
    { icon: "🌐", tip: "Open source contributions signal passion, skill, and community — a powerful career differentiator." },
    { icon: "💬", tip: "Communication is a superpower. Engineers who explain complex ideas simply rise faster than those who don't." },
    { icon: "🔄", tip: "Review your career plan every 6 months. Markets shift — adapt your skills accordingly." },
  ],

  // ── Career Quiz ──────────────────────────────────────────────
  quizQuestions: [
    {
      q: "What excites you most about your work?",
      options: [
        { text: "Building & shipping products", domains: ["software-engineering", "ux-design"] },
        { text: "Solving complex data puzzles", domains: ["data-science"] },
        { text: "Defining what to build and why", domains: ["product-management"] },
        { text: "Protecting systems and data", domains: ["cybersecurity"] },
        { text: "Automating cloud infrastructure", domains: ["cloud-devops"] },
        { text: "Building reliable data pipelines", domains: ["data-engineering"] },
      ]
    },
    {
      q: "Which activity sounds most appealing?",
      options: [
        { text: "Writing elegant, efficient code", domains: ["software-engineering"] },
        { text: "Training models and analysing results", domains: ["data-science"] },
        { text: "Talking to users and shaping roadmaps", domains: ["product-management"] },
        { text: "Finding and fixing security vulnerabilities", domains: ["cybersecurity"] },
        { text: "Crafting beautiful, intuitive interfaces", domains: ["ux-design"] },
        { text: "Creating apps for phones and tablets", domains: ["mobile-development"] },
        { text: "Designing games and interactive worlds", domains: ["game-development"] },
      ]
    },
    {
      q: "How do you prefer to work?",
      options: [
        { text: "Deep solo focus on hard technical problems", domains: ["software-engineering", "data-science"] },
        { text: "Collaborating across teams to drive outcomes", domains: ["product-management", "ux-design"] },
        { text: "Investigating and hunting down threats", domains: ["cybersecurity"] },
        { text: "Mix of research, experimentation and building", domains: ["data-science", "software-engineering"] },
        { text: "Designing decentralised systems", domains: ["blockchain-web3"] },
        { text: "Keeping large-scale platforms reliable", domains: ["cloud-devops", "data-engineering"] },
      ]
    },
    {
      q: "What's your preferred output?",
      options: [
        { text: "A working app or system", domains: ["software-engineering"] },
        { text: "A model, dashboard, or insight", domains: ["data-science"] },
        { text: "A shipped product with measurable impact", domains: ["product-management"] },
        { text: "A secure, resilient infrastructure", domains: ["cybersecurity"] },
        { text: "A design system or delightful experience", domains: ["ux-design"] },
        { text: "A mobile app people use every day", domains: ["mobile-development"] },
        { text: "A playable game or interactive experience", domains: ["game-development"] },
        { text: "A trusted decentralised application", domains: ["blockchain-web3"] },
      ]
    }
  ],

  domainLabels: {
    "software-engineering": "Software Engineering",
    "data-science": "Data Science & AI",
    "product-management": "Product Management",
    "cybersecurity": "Cybersecurity",
    "ux-design": "UX / Product Design",
    "cloud-devops": "Cloud & DevOps",
    "data-engineering": "Data Engineering",
    "mobile-development": "Mobile Development",
    "blockchain-web3": "Blockchain & Web3",
    "game-development": "Game Development",
    "civil-engineering": "Civil Engineering",
    "mechanical-engineering": "Mechanical Engineering",
    "electrical-engineering": "Electrical Engineering",
    "electronics-communication": "Electronics & Communication",
    "chemical-engineering": "Chemical Engineering",
    "aerospace-engineering": "Aerospace Engineering",
    "biomedical-engineering": "Biomedical Engineering",
    "environmental-engineering": "Environmental Engineering",
    "industrial-engineering": "Industrial Engineering",
    "petroleum-engineering": "Petroleum Engineering",
    "metallurgical-materials": "Metallurgical & Materials",
    "marine-engineering": "Marine & Naval Engineering",
    "mining-engineering": "Mining Engineering",
    "nuclear-engineering": "Nuclear Engineering",
    "mechatronics-robotics": "Mechatronics & Robotics",
    "automobile-engineering": "Automobile & EV Engineering",
    "architecture-engineering": "Architecture & Built Environment",
    "instrumentation-control": "Instrumentation & Control",
    "textile-engineering": "Textile Engineering",
    "materials-engineering": "Materials Engineering",
    "renewable-energy-engineering": "Renewable Energy Engineering",
    "transportation-engineering": "Transportation Engineering",
    "railway-engineering": "Railway Engineering"
  }
};
