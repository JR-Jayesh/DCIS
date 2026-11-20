# DCIS — Separated Code Responsibilities

This folder reorganizes the existing browser-based Dynamic Career Intelligence System so each main responsibility is easier to study. It preserves the existing classic-script/global-variable style instead of converting the project to ES modules.

## File responsibilities

### Data
- `data.js` — career paths, role requirements, market trends, quiz questions and learning resources (`CareerData`).
- `ai-data.js` — NLP skill dictionary, predictor weights, domain roadmaps, phase skills and course catalog (`AIData`).

### AI analysis engine (split from the original `ai-engine.js`)
- `nlp-parser.js` — parses resume text and extracts skills, experience, education, projects, certifications and section names.
- `github-analyzer.js` — analyzes a username using deterministic synthetic profile/repository data. It does **not** make a live GitHub API request.
- `career-predictor.js` — builds features, calculates weighted scores for 33 engineering and technology domains, ranks them, and calculates role/salary/skill-gap outputs. Despite the original class name `MLPredictor`, this implementation is rule-based and does not train a model.
- `roadmap-generator.js` — assembles learning phases, skills, projects, certifications and milestones from predefined data.
- `course-recommender.js` — selects and prioritizes courses from the static catalog.
- `ai-engine-registry.js` — creates the shared `AIEngine` object after all classes are loaded.

### Application/controller
- `ai-app.js` — connects AI interface buttons and inputs to the engine, coordinates the full analysis, renders AI results and saves AI results in `localStorage`.
- `app.js` — general dashboard state, navigation, career path explorer, skill-gap UI, market charts, timeline, quiz and mobile navigation.

### UI, authentication and offline support
- `app.html`, `landing.html`, `index.html` — page markup.
- CSS files — visual styling and responsive layouts.
- `firebase-auth.js` / `firebase-config.js` — Firebase email/password authentication and profile sync configuration.
- `service-worker.js`, `manifest.webmanifest`, `icon.svg` — PWA/offline-related assets.

## Script load order

`app.html` loads scripts in this order:
1. `data.js`
2. `ai-data.js`
3. `nlp-parser.js`
4. `github-analyzer.js`
5. `career-predictor.js`
6. `roadmap-generator.js`
7. `course-recommender.js`
8. `ai-engine-registry.js`
9. `app.js`
10. `ai-app.js`

Keep this order: the predictor uses `AIData` and `CareerData`, and the registry instantiates the classes defined in the split engine files. The HTML's inline `quickAddSkill` helper is retained.

## How to run

Keep all files in this folder together and serve the folder through a local web server (for example, VS Code Live Server). Open `index.html` or `landing.html`. Avoid opening `app.html` directly with a `file://` URL if browser modules, PDF.js, Firebase or service-worker behavior is needed.

## Cross-language salary utilities

The project also includes reference implementations of the software-engineering salary estimate:

- `tools/career_salary.ts` — TypeScript
- `tools/career_salary.py` — Python
- `tools/CareerSalary.java` — Java

Examples:

```text
node tools/career_salary.ts 4 1 80
python tools/career_salary.py --experience 4 --certificates 1 --github-score 80
java tools/CareerSalary.java 4 1 80
```

## Realtime Database persistence

The landing page uses Firebase Email/Password Authentication. After a user signs in, `app.html` loads and saves dashboard state and AI analysis results in the Realtime Database at `users/{uid}`. `localStorage` remains the immediate offline cache.

Enable Realtime Database and Email/Password Authentication in the Firebase console, then apply rules that restrict each user record to its owner:

```text
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "auth != null && auth.uid == $uid",
        ".write": "auth != null && auth.uid == $uid"
      }
    }
  }
}
```

After sign-in, opening `app.html` writes a sample record to `users/{uid}/testConnection`, then reads it back. Look for `status: "connected"` and the test student data in the Realtime Database console.

## Important note

These are separated files derived from the uploaded source, not a redesign of the algorithm. Some profile data, career weights, roadmaps, courses, market information and parts of the dashboard are predefined/demo data. Review and test the project after any further edits.
