import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import {
  get,
  getDatabase,
  ref,
  serverTimestamp,
  update
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js';

const config = window.CAREERAI_FIREBASE_CONFIG;

function isConfigured() {
  return Boolean(config && config.apiKey && config.authDomain && config.projectId && config.appId && config.databaseURL);
}

if (isConfigured()) {
  const app = initializeApp(config, 'dashboard');
  const auth = getAuth(app);
  const db = getDatabase(app);

  window.CareerAIDatabaseReady = new Promise(resolve => {
    onAuthStateChanged(auth, user => resolve(user || null), error => {
      console.error('CareerAI authentication state could not be restored.', error);
      resolve(null);
    });
  });

  window.CareerAIDatabase = {
    async load() {
      const user = await window.CareerAIDatabaseReady;
      if (!user) return null;
      const snapshot = await get(ref(db, `users/${user.uid}`));
      return snapshot.exists() ? snapshot.val() : null;
    },
    async save(data) {
      const user = await window.CareerAIDatabaseReady;
      if (!user) return;
      await update(ref(db, `users/${user.uid}`), {
        ...data,
        updatedAt: serverTimestamp()
      });
    },
    async testConnection() {
      const user = await window.CareerAIDatabaseReady;
      if (!user) return null;

      const testReference = ref(db, `users/${user.uid}/testConnection`);
      await update(testReference, {
        status: 'connected',
        purpose: 'DCIS Realtime Database test',
        sample: {
          name: 'Test Student',
          skills: ['JavaScript', 'Firebase'],
          careerScore: 85
        },
        checkedAt: serverTimestamp()
      });

      const snapshot = await get(testReference);
      return snapshot.exists() ? snapshot.val() : null;
    }
  };
} else {
  window.CareerAIDatabaseReady = Promise.resolve(null);
  window.CareerAIDatabase = null;
}
