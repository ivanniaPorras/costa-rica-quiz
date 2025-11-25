import React from "react";
import { View, Text, Button } from "react-native";

export default function LevelScreen({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
      }}
    >
      <Text style={{ fontSize: 26 }}>Selecciona la dificultad</Text>

      <Button
        title="Nivel Fácil"
        onPress={() => navigation.navigate("Game", { level: "facil" })}
      />

      <Button
        title="Nivel Difícil"
        onPress={() => navigation.navigate("Game", { level: "dificil" })}
      />
    </View>
  );
}
