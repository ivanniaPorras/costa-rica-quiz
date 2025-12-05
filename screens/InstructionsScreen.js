import React from "react";
import { ScrollView, Text, View } from "react-native";

export default function InstructionsScreen() {
  return (
    <ScrollView contentContainerStyle={{ padding: 20, gap: 12 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Instrucciones</Text>

      <View style={{ gap: 8 }}>
        <Text style={{ fontWeight: "bold" }}>Objetivo</Text>
        <Text>
          Adivina la ubicación correcta en el mapa según las pistas y consigue el
          mayor puntaje posible.
        </Text>
      </View>

      <View style={{ gap: 8 }}>
        <Text style={{ fontWeight: "bold" }}>Cómo jugar</Text>
        <Text>- Elige la dificultad (fácil o difícil).</Text>
        <Text>- Lee el nombre y pistas del lugar.</Text>
        <Text>- Toca el mapa para marcar tu mejor estimación.</Text>
        <Text>- Pulsa "Siguiente" para confirmar y pasar a la siguiente ronda.</Text>
      </View>

      <View style={{ gap: 8 }}>
        <Text style={{ fontWeight: "bold" }}>Puntaje</Text>
        <Text>- 100 puntos: hasta 5 km de distancia.</Text>
        <Text>- 75 puntos: hasta 15 km.</Text>
        <Text>- 50 puntos: hasta 30 km.</Text>
        <Text>- 25 puntos: hasta 50 km.</Text>
        <Text>- 0 puntos: más de 50 km.</Text>
      </View>

      <View style={{ gap: 8 }}>
        <Text style={{ fontWeight: "bold" }}>Leaderboard</Text>
        <Text>
          Se guardan tus partidas en la nube; el Top 10 global se actualiza en tiempo real.
        </Text>
      </View>

      <View style={{ gap: 8 }}>
        <Text style={{ fontWeight: "bold" }}>Consejos</Text>
        <Text>- Usa las pistas de provincia y características cercanas.</Text>
        <Text>- Zonas costeras: ubica primero el océano correcto.</Text>
        <Text>- Volcanes y parques conocidos suelen estar en el Valle Central o norte.</Text>
      </View>
    </ScrollView>
  );
}
