import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import { collection, addDoc, doc, getDoc, setDoc } from "firebase/firestore";

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
};

export default function ResultsScreen({ route, navigation }) {
  const { total, nivel, puntos } = route.params;
  const { user } = useContext(AuthContext);

  const [guardando, setGuardando] = useState(false);
  const [guardado, setGuardado] = useState(false);

  const puntajeTotal = puntos.reduce((a, b) => a + b, 0);

  const handleGuardarResultado = async () => {
    if (!user) {
      alert("No hay usuario autenticado.");
      return;
    }
    if (guardado) return;

    try {
      setGuardando(true);

      await addDoc(collection(db, "games"), {
        userId: user.uid,
        userName: user.displayName,
        score: puntajeTotal,
        nivel,
        rondas: total,
        puntosPorRonda: puntos,
        createdAt: new Date(),
      });

      const userRef = doc(db, "users", user.uid);
      const snap = await getDoc(userRef);
      const data = snap.exists() ? snap.data() : {};

      const totalScorePrevio = data.totalScore || 0;
      const gamesPrevios = data.gamesPlayed || 0;
      const bestPrevio = data.bestScore || 0;

      const nuevoTotalScore = totalScorePrevio + puntajeTotal;
      const nuevoGamesPlayed = gamesPrevios + 1;
      const nuevoBestScore = puntajeTotal > bestPrevio ? puntajeTotal : bestPrevio;

      await setDoc(
        userRef,
        {
          name: user.displayName,
          email: user.email,
          totalScore: nuevoTotalScore,
          gamesPlayed: nuevoGamesPlayed,
          bestScore: nuevoBestScore,
        },
        { merge: true }
      );

      try {
        const prevRaw = await AsyncStorage.getItem(LOCAL_STATS_KEY);
        const prev = prevRaw ? JSON.parse(prevRaw) : {};
        const next = {
          bestScore: Math.max(prev.bestScore || 0, puntajeTotal),
          gamesPlayed: (prev.gamesPlayed || 0) + 1,
          lastScore: puntajeTotal,
          lastLevel: nivel,
          lastPlayedAt: Date.now(),
        };
        await AsyncStorage.setItem(LOCAL_STATS_KEY, JSON.stringify(next));
      } catch (err) {
        console.log("No se pudieron guardar stats locales:", err);
      }

      setGuardado(true);
      alert("Resultado guardado en tu historial.");
    } catch (error) {
      console.log("Error al guardar resultado:", error);
      alert("Ocurrió un error al guardar el resultado.");
    } finally {
      setGuardando(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.title}>¡Juego completado!</Text>
          <Text style={styles.sub}>Rondas jugadas: {total}</Text>
          <Text style={styles.sub}>Nivel: {nivel}</Text>
          <Text style={styles.score}>Puntaje total: {puntajeTotal}</Text>

          <Text style={[styles.sub, { marginTop: 14 }]}>Puntaje por ronda:</Text>
          {puntos.map((p, i) => (
            <Text key={i} style={styles.sub}>
              Ronda {i + 1}: {p} puntos
            </Text>
          ))}

          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.button, styles.primary]}
              onPress={handleGuardarResultado}
              disabled={guardando || guardado}
            >
              <Text style={styles.buttonText}>
                {guardado ? "Resultado guardado" : guardando ? "Guardando..." : "Guardar resultado"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.secondary]}
              onPress={() => navigation.navigate("Home")}
            >
              <Text style={styles.buttonText}>Volver al Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.bg,
  },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 28,
    paddingTop: 48,
    paddingBottom: 72,
  },
  card: {
    width: "100%",
    maxWidth: 820,
    padding: 22,
    backgroundColor: palette.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: palette.outline,
    gap: 8,
    shadowColor: "#000",
    shadowOpacity: 0.22,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 9 },
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: palette.text,
    textAlign: "center",
  },
  sub: {
    fontSize: 15,
    color: palette.muted,
    textAlign: "center",
  },
  score: {
    fontSize: 20,
    fontWeight: "700",
    color: palette.accent,
    marginTop: 6,
    textAlign: "center",
  },
  actions: {
    width: "100%",
    marginTop: 20,
    gap: 12,
    alignItems: "center",
  },
  button: {
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 14,
    alignItems: "center",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  primary: {
    backgroundColor: palette.accent,
    borderColor: palette.accentDark,
  },
  secondary: {
    backgroundColor: "#1d2640",
    borderColor: palette.outline,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "800",
    color: "#0b1221",
  },
});
