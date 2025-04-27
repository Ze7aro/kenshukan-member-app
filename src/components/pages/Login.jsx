import React, { useState } from "react";
import { Button, Text, View, StyleSheet, Alert, Image } from "react-native";
import StyledTextInput from "../StyledTextInput";
import { Formik, useField } from "formik";
import { loginSchema } from "../validationSchema/login";
import dataService from "../../data/data";

const styles = StyleSheet.create({
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 10,
  },
  container: {
    padding: 20,
    backgroundColor: "#0000CD",
    height: "100%",
    justifyContent: "center",
    paddingBottom: 50,
  },
  form: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    borderRadius: 100,
  },
});

const FormikInputValue = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  return (
    <>
      <StyledTextInput
        error={meta.error}
        value={field.value}
        onChangeText={(value) => helpers.setValue(value)}
        {...props}
      />
      {meta.error && <Text style={styles.error}>{meta.error}</Text>}
    </>
  );
};

const Login = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const handleLogin = async (values) => {
    try {
      setLoading(true);
      const response = await dataService.login(values);
      if (response) {
        // Navegar a la pantalla principal o dashboard
        navigation.navigate("Home");
      } else {
        Alert.alert("Error", "Credenciales inválidas");
      }
    } catch (error) {
      Alert.alert("Error", "Ocurrió un error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("../../assets/logo.jpg")}
          />
        </View>
        <Formik
          initialValues={initialValues}
          onSubmit={handleLogin}
          validationSchema={loginSchema}
        >
          {({ handleSubmit }) => (
            <View>
              <Text>Email</Text>
              <FormikInputValue name="email" placeholder="Email" />
              <Text>Password</Text>
              <FormikInputValue
                name="password"
                placeholder="Password"
                secureTextEntry
              />
              <Button
                title={loading ? "Cargando..." : "Login"}
                onPress={handleSubmit}
                disabled={loading}
              />
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default Login;
