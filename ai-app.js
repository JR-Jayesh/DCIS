// ============================================================
// AI CAREER INTELLIGENCE — Section Controllers
// Handles: AI Analysis Hub, GitHub Analyzer, ML Predictor,
//          Roadmap Generator, Course Recommender
// ============================================================

'use strict';

// ── AI Section Init ───────────────────────────────────────────
function initAISections() {
  initAnalysisHub();
  loadSavedAIResults();
}

function loadSavedAIResults() {
  try {
    const saved = localStorage.getItem('dci_ai_results');
    if (saved) {
      const parsed = JSON.parse(saved);
      Object.assign(AIEngine.results, parsed);
      if (AIEngine.results.ml) {
        renderAnalysisBanners();
        renderMLResults(AIEngine.results.ml);
        if (AIEngine.results.roadmap) renderRoadmapPhases(AIEngine.results.roadmap);
        if (AIEngine.results.courses) renderCourseCards(AIEngine.results.courses, 'All');
      }
    }
  } catch (error) {
    console.warn('CareerAI analysis results could not be loaded.', error);
  }

  if (window.CareerAIDatabaseReady) {
    window.CareerAIDatabaseReady
      .then(() => window.CareerAIDatabase?.load())
      .then(data => {
        if (!data?.aiResults) return;
        Object.assign(AIEngine.results, data.aiResults);
        renderSavedAIResults();
      })
      .catch(error => console.error('CareerAI analysis data could not be loaded from Realtime Database.', error));
  }
}

function saveAIResults() {
  try {
    localStorage.setItem('dci_ai_results', JSON.stringify(AIEngine.results));
  } catch (error) {
    console.warn('CareerAI analysis results could not be saved.', error);
  }
  if (window.CareerAIDatabase) {
    window.CareerAIDatabase.save({ aiResults: AIEngine.results })
      .catch(error => console.error('CareerAI analysis data could not be saved to Realtime Database.', error));
  }
}

function renderSavedAIResults() {
  if (!AIEngine.results.ml) return;
  renderAnalysisBanners();
  renderMLResults(AIEngine.results.ml);
  if (AIEngine.results.roadmap) renderRoadmapPhases(AIEngine.results.roadmap);
  if (AIEngine.results.courses) renderCourseCards(AIEngine.results.courses, 'All');
}

// ── Analysis Hub (3-step Wizard) ─────────────────────────────
function initAnalysisHub() {
  let currentStep = 0;
  const steps = ['resume', 'github', 'personal'];

  // Step navigation
  document.querySelectorAll('.wizard-step[data-step]').forEach(el => {
    el.addEventListener('click', () => {
      const s = parseInt(el.dataset.step);
      goToStep(s);
    });
  });

  window.goToStep = function(step) {
    currentStep = step;
    document.querySelectorAll('.wizard-step').forEach((el, i) => {
      el.classList.toggle('active', i === step);
      el.classList.toggle('done', i < step);
    });
    document.querySelectorAll('.wizard-panel').forEach((el, i) => {
      el.classList.toggle('active', i === step);
    });
  };

  // ── Drop Zone (multi-format) ───────────────────────────────
  const dropZone = document.getElementById('resume-drop-zone');
  if (dropZone) {
    dropZone.addEventListener('dragover', e => { e.preventDefault(); dropZone.classList.add('drag-over'); });
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
    dropZone.addEventListener('drop', e => {
      e.preventDefault(); dropZone.classList.remove('drag-over');
      const file = e.dataTransfer.files[0];
      if (file) handleResumeFile(file);
      else showToast('⚠️', 'No file detected — try clicking to browse');
    });
    dropZone.addEventListener('click', () => document.getElementById('resume-file-input').click());
  }

  // ── File Input (multi-format) ──────────────────────────────
  const fileInput = document.getElementById('resume-file-input');
  if (fileInput) {
    fileInput.addEventListener('change', e => {
      const file = e.target.files[0];
      if (file) handleResumeFile(file);
      fileInput.value = '';
    });
  }

  // Parse resume button
  document.getElementById('parse-resume-btn')?.addEventListener('click', () => {
    const text = document.getElementById('resume-textarea').value.trim();
    if (text.length < 30) { showToast('⚠️', 'Please paste your resume text first'); return; }
    const result = AIEngine.nlp.parse(text);
    AIEngine.results.resume = result;
    renderNLPResults(result);
    saveAIResults();
    showToast('🧠', `NLP extracted ${result.skills.length} skills from your resume!`);
  });

  // Sample resume
  document.getElementById('load-sample-resume')?.addEventListener('click', () => {
    document.getElementById('resume-textarea').value = getSampleResume();
    showToast('📄', 'Sample resume loaded — click Parse Resume to analyze!');
  });

  // Next/prev wizard buttons
  document.getElementById('wizard-next-1')?.addEventListener('click', () => goToStep(1));
  document.getElementById('wizard-next-2')?.addEventListener('click', () => goToStep(2));
  document.getElementById('wizard-prev-2')?.addEventListener('click', () => goToStep(0));
  document.getElementById('wizard-prev-3')?.addEventListener('click', () => goToStep(1));

  // GitHub analyze
  document.getElementById('analyze-github-btn')?.addEventListener('click', analyzeGitHub);
  document.getElementById('github-username-input')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') analyzeGitHub();
  });

  // Run Full AI Analysis
  document.getElementById('run-ai-analysis-btn')?.addEventListener('click', runFullAnalysis);

  goToStep(0);
}

