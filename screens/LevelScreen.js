import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const palette = {
  bg: "#0c1221",
  card: "#121b2f",
  accent: "#2dd4bf",
  accentDark: "#14b8a6",
  text: "#f8fafc",
  muted: "#cbd5e1",
  outline: "#1f2a44",
};

export default function LevelScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona la dificultad</Text>
      <Text style={styles.subtitle}>
        Elige tu reto: fácil para explorar, difícil para expertos.
      </Text>

      <View style={styles.card}>
        <TouchableOpacity
          style={[styles.button, styles.primary]}
          onPress={() => navigation.navigate("Game", { level: "facil" })}
        >
          <Text style={styles.buttonTitle}>Nivel Fácil</Text>
          <Text style={styles.buttonSub}>Pistas generosas y más margen</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondary]}
          onPress={() => navigation.navigate("Game", { level: "dificil" })}
        >
          <Text style={styles.buttonTitle}>Nivel Difícil</Text>
          <Text style={styles.buttonSub}>Pistas retadoras y puntajes altos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 48,
    gap: 16,
    backgroundColor: palette.bg,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: palette.text,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 20,
    color: palette.muted,
  },
  card: {
    marginTop: 12,
    padding: 14,
    gap: 12,
    backgroundColor: palette.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: palette.outline,
  },
  button: {
    padding: 14,
    gap: 6,
    borderRadius: 12,
    borderWidth: 1,
  },
  primary: {
    backgroundColor: palette.accent,
    borderColor: palette.accentDark,
  },
  secondary: {
    backgroundColor: "#494bc0ff",
    borderColor: palette.outline,
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0b1221",
  },
  buttonSub: {
    fontSize: 13,
    opacity: 0.8,
    color: "#0b1221",
  },
});
