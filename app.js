// ============================================================
// DYNAMIC CAREER INTELLIGENCE SYSTEM — Application Logic
// ============================================================

'use strict';

// ── State ─────────────────────────────────────────────────────
const state = {
  currentSection: 'dashboard',
  currentPath: 'software-engineering',
  selectedNode: null,
  userSkills: [],
  targetRole: '',
  timelineItems: [],
  charts: {},
  careerScore: { skills: 72, experience: 58, network: 45, learning: 81, profile: 63 },
  quizAnswers: [],
  quizStep: 0,
};

// ── Init ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  initNav();
  initDashboard();
  initPathExplorer();
  initSkillGap();
  initMarket();
  initTimeline();
  initQuiz();
  initSearch();
  initMobileMenu();
});

if ('serviceWorker' in navigator && window.location.protocol !== 'file:') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js')
      .then(registration => console.info('CareerAI offline support ready', registration.scope))
      .catch(error => console.error('CareerAI offline support failed to start', error));
  });
}

// ── Persistence ───────────────────────────────────────────────
function loadState() {
  try {
    const saved = localStorage.getItem('dci_state');
    if (saved) {
      const parsed = JSON.parse(saved);
      state.userSkills = parsed.userSkills || [];
      state.timelineItems = parsed.timelineItems || [];
      state.careerScore = parsed.careerScore || state.careerScore;
    }
  } catch (error) {
    console.warn('CareerAI state could not be loaded; using defaults.', error);
  }

  if (window.CareerAIDatabaseReady) {
    window.CareerAIDatabaseReady
      .then(user => {
        if (!user || !window.CareerAIDatabase) return null;
        return window.CareerAIDatabase.testConnection();
      })
      .then(testData => {
        if (testData) {
          console.info('CareerAI Realtime Database test passed.', testData);
          showToast('✅', 'Realtime Database connection verified');
        }
      })
      .catch(error => console.error('CareerAI Realtime Database test failed.', error));

    window.CareerAIDatabaseReady
      .then(() => window.CareerAIDatabase?.load())
      .then(data => {
        if (!data) return;
        state.userSkills = Array.isArray(data.dashboard?.userSkills) ? data.dashboard.userSkills : state.userSkills;
        state.timelineItems = Array.isArray(data.dashboard?.timelineItems) ? data.dashboard.timelineItems : state.timelineItems;
        state.careerScore = data.dashboard?.careerScore || state.careerScore;
        renderUserSkillChips();
        renderTimeline();
        renderScoreRing();
        renderMiniBarScores();
      })
      .catch(error => console.error('CareerAI dashboard data could not be loaded from Realtime Database.', error));
  }
}

function saveState() {
  const dashboard = {
    userSkills: state.userSkills,
    timelineItems: state.timelineItems,
    careerScore: state.careerScore
  };
  try {
    localStorage.setItem('dci_state', JSON.stringify(dashboard));
  } catch (error) {
    console.warn('CareerAI state could not be saved.', error);
  }
  if (window.CareerAIDatabase) {
    window.CareerAIDatabase.save({ dashboard })
      .catch(error => console.error('CareerAI dashboard data could not be saved to Realtime Database.', error));
  }
}

// -- Navigation ---
function initNav() {
  // Sidebar nav items
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      const section = item.dataset.section;
      if (!section) return;
      navigateTo(section);
      closeSidebar();
    });
  });
  // Mobile bottom nav items
  document.querySelectorAll('.mob-nav-item[data-section]').forEach(item => {
    item.addEventListener('click', () => {
      const section = item.dataset.section;
      if (section) navigateTo(section);
    });
  });
  // More button opens sidebar
  document.getElementById('mob-more-btn')?.addEventListener('click', () => openSidebar());
}