// ── Resume NLP Rendering ──────────────────────────────────────
function renderNLPResults(data) {
  const container = document.getElementById('nlp-results-container');
  if (!container) return;

  const catColors = {
    Language: '#6366f1', Frontend: '#ec4899', Backend: '#06b6d4', Cloud: '#f59e0b',
    DevOps: '#10b981', Database: '#8b5cf6', 'AI/ML': '#ef4444', Data: '#6366f1',
    Security: '#10b981', Design: '#f59e0b', Product: '#ec4899',
    Tools: '#6b7280', Architecture: '#0ea5e9', Soft: '#fb923c'
  };

  const byCategory = {};
  data.skills.forEach(s => {
    const cat = s.category.replace('/', '-');
    if (!byCategory[cat]) byCategory[cat] = [];
    byCategory[cat].push(s);
  });

  container.innerHTML = `
    <div class="nlp-results-grid">
      <div class="entity-section">
        <div class="entity-section-title">
          ⚡ Extracted Skills
          <span class="entity-count-badge">${data.skills.length}</span>
        </div>
        <div class="skill-entity-chips">
          ${data.skills.slice(0, 24).map(s => {
            const catClass = 'cat-' + s.category.replace(/[\/\s]/g, '-');
            return `<div class="skill-entity-chip ${catClass}" title="Confidence: ${Math.round(s.confidence * 100)}%">
              <div class="confidence-dot"></div>
              ${s.skill}
            </div>`;
          }).join('')}
        </div>
      </div>

      <div class="entity-section">
        <div class="entity-section-title">📋 Resume Insights</div>
        <div>
          <div class="meta-info-row">
            <span class="meta-label">💼 Experience</span>
            <span class="meta-value">${data.experience.years > 0 ? data.experience.years + ' years' : 'Not specified'}</span>
          </div>
          ${data.experience.roles.length ? `<div class="meta-info-row">
            <span class="meta-label">🎯 Roles Found</span>
            <div style="display:flex;flex-wrap:wrap;gap:4px;flex:1">
              ${data.experience.roles.slice(0,3).map(r => `<span class="meta-tag">${r}</span>`).join('')}
            </div>
          </div>` : ''}
          <div class="meta-info-row">
            <span class="meta-label">🎓 Education</span>
            <span class="meta-value">${data.education.degree !== 'none' ? data.education.degree.charAt(0).toUpperCase() + data.education.degree.slice(1) : 'Not detected'}</span>
          </div>
          ${data.education.fields.length ? `<div class="meta-info-row">
            <span class="meta-label">📐 Field</span>
            <span class="meta-value">${data.education.fields[0]}</span>
          </div>` : ''}
          <div class="meta-info-row">
            <span class="meta-label">🛠️ Projects</span>
            <span class="meta-value">${data.projects.count} project mentions</span>
          </div>
          <div class="meta-info-row">
            <span class="meta-label">🏅 Certifications</span>
            <span class="meta-value">${data.certifications.length > 0 ? data.certifications.join(', ') : 'None detected'}</span>
          </div>
          <div class="meta-info-row">
            <span class="meta-label">📄 Sections</span>
            <div style="display:flex;flex-wrap:wrap;gap:4px;flex:1">
              ${data.sections.length ? data.sections.map(s => `<span class="meta-tag">${s}</span>`).join('') : '<span style="color:var(--text-muted)">None detected</span>'}
            </div>
          </div>
          <div class="meta-info-row">
            <span class="meta-label">📝 Word Count</span>
            <span class="meta-value">${data.wordCount} words</span>
          </div>
        </div>
      </div>
    </div>

    <div style="margin-top:16px">
      <div style="font-size:12px;color:var(--text-muted);margin-bottom:10px">Skills by Category</div>
      <div style="display:flex;flex-wrap:wrap;gap:8px">
        ${Object.entries(byCategory).map(([cat, skills]) => {
          const color = catColors[cat.replace('-', '/')] || '#6366f1';
          return `<div style="background:${color}18;border:1px solid ${color}35;border-radius:8px;padding:8px 12px;min-width:120px">
            <div style="font-size:10px;font-weight:700;color:${color};text-transform:uppercase;letter-spacing:0.5px;margin-bottom:5px">${cat}</div>
            <div style="font-size:12px;color:var(--text-secondary)">${skills.length} skill${skills.length > 1 ? 's' : ''}</div>
          </div>`;
        }).join('')}
      </div>
    </div>
  `;
  container.style.display = 'block';
}

// ── GitHub Analyzer ───────────────────────────────────────────
function analyzeGitHub() {
  const username = document.getElementById('github-username-input')?.value?.trim();
  if (!username) { showToast('⚠️', 'Please enter a GitHub username'); return; }

  const container = document.getElementById('github-results');
  if (!container) return;

  container.innerHTML = `
    <div class="ai-loading">
      <div class="spinner"></div>
      <div class="ai-loading-text">Analyzing @${username}</div>
      <div class="ai-loading-sub">Fetching repositories, contributions & language data…</div>
    </div>`;
  container.style.display = 'block';

  setTimeout(() => {
    const data = AIEngine.github.analyze(username);
    AIEngine.results.github = data;
    saveAIResults();
    renderGitHubResults(data);
    showToast('🐙', `GitHub profile @${username} analyzed!`);
  }, 1400);
}

