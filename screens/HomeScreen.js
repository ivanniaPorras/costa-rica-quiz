import React, { useContext, useEffect, useState } from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/AuthContext";

const LOCAL_STATS_KEY = "localStats";

export default function HomeScreen({ navigation }) {
  const { user, logout } = useContext(AuthContext);
  const [localStats, setLocalStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const raw = await AsyncStorage.getItem(LOCAL_STATS_KEY);
        setLocalStats(raw ? JSON.parse(raw) : null);
      } catch (err) {
        console.log("No se pudieron leer stats locales:", err);
      } finally {
        setLoadingStats(false);
      }
    };
    loadStats();
  }, []);

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

      {loadingStats ? (
        <ActivityIndicator size="small" />
      ) : localStats ? (
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontWeight: "bold" }}>Stats locales</Text>
          <Text>Mejor puntaje: {localStats.bestScore}</Text>
          <Text>Partidas jugadas: {localStats.gamesPlayed}</Text>
          <Text>
            Último: {localStats.lastScore} (nivel {localStats.lastLevel}){" "}
            {localStats.lastPlayedAt
              ? new Date(localStats.lastPlayedAt).toLocaleDateString()
              : ""}
          </Text>
        </View>
      ) : (
        <Text>Juega tu primera partida para ver stats locales.</Text>
      )}

      <Button title="Jugar" onPress={() => navigation.navigate("Level")} />
      <Button title="Leaderboard" onPress={() => navigation.navigate("Leaderboard")} />
      <Button title="Cerrar sesión" onPress={logout} />
    </View>
  );
}
