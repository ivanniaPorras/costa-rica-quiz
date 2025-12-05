import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";

const palette = {
  bg: "#0c1221",
  card: "#121b2f",
  accent: "#2dd4bf",
  accentDark: "#14b8a6",
  text: "#f8fafc",
  muted: "#cbd5e1",
};

export default function LoginScreen() {
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.log("Error al iniciar sesión:", error);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/splash-icon.png")}
        resizeMode="cover"
        style={styles.bg}
        imageStyle={{ opacity: 0.1 }}
      >
        <View style={styles.card}>
          <Text style={styles.kicker}>Costa Rica Quiz</Text>
          <Text style={styles.title}>Inicia para jugar</Text>
          <Text style={styles.subtitle}>
            Compite, explora y alcanza el mejor puntaje.
          </Text>

          <TouchableOpacity style={styles.button} onPress={handleGoogleLogin}>
            <Text style={styles.buttonText}>Continuar con Google</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.bg,
  },
  bg: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "100%",
    maxWidth: 420,
    padding: 22,
    gap: 10,
    backgroundColor: palette.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1f2a44",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
  },
  kicker: {
    fontSize: 12,
    color: palette.muted,
    letterSpacing: 1.4,
    textTransform: "uppercase",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: palette.text,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: palette.muted,
  },
  button: {
    marginTop: 12,
    paddingVertical: 14,
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    backgroundColor: palette.accent,
    borderColor: palette.accentDark,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0b1221",
  },
});