function renderGitHubResults(data) {
  const container = document.getElementById('github-results');
  if (!container) return;

  const langColors = ['#6366f1','#8b5cf6','#10b981','#f59e0b','#ec4899','#06b6d4'];

  container.innerHTML = `
    <div class="github-profile-header">
      <div class="github-avatar">🐙</div>
      <div style="flex:1">
        <div class="github-username">@${data.username}</div>
        <div class="github-stats">
          <div class="github-stat"><div class="github-stat-val">${data.repoCount}</div><div class="github-stat-lbl">Repos</div></div>
          <div class="github-stat"><div class="github-stat-val">${data.followers}</div><div class="github-stat-lbl">Followers</div></div>
          <div class="github-stat"><div class="github-stat-val">${data.stars}</div><div class="github-stat-lbl">Stars Earned</div></div>
          <div class="github-stat"><div class="github-stat-val">${data.totalCommits.toLocaleString()}</div><div class="github-stat-lbl">Total Commits</div></div>
          <div class="github-stat"><div class="github-stat-val">${data.yearsActive}yr</div><div class="github-stat-lbl">Active Since</div></div>
        </div>
      </div>
      <div style="text-align:right">
        <div style="font-size:11px;color:var(--text-muted);margin-bottom:4px">GitHub Score</div>
        <div style="font-family:'Outfit',sans-serif;font-size:40px;font-weight:900;background:var(--grad-primary);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">${data.overallScore}</div>
        <div style="font-size:11px;color:var(--text-muted)">/100</div>
      </div>
    </div>

    <div class="grid-2" style="margin-bottom:20px">
      <div class="glass-card" style="padding:20px">
        <div style="font-family:'Outfit',sans-serif;font-size:15px;font-weight:700;margin-bottom:14px">🌐 Language Distribution</div>
        <div class="lang-bar-list">
          ${data.langDist.slice(0,6).map((l, i) => `
            <div class="lang-bar-item">
              <div class="lang-name">${l.lang}</div>
              <div class="lang-bar-track">
                <div class="lang-bar-fill" style="width:0;background:${langColors[i % langColors.length]}" data-target="${l.pct}"></div>
              </div>
              <div class="lang-pct">${l.pct}%</div>
            </div>`).join('')}
        </div>
      </div>

      <div class="glass-card" style="padding:20px">
        <div style="font-family:'Outfit',sans-serif;font-size:15px;font-weight:700;margin-bottom:14px">📊 Profile Scores</div>
        <div style="display:flex;flex-direction:column;gap:12px">
          ${[
            { label: 'Activity Score',    val: data.scores.activity,    color: '#6366f1' },
            { label: 'Community Score',   val: data.scores.community,   color: '#10b981' },
            { label: 'Project Depth',     val: data.scores.projectDepth, color: '#f59e0b' },
          ].map(s => `
            <div>
              <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:6px">
                <span style="color:var(--text-secondary)">${s.label}</span>
                <span style="font-weight:700;color:var(--text-primary)">${s.val}/100</span>
              </div>
              <div style="height:8px;background:rgba(255,255,255,0.06);border-radius:10px;overflow:hidden">
                <div style="width:0;height:100%;background:${s.color};border-radius:10px;transition:width 1.2s ease" data-target="${s.val}"></div>
              </div>
            </div>`).join('')}
        </div>
        <div style="margin-top:16px;font-size:12px;color:var(--text-muted)">Top Topics</div>
        <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:8px">
          ${data.topics.map(t => `<span style="background:rgba(99,102,241,0.15);border:1px solid rgba(99,102,241,0.3);border-radius:20px;padding:3px 10px;font-size:11px;color:var(--text-accent)">${t}</span>`).join('')}
        </div>
      </div>
    </div>

    <div class="glass-card" style="padding:20px;margin-bottom:20px">
      <div style="font-family:'Outfit',sans-serif;font-size:15px;font-weight:700;margin-bottom:14px">📅 Contribution Activity (52 weeks)</div>
      <div class="heatmap-grid">
        ${data.heatmap.map(week => `
          <div class="heatmap-col">
            ${week.map(val => {
              const level = val === 0 ? 0 : val <= 1 ? 1 : val <= 2 ? 2 : val <= 3 ? 3 : 4;
              return `<div class="heatmap-cell l${level}" title="${val} contributions"></div>`;
            }).join('')}
          </div>`).join('')}
      </div>
      <div style="display:flex;align-items:center;gap:6px;margin-top:8px;font-size:11px;color:var(--text-muted)">
        Less
        ${[0,1,2,3,4].map(l => `<div style="width:10px;height:10px;border-radius:2px" class="heatmap-cell l${l}"></div>`).join('')}
        More
      </div>
    </div>

    <div class="glass-card" style="padding:20px;margin-bottom:20px">
      <div style="font-family:'Outfit',sans-serif;font-size:15px;font-weight:700;margin-bottom:14px">📦 Top Repositories</div>
      <div class="repo-cards-grid">
        ${data.repos.map(r => `
          <div class="repo-card">
            <div class="repo-name">${r.name}</div>
            <div class="repo-lang">${r.lang}</div>
            <div class="repo-meta">
              <span>⭐ ${r.stars}</span>
              <span>🔀 ${r.forks}</span>
              <span>💬 ${r.commits}</span>
            </div>
            <div style="font-size:10px;color:var(--text-muted);margin-top:6px">Updated ${r.updated}</div>
          </div>`).join('')}
      </div>
    </div>

    <div class="glass-card" style="padding:20px">
      <div style="font-family:'Outfit',sans-serif;font-size:15px;font-weight:700;margin-bottom:10px">⚡ Implied Skills from Codebase</div>
      <div style="display:flex;flex-wrap:wrap;gap:8px">
        ${data.impliedSkills.map(s => `<span class="skill-chip">${s}</span>`).join('')}
      </div>
    </div>
  `;

  // Animate bars
  setTimeout(() => {
    container.querySelectorAll('.lang-bar-fill, [data-target]').forEach(el => {
      el.style.width = el.dataset.target + '%';
    });
  }, 200);
}

// ── Full AI Analysis Run ──────────────────────────────────────
function runFullAnalysis() {
  const formData = {
    experience: document.getElementById('form-experience')?.value || '0',
    education:  document.getElementById('form-education')?.value || '0',
    projects:   document.getElementById('form-projects')?.value  || '0',
    interests:  document.getElementById('form-interests')?.value || '',
    gpa:        document.getElementById('form-gpa')?.value       || '0',
  };

  const resultContainer = document.getElementById('ai-analysis-result');
  if (!resultContainer) return;

  resultContainer.innerHTML = `
    <div class="ai-loading">
      <div class="spinner" style="width:48px;height:48px;border-width:4px"></div>
      <div class="ai-loading-text">🤖 Running AI Analysis Engine</div>
      <div class="ai-loading-sub">Processing NLP → GitHub signals → ML prediction model…</div>
      <div class="ai-progress-steps">
        ${['📄 Parsing resume data','🐙 Integrating GitHub signals','🤖 Running ML career predictor','🗺️ Generating roadmap','🎯 Curating course recommendations'].map((step, i) =>
          `<div class="ai-progress-step" id="step-${i}"><span class="ai-step-icon">⏳</span> ${step}</div>`
        ).join('')}
      </div>
    </div>`;
  resultContainer.style.display = 'block';

  const steps = [0,1,2,3,4];
  steps.forEach((i) => {
    setTimeout(() => {
      const el = document.getElementById(`step-${i}`);
      if (el) {
        el.classList.add('active');
        el.querySelector('.ai-step-icon').textContent = '⚡';
        if (i > 0) {
          const prev = document.getElementById(`step-${i-1}`);
          if (prev) { prev.classList.remove('active'); prev.classList.add('done'); prev.querySelector('.ai-step-icon').textContent = '✅'; }
        }
      }
    }, i * 500);
  });

  setTimeout(() => {
    const mlResult = AIEngine.ml.predict(AIEngine.results.resume, AIEngine.results.github, formData);
    AIEngine.results.ml = mlResult;

    const roadmap = AIEngine.roadmap.generate(mlResult.ranked[0].domain, mlResult.missingSkills, mlResult.features);
    AIEngine.results.roadmap = roadmap;

    const courses = AIEngine.courses.recommend(mlResult.missingSkills, mlResult.ranked[0].domain, mlResult.features);
    AIEngine.results.courses = courses;

    saveAIResults();

    // Mark last step done
    const lastStep = document.getElementById('step-4');
    if (lastStep) { lastStep.classList.remove('active'); lastStep.classList.add('done'); lastStep.querySelector('.ai-step-icon').textContent = '✅'; }

    setTimeout(() => {
      renderAnalysisBanners();
      renderMLResults(mlResult);
      renderRoadmapPhases(roadmap);
      renderCourseCards(courses, 'All');
      showToast('🤖', 'AI Analysis complete! Explore your results below.');
      navigateTo('predict');
    }, 500);
  }, 3000);
}

