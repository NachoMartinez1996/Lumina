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
  getDoc,
  getDocs,
  getFirestore,
  serverTimestamp,
  writeBatch
} from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore-lite.js";

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
  firestoreSdk: "lite",
  offlinePersistence: "lumina-local",
  offlinePersistenceError: null
};

const db = getFirestore(app);
const persistenceReady = Promise.resolve(estadoFirebaseLumina);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
const BYTES_MAXIMOS_VALOR_DIRECTO_LUMINA = 450 * 1024;
const MAX_ESCRITURAS_LOTE_LUMINA = 16;
const SUFIJO_FRAGMENTO_LUMINA = "__chunk__";
const COLECCION_COMPARTIDOS_LUMINA = "lumina_compartidos";
const SUBCOLECCION_FRAGMENTOS_COMPARTIDOS_LUMINA = "fragmentos";
const DIAS_VIGENCIA_COMPARTIDO_LUMINA = 30;
const codificadorTextoLumina = typeof TextEncoder !== "undefined" ? new TextEncoder() : null;

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

function obtenerDocumentoCompartidoLumina(id) {
  return doc(db, COLECCION_COMPARTIDOS_LUMINA, id);
}

function obtenerColeccionFragmentosCompartidoLumina(id) {
  return collection(db, COLECCION_COMPARTIDOS_LUMINA, id, SUBCOLECCION_FRAGMENTOS_COMPARTIDOS_LUMINA);
}

function obtenerDocumentoFragmentoCompartidoLumina(id, indice) {
  return doc(db, COLECCION_COMPARTIDOS_LUMINA, id, SUBCOLECCION_FRAGMENTOS_COMPARTIDOS_LUMINA, String(indice).padStart(4, "0"));
}

function contarBytesTextoLumina(texto) {
  if (codificadorTextoLumina) {
    return codificadorTextoLumina.encode(texto).length;
  }

  if (typeof Blob !== "undefined") {
    return new Blob([texto]).size;
  }

  return unescape(encodeURIComponent(texto)).length;
}

function dividirTextoEnFragmentosLumina(texto) {
  const fragmentos = [];
  let fragmentoActual = "";
  let bytesActuales = 0;

  for (const caracter of texto) {
    const bytesCaracter = contarBytesTextoLumina(caracter);

    if (bytesActuales > 0 && bytesActuales + bytesCaracter > BYTES_MAXIMOS_VALOR_DIRECTO_LUMINA) {
      fragmentos.push(fragmentoActual);
      fragmentoActual = caracter;
      bytesActuales = bytesCaracter;
    } else {
      fragmentoActual += caracter;
      bytesActuales += bytesCaracter;
    }
  }

  if (fragmentoActual || texto === "") {
    fragmentos.push(fragmentoActual);
  }

  return fragmentos;
}

function obtenerIdFragmentoLumina(key, indice) {
  return `${key}${SUFIJO_FRAGMENTO_LUMINA}${String(indice).padStart(4, "0")}`;
}

