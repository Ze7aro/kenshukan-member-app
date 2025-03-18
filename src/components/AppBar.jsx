import React from 'react'
import { View, StyleSheet, Text, ScrollView } from 'react-native'
import Constants from 'expo-constants';

const styles = StyleSheet.create({
    container: {
        backgroundColor: "gray",
        paddingTop: Constants.statusBarHeight + 10,
        paddingBottom: 10,
        paddingLeft: 10,
    },
    text: {
        color: "white",
        fontWeight: "bold",
        paddingHorizontal: 10,
    }
})

const AppBar = () => {
  return (
    <View style={styles.container}>
        <ScrollView horizontal>
        <Text style={styles.text}>
        Inicio
            </Text>
            <Text style={styles.text}>
        Caledario
            </Text>
            <Text style={styles.text}>
      Perfil
            </Text>
            <Text style={styles.text}>
        Configuración
            </Text>
            <Text style={styles.text}>
        Iniciar sesión
            </Text>
        </ScrollView>
</View>
  )
}

export default AppBar