function renderAnalysisBanners() {
  document.querySelectorAll('.analysis-complete-banner').forEach(b => b.style.display = 'flex');
}

// ── ML Predictor Results ──────────────────────────────────────
function renderMLResults(data) {
  const container = document.getElementById('ml-results-container');
  if (!container) return;

  const top = data.ranked[0];
  container.innerHTML = '';

  // Hero: suitability ring + role prediction
  const hero = document.createElement('div');
  hero.className = 'prediction-hero';
  const circ = 2 * Math.PI * 75;
  hero.innerHTML = `
    <div class="suitability-ring-card">
      <div style="font-size:13px;color:var(--text-muted);font-weight:600;text-transform:uppercase;letter-spacing:0.8px">Career Suitability</div>
      <div class="suitability-ring-wrap">
        <svg class="suit-ring-svg" width="180" height="180" viewBox="0 0 180 180" style="transform:rotate(-90deg)">
          <defs>
            <linearGradient id="suitGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#6366f1"/><stop offset="100%" stop-color="#8b5cf6"/>
            </linearGradient>
          </defs>
          <circle cx="90" cy="90" r="75" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="12"/>
          <circle cx="90" cy="90" r="75" fill="none" stroke="url(#suitGrad)" stroke-width="12"
            stroke-linecap="round" stroke-dasharray="${circ}" stroke-dashoffset="${circ}" id="suit-arc"
            style="transition:stroke-dashoffset 1.5s cubic-bezier(0.4,0,0.2,1)"/>
        </svg>
        <div class="suit-ring-text">
          <div class="suit-score-num" id="suit-score-num">0</div>
          <div class="suit-score-label">out of 100</div>
        </div>
      </div>
      <div style="font-family:'Outfit',sans-serif;font-size:18px;font-weight:700;color:${top.color};text-align:center">${top.icon} ${top.label}</div>
      <div style="font-size:12px;color:var(--text-muted);text-align:center">Best career match</div>
    </div>

    <div class="prediction-info">
      <div class="predicted-role-card">
        <div class="predicted-role-label">🎯 Predicted Role (Based on Your Profile)</div>
        <div class="predicted-role-title">${data.predictedRole}</div>
        <div class="predicted-salary">💰 $${data.salaryRange.low.toLocaleString()} – $${data.salaryRange.high.toLocaleString()} / year</div>
      </div>
      <div class="glass-card" style="padding:16px">
        <div style="font-size:12px;color:var(--text-muted);margin-bottom:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.8px">💪 Your Strengths</div>
        <div class="strength-tags">
          ${data.strengthAreas.map(s => `<span class="strength-tag">${s.icon} ${s.label}</span>`).join('')}
          ${data.strengthAreas.length === 0 ? '<span style="color:var(--text-muted);font-size:13px">Add more skills and GitHub data for detailed analysis</span>' : ''}
        </div>
      </div>
      <div class="glass-card" style="padding:16px">
        <div style="font-size:12px;color:var(--text-muted);margin-bottom:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.8px">🔴 Missing Critical Skills</div>
        <div class="missing-skills-grid">
          ${data.missingSkills.slice(0, 8).map(s => `<span class="missing-skill-chip">⚠️ ${s}</span>`).join('')}
          ${data.missingSkills.length === 0 ? '<span style="color:var(--accent-green);font-size:13px">✅ Great skill coverage for this role!</span>' : ''}
        </div>
      </div>
    </div>`;
  container.appendChild(hero);

  // Animate suitability ring
  setTimeout(() => {
    animateCounter('suit-score-num', data.suitability, 0, 1200);
    const arc = document.getElementById('suit-arc');
    if (arc) arc.style.strokeDashoffset = circ - (circ * data.suitability / 100);
  }, 200);

  // Radar chart
  const radarCard = document.createElement('div');
  radarCard.className = 'radar-card glass-card';
  radarCard.innerHTML = `
    <div style="font-family:'Outfit',sans-serif;font-size:17px;font-weight:700;margin-bottom:16px">🕸️ Career Readiness Radar</div>
    <div class="radar-chart-container">
      <canvas id="radarChart"></canvas>
    </div>`;
  container.appendChild(radarCard);

  // Career matches
  const matchesHeader = document.createElement('div');
  matchesHeader.innerHTML = `<div style="font-family:'Outfit',sans-serif;font-size:20px;font-weight:800;margin-bottom:16px;color:var(--text-primary)">🏆 Career Match Rankings</div>`;
  container.appendChild(matchesHeader);

  const matches = document.createElement('div');
  matches.className = 'career-matches';
  matches.innerHTML = data.ranked.slice(0, 5).map((m, i) => `
    <div class="career-match-card rank-${i+1}" style="--match-color:${m.color}">
      <div class="match-header">
        <div class="match-rank">#${i+1}</div>
        <div class="match-icon">${m.icon}</div>
        <div>
          <div class="match-title">${m.label}</div>
          <div style="font-size:12px;color:var(--text-muted);margin-top:2px">Match score: ${m.score}%</div>
        </div>
        <span class="match-confidence confidence-${m.confidence}">${m.confidence}</span>
      </div>
      <div class="match-score-bar">
        <div class="match-score-fill" style="width:0;background:${m.color}" data-target="${m.score}"></div>
      </div>
      <div class="match-reasons">
        ${m.reasons.map(r => `<div class="match-reason"><span class="match-reason-icon">${r.icon}</span> ${r.text}</div>`).join('')}
        ${m.reasons.length === 0 ? '<div class="match-reason" style="color:var(--text-muted)">Add resume and GitHub data for personalised reasons</div>' : ''}
      </div>
    </div>`).join('');
  container.appendChild(matches);

  // Animate match bars
  setTimeout(() => {
    container.querySelectorAll('.match-score-fill').forEach(el => { el.style.width = el.dataset.target + '%'; });
  }, 300);

  // Render radar chart
  setTimeout(() => renderRadarChart(data.radarData), 400);
}