function navigateTo(section) {
  state.currentSection = section;
  document.querySelectorAll('.nav-item').forEach(n => n.classList.toggle('active', n.dataset.section === section));
  document.querySelectorAll('.mob-nav-item').forEach(n => n.classList.toggle('active', n.dataset.section === section));
  document.querySelectorAll('.section-content').forEach(s => s.classList.toggle('active', s.id === `section-${section}`));
  document.querySelector('.topbar-title').textContent = {
    dashboard: '🏠 Dashboard',
    paths:     '📈 Career Paths',
    skills:    '⚡ Skill Gap',
    market:    '💹 Job Market',
    timeline:  '🗓️ Timeline',
    quiz:      '🧭 Career Compass',
    analyze:   '🔬 Analysis Hub',
    predict:   '🤖 ML Predictor',
    roadmap:   '🗺️ AI Roadmap',
    courses:   '🎓 Courses',
  }[section] || 'Career Intelligence';
  if (window.innerWidth <= 768) window.scrollTo({ top: 0, behavior: 'smooth' });
  if (section === 'market'    && !state.charts.salaryBar)  setTimeout(initMarketCharts,    100);
  if (section === 'dashboard' && !state.charts.scoreRing) setTimeout(initDashboardCharts, 100);
}

window.navigateTo = navigateTo;

function openSidebar() {
  document.querySelector('.sidebar')?.classList.add('open');
  document.querySelector('.main-content')?.classList.add('shifted');
  const main = document.querySelector('.main-content');
  if (main) {
    main.style.transition = 'transform 0.3s ease';
    main.style.transform = 'translateX(260px)';
  }
  const ov = document.getElementById('sidebar-overlay');
  if (ov) { ov.classList.add('visible'); }
  document.body.style.overflow = 'hidden';
}

function closeSidebar() {
  document.querySelector('.sidebar')?.classList.remove('open');
  document.querySelector('.main-content')?.classList.remove('shifted');
  const main = document.querySelector('.main-content');
  if (main) {
    main.style.transform = '';
  }
  const ov = document.getElementById('sidebar-overlay');
  if (ov) { ov.classList.remove('visible'); }
  document.body.style.overflow = '';
}

// -- Mobile Menu ---
function initMobileMenu() {
  document.querySelector('.menu-toggle')?.addEventListener('click', () => {
    const isOpen = document.querySelector('.sidebar')?.classList.contains('open');
    if (isOpen) closeSidebar(); else openSidebar();
  });
  document.getElementById('sidebar-overlay')?.addEventListener('click', closeSidebar);
  let tx = 0;
  document.querySelector('.sidebar')?.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
  document.querySelector('.sidebar')?.addEventListener('touchend', e => { if (e.changedTouches[0].clientX - tx < -50) closeSidebar(); }, { passive: true });
  let mx = 0;
  document.querySelector('.main-content')?.addEventListener('touchstart', e => { mx = e.touches[0].clientX; }, { passive: true });
  document.querySelector('.main-content')?.addEventListener('touchend', e => { if (e.changedTouches[0].clientX - mx > 60 && mx < 24) openSidebar(); }, { passive: true });
}

// ── Search ────────────────────────────────────────────────────
function initSearch() {
  const input = document.getElementById('global-search');
  if (!input) return;
  input.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    if (!q) return;
    const roles = Object.keys(CareerData.roles);
    const match = roles.find(r => r.toLowerCase().includes(q));
    if (match) {
      document.getElementById('target-role').value = match;
      navigateTo('skills');
      showToast('🔍', `Navigated to Skill Gap for "${match}"`);
    }
  });
}

// ── Dashboard ─────────────────────────────────────────────────
function initDashboard() {
  renderCareerTips();
  renderStatCounters();
  setTimeout(initDashboardCharts, 300);
}

function renderStatCounters() {
  const roleCount = Object.keys(CareerData.roles || {}).length;
  const careerPathCount = Object.keys(CareerData.careerPaths || {}).length;
  const skillCount = Object.keys(AIData.nlpSkillDictionary || {}).length;
  animateCounter('stat-roles', roleCount, 0, 1000);
  animateCounter('stat-paths', careerPathCount, 0, 800);
  animateCounter('stat-skills', skillCount, 0, 1200, '+');
  animateCounter('stat-avg-salary', 125, 0, 1400, 'K', '$');
}

