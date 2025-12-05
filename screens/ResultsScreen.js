import React, { useContext, useState } from "react";
import { View, Text, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import { collection, addDoc, doc, getDoc, setDoc } from "firebase/firestore";

const LOCAL_STATS_KEY = "localStats";

export default function ResultsScreen({ route, navigation }) {
  const { total, nivel, puntos } = route.params;
  const { user } = useContext(AuthContext);

  const [guardando, setGuardando] = useState(false);
  const [guardado, setGuardado] = useState(false);

  const puntajeTotal = puntos.reduce((a, b) => a + b, 0);

  // Función para actualizar estadísticas locales persistentes
  const updateLocalStats = async () => {
    try {
      const prev = await AsyncStorage.getItem(LOCAL_STATS_KEY);
      const parsed = prev ? JSON.parse(prev) : {};
      const bestScorePrev = parsed.bestScore || 0;
      const gamesPlayedPrev = parsed.gamesPlayed || 0;
// Se crea el nuevo objeto de estadísticas
      const newStats = {
        bestScore: Math.max(bestScorePrev, puntajeTotal),
        gamesPlayed: gamesPlayedPrev + 1,
        lastScore: puntajeTotal,
        lastLevel: nivel,
        lastRounds: total,
        lastPlayedAt: new Date().toISOString(),
      };

      await AsyncStorage.setItem(LOCAL_STATS_KEY, JSON.stringify(newStats));
    } catch (err) {
      console.log("No se pudo guardar stats locales:", err);
    }
  };

  const handleGuardarResultado = async () => {
    if (!user) {
      alert("No hay usuario autenticado.");
      return;
    }

    if (guardado) {
      return;
    }

    try {
      setGuardando(true);

      // Guarda stats locales persistentes
      await updateLocalStats();

      // guarda la partida en games (Firestore)
      await addDoc(collection(db, "games"), {
        userId: user.uid,
        userName: user.displayName,
        score: puntajeTotal,
        nivel,
        rondas: total,
        puntosPorRonda: puntos,
        createdAt: new Date(),
      });

      // se actualizan las estadísticas del usuario
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
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        gap: 10,
      }}
    >
      <Text style={{ fontSize: 26, marginBottom: 10 }}>¡Juego completado!</Text>

      <Text style={{ fontSize: 18 }}>Rondas jugadas: {total}</Text>
      <Text style={{ fontSize: 18 }}>Nivel: {nivel}</Text>
      <Text style={{ fontSize: 20, marginTop: 10 }}>Puntaje total: {puntajeTotal}</Text>

      <Text style={{ marginTop: 20, fontWeight: "bold" }}>Puntaje por ronda:</Text>
      {puntos.map((p, i) => (
        <Text key={i}>
          Ronda {i + 1}: {p} puntos
        </Text>
      ))}

      <View style={{ marginTop: 30, width: "80%", gap: 10 }}>
        <Button
          title={
            guardado
              ? "Resultado guardado"
              : guardando
              ? "Guardando..."
              : "Guardar resultado"
          }
          onPress={handleGuardarResultado}
          disabled={guardando || guardado}
        />

        <Button title="Volver al Home" onPress={() => navigation.navigate("Home")} />
      </View>
    </View>
  );
}
