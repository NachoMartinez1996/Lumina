import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  serverTimestamp,
  writeBatch
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAzXdQEcOETByOPlZP_CVJdjqebzWohwAM",
  authDomain: "lumina-bae19.firebaseapp.com",
  projectId: "lumina-bae19",
  storageBucket: "lumina-bae19.firebasestorage.app",
  messagingSenderId: "168520867563",
  appId: "1:168520867563:web:ecba451785e2cef36ca8ae",
  measurementId: "G-SJLWHH7P9Z"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.useDeviceLanguage();

const estadoFirebaseLumina = {
  offlinePersistence: "enabled",
  offlinePersistenceError: null
};

let db;

try {
  db = initializeFirestore(app, {
    localCache: persistentLocalCache({
      tabManager: persistentMultipleTabManager()
    })
  });
} catch (error) {
  estadoFirebaseLumina.offlinePersistence = "disabled";
  estadoFirebaseLumina.offlinePersistenceError = {
    code: error?.code || "unknown",
    message: error?.message || "No se pudo habilitar la persistencia offline de Firestore."
  };
  db = getFirestore(app);
  console.warn("No se pudo habilitar la persistencia offline de Firestore:", error);
}

const persistenceReady = Promise.resolve(estadoFirebaseLumina);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

async function signInWithGoogle() {
  return signInWithPopup(auth, googleProvider);
}

function observeAuth(callback) {
  return onAuthStateChanged(auth, callback);
}

function signOutGoogle() {
  return signOut(auth);
}

function obtenerColeccionEstado(uid) {
  return collection(db, "users", uid, "lumina_estado");
}

function obtenerDocumentoEstado(uid, key) {
  return doc(db, "users", uid, "lumina_estado", key);
}

async function cargarEntradasLumina(uid) {
  const snapshot = await getDocs(obtenerColeccionEstado(uid));
  return snapshot.docs
    .map(documento => ({ id: documento.id, ...documento.data() }))
    .filter(item => typeof item.key === "string" && item.key.trim());
}

async function guardarEntradasLumina(uid, entradas) {
  if (!uid || !Array.isArray(entradas) || entradas.length === 0) return;

  const batch = writeBatch(db);
  entradas.forEach(entrada => {
    if (!entrada?.key) return;
    batch.set(
      obtenerDocumentoEstado(uid, entrada.key),
      {
        key: entrada.key,
        value: entrada.deleted ? null : String(entrada.value ?? ""),
        deleted: Boolean(entrada.deleted),
        updatedAtLocal: entrada.updatedAtLocal || new Date().toISOString(),
        updatedAtServer: serverTimestamp(),
        deviceId: entrada.deviceId || null
      },
      { merge: true }
    );
  });

  await batch.commit();
}

const luminaFirebase = {
  app,
  auth,
  db,
  cargarEntradasLumina,
  guardarEntradasLumina,
  persistenceReady,
  observeAuth,
  signInWithGoogle,
  signOutGoogle,
  getEstado: () => ({ ...estadoFirebaseLumina })
};

window.LuminaFirebase = luminaFirebase;
window.dispatchEvent(new CustomEvent("lumina:firebase-ready", { detail: luminaFirebase }));

export { app, auth, db, persistenceReady };
