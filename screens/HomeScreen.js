import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";

const LOCAL_STATS_KEY = "localStats";

const palette = {
  bg: "#0c1221",
  card: "#121b2f",
  accent: "#2dd4bf",
  accentDark: "#14b8a6",
  text: "#f8fafc",
  muted: "#cbd5e1",
  outline: "#1f2a44",
  danger: "#ef4444",
  dangerDark: "#dc2626",
};

export default function HomeScreen({ navigation }) {
  const { user, logout } = useContext(AuthContext);
  const [localStats, setLocalStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const isFocused = useIsFocused();

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
    if (isFocused) {
      loadStats();
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/splash-icon.png")} 
        resizeMode="cover"
        style={styles.bgImage}
        imageStyle={{ opacity: 0.08 }}
      >
        <View style={styles.blobTop} />
        <View style={styles.blobBottom} />

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.kicker}>Costa Rica Quiz</Text>
            <Text style={styles.title}>Explora y adivina</Text>
            <Text style={styles.subtitle}>Hola, {user.displayName}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Progreso</Text>
            {loadingStats ? (
              <ActivityIndicator color={palette.accent} size="small" />
            ) : localStats ? (
              <View style={{ gap: 6 }}>
                <Text style={styles.cardText}>
                  Mejor puntaje: {localStats.bestScore}
                </Text>
                <Text style={styles.cardText}>
                  Partidas jugadas: {localStats.gamesPlayed}
                </Text>
                <Text style={styles.cardText}>
                  Último: {localStats.lastScore} (nivel {localStats.lastLevel}){" "}
                  {localStats.lastPlayedAt
                    ? new Date(localStats.lastPlayedAt).toLocaleDateString()
                    : ""}
                </Text>
              </View>
            ) : (
              <Text style={styles.cardText}>
                Juega tu primera partida para ver stats.
              </Text>
            )}
          </View>

          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.button, styles.instructions]}
              onPress={() => navigation.navigate("Instructions")}
            >
              <Text style={styles.buttonText}>Instrucciones</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.primary]}
              onPress={() => navigation.navigate("Level")}
            >
              <Text style={styles.buttonText}>Jugar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.secondary]}
              onPress={() => navigation.navigate("Leaderboard")}
            >
              <Text style={styles.buttonText}>Leaderboard</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.danger]}
              onPress={logout}
            >
              <Text style={styles.buttonText}>Cerrar sesión</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.bg,
  },
  bgImage: {
    flex: 1,
  },
  content: {
    padding: 24,
    paddingTop: 48,
    paddingBottom: 64,
    gap: 18,
  },
  header: {
    gap: 4,
  },
  kicker: {
    fontSize: 12,
    letterSpacing: 1.2,
    color: palette.muted,
    textTransform: "uppercase",
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: palette.text,
  },
  subtitle: {
    fontSize: 16,
    color: palette.muted,
  },
  card: {
    padding: 16,
    marginBottom: 0,
    backgroundColor: palette.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: palette.outline,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    gap: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: palette.text,
  },
  cardText: {
    fontSize: 14,
    lineHeight: 20,
    color: palette.muted,
  },
  actions: {
    gap: 12,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
  },
  primary: {
    backgroundColor: palette.accent,
    borderColor: palette.accentDark,
  },
  secondary: {
    backgroundColor: "#0f766e",
    borderColor: palette.outline,
  },
  instructions: {
    backgroundColor: "#fbbf24",
    borderColor: "#f59e0b",
  },
  ghost: {
    backgroundColor: "transparent",
    borderColor: palette.outline,
  },
  danger: {
    backgroundColor: palette.danger,
    borderColor: palette.dangerDark,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0b1221",
  },
  ghostText: {
    fontSize: 16,
    fontWeight: "700",
    color: palette.text,
  },
  blobTop: {
    position: "absolute",
    top: -80,
    right: -60,
    width: 280,
    height: 280,
    backgroundColor: "#1d2a44",
    borderRadius: 140,
    opacity: 0.6,
  },
  blobBottom: {
    position: "absolute",
    bottom: -90,
    left: -80,
    width: 260,
    height: 260,
    backgroundColor: "#0f766e",
    borderRadius: 130,
    opacity: 0.35,
  },
});