function renderRadarChart(radarData) {
  const ctx = document.getElementById('radarChart');
  if (!ctx) return;
  if (window._radarChartInst) { window._radarChartInst.destroy(); }
  window._radarChartInst = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: radarData.labels,
      datasets: [{
        label: 'Your Profile',
        data: radarData.values,
        backgroundColor: 'rgba(99,102,241,0.15)',
        borderColor: '#6366f1',
        borderWidth: 2.5,
        pointBackgroundColor: '#8b5cf6',
        pointRadius: 5,
        pointHoverRadius: 7,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      scales: {
        r: {
          min: 0, max: 100,
          grid:     { color: 'rgba(255,255,255,0.06)' },
          angleLines:{ color: 'rgba(255,255,255,0.06)' },
          ticks:    { display: false, stepSize: 20 },
          pointLabels: { color: '#94a3b8', font: { family: 'Inter', size: 12 } }
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: { backgroundColor: 'rgba(11,15,30,0.9)', bodyColor: '#94a3b8', titleColor: '#f1f5f9', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1, padding: 10 }
      }
    }
  });
}

// ── Roadmap Generator ─────────────────────────────────────────
function initRoadmapSection() {
  const selector = document.querySelector('.roadmap-domain-selector');
  if (selector) {
    selector.innerHTML = Object.entries(CareerData.careerPaths).map(([domain, path]) =>
      `<button class="btn-secondary roadmap-domain-btn" data-domain="${domain}">${path.icon} ${path.label}</button>`
    ).join('');
  }
  // Domain selector buttons
  document.querySelectorAll('.roadmap-domain-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.roadmap-domain-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const domain = btn.dataset.domain;
      const features = AIEngine.results.ml?.features || {};
      const missing  = AIEngine.results.ml?.missingSkills || [];
      const roadmap  = AIEngine.roadmap.generate(domain, missing, features);
      AIEngine.results.roadmap = roadmap;
      saveAIResults();
      renderRoadmapPhases(roadmap);
    });
  });
}

function renderRoadmapPhases(phases) {
  const container = document.getElementById('roadmap-phases-container');
  if (!container) return;

  const completedCount = phases.reduce((acc, p) => acc + (p.completedSkills?.length || 0), 0);
  const totalItems = phases.reduce((acc, p) => acc + (p.skills?.length || 0), 0);
  const pct = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;

  container.innerHTML = `
    <div class="glass-card" style="padding:20px;margin-bottom:24px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
        <div style="font-size:13px;font-weight:600;color:var(--text-primary)">Overall Progress</div>
        <div style="font-size:13px;font-weight:700;color:var(--text-accent)">${pct}%</div>
      </div>
      <div class="roadmap-progress-bar">
        <div class="roadmap-progress-fill" style="width:${pct}%"></div>
      </div>
      <div style="font-size:12px;color:var(--text-muted);margin-top:8px">${completedCount} of ${totalItems} skills checked off</div>
    </div>
    <div class="roadmap-phases">
      ${phases.map((phase, idx) => `
        <div class="roadmap-phase">
          <div class="phase-timeline">
            <div class="phase-dot" style="border-color:${phase.color}22;background:${phase.color}18">
              <span>${phase.icon}</span>
            </div>
            ${idx < phases.length - 1 ? '<div class="phase-line"></div>' : ''}
          </div>
          <div class="phase-card ${idx === 0 ? 'active-phase' : ''}" id="phase-card-${idx}">
            <div class="phase-header">
              <div class="phase-label-pill" style="background:${phase.color}">
                ${phase.label}
              </div>
              <div class="phase-duration">⏱ ${phase.duration}</div>
            </div>
            <div class="phase-desc">${phase.description}</div>
            <div class="phase-sections">
              <div>
                <div class="phase-section-title">⚡ Skills to Learn</div>
                ${phase.skills.map((s, si) => {
                  const checked = (phase.completedSkills || []).includes(s);
                  return `<div class="phase-skill-item ${checked ? 'checked' : ''}" data-phase="${idx}" data-skill="${s}">
                    <div class="check-box">${checked ? '✓' : ''}</div>
                    ${s}
                  </div>`;
                }).join('')}
              </div>
              <div>
                <div class="phase-section-title">🛠️ Projects</div>
                ${phase.projects.map(p => `<div class="phase-milestone-item"><span class="milestone-bullet">▸</span>${p}</div>`).join('')}
                <div class="phase-section-title" style="margin-top:14px">🏅 Certifications</div>
                ${phase.certifications.map(c => `<span class="cert-chip">${c}</span>`).join('')}
              </div>
              <div>
                <div class="phase-section-title">🎯 Milestones</div>
                ${phase.milestones.map(m => `<div class="phase-milestone-item"><span class="milestone-bullet">●</span>${m}</div>`).join('')}
              </div>
            </div>
          </div>
        </div>`).join('')}
    </div>`;

  // Skill checkbox toggles
  container.querySelectorAll('.phase-skill-item').forEach(el => {
    el.addEventListener('click', () => {
      const phaseIdx = parseInt(el.dataset.phase);
      const skill = el.dataset.skill;
      const phase = AIEngine.results.roadmap?.[phaseIdx];
      if (!phase) return;
      if (!phase.completedSkills) phase.completedSkills = [];
      const idx = phase.completedSkills.indexOf(skill);
      if (idx > -1) phase.completedSkills.splice(idx, 1);
      else phase.completedSkills.push(skill);
      saveAIResults();
      renderRoadmapPhases(AIEngine.results.roadmap);
    });
  });
}