function animateCounter(id, target, start = 0, duration = 1000, suffix = '', prefix = '') {
  const el = document.getElementById(id);
  if (!el) return;
  const startTime = performance.now();
  const update = (now) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(start + (target - start) * eased);
    el.textContent = prefix + current + suffix;
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

function initDashboardCharts() {
  if (state.charts.scoreRing) return;
  renderScoreRing();
  renderMiniBarScores();
  renderRemoteChart();
}

function renderScoreRing() {
  const scores = Object.values(state.careerScore);
  const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);

  const svg = document.querySelector('.score-ring-svg');
  if (!svg) return;
  const r = 75;
  const circ = 2 * Math.PI * r;

  // Set gradient
  svg.innerHTML = `
    <defs>
      <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#6366f1"/>
        <stop offset="100%" stop-color="#8b5cf6"/>
      </linearGradient>
    </defs>
    <circle class="score-ring-bg" cx="90" cy="90" r="${r}"/>
    <circle class="score-ring-bar" cx="90" cy="90" r="${r}"
      stroke-dasharray="${circ}" stroke-dashoffset="${circ}" id="ring-bar"/>
  `;

  document.querySelector('.score-number').textContent = avg;
  requestAnimationFrame(() => {
    setTimeout(() => {
      const bar = document.getElementById('ring-bar');
      if (bar) bar.style.strokeDashoffset = circ - (circ * avg / 100);
    }, 100);
  });
  state.charts.scoreRing = true;
}

function renderMiniBarScores() {
  const items = document.querySelectorAll('.score-detail-item');
  const keys = Object.keys(state.careerScore);
  items.forEach((item, i) => {
    const fill = item.querySelector('.mini-bar-fill');
    const val = item.querySelector('.mini-bar-val');
    if (fill) setTimeout(() => { fill.style.width = state.careerScore[keys[i]] + '%'; }, 200 + i * 100);
    if (val) val.textContent = state.careerScore[keys[i]] + '%';
  });
}

function renderRemoteChart() {
  const ctx = document.getElementById('remoteChart');
  if (!ctx || state.charts.remote) return;
  const d = CareerData.marketTrends.remotePercent;
  state.charts.remote = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: d.labels,
      datasets: [{ data: d.values,
        backgroundColor: ['rgba(99,102,241,0.8)', 'rgba(139,92,246,0.8)', 'rgba(75,85,99,0.6)'],
        borderColor: 'rgba(255,255,255,0.05)',
        borderWidth: 2,
        hoverOffset: 8
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false, cutout: '68%',
      plugins: {
        legend: { position: 'bottom', labels: { color: '#94a3b8', font: { family: 'Inter', size: 12 }, padding: 14 } },
        tooltip: { callbacks: { label: ctx => ` ${ctx.label}: ${ctx.parsed}%` } }
      }
    }
  });
}

function renderCareerTips() {
  const container = document.getElementById('tips-container');
  if (!container) return;
  container.innerHTML = CareerData.careerTips.map(t => `
    <div class="tip-card">
      <div class="tip-icon">${t.icon}</div>
      <div class="tip-text">${t.tip}</div>
    </div>
  `).join('');
}

// ── Career Path Explorer ───────────────────────────────────────
function initPathExplorer() {
  renderPathTabs();
  renderCareerTree(state.currentPath);
}

function renderPathTabs() {
  const container = document.getElementById('path-tabs');
  if (!container) return;
  container.innerHTML = Object.entries(CareerData.careerPaths).map(([id, p]) => `
    <div class="path-tab ${id === state.currentPath ? 'active' : ''}" data-path="${id}">
      <span>${p.icon}</span> ${p.label}
    </div>
  `).join('');
  container.querySelectorAll('.path-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      state.currentPath = tab.dataset.path;
      container.querySelectorAll('.path-tab').forEach(t => t.classList.toggle('active', t === tab));
      state.selectedNode = null;
      renderCareerTree(state.currentPath);
    });
  });
}

