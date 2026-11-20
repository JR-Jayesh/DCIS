import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import {
  getDatabase,
  ref,
  serverTimestamp,
  update
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js';

const config = window.CAREERAI_FIREBASE_CONFIG;
const modal = document.getElementById('auth-modal');
const form = document.getElementById('auth-form');
const status = document.getElementById('auth-status');
const nameField = document.getElementById('name-field');
const nameInput = document.getElementById('auth-name');
const submit = document.getElementById('auth-submit');
let mode = 'signin';
let auth;
let db;

function withTimeout(promise, milliseconds, message) {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = window.setTimeout(() => reject(new Error(message)), milliseconds);
  });
  return Promise.race([promise, timeout]).finally(() => window.clearTimeout(timer));
}

function configured() {
  return config && config.apiKey && config.authDomain && config.projectId && config.appId;
}

function setStatus(message, success = false) {
  status.textContent = message;
  status.classList.toggle('success', success);
}

async function navigateToDashboard() {
  const dashboardUrl = new URL('app.html', document.baseURI).href;
  window.location.replace(dashboardUrl);
}

function setMode(nextMode) {
  mode = nextMode;
  const signup = mode === 'signup';
  nameField.hidden = !signup;
  nameInput.required = signup;
  submit.textContent = signup ? 'Create Account' : 'Sign In';
  document.getElementById('auth-title').textContent = signup ? 'Create your account' : 'Welcome back';
  document.getElementById('auth-subtitle').textContent = signup
    ? 'Save your career journey and access it on every device.'
    : 'Sign in to continue your career journey.';
  document.querySelectorAll('[data-auth-tab]').forEach(tab => tab.classList.toggle('active', tab.dataset.authTab === mode));
  setStatus('');
}

function openAuth(nextMode = 'signin') {
  modal.hidden = false;
  setMode(nextMode);
  document.getElementById('auth-email').focus();
}

async function ensureUserProfile(user, displayName = '') {
  const reference = ref(db, `users/${user.uid}`);
  await update(reference, {
    uid: user.uid,
    email: user.email || '',
    displayName: displayName || user.displayName || '',
    updatedAt: serverTimestamp()
  });
}

async function submitAuth(event) {
  event.preventDefault();
  if (!configured()) {
    setStatus('Firebase is not configured. Add your Web app config in firebase-config.js.');
    return;
  }
  submit.disabled = true;
  setStatus('Checking your account…');
  try {
    const email = document.getElementById('auth-email').value.trim();
    const password = document.getElementById('auth-password').value;
    let credential;
    if (mode === 'signup') {
      credential = await withTimeout(
        createUserWithEmailAndPassword(auth, email, password),
        15000,
        'Authentication request timed out'
      );
      await updateProfile(credential.user, { displayName: nameInput.value.trim() });
      try {
        await withTimeout(
          ensureUserProfile(credential.user, nameInput.value.trim()),
          10000,
          'Profile save timed out'
        );
      } catch (profileError) {
        console.error('CareerAI profile creation failed', profileError);
        setStatus('Account created. Profile sync is unavailable; check Realtime Database setup and rules.', true);
        window.setTimeout(navigateToDashboard, 1200);
        return;
      }
    } else {
      credential = await withTimeout(
        signInWithEmailAndPassword(auth, email, password),
        15000,
        'Authentication request timed out'
      );
      try {
        await withTimeout(ensureUserProfile(credential.user), 10000, 'Profile lookup timed out');
      } catch (profileError) {
        console.error('CareerAI profile lookup failed', profileError);
        setStatus('Signed in. Profile sync is unavailable; check Realtime Database setup and rules.', true);
        window.setTimeout(navigateToDashboard, 1200);
        return;
      }
    }
    setStatus('Account ready. Opening your dashboard…', true);
    window.setTimeout(navigateToDashboard, 450);
  } catch (error) {
    const messages = {
      'auth/email-already-in-use': 'An account already exists for this email. Try Sign In.',
      'auth/invalid-credential': 'Email or password is incorrect.',
      'auth/weak-password': 'Use a password with at least 6 characters.',
      'auth/invalid-email': 'Enter a valid email address.',
      'auth/user-not-found': 'No account exists for this email. Choose Create Account first.',
      'auth/wrong-password': 'The password is incorrect. Try again or create a new account.',
      'auth/too-many-requests': 'Too many attempts. Wait a moment and try again.',
      'auth/invalid-api-key': 'The Firebase API key is invalid. Check firebase-config.js.',
      'auth/project-not-found': 'The Firebase project was not found. Check the project ID.',
      'auth/app-not-authorized': 'This app domain is not authorized in Firebase Authentication settings.',
      'auth/internal-error': 'Firebase returned an internal error. Try again in a moment.',
      'auth/configuration-not-found': 'Firebase Email/Password sign-in is not enabled for this project. Enable it in Firebase Console → Authentication → Sign-in method.',
      'auth/operation-not-allowed': 'This sign-in method is disabled. Enable Email/Password in Firebase Console → Authentication → Sign-in method.',
      'auth/network-request-failed': 'Firebase could not be reached. Check your internet connection and run the app through a local web server.'
    };
    setStatus(messages[error.code] || error.message || 'Authentication failed. Please try again.');
    console.error('CareerAI authentication failed', error);
  } finally {
    submit.disabled = false;
  }
}

document.querySelectorAll('[data-auth-open]').forEach(button => {
  button.addEventListener('click', () => openAuth(button.dataset.authOpen));
});
document.querySelectorAll('[data-auth-tab]').forEach(tab => {
  tab.addEventListener('click', () => setMode(tab.dataset.authTab));
});
document.querySelector('[data-auth-close]').addEventListener('click', () => { modal.hidden = true; });
modal.addEventListener('click', event => { if (event.target === modal) modal.hidden = true; });
form.addEventListener('submit', submitAuth);

if (configured()) {
  const app = initializeApp(config);
  auth = getAuth(app);
  db = getDatabase(app);
  onAuthStateChanged(auth, user => {
    if (user) console.info('CareerAI user session restored', user.uid);
  });
}