// ── Course Recommender ────────────────────────────────────────
function initCourseSection() {
  document.querySelectorAll('.course-filter-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.course-filter-chip').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      if (AIEngine.results.courses) renderCourseCards(AIEngine.results.courses, filter);
    });
  });

  document.getElementById('regen-courses-btn')?.addEventListener('click', () => {
    if (!AIEngine.results.ml) { showToast('⚠️', 'Run AI analysis first from the Analysis Hub'); return; }
    const courses = AIEngine.courses.recommend(AIEngine.results.ml.missingSkills, AIEngine.results.ml.ranked[0].domain, AIEngine.results.ml.features);
    AIEngine.results.courses = courses;
    saveAIResults();
    renderCourseCards(courses, 'All');
    showToast('🎯', `${courses.length} courses curated for your profile!`);
  });
}

function renderCourseCards(courses, filter) {
  const container = document.getElementById('course-cards-container');
  if (!container) return;

  const filtered = filter === 'All' ? courses
    : filter === 'Free' ? courses.filter(c => c.cost === 'Free')
    : filter === 'Paid' ? courses.filter(c => c.cost === 'Paid')
    : courses.filter(c => c.difficulty === filter || c.platform === filter);

  if (filtered.length === 0) {
    container.innerHTML = `<div style="text-align:center;padding:40px;color:var(--text-muted)">No courses match this filter.</div>`;
    return;
  }

  const platformClass = p => {
    const map = {Coursera:'Coursera',Udemy:'Udemy',Free:'Free',YouTube:'YouTube',Google:'Google',edX:'edX',TryHackMe:'TryHackMe',Educative:'Educative',Kaggle:'Kaggle',Scrimba:'Scrimba',Book:'Book',Reforge:'Reforge'};
    return 'plat-' + (map[p] || 'default');
  };

  container.innerHTML = `<div class="course-cards-grid">
    ${filtered.slice(0, 18).map(c => `
      <div class="course-card">
        <div class="course-card-top">
          <div class="course-card-name">${c.name}</div>
          <div class="course-platform-badge ${platformClass(c.platform)}">${c.platform}</div>
        </div>
        <div class="course-skill-tag">📌 ${c.forSkill || 'Core Skill'}</div>
        <div class="course-meta">
          <div class="course-meta-item">⏱ ${c.duration}</div>
          <div class="course-meta-item">📊 ${c.difficulty}</div>
          <div class="course-rating">★ ${c.rating}</div>
        </div>
        <div class="course-cta">
          <div style="display:flex;align-items:center;justify-content:space-between">
            <span class="${c.cost === 'Free' ? 'cost-free' : 'cost-paid'}">${c.cost === 'Free' ? '🆓 Free' : '💳 Paid'}</span>
            <button class="btn-primary" style="padding:6px 14px;font-size:12px" onclick="showToast('🎓','Opening course: ${c.name.replace(/'/g, '')}')">Enroll →</button>
          </div>
        </div>
      </div>`).join('')}
  </div>`;
}

// ── Sample Resume ─────────────────────────────────────────────
function getSampleResume() {
  return `Alex Chen
Software Engineer | ML Enthusiast
alex.chen@email.com | github.com/alexchen | linkedin.com/in/alexchen

SUMMARY
Results-driven Software Engineer with 3 years of experience building scalable web applications and machine learning pipelines. Passionate about AI and cloud technologies.

EXPERIENCE
Full Stack Developer | TechCorp Inc. | 2022 - Present
- Built React frontend with TypeScript serving 50,000+ users
- Developed RESTful APIs using Node.js and PostgreSQL
- Deployed microservices to AWS using Docker and Kubernetes
- Implemented CI/CD pipelines using GitHub Actions

Junior Developer | StartupXYZ | 2021 - 2022
- Developed Python Flask APIs for data processing
- Worked with pandas, NumPy for data analysis
- Built machine learning models using scikit-learn

EDUCATION
Bachelor of Science in Computer Science
State University | 2017 - 2021 | GPA: 3.8/4.0

SKILLS
Languages:   Python, JavaScript, TypeScript, SQL
Frontend:    React, HTML, CSS, Next.js
Backend:     Node.js, Flask, REST APIs, GraphQL
Cloud/DevOps: AWS, Docker, Kubernetes, GitHub Actions
Data/ML:     Machine Learning, pandas, scikit-learn, TensorFlow
Databases:   PostgreSQL, MongoDB, Redis

PROJECTS
- Built an NLP-based text classifier using BERT with 94% accuracy
- Deployed a real-time chat application using WebSockets and React
- Created a data visualization dashboard with Python and Plotly

CERTIFICATIONS
- AWS Cloud Practitioner
- Google Data Analytics Certificate`;
}

// ── Navigation hook ───────────────────────────────────────────
(function patchNavigateTo() {
  const orig = window.navigateTo;
  window.navigateTo = function(section) {
    orig && orig(section);
    if (section === 'paths') {
      renderPathTabs();
      renderCareerTree(state.currentPath);
    }
    if (section === 'roadmap') initRoadmapSection();
    if (section === 'courses') initCourseSection();
  };
})();

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', initAISections);

// ============================================================
// MULTI-FORMAT RESUME FILE HANDLER
// Supports: TXT, MD, PDF (PDF.js), PNG/JPG (OCR sim), PPT/PPTX
// ============================================================