function renderCareerTree(pathId) {
  const path = CareerData.careerPaths[pathId];
  const container = document.getElementById('career-tree');
  const detailPanel = document.getElementById('node-detail-panel');
  if (!container || !path) return;

  // Group nodes by level
  const levels = {};
  path.nodes.forEach(n => {
    if (!levels[n.level]) levels[n.level] = [];
    levels[n.level].push(n);
  });

  const maxLevel = Math.max(...Object.keys(levels).map(Number));

  let html = `<div class="career-tree" style="--path-color:${path.color}">`;
  for (let lvl = 0; lvl <= maxLevel; lvl++) {
    if (!levels[lvl]) continue;
    if (lvl > 0) html += `<div class="tree-connector-row"><div class="tree-connector" style="background:linear-gradient(to bottom,${path.color}88,${path.color}44)"></div></div>`;
    html += `<div class="tree-level">`;
    levels[lvl].forEach(node => {
      html += `
        <div class="tree-node ${state.selectedNode === node.id ? 'selected' : ''}"
             data-node="${node.id}" data-path="${pathId}"
             style="border-color:${state.selectedNode === node.id ? path.color : ''}">
          <div class="tree-node-title">${node.title}</div>
          <div class="tree-node-yoe">YOE: ${node.yoe}</div>
          <div class="tree-node-salary">$${(node.salary/1000).toFixed(0)}K/yr</div>
        </div>`;
    });
    html += `</div>`;
  }
  html += `</div>`;
  container.innerHTML = html;

  container.querySelectorAll('.tree-node').forEach(el => {
    el.addEventListener('click', () => {
      const nodeId = el.dataset.node;
      const node = path.nodes.find(n => n.id === nodeId);
      if (!node) return;
      state.selectedNode = nodeId;
      renderCareerTree(pathId);
      showNodeDetail(node, path);
    });
  });

  if (state.selectedNode) {
    const node = path.nodes.find(n => n.id === state.selectedNode);
    if (node) showNodeDetail(node, path);
  } else {
    if (detailPanel) detailPanel.style.display = 'none';
  }
}

function showNodeDetail(node, path) {
  const panel = document.getElementById('node-detail-panel');
  if (!panel) return;
  panel.style.display = 'block';
  panel.style.borderColor = path.color + '55';
  panel.style.background = path.color + '10';
  panel.innerHTML = `
    <div class="node-detail-title">${node.title}</div>
    <div class="node-detail-meta">
      <span>⏱ ${node.yoe} years experience</span> &nbsp;•&nbsp;
      <span>💰 ~$${node.salary.toLocaleString()}/year</span> &nbsp;•&nbsp;
      <span>📊 Level ${node.level}</span>
    </div>
    <div style="font-size:13px;color:#94a3b8;margin-bottom:12px;">Key Skills Required:</div>
    <div class="skill-chips">
      ${node.skills.map(s => `<span class="skill-chip" style="background:${path.color}22;border-color:${path.color}55;color:${path.color === '#6366f1' ? '#a5b4fc' : path.color === '#ec4899' ? '#f9a8d4' : '#6ee7b7'}">${s}</span>`).join('')}
    </div>
  `;
}

// ── Skill Gap Analyzer ─────────────────────────────────────────
function initSkillGap() {
  populateRoleDropdown();
  renderUserSkillChips();
  document.getElementById('add-skill-btn').addEventListener('click', addUserSkill);
  document.getElementById('skill-add-input').addEventListener('keydown', e => { if (e.key === 'Enter') addUserSkill(); });
  document.getElementById('analyze-btn').addEventListener('click', runGapAnalysis);
  document.getElementById('clear-skills-btn').addEventListener('click', () => {
    state.userSkills = [];
    renderUserSkillChips();
    saveState();
  });
}

function populateRoleDropdown() {
  const sel = document.getElementById('target-role');
  if (!sel) return;
  sel.innerHTML = '<option value="">Select a target role...</option>' +
    Object.keys(CareerData.roles).map(r => `<option value="${r}">${r}</option>`).join('');
}

function addUserSkill() {
  const input = document.getElementById('skill-add-input');
  const val = input.value.trim();
  if (!val || state.userSkills.includes(val)) { input.value = ''; return; }
  state.userSkills.push(val);
  input.value = '';
  renderUserSkillChips();
  saveState();
}

function renderUserSkillChips() {
  const container = document.getElementById('user-skills-chips');
  if (!container) return;
  container.innerHTML = state.userSkills.length === 0
    ? '<span style="font-size:13px;color:var(--text-muted)">No skills added yet...</span>'
    : state.userSkills.map(s => `
        <div class="skill-chip-removable" data-skill="${s}">
          ${s}<span class="skill-chip-x">×</span>
        </div>`).join('');
  container.querySelectorAll('.skill-chip-removable').forEach(el => {
    el.addEventListener('click', () => {
      state.userSkills = state.userSkills.filter(s => s !== el.dataset.skill);
      renderUserSkillChips();
      saveState();
    });
  });
}

