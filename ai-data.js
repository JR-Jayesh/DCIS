// ============================================================
// AI ENGINE DATA — Appended to data pipeline
// ============================================================

const AIData = {

  nlpSkillDictionary: {
    "Python":              { category: "Language",     weight: 0.9,  patterns: ["python"] },
    "JavaScript":          { category: "Language",     weight: 0.9,  patterns: ["javascript", "js", "es6"] },
    "TypeScript":          { category: "Language",     weight: 0.85, patterns: ["typescript"] },
    "Java":                { category: "Language",     weight: 0.8,  patterns: ["java"] },
    "Go":                  { category: "Language",     weight: 0.8,  patterns: ["golang"] },
    "Rust":                { category: "Language",     weight: 0.8,  patterns: ["rust"] },
    "C++":                 { category: "Language",     weight: 0.75, patterns: ["cpp"] },
    "C#":                  { category: "Language",     weight: 0.75, patterns: ["csharp", "c sharp"] },
    "Swift":               { category: "Language",     weight: 0.75, patterns: ["swift", "swiftui"] },
    "Kotlin":              { category: "Language",     weight: 0.75, patterns: ["kotlin"] },
    "Ruby":                { category: "Language",     weight: 0.7,  patterns: ["ruby", "rails"] },
    "PHP":                 { category: "Language",     weight: 0.65, patterns: ["php", "laravel"] },
    "SQL":                 { category: "Database",     weight: 0.85, patterns: ["sql", "mysql", "postgresql", "sqlite"] },
    "R":                   { category: "Language",     weight: 0.7,  patterns: ["rstudio", "r-lang"] },
    "Scala":               { category: "Language",     weight: 0.75, patterns: ["scala", "akka"] },
    "React":               { category: "Frontend",     weight: 0.9,  patterns: ["react", "reactjs"] },
    "Vue.js":              { category: "Frontend",     weight: 0.8,  patterns: ["vue", "vuejs"] },
    "Angular":             { category: "Frontend",     weight: 0.8,  patterns: ["angular"] },
    "Next.js":             { category: "Frontend",     weight: 0.85, patterns: ["nextjs", "next.js"] },
    "HTML/CSS":            { category: "Frontend",     weight: 0.75, patterns: ["html", "css", "sass", "scss"] },
    "Tailwind CSS":        { category: "Frontend",     weight: 0.75, patterns: ["tailwind"] },
    "Node.js":             { category: "Backend",      weight: 0.9,  patterns: ["nodejs", "node.js", "express"] },
    "Django":              { category: "Backend",      weight: 0.85, patterns: ["django"] },
    "Flask":               { category: "Backend",      weight: 0.8,  patterns: ["flask"] },
    "FastAPI":             { category: "Backend",      weight: 0.85, patterns: ["fastapi"] },
    "Spring Boot":         { category: "Backend",      weight: 0.85, patterns: ["spring"] },
    "GraphQL":             { category: "Backend",      weight: 0.8,  patterns: ["graphql"] },
    "REST API":            { category: "Backend",      weight: 0.8,  patterns: ["restful", "rest api"] },
    "AWS":                 { category: "Cloud",        weight: 0.9,  patterns: ["aws", "amazon web services", "ec2", "lambda"] },
    "Google Cloud":        { category: "Cloud",        weight: 0.85, patterns: ["gcp", "google cloud"] },
    "Azure":               { category: "Cloud",        weight: 0.85, patterns: ["azure"] },
    "Docker":              { category: "DevOps",       weight: 0.9,  patterns: ["docker", "dockerfile"] },
    "Kubernetes":          { category: "DevOps",       weight: 0.9,  patterns: ["kubernetes", "k8s"] },
    "Terraform":           { category: "DevOps",       weight: 0.85, patterns: ["terraform"] },
    "CI/CD":               { category: "DevOps",       weight: 0.85, patterns: ["cicd", "jenkins", "github actions", "gitlab ci"] },
    "Linux":               { category: "DevOps",       weight: 0.8,  patterns: ["linux", "ubuntu", "bash"] },
    "Machine Learning":    { category: "AI/ML",        weight: 0.95, patterns: ["machine learning"] },
    "Deep Learning":       { category: "AI/ML",        weight: 0.9,  patterns: ["deep learning", "neural network", "cnn", "rnn"] },
    "TensorFlow":          { category: "AI/ML",        weight: 0.9,  patterns: ["tensorflow"] },
    "PyTorch":             { category: "AI/ML",        weight: 0.9,  patterns: ["pytorch"] },
    "Scikit-learn":        { category: "AI/ML",        weight: 0.85, patterns: ["scikit", "sklearn"] },
    "NLP":                 { category: "AI/ML",        weight: 0.9,  patterns: ["nlp", "natural language", "spacy", "nltk", "bert"] },
    "LLMs / GenAI":        { category: "AI/ML",        weight: 0.95, patterns: ["llm", "large language model", "gpt", "gemini", "langchain", "rag"] },
    "Pandas":              { category: "Data",         weight: 0.85, patterns: ["pandas"] },
    "NumPy":               { category: "Data",         weight: 0.8,  patterns: ["numpy"] },
    "Apache Spark":        { category: "Data",         weight: 0.85, patterns: ["spark", "pyspark"] },
    "Data Visualization":  { category: "Data",         weight: 0.8,  patterns: ["matplotlib", "seaborn", "plotly", "tableau", "power bi"] },
    "Statistics":          { category: "Data",         weight: 0.8,  patterns: ["statistics", "hypothesis testing"] },
    "PostgreSQL":          { category: "Database",     weight: 0.85, patterns: ["postgresql", "postgres"] },
    "MongoDB":             { category: "Database",     weight: 0.85, patterns: ["mongodb", "nosql"] },
    "Redis":               { category: "Database",     weight: 0.8,  patterns: ["redis"] },
    "Vector DB":           { category: "Database",     weight: 0.85, patterns: ["pinecone", "weaviate", "chroma", "vector database"] },
    "Cybersecurity":       { category: "Security",     weight: 0.9,  patterns: ["cybersecurity", "information security"] },
    "Penetration Testing": { category: "Security",     weight: 0.9,  patterns: ["penetration testing", "pen testing", "ethical hacking"] },
    "SIEM":                { category: "Security",     weight: 0.85, patterns: ["siem", "splunk"] },
    "Cryptography":        { category: "Security",     weight: 0.85, patterns: ["cryptography", "encryption"] },
    "Zero Trust":          { category: "Security",     weight: 0.85, patterns: ["zero trust"] },
    "OWASP":               { category: "Security",     weight: 0.85, patterns: ["owasp", "devsecops"] },
    "Figma":               { category: "Design",       weight: 0.95, patterns: ["figma"] },
    "User Research":       { category: "Design",       weight: 0.9,  patterns: ["user research", "usability testing"] },
    "Prototyping":         { category: "Design",       weight: 0.85, patterns: ["prototyping", "wireframing"] },
    "Design Systems":      { category: "Design",       weight: 0.85, patterns: ["design system", "component library"] },
    "Agile/Scrum":         { category: "Product",      weight: 0.9,  patterns: ["agile", "scrum", "kanban", "sprint"] },
    "Product Strategy":    { category: "Product",      weight: 0.9,  patterns: ["product strategy", "product roadmap", "go-to-market"] },
    "OKRs":                { category: "Product",      weight: 0.85, patterns: ["okr", "objectives and key results"] },
    "Jira":                { category: "Product",      weight: 0.75, patterns: ["jira", "confluence"] },
    "Data Analytics":      { category: "Product",      weight: 0.85, patterns: ["data analytics", "google analytics", "mixpanel"] },
    "Git":                 { category: "Tools",        weight: 0.8,  patterns: ["git", "github", "gitlab"] },
    "System Design":       { category: "Architecture", weight: 0.9,  patterns: ["system design", "distributed systems", "microservices"] },
    "Communication":       { category: "Soft",         weight: 0.7,  patterns: ["communication", "stakeholder"] },
    "Leadership":          { category: "Soft",         weight: 0.8,  patterns: ["leadership", "mentoring", "team lead"] },
    "Kafka":               { category: "Data",         weight: 0.8,  patterns: ["kafka", "message queue"] },
    "Prometheus":          { category: "DevOps",       weight: 0.75, patterns: ["prometheus", "grafana", "monitoring"] },
    "Elasticsearch":       { category: "Database",     weight: 0.8,  patterns: ["elasticsearch"] },
  },

  mlFeatureWeights: {
    "software-engineering": { hasWeb: 25, hasCloud: 20, githubScore: 20, projectCount: 15, skillCount: 10, experienceYears: 10 },
    "data-science":         { hasAI: 30, educationScore: 20, skillCount: 15, projectCount: 15, gpa: 10, githubScore: 10 },
    "cybersecurity":        { hasSecurity: 35, certCount: 20, hasCloud: 15, experienceYears: 15, skillCount: 10, githubScore: 5 },
    "product-management":   { hasProduct: 30, experienceYears: 25, hasDesign: 15, skillDiversity: 15, skillCount: 10, educationScore: 5 },
    "ux-design":            { hasDesign: 35, hasWeb: 20, projectCount: 20, skillCount: 10, githubScore: 10, educationScore: 5 },
    "cloud-devops":         { hasDevOps: 35, hasCloud: 25, hasSecurity: 15, experienceYears: 15, githubScore: 10 },
    "data-engineering":     { hasDataEngineering: 35, hasCloud: 20, skillCount: 15, projectCount: 15, hasAI: 10, experienceYears: 5 },
    "mobile-development":   { hasMobile: 35, projectCount: 25, hasWeb: 15, skillCount: 15, githubScore: 10 },
    "blockchain-web3":      { hasBlockchain: 40, hasSecurity: 20, hasWeb: 15, projectCount: 15, githubScore: 10 },
    "game-development":     { hasGame: 40, projectCount: 25, skillCount: 15, hasWeb: 10, githubScore: 10 },
    "civil-engineering":    { hasCivil: 40, educationScore: 20, projectCount: 15, skillCount: 15, experienceYears: 10 },
    "mechanical-engineering": { hasMechanical: 40, educationScore: 20, projectCount: 15, skillCount: 15, experienceYears: 10 },
    "electrical-engineering": { hasElectrical: 40, educationScore: 20, projectCount: 15, skillCount: 15, experienceYears: 10 },
    "electronics-communication": { hasECE: 40, educationScore: 20, projectCount: 15, skillCount: 15, experienceYears: 10 },
    "chemical-engineering": { hasChemical: 40, educationScore: 20, projectCount: 15, skillCount: 15, experienceYears: 10 },
    "aerospace-engineering": { hasAerospace: 40, educationScore: 20, projectCount: 15, skillCount: 15, experienceYears: 10 },
    "biomedical-engineering": { hasBiomedical: 40, educationScore: 20, projectCount: 15, skillCount: 15, experienceYears: 10 },
    "environmental-engineering": { hasEnvironmental: 40, educationScore: 20, projectCount: 15, skillCount: 15, experienceYears: 10 },
    "industrial-engineering": { hasIndustrial: 40, educationScore: 15, projectCount: 15, skillCount: 15, experienceYears: 15 },
    "petroleum-engineering": { hasPetroleum: 40, educationScore: 20, projectCount: 15, skillCount: 15, experienceYears: 10 },
    "metallurgical-materials": { hasMetallurgy: 40, educationScore: 20, projectCount: 15, skillCount: 15, experienceYears: 10 },
    "marine-engineering":   { hasMarine: 40, educationScore: 20, projectCount: 15, skillCount: 15, experienceYears: 10 },
    "mining-engineering":   { hasMining: 40, educationScore: 20, projectCount: 15, skillCount: 15, experienceYears: 10 },
    "nuclear-engineering":  { hasNuclear: 40, educationScore: 20, projectCount: 15, skillCount: 15, experienceYears: 10 },
    "mechatronics-robotics": { hasMechatronics: 40, hasMechanical: 15, hasECE: 15, projectCount: 15, skillCount: 15 },
    "automobile-engineering": { hasAutomobile: 40, hasMechanical: 20, projectCount: 15, skillCount: 15, experienceYears: 10 },
    "architecture-engineering": { hasArchitecture: 40, educationScore: 20, projectCount: 15, skillCount: 15, experienceYears: 10 },
    "instrumentation-control": { hasInstrumentation: 40, hasECE: 20, hasElectrical: 15, projectCount: 15, skillCount: 10 },
    "textile-engineering":  { hasTextile: 40, educationScore: 20, projectCount: 15, skillCount: 15, experienceYears: 10 },
    "materials-engineering": { hasMaterials: 40, educationScore: 20, projectCount: 15, skillCount: 15, experienceYears: 10 },
    "renewable-energy-engineering": { hasRenewable: 40, hasElectrical: 20, educationScore: 15, projectCount: 15, skillCount: 10 },
    "transportation-engineering": { hasTransportation: 40, hasCivil: 20, educationScore: 15, projectCount: 15, skillCount: 10 },
    "railway-engineering":  { hasRailway: 40, hasElectrical: 15, hasMechanical: 15, educationScore: 15, projectCount: 15 }
  },

  roadmapPhases: [
    { label: "Foundation",   duration: "0 – 3 Months",  icon: "🌱", color: "#10b981", description: "Build core fundamentals and set up your learning environment" },
    { label: "Building",     duration: "3 – 6 Months",  icon: "🔨", color: "#6366f1", description: "Develop practical skills and ship your first real projects" },
    { label: "Intermediate", duration: "6 – 12 Months", icon: "⚡", color: "#8b5cf6", description: "Deepen expertise and build a portfolio that stands out" },
    { label: "Advanced",     duration: "1 – 2 Years",   icon: "🚀", color: "#f59e0b", description: "Specialize, lead projects, and prepare for senior roles" },
    { label: "Expert",       duration: "2 – 5 Years",   icon: "🏆", color: "#ec4899", description: "Establish thought leadership and target principal / staff roles" }
  ],

  domainRoadmaps: {
    "software-engineering": {
      projects: [
        ["To-Do App with React","Portfolio Website","REST API with Node.js"],
        ["Full-Stack CRUD App","Real-time Chat (WebSockets)","Auth System with JWT"],
        ["Microservices App","CI/CD Pipeline Setup","Cloud-Deployed App (AWS)"],
        ["System Design Project","Open Source Contribution","Tech Blog / Docs"],
        ["Distributed System","Architecture RFC","Mentored Team Project"]
      ],
      certifications: [
        ["freeCodeCamp Certificate","The Odin Project"],
        ["AWS Cloud Practitioner","Meta React Developer Cert"],
        ["AWS Solutions Architect Associate","Docker Certified"],
        ["AWS Solutions Architect Professional","CKA (Kubernetes)"],
        ["Google Cloud Professional","AWS Distinguished Engineer"]
      ],
      milestones: [
        ["First GitHub repository","Deploy a live website","Complete coding challenge"],
        ["Land first dev job / internship","Ship a feature used by real users"],
        ["Lead a feature end-to-end","Pass a system design interview"],
        ["Become go-to engineer on team","Mentor a junior developer"],
        ["Staff / Principal Engineer role","Define technical direction"]
      ]
    },
    "data-science": {
      projects: [
        ["EDA on Kaggle Dataset","Data Cleaning Pipeline","Visualization Dashboard"],
        ["Binary Classification Model","Sentiment Analysis App","Price Prediction"],
        ["End-to-end ML Pipeline","Image Classifier (CNN)","Recommendation Engine"],
        ["LLM-powered App (RAG)","MLOps Pipeline (MLflow)","Research Implementation"],
        ["Deployed AI Product","Novel Research Project","Open Source ML Library"]
      ],
      certifications: [
        ["Google Data Analytics Cert","Kaggle Learn"],
        ["DeepLearning.AI ML Specialization","IBM Data Science Professional"],
        ["TensorFlow Developer Certificate","AWS ML Specialty"],
        ["Google ML Engineer Cert","Databricks Certified"],
        ["Research Publications","Conference Talks"]
      ],
      milestones: [
        ["Complete first Kaggle competition","Build first predictive model"],
        ["Get first data role / internship","Win a Kaggle medal"],
        ["Deploy model to production","Lead a data project"],
        ["Present findings to leadership","Contribute to ML research"],
        ["Lead AI strategy","Publish research or open-source project"]
      ]
    },
    "cybersecurity": {
      projects: [
        ["Home Lab Setup","Basic Network Scanner","Password Strength Checker"],
        ["CTF Participation","Vulnerability Scanner Script","Firewall Configurator"],
        ["Penetration Testing Report","SIEM Dashboard","Threat Detection Script"],
        ["Red Team Assessment","Security Architecture Doc","Zero Trust Implementation"],
        ["Enterprise Security Policy","Incident Response Plan","Security Training"]
      ],
      certifications: [
        ["CompTIA IT Fundamentals","Cybrary Free Courses"],
        ["CompTIA Security+","eJPT (eLearnSecurity)"],
        ["CEH (Certified Ethical Hacker)","CompTIA CySA+"],
        ["OSCP","CISSP","AWS Security Specialty"],
        ["CISM","CCSP (Cloud Security)","SANS GIAC"]
      ],
      milestones: [
        ["First CTF challenge","Complete TryHackMe beginner path"],
        ["Pass CompTIA Security+","First security analyst role"],
        ["First pen test engagement","Lead incident response drill"],
        ["Obtain OSCP or CISSP","Manage security for a product"],
        ["CISO trajectory","Build security culture at org"]
      ]
    },
    "product-management": {
      projects: [
        ["User Research Interview (5 users)","Product Spec Doc","Competitive Analysis"],
        ["Feature Roadmap for Existing Product","A/B Test Design","User Journey Map"],
        ["Full PRD for New Feature","Metrics Dashboard","GTM Strategy Doc"],
        ["Product Discovery Sprint","OKR Framework Implementation","Cross-functional Launch"],
        ["Product Vision & Strategy","Board-level Presentation","P&L Ownership"]
      ],
      certifications: [
        ["Product School Free Courses","Coursera Product Management"],
        ["Product Management Cert (Kellogg)","Google UX Design Cert"],
        ["Pragmatic Institute PMC","Aha! PM Certification"],
        ["CPM (Certified Product Manager)","Business Analytics Cert"],
        ["Executive MBA","Reforge Advanced Courses"]
      ],
      milestones: [
        ["Shadow a PM for a week","Write first user story"],
        ["Land APM / PM role","Ship first feature to production"],
        ["Grow a metric by 20%","Lead a 0-to-1 product launch"],
        ["Manage a team of PMs","Own P&L for a product line"],
        ["CPO trajectory","Define company product strategy"]
      ]
    },
    "ux-design": {
      projects: [
        ["Personal Portfolio Website","UI Redesign of Existing App","3-Screen Prototype"],
        ["End-to-end UX Case Study","Design System v1","Usability Test Report"],
        ["Complete App Redesign with Research","Design System v2 + Docs","Accessibility Audit"],
        ["Product Design Leadership","Design Sprint Facilitation","DesignOps Process"],
        ["Design Language System","Global Design Strategy Doc","Innovation Workshop"]
      ],
      certifications: [
        ["Google UX Design Certificate","Figma Essentials"],
        ["Nielsen Norman UX Cert","Interaction Design Foundation"],
        ["NN/g UX Master Certificate","Adobe Certified Professional"],
        ["Design Management Institute","Service Design Network"],
        ["Design Leadership Program (IDEO)","Executive Design Program"]
      ],
      milestones: [
        ["First Dribbble/Behance shot","Complete first end-to-end prototype"],
        ["Land first UX role","Conduct first user testing session"],
        ["Own a design system","Ship feature with measurable UX improvement"],
        ["Lead a design team","Present to C-suite stakeholders"],
        ["CDO / VP Design trajectory","Build design culture at org"]
      ]
    },
    "cloud-devops": {
      projects: [
        ["Linux Home Lab","Dockerized Web App","Basic CI Pipeline"],
        ["Terraform Cloud Environment","Kubernetes Deployment","Monitoring Dashboard"],
        ["Highly Available Cloud Service","Incident Response Runbook","Infrastructure Automation"],
        ["Multi-region Architecture","FinOps Optimisation","Zero Trust Platform"],
        ["Cloud Platform Strategy","Reliability Programme","Mentored SRE Project"]
      ],
      certifications: [
        ["Linux Essentials","Cloud Fundamentals"],
        ["AWS Cloud Practitioner","Azure Fundamentals"],
        ["AWS Solutions Architect Associate","CKA"],
        ["AWS Solutions Architect Professional","Certified Kubernetes Administrator"],
        ["Cloud Security Certification","SRE Leadership Programme"]
      ],
      milestones: [
        ["Deploy first container","Automate a build"],
        ["Provision cloud infrastructure","Create first monitoring dashboard"],
        ["Lead a reliability improvement","Pass a cloud certification"],
        ["Own production incident response","Design a multi-region service"],
        ["Define platform strategy","Lead a reliability team"]
      ]
    },
    "data-engineering": {
      projects: [
        ["SQL Analytics Database","CSV-to-SQL Pipeline","Data Quality Checks"],
        ["Airflow ETL Pipeline","Cloud Data Warehouse","Streaming Dashboard"],
        ["Spark Processing Job","Kafka Event Pipeline","Lakehouse Prototype"],
        ["Real-time Data Platform","Data Governance Framework","ML Feature Store"],
        ["Enterprise Data Strategy","Data Platform Migration","Mentored Data Team"]
      ],
      certifications: [
        ["SQL Fundamentals","Python Data Engineering"],
        ["Google Data Analytics","Azure Data Fundamentals"],
        ["Databricks Associate","AWS Data Engineer Associate"],
        ["Google Professional Data Engineer","Confluent Kafka Certification"],
        ["Data Architecture Programme","Data Governance Certification"]
      ],
      milestones: [
        ["Build first ETL pipeline","Pass a SQL assessment"],
        ["Schedule a production workflow","Improve data quality"],
        ["Process a large dataset","Own a data platform component"],
        ["Design a lakehouse","Lead a migration"],
        ["Define data platform strategy","Mentor an engineer"]
      ]
    },
    "mobile-development": {
      projects: [
        ["First Android or iOS App","Mobile UI Prototype","Local Storage App"],
        ["API-connected Mobile App","Push Notification Feature","Flutter Cross-platform App"],
        ["Offline-first App","Mobile Performance Audit","Automated App Testing"],
        ["Release Pipeline","Design System for Mobile","Secure Mobile Architecture"],
        ["Mobile Platform Strategy","Mentored Mobile Project","App Portfolio Leadership"]
      ],
      certifications: [
        ["Android Basics","Swift Essentials"],
        ["Associate Android Developer","Flutter Development"],
        ["iOS Development Certificate","Mobile Testing Certification"],
        ["Cloud Mobile Backend","Mobile Security Certification"],
        ["Mobile Architecture Programme","Technical Leadership Programme"]
      ],
      milestones: [
        ["Build first mobile screen","Run an app on a device"],
        ["Publish a beta build","Connect an app to an API"],
        ["Ship a production feature","Improve app performance"],
        ["Lead a mobile release","Design a reusable component library"],
        ["Define mobile platform strategy","Mentor a mobile developer"]
      ]
    },
    "blockchain-web3": {
      projects: [
        ["Blockchain Explorer","Token Contract","Wallet-connected Web App"],
        ["NFT Marketplace Prototype","Smart Contract Test Suite","DAO Voting App"],
        ["DeFi Dashboard","Contract Security Review","Cross-chain Application"],
        ["Protocol Architecture","Gas Optimisation","Formal Verification Study"],
        ["Web3 Governance Model","Open Source Protocol","Mentored Security Audit"]
      ],
      certifications: [
        ["Blockchain Fundamentals","Solidity Basics"],
        ["Ethereum Developer Course","Smart Contract Testing"],
        ["Web3 Security Course","dApp Development Certificate"],
        ["Advanced Solidity","Blockchain Architecture"],
        ["Protocol Research","Security Audit Programme"]
      ],
      milestones: [
        ["Deploy a testnet contract","Build a wallet connection"],
        ["Complete a smart contract audit","Ship a working dApp"],
        ["Contribute to an open-source protocol","Lead a security review"],
        ["Design a protocol component","Publish technical research"],
        ["Define protocol strategy","Mentor a Web3 engineer"]
      ]
    },
    "game-development": {
      projects: [
        ["2D Game Prototype","Game Mechanics Demo","Interactive Level"],
        ["3D Game Scene","Gameplay Systems","Save and Load System"],
        ["Multiplayer Prototype","Game AI Behaviour","Performance Optimisation"],
        ["Rendering Feature","Game Tools Pipeline","Technical Design Document"],
        ["Studio Architecture","Mentored Game Project","Technical Direction Plan"]
      ],
      certifications: [
        ["Unity Learn Essentials","C# Fundamentals"],
        ["Unity Certified User","Unreal Engine Basics"],
        ["Game Programming Certificate","3D Graphics Course"],
        ["Advanced Rendering","Multiplayer Networking Course"],
        ["Technical Art Programme","Game Technology Leadership"]
      ],
      milestones: [
        ["Complete a playable prototype","Publish a game demo"],
        ["Build a complete game loop","Join a game jam"],
        ["Ship a polished feature","Optimise a game scene"],
        ["Lead a technical system","Release a multiplayer prototype"],
        ["Define technical direction","Mentor a game programmer"]
      ]
    }
  },

  domainSkillsByPhase: {
    "software-engineering": {
      beginner:     ["HTML/CSS","JavaScript Basics","Git","Command Line"],
      intermediate: ["React","Node.js","REST APIs","SQL","Testing"],
      advanced:     ["TypeScript","Docker","AWS","System Design","CI/CD"],
      expert:       ["Kubernetes","Microservices","Performance Optimization","Security"],
      leadership:   ["Architecture Patterns","RFC Writing","Engineering Strategy"]
    },
    "data-science": {
      beginner:     ["Python","Pandas","NumPy","SQL","Statistics Basics"],
      intermediate: ["Scikit-learn","Data Visualization","Feature Engineering"],
      advanced:     ["Deep Learning","TensorFlow/PyTorch","MLOps","Cloud ML"],
      expert:       ["LLMs / GenAI","Custom Architecture","Research Methods"],
      leadership:   ["AI Strategy","Research Publications","Data Governance"]
    },
    "cybersecurity": {
      beginner:     ["Networking Fundamentals","Linux Basics","Python Scripting"],
      intermediate: ["SIEM Tools","Vulnerability Assessment","Incident Response"],
      advanced:     ["Penetration Testing","Threat Modeling","Cloud Security"],
      expert:       ["Red Team Operations","Zero Trust Architecture","Risk Management"],
      leadership:   ["Security Strategy","Board Communication","Org Building"]
    },
    "product-management": {
      beginner:     ["User Research","Writing User Stories","Competitive Analysis"],
      intermediate: ["Roadmapping","A/B Testing","OKRs","Figma Basics"],
      advanced:     ["GTM Strategy","Stakeholder Management","P&L Basics"],
      expert:       ["Portfolio Management","Executive Communication","Org Design"],
      leadership:   ["Company Strategy","M&A Due Diligence","Culture Building"]
    },
    "ux-design": {
      beginner:     ["Figma Basics","Typography & Color Theory","Wireframing"],
      intermediate: ["Prototyping","Usability Testing","Design Systems Basics"],
      advanced:     ["Motion Design","Design Thinking","Information Architecture"],
      expert:       ["Design System Ownership","DesignOps","Strategic Design"],
      leadership:   ["Design Vision","Design Culture","Innovation Programs"]
    },
    "cloud-devops": {
      beginner:     ["Linux","Networking","Git","Cloud Fundamentals"],
      intermediate: ["Docker","CI/CD","Terraform","Monitoring"],
      advanced:     ["Kubernetes","Cloud Architecture","Security","SRE"],
      expert:       ["Multi-region Systems","FinOps","Platform Engineering"],
      leadership:   ["Cloud Strategy","Reliability Culture","Technical Leadership"]
    },
    "data-engineering": {
      beginner:     ["Python","SQL","Data Modelling","Linux"],
      intermediate: ["ETL","Airflow","Data Warehousing","Data Quality"],
      advanced:     ["Spark","Kafka","Cloud Data Platforms","Streaming"],
      expert:       ["Lakehouse Architecture","Data Governance","Feature Stores"],
      leadership:   ["Data Strategy","Platform Leadership","Mentoring"]
    },
    "mobile-development": {
      beginner:     ["Kotlin or Swift","Mobile UI","Git","App Fundamentals"],
      intermediate: ["Flutter or React Native","REST APIs","Testing","Offline Storage"],
      advanced:     ["Mobile Architecture","Performance","Security","Release Automation"],
      expert:       ["Platform Strategy","Design Systems","Observability"],
      leadership:   ["Mobile Product Strategy","Team Leadership","Technical Vision"]
    },
    "blockchain-web3": {
      beginner:     ["Blockchain Basics","JavaScript","Cryptography","Wallets"],
      intermediate: ["Solidity","Smart Contracts","Web3 APIs","Testing"],
      advanced:     ["Security Auditing","dApp Architecture","Gas Optimisation"],
      expert:       ["Protocol Design","Consensus","Formal Verification"],
      leadership:   ["Protocol Strategy","Governance","Open Source Leadership"]
    },
    "game-development": {
      beginner:     ["Programming","Game Design","Unity or Unreal","Git"],
      intermediate: ["Gameplay Systems","3D Math","Game AI","Level Design"],
      advanced:     ["Graphics","Networking","Optimisation","Tools"],
      expert:       ["Rendering Architecture","Engine Systems","Technical Direction"],
      leadership:   ["Studio Technology Strategy","Team Leadership","Mentoring"]
    }
  },

  courseCatalog: {
    "Python": [
      { name: "Python for Everybody – Coursera", platform: "Coursera", cost: "Paid", duration: "8 weeks", difficulty: "Beginner", rating: 4.8 },
      { name: "Automate the Boring Stuff with Python", platform: "Free", cost: "Free", duration: "4 weeks", difficulty: "Beginner", rating: 4.7 },
    ],
    "Machine Learning": [
      { name: "ML Specialization – Andrew Ng", platform: "Coursera", cost: "Paid", duration: "3 months", difficulty: "Intermediate", rating: 4.9 },
      { name: "Fast.ai Practical Deep Learning", platform: "Free", cost: "Free", duration: "8 weeks", difficulty: "Intermediate", rating: 4.8 },
    ],
    "Deep Learning": [
      { name: "Deep Learning Specialization – DeepLearning.AI", platform: "Coursera", cost: "Paid", duration: "4 months", difficulty: "Advanced", rating: 4.9 },
      { name: "PyTorch for Deep Learning – freeCodeCamp", platform: "YouTube", cost: "Free", duration: "3 weeks", difficulty: "Intermediate", rating: 4.7 },
    ],
    "LLMs / GenAI": [
      { name: "LLM Engineering Bootcamp – DeepLearning.AI", platform: "Coursera", cost: "Paid", duration: "6 weeks", difficulty: "Intermediate", rating: 4.8 },
      { name: "Gemini API & Google AI Codelabs", platform: "Google", cost: "Free", duration: "2 weeks", difficulty: "Intermediate", rating: 4.6 },
    ],
    "React": [
      { name: "The Ultimate React Course – Jonas Schmedtmann", platform: "Udemy", cost: "Paid", duration: "5 weeks", difficulty: "Beginner", rating: 4.8 },
      { name: "Scrimba React Tutorial", platform: "Scrimba", cost: "Free", duration: "3 weeks", difficulty: "Beginner", rating: 4.7 },
    ],
    "Node.js": [
      { name: "The Complete Node.js Developer Course", platform: "Udemy", cost: "Paid", duration: "4 weeks", difficulty: "Intermediate", rating: 4.7 },
    ],
    "Docker": [
      { name: "Docker & Kubernetes: The Practical Guide", platform: "Udemy", cost: "Paid", duration: "4 weeks", difficulty: "Intermediate", rating: 4.7 },
    ],
    "Kubernetes": [
      { name: "Kubernetes for Beginners – KodeKloud", platform: "Udemy", cost: "Paid", duration: "3 weeks", difficulty: "Beginner", rating: 4.8 },
    ],
    "AWS": [
      { name: "AWS Certified Solutions Architect", platform: "A Cloud Guru", cost: "Paid", duration: "6 weeks", difficulty: "Intermediate", rating: 4.8 },
      { name: "AWS Cloud Practitioner Essentials", platform: "AWS", cost: "Free", duration: "2 weeks", difficulty: "Beginner", rating: 4.6 },
    ],
    "System Design": [
      { name: "System Design Interview – Educative", platform: "Educative", cost: "Paid", duration: "6 weeks", difficulty: "Advanced", rating: 4.8 },
      { name: "Designing Data-Intensive Applications", platform: "Book", cost: "Paid", duration: "8 weeks", difficulty: "Advanced", rating: 4.9 },
    ],
    "Cybersecurity": [
      { name: "Google Cybersecurity Certificate", platform: "Coursera", cost: "Paid", duration: "6 months", difficulty: "Beginner", rating: 4.8 },
      { name: "TryHackMe Complete Beginner Path", platform: "TryHackMe", cost: "Free", duration: "8 weeks", difficulty: "Beginner", rating: 4.8 },
    ],
    "Penetration Testing": [
      { name: "Offensive Pentesting Path – TryHackMe", platform: "TryHackMe", cost: "Paid", duration: "3 months", difficulty: "Intermediate", rating: 4.9 },
      { name: "TCM Security Practical Ethical Hacking", platform: "TCM", cost: "Paid", duration: "8 weeks", difficulty: "Intermediate", rating: 4.9 },
    ],
    "Figma": [
      { name: "Learn Figma – Official Tutorials", platform: "Figma", cost: "Free", duration: "1 week", difficulty: "Beginner", rating: 4.8 },
      { name: "UI/UX Design Bootcamp – Udemy", platform: "Udemy", cost: "Paid", duration: "5 weeks", difficulty: "Beginner", rating: 4.7 },
    ],
    "User Research": [
      { name: "UX Research & Strategy – Nielsen Norman", platform: "NN/g", cost: "Paid", duration: "3 days", difficulty: "Intermediate", rating: 4.9 },
    ],
    "Product Strategy": [
      { name: "Product Management – Kellogg / Northwestern", platform: "Coursera", cost: "Paid", duration: "3 months", difficulty: "Intermediate", rating: 4.7 },
      { name: "Reforge Product Strategy Course", platform: "Reforge", cost: "Paid", duration: "6 weeks", difficulty: "Advanced", rating: 4.9 },
    ],
    "Statistics": [
      { name: "Statistics with Python Specialization", platform: "Coursera", cost: "Paid", duration: "5 months", difficulty: "Intermediate", rating: 4.7 },
    ],
    "SQL": [
      { name: "SQL for Data Science – UC Davis", platform: "Coursera", cost: "Paid", duration: "4 weeks", difficulty: "Beginner", rating: 4.7 },
      { name: "SQLZoo Interactive Tutorials", platform: "Free", cost: "Free", duration: "2 weeks", difficulty: "Beginner", rating: 4.6 },
    ],
    "General": [
      { name: "CS50x – Harvard Introduction to CS", platform: "edX", cost: "Free", duration: "10 weeks", difficulty: "Beginner", rating: 4.9 },
      { name: "The Missing Semester of CS – MIT", platform: "MIT", cost: "Free", duration: "2 weeks", difficulty: "Beginner", rating: 4.8 },
    ]
  },

  domainTopCourses: {
    "software-engineering": [
      { name: "Full Stack Open – University of Helsinki", platform: "Free", cost: "Free", duration: "12 weeks", difficulty: "Intermediate", rating: 4.9, forSkill: "Full Stack" },
      { name: "The Odin Project", platform: "Free", cost: "Free", duration: "Self-paced", difficulty: "Beginner", rating: 4.9, forSkill: "Web Fundamentals" },
    ],
    "data-science": [
      { name: "IBM Data Science Professional Cert", platform: "Coursera", cost: "Paid", duration: "5 months", difficulty: "Beginner", rating: 4.6, forSkill: "Data Science Foundation" },
      { name: "Kaggle Learn – Micro-Courses", platform: "Kaggle", cost: "Free", duration: "Self-paced", difficulty: "All Levels", rating: 4.8, forSkill: "Practical ML" },
    ],
    "cybersecurity": [
      { name: "Google Cybersecurity Certificate", platform: "Coursera", cost: "Paid", duration: "6 months", difficulty: "Beginner", rating: 4.8, forSkill: "Security Foundation" },
    ],
    "product-management": [
      { name: "Product Manager HQ PM Course", platform: "PMHQ", cost: "Paid", duration: "8 weeks", difficulty: "Beginner", rating: 4.7, forSkill: "PM Foundation" },
    ],
    "ux-design": [
      { name: "Google UX Design Certificate", platform: "Coursera", cost: "Paid", duration: "6 months", difficulty: "Beginner", rating: 4.8, forSkill: "UX Foundation" },
    ],
    "cloud-devops": [
      { name: "Google Cloud DevOps and SRE", platform: "Coursera", cost: "Paid", duration: "4 months", difficulty: "Intermediate", rating: 4.7, forSkill: "Cloud Reliability" },
      { name: "Kubernetes Basics", platform: "Free", cost: "Free", duration: "Self-paced", difficulty: "Intermediate", rating: 4.8, forSkill: "Kubernetes" },
    ],
    "data-engineering": [
      { name: "Data Engineering Zoomcamp", platform: "Free", cost: "Free", duration: "10 weeks", difficulty: "Intermediate", rating: 4.8, forSkill: "Data Pipelines" },
      { name: "Data Engineering with Google Cloud", platform: "Coursera", cost: "Paid", duration: "5 months", difficulty: "Intermediate", rating: 4.7, forSkill: "Cloud Data" },
    ],
    "mobile-development": [
      { name: "Android Basics with Compose", platform: "Google", cost: "Free", duration: "Self-paced", difficulty: "Beginner", rating: 4.8, forSkill: "Android" },
      { name: "Flutter Development", platform: "Free", cost: "Free", duration: "Self-paced", difficulty: "Intermediate", rating: 4.7, forSkill: "Cross-platform Mobile" },
    ],
    "blockchain-web3": [
      { name: "Ethereum Developer Bootcamp", platform: "Alchemy", cost: "Free", duration: "Self-paced", difficulty: "Intermediate", rating: 4.7, forSkill: "Web3 Development" },
      { name: "Blockchain Specialization", platform: "Coursera", cost: "Paid", duration: "4 months", difficulty: "Intermediate", rating: 4.6, forSkill: "Blockchain Foundation" },
    ],
    "game-development": [
      { name: "Unity Learn Pathways", platform: "Unity", cost: "Free", duration: "Self-paced", difficulty: "Beginner", rating: 4.8, forSkill: "Game Development" },
      { name: "CS50's Introduction to Game Development", platform: "edX", cost: "Free", duration: "12 weeks", difficulty: "Intermediate", rating: 4.8, forSkill: "Game Programming" },
    ]
  }
};