async function handleResumeFile(file) {
  const name = file.name;
  const ext  = name.split('.').pop().toLowerCase();
  const allowedExts = ['txt','md','pdf','png','jpg','jpeg','ppt','pptx'];

  if (!allowedExts.includes(ext)) {
    showToast('❌', `Unsupported format ".${ext}" — try TXT, MD, PDF, PNG, JPG, PPT`);
    return;
  }

  // Update drop zone to show file being processed
  updateDropZoneForFile(name, ext);
  showFileProcessingUI(name, ext);

  try {
    if (ext === 'txt' || ext === 'md') {
      await handleTextFile(file);
    } else if (ext === 'pdf') {
      await handlePDFFile(file);
    } else if (ext === 'png' || ext === 'jpg' || ext === 'jpeg') {
      await handleImageFile(file);
    } else if (ext === 'ppt' || ext === 'pptx') {
      handlePPTFile(file);
    }
  } catch (err) {
    console.error('File handling error:', err);
    showToast('❌', `Could not process "${name}". Try pasting text directly.`);
    resetDropZone();
  }
}

// ── TXT / MD ──────────────────────────────────────────────────
function handleTextFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = ev => {
      document.getElementById('resume-textarea').value = ev.target.result;
      hideFileProcessingUI();
      showToast('✅', `"${file.name}" loaded — ${ev.target.result.split(/\s+/).length} words extracted`);
      resolve();
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

// ── PDF (PDF.js real text extraction) ────────────────────────
async function handlePDFFile(file) {
  // Check PDF.js is loaded
  if (typeof pdfjsLib === 'undefined') {
    showToast('⚠️', 'PDF.js not loaded — paste your resume text manually');
    resetDropZone();
    return;
  }

  // Set worker source
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    let fullText = '';
    let currentSection = '';

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const content = await page.getTextContent();

      // Build text preserving line structure
      let lastY = null;
      content.items.forEach(item => {
        if (lastY !== null && Math.abs(item.transform[5] - lastY) > 5) {
          fullText += '\n';
        }
        fullText += item.str + ' ';
        lastY = item.transform[5];
      });
      fullText += '\n';
    }

    fullText = fullText.trim();
    if (!fullText || fullText.length < 30) {
      // Scanned/image-based PDF — treat as image
      showToast('📷', 'This PDF appears to be image-based. Processing as image...');
      hideFileProcessingUI();
      await handleImageFile(file, true);
      return;
    }

    document.getElementById('resume-textarea').value = fullText;
    hideFileProcessingUI();
    showToast('📕', `PDF extracted: ${pdf.numPages} page${pdf.numPages > 1 ? 's' : ''}, ${fullText.split(/\s+/).length} words`);
  } catch (err) {
    console.error('PDF parse error:', err);
    showToast('❌', 'Could not read PDF — paste resume text manually or try another format');
    resetDropZone();
  }
}

// ── Image (PNG / JPG) — Preview + Simulated OCR ─────────────
async function handleImageFile(file, isPDFImage = false) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = ev => {
      const dataUrl = ev.target.result;

      // Show image preview panel
      const previewContainer = document.getElementById('image-preview-container');
      if (previewContainer) {
        previewContainer.style.display = 'block';
        previewContainer.innerHTML = `
          <div style="background:var(--bg-card);border:1px solid var(--glass-border);border-radius:var(--radius-lg);padding:16px;margin-bottom:16px">
            <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
              <div style="font-size:22px">🖼️</div>
              <div>
                <div style="font-family:'Outfit',sans-serif;font-size:14px;font-weight:700;color:var(--text-primary)">${file.name}</div>
                <div style="font-size:12px;color:var(--text-muted)">${(file.size/1024).toFixed(1)} KB · ${isPDFImage ? 'Image-based PDF' : file.type}</div>
              </div>
              <div id="ocr-status-badge" style="margin-left:auto;background:rgba(245,158,11,0.18);border:1px solid rgba(245,158,11,0.3);border-radius:20px;padding:4px 12px;font-size:11px;font-weight:700;color:#fcd34d">
                ⏳ Simulating OCR...
              </div>
            </div>
            <img src="${dataUrl}" alt="Resume image" style="max-width:100%;max-height:280px;border-radius:8px;border:1px solid var(--glass-border);display:block;margin:0 auto">
            <div id="ocr-progress" style="margin-top:12px">
              <div style="display:flex;gap:8px;align-items:center;font-size:12px;color:var(--text-muted)">
                <div class="spinner" style="width:14px;height:14px;border-width:2px"></div>
                Analysing image content with AI vision simulation...
              </div>
            </div>
          </div>`;
      }

      // Simulate OCR processing with staged delay
      setTimeout(() => {
        simulateOCRFromImage(file.name);
        // Update status badge
        const badge = document.getElementById('ocr-status-badge');
        if (badge) { badge.textContent = '✅ OCR Complete'; badge.style.background = 'rgba(16,185,129,0.18)'; badge.style.borderColor = 'rgba(16,185,129,0.3)'; badge.style.color = '#6ee7b7'; }
        const prog = document.getElementById('ocr-progress');
        if (prog) prog.innerHTML = '<div style="font-size:12px;color:#6ee7b7;margin-top:4px">✅ Text extracted — review and edit in the text area below</div>';
        hideFileProcessingUI();
        showToast('🖼️', 'Image processed — review extracted text and click Parse Resume');
        resolve();
      }, 2000);
    };
    reader.readAsDataURL(file);
  });
}

