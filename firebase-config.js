import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";
import {
  browserLocalPersistence,
  browserSessionPersistence,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  setPersistence,
  signInWithPopup,
  signOut
} from "https://www.gstatic.com/firebasejs/12.12.1/firebase-auth.js";
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
} from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";

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

const authReady = setPersistence(auth, browserLocalPersistence)
  .catch(error => {
    console.warn("No se pudo usar persistencia local para Auth; probamos con persistencia de sesión:", error);
    return setPersistence(auth, browserSessionPersistence);
  })
  .catch(error => {
    console.warn("No se pudo configurar persistencia explícita de Auth; seguimos con la configuración del navegador:", error);
    return null;
  });

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
  await authReady;
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

function obtenerRutaColeccionEstado(uid) {
  return `users/${uid}/lumina_estado`;
}

async function cargarEntradasLumina(uid) {
  const ruta = obtenerRutaColeccionEstado(uid);

  try {
    console.info("[Lumina Firebase] Leyendo Cloud Firestore", { ruta });
    const snapshot = await getDocs(obtenerColeccionEstado(uid));
    console.info("[Lumina Firebase] Lectura de Cloud Firestore completada", {
      ruta,
      documentos: snapshot.size,
      desdeCache: Boolean(snapshot.metadata?.fromCache)
    });

    return snapshot.docs
      .map(documento => ({ id: documento.id, ...documento.data() }))
      .filter(item => typeof item.key === "string" && item.key.trim());
  } catch (error) {
    console.error("[Lumina Firebase] Fallo leyendo Cloud Firestore", {
      ruta,
      codigo: error?.code || "sin-codigo",
      mensaje: error?.message || String(error)
    });
    throw error;
  }
}

async function guardarEntradasLumina(uid, entradas) {
  if (!uid || !Array.isArray(entradas) || entradas.length === 0) return;

  const ruta = obtenerRutaColeccionEstado(uid);
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

  try {
    console.info("[Lumina Firebase] Escribiendo Cloud Firestore", {
      ruta,
      documentos: entradas.filter(entrada => entrada?.key).length
    });
    await batch.commit();
    console.info("[Lumina Firebase] Escritura de Cloud Firestore completada", { ruta });
  } catch (error) {
    console.error("[Lumina Firebase] Fallo escribiendo Cloud Firestore", {
      ruta,
      codigo: error?.code || "sin-codigo",
      mensaje: error?.message || String(error)
    });
    throw error;
  }
}

const luminaFirebase = {
  app,
  auth,
  db,
  authReady,
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
