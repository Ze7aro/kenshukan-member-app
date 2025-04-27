import { auth, db } from "../config/firebase";
import { ROLES } from "../utils/userRoles";

export const createUser = async (userData) => {
  try {
    // Crear usuario en Authentication
    const userCredential = await auth.createUserWithEmailAndPassword(
      userData.email,
      userData.password
    );

    const userId = userCredential.user.uid;

    // Crear documento en Firestore
    await db
      .collection("users")
      .doc(userId)
      .set({
        email: userData.email,
        name: userData.name,
        role: userData.role || ROLES.STUDENT,
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
      });

    return userId;
  } catch (error) {
    console.error("Error al crear usuario:", error);
    throw error;
  }
};

export const getUser = async (userId) => {
  try {
    const doc = await db.collection("users").doc(userId).get();
    if (!doc.exists) {
      throw new Error("Usuario no encontrado");
    }
    return { id: doc.id, ...doc.data() };
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    throw error;
  }
};

export const updateUser = async (userId, userData) => {
  try {
    await db
      .collection("users")
      .doc(userId)
      .update({
        ...userData,
        updatedAt: new Date(),
      });
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    // Eliminar de Firestore
    await db.collection("users").doc(userId).delete();

    // Eliminar de Authentication
    await auth.deleteUser(userId);
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const snapshot = await db.collection("users").get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error al obtener todos los usuarios:", error);
    throw error;
  }
};

export const changeUserRole = async (userId, newRole) => {
  try {
    await db.collection("users").doc(userId).update({
      role: newRole,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error("Error al cambiar rol de usuario:", error);
    throw error;
  }
};
