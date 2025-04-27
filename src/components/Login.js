import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import { initAdminUser } from "../utils/initAdmin";
import * as yup from "yup";

const loginSchema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Email es requerido"),
  password: yup
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("Contraseña es requerida"),
});

const Login = ({ navigation }) => {
  const { login, resetPassword } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);

  const handleLogin = async () => {
    try {
      setError("");
      setLoading(true);
      await loginSchema.validate({ email, password });
      await login(email, password, rememberMe);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    try {
      setError("");
      setLoading(true);
      await loginSchema.validate({ email });
      await resetPassword(email);
      Alert.alert(
        "Éxito",
        "Se ha enviado un correo para restablecer tu contraseña",
        [{ text: "OK", onPress: () => setShowResetPassword(false) }]
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInitAdmin = async () => {
    try {
      setLoading(true);
      await initAdminUser();
      Alert.alert(
        "Éxito",
        "Usuario administrador creado exitosamente\nEmail: admin@kenshukan.com\nPassword: Admin123!"
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (showResetPassword) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Recuperar Contraseña</Text>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleResetPassword}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Enviar Correo</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => setShowResetPassword(false)}
        >
          <Text style={styles.secondaryButtonText}>Volver al Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <View style={styles.rememberMeContainer}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => setRememberMe(!rememberMe)}
        >
          <View
            style={[styles.checkboxInner, rememberMe && styles.checkboxChecked]}
          />
        </TouchableOpacity>
        <Text style={styles.rememberMeText}>Recordar sesión</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => setShowResetPassword(true)}
      >
        <Text style={styles.secondaryButtonText}>
          ¿Olvidaste tu contraseña?
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.adminButton}
        onPress={handleInitAdmin}
        disabled={loading}
      >
        <Text style={styles.adminButtonText}>Crear Usuario Admin</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  adminButton: {
    backgroundColor: "#34C759",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  adminButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  secondaryButton: {
    padding: 15,
    alignItems: "center",
    marginTop: 10,
  },
  secondaryButtonText: {
    color: "#007AFF",
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#007AFF",
    borderRadius: 3,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxInner: {
    width: 14,
    height: 14,
    borderRadius: 2,
  },
  checkboxChecked: {
    backgroundColor: "#007AFF",
  },
  rememberMeText: {
    color: "#666",
  },
});

export default Login;