function runGapAnalysis() {
  const roleKey = document.getElementById('target-role').value;
  if (!roleKey) { showToast('⚠️', 'Please select a target role first!'); return; }
  if (state.userSkills.length === 0) { showToast('⚠️', 'Please add at least one skill!'); return; }

  const role = CareerData.roles[roleKey];
  const container = document.getElementById('gap-results');
  const requiredSkills = role.skills;

  // Calculate match score
  let totalScore = 0;
  let matchCount = 0;
  const skillResults = Object.entries(requiredSkills).map(([skill, required]) => {
    const userHas = state.userSkills.some(us =>
      us.toLowerCase().includes(skill.toLowerCase().split('/')[0].trim().toLowerCase()) ||
      skill.toLowerCase().includes(us.toLowerCase())
    );
    const userLevel = userHas ? Math.min(required, required * (0.7 + Math.random() * 0.5)) : Math.random() * 30;
    const pct = Math.round(userLevel);
    totalScore += pct;
    if (userLevel >= required * 0.8) matchCount++;
    return { skill, required, current: pct, gap: Math.max(0, required - pct) };
  });

  const overallScore = Math.round(totalScore / Object.keys(requiredSkills).length);

  // Render gap results
  container.classList.add('visible');

  // Score ring
  const scoreEl = document.getElementById('gap-score-value');
  if (scoreEl) {
    animateCounter('gap-score-value', overallScore, 0, 1000);
    document.getElementById('gap-score-label-text').textContent = overallScore >= 70 ? 'Great Match!' : overallScore >= 45 ? 'Partial Match' : 'Big Gap';
    // Animate ring arc (circumference = 2πr = 2*π*58 ≈ 364)
    const arc = document.getElementById('gap-ring-arc');
    if (arc) {
      arc.style.strokeDashoffset = 364;
      setTimeout(() => { arc.style.strokeDashoffset = 364 - (364 * overallScore / 100); }, 150);
    }
  }

  // Skill bars
  const barsContainer = document.getElementById('gap-skill-bars');
  barsContainer.innerHTML = skillResults.map(r => `
    <div class="gap-bar-item">
      <div class="gap-bar-header">
        <span class="gap-bar-name">${r.skill}</span>
        <span class="gap-bar-pcts">${r.current}% / ${r.required}% required</span>
      </div>
      <div class="gap-bar-track">
        <div class="gap-bar-target" style="width:${r.required}%"></div>
        <div class="gap-bar-current ${r.current >= r.required * 0.85 ? 'met' : r.current >= r.required * 0.5 ? 'partial' : 'low'}"
             style="width:0" data-target="${r.current}"></div>
      </div>
    </div>`).join('');

  // Animate bars
  setTimeout(() => {
    barsContainer.querySelectorAll('.gap-bar-current').forEach(bar => {
      bar.style.width = bar.dataset.target + '%';
    });
  }, 150);

  // Role info
  const roleInfo = document.getElementById('gap-role-info');
  if (roleInfo) {
    roleInfo.innerHTML = `
      <div class="glass-card" style="padding:20px;margin-bottom:20px">
        <div style="display:flex;gap:20px;flex-wrap:wrap;align-items:center">
          <div><div style="font-size:12px;color:var(--text-muted)">Target Role</div><div style="font-size:18px;font-weight:700;font-family:'Outfit',sans-serif">${roleKey}</div></div>
          <div><div style="font-size:12px;color:var(--text-muted)">Salary Range</div><div style="font-size:14px;font-weight:600;color:var(--accent-green)">${role.salary}</div></div>
          <div><div style="font-size:12px;color:var(--text-muted)">Demand</div><div style="font-size:14px;font-weight:600;color:var(--accent-amber)">${role.demand}</div></div>
          <div><div style="font-size:12px;color:var(--text-muted)">Job Growth</div><div style="font-size:14px;font-weight:600;color:#6ee7b7">${role.growth}</div></div>
        </div>
      </div>`;
  }

  // Learning plan for gap skills
  const gapSkills = skillResults.filter(r => r.gap > 20).map(r => r.skill);
  renderLearningPlan(gapSkills);

  container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  showToast('✅', `Gap analysis complete for ${roleKey}`);
}

