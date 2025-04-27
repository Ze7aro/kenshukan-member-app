import { auth, db } from "../config/firebase";

export const testFirebaseConnection = async () => {
  try {
    // Intentar obtener la colección de usuarios
    const usersRef = db.collection("users");
    const snapshot = await usersRef.get();

    if (!snapshot.empty) {
      console.log(
        "Conexión exitosa a Firebase. Usuarios encontrados:",
        snapshot.size
      );
    } else {
      console.log("Conexión exitosa a Firebase. No hay usuarios registrados.");
    }

    return true;
  } catch (error) {
    console.error("Error al conectar con Firebase:", error);
    return false;
  }
};