function simulateOCRFromImage(filename) {
  // Heuristic: extract keywords from filename to customise
  const fn = filename.toLowerCase();
  const isData     = fn.includes('data') || fn.includes('ml') || fn.includes('ai');
  const isSecurity = fn.includes('security') || fn.includes('cyber');
  const isDesign   = fn.includes('design') || fn.includes('ux');
  const isPM       = fn.includes('product') || fn.includes('pm') || fn.includes('manager');

  const skillSets = {
    data:     'Python, Machine Learning, TensorFlow, Pandas, NumPy, SQL, Data Visualization, Scikit-learn, Statistics, AWS',
    security: 'Cybersecurity, Penetration Testing, SIEM, Splunk, Linux, Python, OWASP, CompTIA Security+, Network Security, Cryptography',
    design:   'Figma, User Research, Prototyping, Design Systems, Adobe XD, Usability Testing, Wireframing, CSS, HTML',
    pm:       'Product Strategy, Agile, Scrum, Jira, OKRs, A/B Testing, User Research, Roadmapping, Data Analytics, Stakeholder Management',
    default:  'Python, JavaScript, React, Node.js, SQL, Docker, AWS, Git, REST APIs, HTML/CSS, TypeScript, Agile'
  };

  const skills = isData ? skillSets.data : isSecurity ? skillSets.security : isDesign ? skillSets.design : isPM ? skillSets.pm : skillSets.default;

  const ocrText = `[OCR Extracted — Please Review & Edit]

SUMMARY
Experienced professional with expertise in modern technologies and collaborative project delivery. Passionate about building impactful solutions and continuous learning.

SKILLS
${skills}

EXPERIENCE
Software Professional | Tech Company | 2021 – Present
- Designed and implemented scalable systems used by thousands of users
- Collaborated with cross-functional teams to deliver features on schedule
- Led technical discussions and code reviews

EDUCATION
Bachelor of Science in Computer Science / Engineering
University | 2017 – 2021 | GPA: 3.7/4.0

PROJECTS
- Built multiple end-to-end applications from ideation to deployment
- Contributed to open source projects and personal portfolio
- Implemented machine learning models for real-world datasets

NOTE: This text was extracted from an image file. Please review and correct any inaccuracies before clicking "Parse Resume".`;

  document.getElementById('resume-textarea').value = ocrText;
}

// ── PPT / PPTX ────────────────────────────────────────────────
function handlePPTFile(file) {
  hideFileProcessingUI();
  resetDropZone();

  // Show a helpful guide panel
  const previewContainer = document.getElementById('image-preview-container');
  if (previewContainer) {
    previewContainer.style.display = 'block';
    previewContainer.innerHTML = `
      <div style="background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.3);border-radius:var(--radius-lg);padding:20px;margin-bottom:16px">
        <div style="display:flex;align-items:flex-start;gap:14px">
          <div style="font-size:32px">📊</div>
          <div style="flex:1">
            <div style="font-family:'Outfit',sans-serif;font-size:15px;font-weight:700;color:#fcd34d;margin-bottom:6px">
              PowerPoint Detected: ${file.name}
            </div>
            <div style="font-size:13px;color:var(--text-secondary);margin-bottom:16px">
              Direct PPT parsing isn't supported in browser. Choose one of these quick options:
            </div>
            <div style="display:flex;flex-direction:column;gap:10px">
              <div style="display:flex;align-items:center;gap:10px;background:rgba(255,255,255,0.04);border-radius:8px;padding:12px">
                <span style="font-size:18px">📕</span>
                <div>
                  <div style="font-size:13px;font-weight:600;color:var(--text-primary)">Option 1 (Best): Export as PDF</div>
                  <div style="font-size:12px;color:var(--text-muted)">In PowerPoint: File → Export → Create PDF/XPS → re-upload here</div>
                </div>
              </div>
              <div style="display:flex;align-items:center;gap:10px;background:rgba(255,255,255,0.04);border-radius:8px;padding:12px">
                <span style="font-size:18px">📄</span>
                <div>
                  <div style="font-size:13px;font-weight:600;color:var(--text-primary)">Option 2: Save as Plain Text</div>
                  <div style="font-size:12px;color:var(--text-muted)">File → Save As → Plain Text (.txt) → re-upload here</div>
                </div>
              </div>
              <div style="display:flex;align-items:center;gap:10px;background:rgba(255,255,255,0.04);border-radius:8px;padding:12px">
                <span style="font-size:18px">✏️</span>
                <div>
                  <div style="font-size:13px;font-weight:600;color:var(--text-primary)">Option 3: Paste Text Directly</div>
                  <div style="font-size:12px;color:var(--text-muted)">Copy your resume content from PowerPoint and paste in the text area below</div>
                </div>
              </div>
            </div>
            <div style="margin-top:12px">
              <button class="btn-secondary" onclick="document.getElementById('image-preview-container').style.display='none'">✕ Dismiss</button>
            </div>
          </div>
        </div>
      </div>`;
  }

  showToast('📊', `PPT detected — see conversion options below`);
}

// ── Drop Zone UI Helpers ──────────────────────────────────────
function updateDropZoneForFile(name, ext) {
  const iconEl = document.getElementById('drop-zone-icon');
  const icons = { txt: '📄', md: '📝', pdf: '📕', png: '🖼️', jpg: '📷', jpeg: '📷', ppt: '📊', pptx: '📊' };
  if (iconEl) iconEl.textContent = icons[ext] || '📁';
}

function showFileProcessingUI(name, ext) {
  const statusEl = document.getElementById('file-processing-status');
  if (!statusEl) return;

  const typeLabels = { txt:'Text', md:'Markdown', pdf:'PDF', png:'Image (PNG)', jpg:'Image (JPG)', jpeg:'Image (JPEG)', ppt:'PowerPoint', pptx:'PowerPoint' };
  const typeColors = { txt:'#10b981', md:'#10b981', pdf:'#ef4444', png:'#6366f1', jpg:'#8b5cf6', jpeg:'#8b5cf6', ppt:'#f59e0b', pptx:'#f59e0b' };
  const color = typeColors[ext] || '#6366f1';
  const label = typeLabels[ext] || ext.toUpperCase();

  statusEl.style.display = 'block';
  statusEl.innerHTML = `
    <div style="background:rgba(255,255,255,0.03);border:1px solid ${color}30;border-radius:var(--radius-md);padding:14px 16px;margin-bottom:14px;display:flex;align-items:center;gap:12px">
      <div class="spinner" style="width:18px;height:18px;border-width:2px;border-top-color:${color}"></div>
      <div>
        <div style="font-size:13px;font-weight:600;color:var(--text-primary)">Processing ${label} file…</div>
        <div style="font-size:11px;color:var(--text-muted);margin-top:2px">${name}</div>
      </div>
      <span style="margin-left:auto;font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;background:${color}18;border:1px solid ${color}35;color:${color}">${label}</span>
    </div>`;
}

function hideFileProcessingUI() {
  const statusEl = document.getElementById('file-processing-status');
  if (statusEl) statusEl.style.display = 'none';
}

function resetDropZone() {
  const iconEl = document.getElementById('drop-zone-icon');
  if (iconEl) iconEl.textContent = '📁';
}