function renderLearningPlan(gapSkills) {
  const container = document.getElementById('gap-learning-items');
  if (!container) return;
  if (gapSkills.length === 0) {
    container.innerHTML = '<div style="color:var(--accent-green);font-size:14px">🎉 You meet the skill requirements for this role!</div>';
    return;
  }
  const resources = [];
  gapSkills.slice(0, 5).forEach(skill => {
    const res = CareerData.learningResources[skill] || CareerData.learningResources['default'];
    resources.push(...res.map(r => ({ ...r, forSkill: skill })));
  });

  container.innerHTML = resources.slice(0, 8).map(r => `
    <div class="learning-item">
      <div class="learning-icon">${{ Course: '🎓', Book: '📚', Platform: '💻', Docs: '📄', Free: '🆓' }[r.type] || '📚'}</div>
      <div>
        <div class="learning-name">${r.name}</div>
        <div class="learning-meta">For: <strong style="color:var(--text-accent)">${r.forSkill}</strong> &nbsp;•&nbsp; ${r.time} &nbsp;•&nbsp; ${r.level}</div>
        <span class="badge badge-${r.type.toLowerCase()}">${r.type}</span>
      </div>
    </div>`).join('');
}

// ── Market Intelligence ───────────────────────────────────────
function initMarket() {
  renderTopSkillDemand();
}

function initMarketCharts() {
  if (state.charts.salaryBar) return;
  renderSalaryChart();
  renderGrowthChart();
  renderHiringTrendChart();
  state.charts.salaryBar = true;
}

function renderSalaryChart() {
  const ctx = document.getElementById('salaryChart');
  if (!ctx) return;
  const d = CareerData.marketTrends.salaryByDomain;
  state.charts.salary = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: d.labels,
      datasets: [{
        label: 'Avg. Salary (USD)',
        data: d.values,
        backgroundColor: d.colors.map(c => c + 'cc'),
        borderColor: d.colors,
        borderWidth: 1.5,
        borderRadius: 8,
        borderSkipped: false,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false, indexAxis: 'y',
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: ctx => ` $${ctx.parsed.x.toLocaleString()}` } }
      },
      scales: {
        x: {
          grid: { color: 'rgba(255,255,255,0.04)' },
          ticks: { color: '#94a3b8', callback: v => '$' + (v/1000) + 'K' },
          border: { color: 'rgba(255,255,255,0.06)' }
        },
        y: { grid: { display: false }, ticks: { color: '#94a3b8', font: { size: 11 } }, border: { color: 'rgba(255,255,255,0.06)' } }
      }
    }
  });
}

function renderGrowthChart() {
  const ctx = document.getElementById('growthChart');
  if (!ctx) return;
  const d = CareerData.marketTrends.jobGrowth;
  const colors = ['#6366f1','#8b5cf6','#06b6d4','#10b981','#f59e0b','#ec4899','#6366f1','#10b981'];
  state.charts.growth = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: d.labels,
      datasets: [{
        label: 'Job Growth %',
        data: d.values,
        backgroundColor: colors.map(c => c + 'cc'),
        borderColor: colors,
        borderWidth: 1.5,
        borderRadius: 8,
        borderSkipped: false,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: ctx => ` +${ctx.parsed.y}% growth` } }
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: '#94a3b8', font: { size: 10 }, maxRotation: 30 }, border: { color: 'rgba(255,255,255,0.06)' } },
        y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#94a3b8', callback: v => '+' + v + '%' }, border: { color: 'rgba(255,255,255,0.06)' } }
      }
    }
  });
}

function renderHiringTrendChart() {
  const ctx = document.getElementById('hiringTrendChart');
  if (!ctx) return;
  const d = CareerData.marketTrends.hiringTrend;
  const palette = [
    { border: '#8b5cf6', bg: 'rgba(139,92,246,0.12)' },
    { border: '#6366f1', bg: 'rgba(99,102,241,0.12)' },
    { border: '#10b981', bg: 'rgba(16,185,129,0.12)' },
  ];
  state.charts.hiring = new Chart(ctx, {
    type: 'line',
    data: {
      labels: d.labels,
      datasets: d.datasets.map((ds, i) => ({
        label: ds.label,
        data: ds.data,
        borderColor: palette[i].border,
        backgroundColor: palette[i].bg,
        borderWidth: 2.5,
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 6,
        pointBackgroundColor: palette[i].border,
      }))
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { position: 'top', labels: { color: '#94a3b8', font: { family: 'Inter', size: 12 }, padding: 16, usePointStyle: true } },
        tooltip: { backgroundColor: 'rgba(11,15,30,0.9)', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1,
          titleColor: '#f1f5f9', bodyColor: '#94a3b8', padding: 12 }
      },
      scales: {
        x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#94a3b8' }, border: { color: 'rgba(255,255,255,0.06)' } },
        y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#94a3b8' }, border: { color: 'rgba(255,255,255,0.06)' } }
      }
    }
  });
}

