import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { firebaseConfig } from "../../App";

// Opciones adicionales para Firebase
const firebaseOptions = {
  ...firebaseConfig,
  experimentalForceLongPolling: true, // Para mejor compatibilidad con React Native
  useFetchStreams: false, // Para evitar problemas con streams en React Native
};

// Inicializar Firebase
const app = initializeApp(firebaseOptions);
const auth = getAuth(app);
const db = getFirestore(app);

// Verificar inicialización
console.log("Firebase app:", app);
console.log("Firebase auth:", auth);
console.log("Firebase db:", db);

// Funciones de autenticación
export const signIn = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    throw error;
  }
};

export const signUp = async (email, password) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    throw error;
  }
};

export const signOut = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    throw error;
  }
};

// Funciones de Firestore (base de datos)
export const createUserData = async (userId, userData) => {
  try {
    const userRef = doc(db, "users", userId);
    await setDoc(userRef, userData);
  } catch (error) {
    throw error;
  }
};

export const getUserData = async (userId) => {
  try {
    const userRef = doc(db, "users", userId);
    const docSnap = await getDoc(userRef);
    return docSnap.exists() ? docSnap.data() : null;
  } catch (error) {
    throw error;
  }
};

export const updateUserData = async (userId, userData) => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, userData);
  } catch (error) {
    throw error;
  }
};

export { auth, db, onAuthStateChanged };
