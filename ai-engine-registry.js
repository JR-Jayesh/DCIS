// Creates one shared object after all engine classes and data files have loaded.
const AIEngine = {
  nlp:      new NLPParser(),
  github:   new GitHubAnalyzer(),
  ml:       new MLPredictor(),
  roadmap:  new RoadmapGenerator(),
  courses:  new CourseRecommender(),

  // Central analysis state
  results: {
    resume:   null,
    github:   null,
    ml:       null,
    roadmap:  null,
    courses:  null,
  }
};