function renderTopSkillDemand() {
  const container = document.getElementById('skill-demand-list');
  if (!container) return;
  const categoryColors = {
    AI: '#8b5cf6', Cloud: '#06b6d4', DevOps: '#10b981', Programming: '#6366f1',
    Frontend: '#ec4899', Security: '#ef4444', Data: '#f59e0b', Architecture: '#14b8a6'
  };
  container.innerHTML = CareerData.marketTrends.topSkills2025.map(s => {
    const color = categoryColors[s.category] || '#6366f1';
    return `<div class="skill-demand-item">
      <div class="skill-demand-name">${s.skill}</div>
      <div style="flex-shrink:0"><span class="domain-badge" style="background:${color}22;color:${color}">${s.category}</span></div>
      <div class="skill-demand-bar-track">
        <div class="skill-demand-bar" style="width:0;background:linear-gradient(90deg,${color}cc,${color})" data-target="${s.demand}"></div>
      </div>
      <div class="skill-demand-pct">${s.demand}%</div>
    </div>`;
  }).join('');

  setTimeout(() => {
    container.querySelectorAll('.skill-demand-bar').forEach(bar => {
      bar.style.width = bar.dataset.target + '%';
    });
  }, 300);
}

// ── Timeline Builder ──────────────────────────────────────────
function initTimeline() {
  if (state.timelineItems.length === 0) {
    state.timelineItems = [
      { id: Date.now() - 3000, emoji: '🎓', title: 'Computer Science Degree', year: '2020', desc: 'Graduated with honors. Built foundation in algorithms, data structures, and software engineering.', tags: ['Education', 'CS Fundamentals', 'Algorithms'] },
      { id: Date.now() - 2000, emoji: '👨‍💻', title: 'Junior Developer at Startup', year: '2021', desc: 'First professional role building React frontends and REST APIs. Shipped 3 major product features.', tags: ['React', 'Node.js', 'First Job'] },
      { id: Date.now() - 1000, emoji: '🚀', title: 'Target: Senior Developer', year: '2025', desc: 'Aiming for a senior engineering role with architecture responsibilities and team mentoring.', tags: ['Goal', 'Leadership', 'Architecture'] },
    ];
  }
  renderTimeline();
  document.getElementById('add-milestone-btn').addEventListener('click', openMilestoneModal);
  document.getElementById('modal-close-btn').addEventListener('click', closeModal);
  document.getElementById('modal-save-btn').addEventListener('click', saveMilestone);
  document.querySelector('.modal-overlay').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeModal();
  });
}

function renderTimeline() {
  const container = document.getElementById('timeline-items');
  if (!container) return;
  if (state.timelineItems.length === 0) {
    container.innerHTML = '<div style="text-align:center;padding:40px;color:var(--text-muted)">No milestones yet. Add your first one!</div>';
    return;
  }
  container.innerHTML = state.timelineItems.map(item => `
    <div class="timeline-item" data-id="${item.id}">
      <div class="timeline-dot">${item.emoji}</div>
      <div class="timeline-card-body">
        <div class="timeline-card-header">
          <div class="timeline-card-title">${item.title}</div>
          <div style="display:flex;gap:8px;align-items:center">
            <div class="timeline-card-year">${item.year}</div>
            <button class="timeline-remove-btn" data-id="${item.id}" title="Remove">×</button>
          </div>
        </div>
        <div class="timeline-card-desc">${item.desc}</div>
        <div class="timeline-card-tags">
          ${item.tags.map(t => `<span class="timeline-tag">${t}</span>`).join('')}
        </div>
      </div>
    </div>`).join('');

  container.querySelectorAll('.timeline-remove-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.timelineItems = state.timelineItems.filter(i => i.id !== parseInt(btn.dataset.id));
      renderTimeline();
      saveState();
      showToast('🗑️', 'Milestone removed');
    });
  });
}

function openMilestoneModal() {
  document.querySelector('.modal-overlay').classList.add('open');
}

