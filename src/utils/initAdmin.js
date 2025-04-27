import { auth, db } from "../config/firebase";
import { ROLES } from "./userRoles";

export const initAdminUser = async () => {
  try {
    // Verificar si ya existe un admin
    const adminSnapshot = await db
      .collection("users")
      .where("role", "==", ROLES.ADMIN)
      .limit(1)
      .get();

    if (!adminSnapshot.empty) {
      console.log("Ya existe un usuario administrador");
      return;
    }

    // Crear el usuario admin
    const adminEmail = "admin@kenshukan.com";
    const adminPassword = "Admin123!"; // Cambia esto por una contraseña segura

    // Crear usuario en Authentication
    const userCredential = await auth.createUserWithEmailAndPassword(
      adminEmail,
      adminPassword
    );

    const adminId = userCredential.user.uid;

    // Crear documento en Firestore
    await db.collection("users").doc(adminId).set({
      email: adminEmail,
      name: "Administrador",
      role: ROLES.ADMIN,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    });

    console.log("Usuario administrador creado exitosamente");
    console.log("Email:", adminEmail);
    console.log("Password:", adminPassword);

    return adminId;
  } catch (error) {
    console.error("Error al crear usuario administrador:", error);
    throw error;
  }
};
