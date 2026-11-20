// GitHub analyzer: currently generates deterministic synthetic profile/repository data; it does not call GitHub API.
class GitHubAnalyzer {
  constructor() {
    this.allLangs = ['Python','JavaScript','TypeScript','Java','Go','Rust','C++','C#','Swift','Kotlin','Ruby','PHP','R','Scala','Dart'];
    this.topicPool = ['machine-learning','web-development','data-science','api','automation','security','cloud','mobile','devops','nlp','computer-vision','blockchain','fintech','iot'];
    this.repoNamePool = ['portfolio-site','chat-app','ml-pipeline','api-gateway','auth-service','data-viz','cli-tool','web-scraper','neural-net','ecommerce','blog-platform','task-manager','weather-app','rec-engine','devops-scripts','stock-predictor','image-classifier','rag-chatbot','design-system','monitoring-dashboard'];
  }

  analyze(username) {
    if (!username || username.trim().length < 2) return null;
    const seed = this._hash(username.toLowerCase().trim());
    const rng = this._seededRng(seed);

    const repoCount     = Math.floor(rng() * 45 + 5);
    const followers     = Math.floor(rng() * 800 + 3);
    const following     = Math.floor(rng() * 400 + 10);
    const stars         = Math.floor(rng() * 1200 + 5);
    const yearsActive   = Math.floor(rng() * 7 + 1);
    const totalCommits  = Math.floor(rng() * 2200 + 80);

    // Language distribution
    const numLangs = Math.floor(rng() * 4 + 2);
    const primaryLangs = this._shuffle([...this.allLangs], rng).slice(0, numLangs);
    const langDist = this._distribution(primaryLangs, rng);

    // Repos
    const repos = this._generateRepos(repoCount, primaryLangs, rng);

    // Contribution heatmap (52 weeks × 7 days)
    const heatmap = Array.from({ length: 52 }, () =>
      Array.from({ length: 7 }, () => {
        const v = rng() * 6;
        return v < 1.8 ? 0 : Math.floor(v);
      })
    );

    // Topics
    const topics = this._shuffle([...this.topicPool], rng).slice(0, Math.floor(rng() * 4 + 2));

    // Implied skills from languages
    const impliedSkills = this._impliedSkills(primaryLangs);

    // Scores
    const activityScore   = Math.min(100, Math.round((totalCommits / 2000) * 70 + (repoCount / 50) * 30));
    const communityScore  = Math.min(100, Math.round((followers / 600) * 60 + (stars / 1000) * 40));
    const projectDepth    = Math.min(100, Math.round(repos.reduce((a, r) => a + r.complexity, 0) / repos.length * 10));
    const overallScore    = Math.round(activityScore * 0.4 + communityScore * 0.2 + projectDepth * 0.4);

    return {
      username: username.trim(), repoCount, followers, following, stars, yearsActive, totalCommits,
      langDist, repos: repos.slice(0, 6), heatmap, topics, impliedSkills,
      scores: { activity: activityScore, community: communityScore, projectDepth },
      overallScore
    };
  }

  _hash(str) {
    let h = 5381;
    for (let i = 0; i < str.length; i++) h = ((h << 5) + h + str.charCodeAt(i)) & 0x7fffffff;
    return h;
  }

  _seededRng(seed) {
    let s = seed;
    return () => { s = (s * 1664525 + 1013904223) & 0xffffffff; return (s >>> 0) / 4294967296; };
  }

  _shuffle(arr, rng) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  _distribution(langs, rng) {
    const vals = langs.map(() => rng() * 100);
    const total = vals.reduce((a, b) => a + b, 0);
    return langs.map((lang, i) => ({ lang, pct: Math.round((vals[i] / total) * 100) })).sort((a, b) => b.pct - a.pct);
  }

  _generateRepos(count, langs, rng) {
    return this._shuffle([...this.repoNamePool], rng).slice(0, Math.min(count, this.repoNamePool.length)).map(name => ({
      name,
      lang: langs[Math.floor(rng() * langs.length)],
      stars: Math.floor(rng() * 180),
      forks: Math.floor(rng() * 50),
      complexity: Math.floor(rng() * 8 + 2),
      commits: Math.floor(rng() * 300 + 10),
      updated: `${Math.floor(rng() * 11 + 1)} months ago`
    }));
  }

  _impliedSkills(langs) {
    const map = {
      Python:     ['Python','Pandas','NumPy','Flask/Django'],
      JavaScript: ['JavaScript','Node.js','React'],
      TypeScript: ['TypeScript','React','Angular'],
      Java:       ['Java','Spring Boot','Maven'],
      Go:         ['Go','gRPC','Docker'],
      Rust:       ['Rust','WebAssembly'],
      'C++':      ['C++','Systems Design'],
      'C#':       ['C#','.NET','Azure'],
      Swift:      ['Swift','iOS Development'],
      Kotlin:     ['Kotlin','Android'],
      R:          ['R','Statistics','ggplot2'],
      Scala:      ['Scala','Apache Spark'],
    };
    const skills = new Set();
    langs.forEach(l => (map[l] || [l]).forEach(s => skills.add(s)));
    return [...skills];
  }
}