function generarIdCompartidoLumina() {
  const alfabeto = "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const longitud = 12;

  if (typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function") {
    const bytes = new Uint8Array(longitud);
    crypto.getRandomValues(bytes);
    return Array.from(bytes, byte => alfabeto[byte % alfabeto.length]).join("");
  }

  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`.slice(0, longitud);
}

function normalizarIdCompartidoLumina(id) {
  const limpio = String(id || "").trim();
  return /^[a-zA-Z0-9_-]{8,80}$/.test(limpio) ? limpio : "";
}

function esDocumentoFragmentoLumina(item) {
  return typeof item?.chunkParent === "string"
    && Number.isInteger(item.chunkIndex)
    && typeof item.chunkValue === "string";
}

function agruparFragmentoLumina(mapa, item) {
  if (!mapa.has(item.chunkParent)) {
    mapa.set(item.chunkParent, []);
  }

  mapa.get(item.chunkParent).push(item);
}

function rearmarEntradaFragmentadaLumina(entrada, fragmentosPorClave) {
  if (!entrada?.chunked || entrada.deleted) {
    return entrada;
  }

  const cantidadFragmentos = Number(entrada.chunkCount) || 0;
  const fragmentos = fragmentosPorClave.get(entrada.key) || [];
  const porIndice = new Map(fragmentos.map(fragmento => [fragmento.chunkIndex, fragmento.chunkValue]));
  const partes = [];

  for (let indice = 0; indice < cantidadFragmentos; indice++) {
    if (!porIndice.has(indice)) {
      const error = new Error(`Faltan fragmentos para ${entrada.key} en Cloud Firestore.`);
      error.code = "lumina/cloud-chunk-missing";
      error.luminaKey = entrada.key;
      throw error;
    }

    partes.push(porIndice.get(indice));
  }

  return {
    ...entrada,
    value: partes.join("")
  };
}

function crearDatosBaseEntradaLumina(entrada) {
  return {
    key: entrada.key,
    deleted: Boolean(entrada.deleted),
    updatedAtLocal: entrada.updatedAtLocal || new Date().toISOString(),
    updatedAtServer: serverTimestamp(),
    deviceId: entrada.deviceId || null
  };
}

function crearOperacionesEntradaLumina(uid, entrada) {
  if (!entrada?.key) return [];

  const refPrincipal = obtenerDocumentoEstado(uid, entrada.key);
  const base = crearDatosBaseEntradaLumina(entrada);

  if (entrada.deleted) {
    return [{
      ref: refPrincipal,
      data: {
        ...base,
        value: null,
        chunked: false,
        chunkCount: 0
      },
      options: { merge: true }
    }];
  }

  const value = String(entrada.value ?? "");
  const bytesValue = contarBytesTextoLumina(value);

  if (bytesValue <= BYTES_MAXIMOS_VALOR_DIRECTO_LUMINA) {
    return [{
      ref: refPrincipal,
      data: {
        ...base,
        value,
        chunked: false,
        chunkCount: 0
      },
      options: { merge: true }
    }];
  }

  const fragmentos = dividirTextoEnFragmentosLumina(value);
  const operacionesFragmentos = fragmentos.map((fragmento, indice) => ({
    ref: obtenerDocumentoEstado(uid, obtenerIdFragmentoLumina(entrada.key, indice)),
    data: {
      chunkParent: entrada.key,
      chunkIndex: indice,
      chunkValue: fragmento,
      updatedAtLocal: base.updatedAtLocal,
      updatedAtServer: serverTimestamp(),
      deviceId: base.deviceId
    },
    options: { merge: true }
  }));

  return [
    ...operacionesFragmentos,
    {
      ref: refPrincipal,
      data: {
        ...base,
        value: null,
        chunked: true,
        chunkCount: fragmentos.length,
        chunkBytes: BYTES_MAXIMOS_VALOR_DIRECTO_LUMINA
      },
      options: { merge: true }
    }
  ];
}

async function confirmarOperacionesLumina(operaciones) {
  let batch = writeBatch(db);
  let escriturasEnLote = 0;
  const lotes = [];

  for (const operacion of operaciones) {
    if (escriturasEnLote >= MAX_ESCRITURAS_LOTE_LUMINA) {
      lotes.push(batch);
      batch = writeBatch(db);
      escriturasEnLote = 0;
    }

    if (operacion.options) {
      batch.set(operacion.ref, operacion.data, operacion.options);
    } else {
      batch.set(operacion.ref, operacion.data);
    }
    escriturasEnLote++;
  }

  if (escriturasEnLote > 0) {
    lotes.push(batch);
  }

  for (const lote of lotes) {
    await lote.commit();
  }
}

function crearOperacionesCompartidoLumina(uid, id, paquete) {
  const ahora = new Date();
  const expira = new Date(ahora.getTime() + (DIAS_VIGENCIA_COMPARTIDO_LUMINA * 24 * 60 * 60 * 1000));
  const tipo = String(paquete?.tipo || "").trim();
  const titulo = String(paquete?.titulo || "Lumina").trim().slice(0, 160);
  const payloadTexto = JSON.stringify(paquete?.payload || {});
  const base = {
    tipo,
    titulo,
    version: 1,
    ownerUid: uid,
    createdAt: ahora.toISOString(),
    createdAtServer: serverTimestamp(),
    expiresAt: expira,
    app: "Lumina"
  };

  if (contarBytesTextoLumina(payloadTexto) <= BYTES_MAXIMOS_VALOR_DIRECTO_LUMINA) {
    return [{
      ref: obtenerDocumentoCompartidoLumina(id),
      data: {
        ...base,
        payload: payloadTexto,
        chunked: false,
        chunkCount: 0
      }
    }];
  }

  const fragmentos = dividirTextoEnFragmentosLumina(payloadTexto);
  const operacionesFragmentos = fragmentos.map((fragmento, indice) => ({
    ref: obtenerDocumentoFragmentoCompartidoLumina(id, indice),
    data: {
      ownerUid: uid,
      chunkIndex: indice,
      chunkValue: fragmento,
      createdAt: base.createdAt,
      createdAtServer: serverTimestamp(),
      expiresAt: expira
    }
  }));

  return [
    ...operacionesFragmentos,
    {
      ref: obtenerDocumentoCompartidoLumina(id),
      data: {
        ...base,
        payload: null,
        chunked: true,
        chunkCount: fragmentos.length,
        chunkBytes: BYTES_MAXIMOS_VALOR_DIRECTO_LUMINA
      }
    }
  ];
}

async function crearCompartidoLumina(uid, paquete) {
  if (!uid) {
    const error = new Error("Hace falta una sesión de Google para crear enlaces compartidos.");
    error.code = "unauthenticated";
    throw error;
  }

  const tipo = String(paquete?.tipo || "").trim();
  if (!["coleccion", "lectio"].includes(tipo)) {
    const error = new Error("Tipo de enlace compartido no reconocido.");
    error.code = "lumina/share-invalid";
    throw error;
  }

  const id = generarIdCompartidoLumina();
  const operaciones = crearOperacionesCompartidoLumina(uid, id, paquete);
  await confirmarOperacionesLumina(operaciones);
  return { id, diasVigencia: DIAS_VIGENCIA_COMPARTIDO_LUMINA };
}

async function cargarPayloadCompartidoLumina(id, data) {
  if (!data?.chunked) {
    return String(data?.payload || "");
  }

  const cantidadFragmentos = Number(data.chunkCount) || 0;
  const snapshot = await getDocs(obtenerColeccionFragmentosCompartidoLumina(id));
  const porIndice = new Map(
    snapshot.docs
      .map(documento => documento.data())
      .filter(item => Number.isInteger(item.chunkIndex) && typeof item.chunkValue === "string")
      .map(item => [item.chunkIndex, item.chunkValue])
  );
  const partes = [];

  for (let indice = 0; indice < cantidadFragmentos; indice++) {
    if (!porIndice.has(indice)) {
      const error = new Error("El enlace compartido todavía no terminó de guardarse.");
      error.code = "lumina/share-chunk-missing";
      throw error;
    }

    partes.push(porIndice.get(indice));
  }

  return partes.join("");
}

async function cargarCompartidoLumina(idRaw) {
  const id = normalizarIdCompartidoLumina(idRaw);
  if (!id) {
    const error = new Error("El enlace compartido no es válido.");
    error.code = "lumina/share-invalid";
    throw error;
  }

  const snapshot = await getDoc(obtenerDocumentoCompartidoLumina(id));
  if (!snapshot.exists()) {
    const error = new Error("No encontramos ese enlace compartido.");
    error.code = "not-found";
    throw error;
  }

  const data = snapshot.data();
  const expira = data.expiresAt?.toDate?.() || (data.expiresAt instanceof Date ? data.expiresAt : null);
  if (expira && expira.getTime() < Date.now()) {
    const error = new Error("El enlace compartido ya venció.");
    error.code = "lumina/share-expired";
    throw error;
  }

  const payloadTexto = await cargarPayloadCompartidoLumina(id, data);
  let payload;

  try {
    payload = JSON.parse(payloadTexto);
  } catch (error) {
    error.code = "lumina/share-invalid";
    throw error;
  }

  return {
    id,
    tipo: String(data.tipo || ""),
    titulo: String(data.titulo || ""),
    createdAt: data.createdAt || "",
    expiresAt: expira ? expira.toISOString() : "",
    payload
  };
}

async function cargarEntradasLumina(uid) {
  const ruta = obtenerRutaColeccionEstado(uid);

  try {
    console.info("[Lumina Firebase] Leyendo Cloud Firestore", { proyecto: firebaseConfig.projectId, ruta });
    const snapshot = await getDocs(obtenerColeccionEstado(uid));
    const documentos = snapshot.docs.map(documento => ({ id: documento.id, ...documento.data() }));
    const fragmentosPorClave = new Map();
    const entradas = [];

    documentos.forEach(item => {
      if (esDocumentoFragmentoLumina(item)) {
        agruparFragmentoLumina(fragmentosPorClave, item);
        return;
      }

      if (typeof item.key === "string" && item.key.trim()) {
        entradas.push(item);
      }
    });

    const entradasRearmadas = entradas
      .map(entrada => rearmarEntradaFragmentadaLumina(entrada, fragmentosPorClave))
      .filter(item => typeof item.key === "string" && item.key.trim());

    console.info("[Lumina Firebase] Lectura de Cloud Firestore completada", {
      proyecto: firebaseConfig.projectId,
      ruta,
      documentos: snapshot.size,
      entradas: entradasRearmadas.length,
      fragmentos: documentos.length - entradas.length,
      desdeCache: Boolean(snapshot.metadata?.fromCache)
    });

    return entradasRearmadas;
  } catch (error) {
    console.error("[Lumina Firebase] Fallo leyendo Cloud Firestore", {
      proyecto: firebaseConfig.projectId,
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
  const operaciones = entradas.flatMap(entrada => crearOperacionesEntradaLumina(uid, entrada));
  if (operaciones.length === 0) return;

  try {
    console.info("[Lumina Firebase] Escribiendo Cloud Firestore", {
      proyecto: firebaseConfig.projectId,
      ruta,
      documentos: entradas.filter(entrada => entrada?.key).length,
      escrituras: operaciones.length
    });
    await confirmarOperacionesLumina(operaciones);
    console.info("[Lumina Firebase] Escritura de Cloud Firestore completada", { proyecto: firebaseConfig.projectId, ruta });
  } catch (error) {
    console.error("[Lumina Firebase] Fallo escribiendo Cloud Firestore", {
      proyecto: firebaseConfig.projectId,
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
  config: {
    projectId: firebaseConfig.projectId,
    authDomain: firebaseConfig.authDomain
  },
  cargarCompartidoLumina,
  cargarEntradasLumina,
  crearCompartidoLumina,
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
