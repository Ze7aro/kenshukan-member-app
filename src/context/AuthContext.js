import React, { createContext, useState, useEffect } from "react";
import { auth, onAuthStateChanged } from "../config/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar sesión guardada
    const checkStoredSession = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Error al cargar sesión:", error);
      }
      setLoading(false);
    };

    checkStoredSession();

    // Escuchar cambios en la autenticación
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = {
          uid: user.uid,
          email: user.email,
        };
        setUser(userData);
        await AsyncStorage.setItem("user", JSON.stringify(userData));
      } else {
        setUser(null);
        await AsyncStorage.removeItem("user");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password, rememberMe) => {
    try {
      const userCredential = await auth.signInWithEmailAndPassword(
        email,
        password
      );
      const userData = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
      };
      if (rememberMe) {
        await AsyncStorage.setItem("user", JSON.stringify(userData));
      }
      setUser(userData);
      return userData;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
      await AsyncStorage.removeItem("user");
      setUser(null);
    } catch (error) {
      throw error;
    }
  };

  const resetPassword = async (email) => {
    try {
      await auth.sendPasswordResetEmail(email);
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, resetPassword }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
