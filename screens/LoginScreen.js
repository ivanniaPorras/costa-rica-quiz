import React from "react";
import { View, Text, Button } from "react-native";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";

export default function LoginScreen() {
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.log("Error al iniciar sesión:", error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Costa Rica Quiz</Text>
      <Button title="Iniciar sesión con Google" onPress={handleGoogleLogin} />
    </View>
  );
}
