import React, { useContext } from "react";
import { View, Text, Button } from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function HomeScreen({ navigation }) {
  const { user, logout } = useContext(AuthContext);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
      }}
    >
      <Text style={{ fontSize: 26 }}>Costa Rica Quiz 🇨🇷</Text>
      <Text style={{ fontSize: 18 }}>Hola, {user.displayName}</Text>

      <Button title="Jugar" onPress={() => navigation.navigate("Level")} />
        
      <Button
        title="Leaderboard"
        onPress={() => alert("Aquí irá el leaderboard")}
      />

      <Button title="Cerrar sesión" onPress={logout} />
    </View>
  );
}