function closeModal() {
  document.querySelector('.modal-overlay').classList.remove('open');
  ['modal-title-input','modal-year-input','modal-desc-input','modal-emoji-input','modal-tags-input']
    .forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
}

function saveMilestone() {
  const title = document.getElementById('modal-title-input').value.trim();
  const year  = document.getElementById('modal-year-input').value.trim();
  const desc  = document.getElementById('modal-desc-input').value.trim();
  const emoji = document.getElementById('modal-emoji-input').value.trim() || '⭐';
  const tags  = document.getElementById('modal-tags-input').value.split(',').map(t => t.trim()).filter(Boolean);

  if (!title || !year) { showToast('⚠️', 'Please fill in the title and year'); return; }
  state.timelineItems.push({ id: Date.now(), emoji, title, year, desc: desc || 'A key milestone in your career journey.', tags });
  state.timelineItems.sort((a, b) => a.year.localeCompare(b.year));
  renderTimeline();
  saveState();
  closeModal();
  showToast('🎯', `Milestone "${title}" added!`);
}

// ── Career Quiz ───────────────────────────────────────────────
function initQuiz() {
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const q = CareerData.quizQuestions[state.quizStep];
  if (!q) { renderQuizResult(); return; }

  const total = CareerData.quizQuestions.length;
  document.getElementById('quiz-progress-fill').style.width = `${(state.quizStep / total) * 100}%`;
  document.getElementById('quiz-step').textContent = `Question ${state.quizStep + 1} of ${total}`;
  document.getElementById('quiz-question').textContent = q.q;

  const optionsContainer = document.getElementById('quiz-options');
  optionsContainer.innerHTML = q.options.map((opt, i) => `
    <div class="quiz-option" data-idx="${i}">
      <div class="option-dot"></div>
      ${opt.text}
    </div>`).join('');

  optionsContainer.querySelectorAll('.quiz-option').forEach(el => {
    el.addEventListener('click', () => {
      optionsContainer.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
      el.classList.add('selected');
      const optIdx = parseInt(el.dataset.idx);
      state.quizAnswers.push(q.options[optIdx].domains);
      setTimeout(() => {
        state.quizStep++;
        renderQuizQuestion();
      }, 400);
    });
  });

  document.getElementById('quiz-result-area').style.display = 'none';
  document.getElementById('quiz-question-area').style.display = 'block';
}

function renderQuizResult() {
  const domainScores = {};
  state.quizAnswers.forEach(domains => {
    domains.forEach(d => { domainScores[d] = (domainScores[d] || 0) + 1; });
  });
  const top = Object.entries(domainScores).sort((a, b) => b[1] - a[1])[0];
  const domainId = top ? top[0] : 'software-engineering';
  const domain = CareerData.careerPaths[domainId];

  document.getElementById('quiz-progress-fill').style.width = '100%';
  document.getElementById('quiz-question-area').style.display = 'none';
  document.getElementById('quiz-result-area').style.display = 'block';
  document.getElementById('quiz-result-icon').textContent = domain.icon;
  document.getElementById('quiz-result-domain').textContent = domain.label;
  const domainWork = {
    'software-engineering': 'systems and products',
    'data-science': 'intelligent data pipelines and models',
    'product-management': 'user-centric products',
    'cybersecurity': 'secure and resilient systems',
    'ux-design': 'beautiful digital experiences',
    'cloud-devops': 'reliable cloud platforms',
    'data-engineering': 'scalable data pipelines',
    'mobile-development': 'mobile apps and experiences',
    'blockchain-web3': 'trusted decentralised applications',
    'game-development': 'interactive games and digital worlds'
  };
  document.getElementById('quiz-result-desc').textContent = `Based on your answers, ${domain.label} aligns best with your interests and working style. You'll thrive building ${domainWork[domainId] || 'technology products'}.`;

  document.getElementById('quiz-explore-btn').onclick = () => {
    state.currentPath = domainId;
    navigateTo('paths');
    renderPathTabs();
    renderCareerTree(domainId);
  };
  document.getElementById('quiz-restart-btn').onclick = () => {
    state.quizAnswers = [];
    state.quizStep = 0;
    renderQuizQuestion();
  };
}

// ── Toast Notification ────────────────────────────────────────
let toastTimeout;
function showToast(icon, message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.querySelector('.toast-icon').textContent = icon;
  toast.querySelector('.toast-message').textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove('show'), 3000);
}
