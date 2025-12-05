import React from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";

export default function InstructionsScreen() {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Instrucciones</Text>

      <View style={styles.block}>
        <Text style={styles.blockTitle}>Objetivo</Text>
        <Text style={styles.text}>
          Adivina la ubicación correcta en el mapa según las pistas y consigue el mayor puntaje posible.
        </Text>
      </View>

      <View style={styles.block}>
        <Text style={styles.blockTitle}>Cómo jugar</Text>
        <Text style={styles.text}>- Elige la dificultad (fácil o difícil).</Text>
        <Text style={styles.text}>- Lee el nombre y pistas del lugar.</Text>
        <Text style={styles.text}>- Toca el mapa para marcar tu mejor estimación.</Text>
        <Text style={styles.text}>- Pulsa "Siguiente" para confirmar y pasar a la siguiente ronda.</Text>
      </View>

      <View style={styles.block}>
        <Text style={styles.blockTitle}>Puntaje</Text>
        <Text style={styles.text}>- 100 puntos: hasta 5 km de distancia.</Text>
        <Text style={styles.text}>- 75 puntos: hasta 15 km.</Text>
        <Text style={styles.text}>- 50 puntos: hasta 30 km.</Text>
        <Text style={styles.text}>- 25 puntos: hasta 50 km.</Text>
        <Text style={styles.text}>- 0 puntos: más de 50 km.</Text>
      </View>

      <View style={styles.block}>
        <Text style={styles.blockTitle}>Leaderboard</Text>
        <Text style={styles.text}>
          Se guardan tus partidas en la nube; el Top 10 global se actualiza en tiempo real.
        </Text>
      </View>

      <View style={styles.block}>
        <Text style={styles.blockTitle}>Consejos</Text>
        <Text style={styles.text}>- Usa las pistas de provincia y características cercanas.</Text>
        <Text style={styles.text}>- Zonas costeras: ubica primero el océano correcto.</Text>
        <Text style={styles.text}>- Volcanes y parques conocidos suelen estar en el Valle Central o norte.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#0c1221",
  },
  container: {
    flexGrow: 1,
    padding: 20,
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#f8fafc",
  },
  block: {
    padding: 14,
    backgroundColor: "#121b2f",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#1f2a44",
    gap: 6,
  },
  blockTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2dd4bf",
  },
  text: {
    lineHeight: 20,
    color: "#cbd5e1",
  },
});
