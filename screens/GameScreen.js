import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import PLACES from "../data/places";
import MapaCR from "../components/MapaCR";
import { calcularDistancia } from "../utils/distance";
import { calcularPuntos } from "../utils/scoring";

const palette = {
  bg: "#0c1221",
  accent: "#2dd4bf",
  accentDark: "#14b8a6",
  text: "#f8fafc",
  muted: "#cbd5e1",
  danger: "#ef4444", 
};

export default function GameScreen({ route, navigation }) {
  const { level } = route.params;
  const [lugaresFiltrados, setLugaresFiltrados] = useState([]);
  const [indexRonda, setIndexRonda] = useState(0);
  const [latJugador, setLatJugador] = useState(null);
  const [lngJugador, setLngJugador] = useState(null);
  const [puntosRondas, setPuntosRondas] = useState([]);

  useEffect(() => {
    const filtrados = PLACES.filter((l) => l.dificultad === level);
    const mezclados = filtrados.sort(() => Math.random() - 0.5);
    setLugaresFiltrados(mezclados.slice(0, 3));
  }, [level]);

  if (lugaresFiltrados.length === 0) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={{ color: palette.text }}>Cargando lugares...</Text>
      </View>
    );
  }

  const lugarActual = lugaresFiltrados[indexRonda];

  const handleSiguiente = () => {
    if (!latJugador || !lngJugador) {
      alert("Debes seleccionar un punto en el mapa.");
      return;
    }
    const distancia = calcularDistancia(latJugador, lngJugador, lugarActual.lat, lugarActual.lng);
    const puntos = calcularPuntos(distancia);
    setPuntosRondas((prev) => [...prev, puntos]);

    if (indexRonda + 1 >= lugaresFiltrados.length) {
      navigation.navigate("Results", {
        total: lugaresFiltrados.length,
        nivel: level,
        puntos: [...puntosRondas, puntos],
      });
    } else {
      setIndexRonda(indexRonda + 1);
      setLatJugador(null);
      setLngJugador(null);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Ronda {indexRonda + 1}</Text>
        <Text style={styles.place}>{lugarActual.nombre}</Text>

        <Text style={styles.sectionDanger}>Pistas:</Text>
        {lugarActual.pistas.map((p, i) => (
          <Text key={i} style={styles.hint}>
            • {p}
          </Text>
        ))}

        <Text style={styles.section}>Selecciona en el mapa:</Text>
        <MapaCR
          onSelect={(lat, lng) => {
            setLatJugador(lat);
            setLngJugador(lng);
          }}
        />

        {latJugador && lngJugador && (
          <Text style={styles.coords}>
            Ubicación seleccionada: {latJugador.toFixed(4)}, {lngJugador.toFixed(4)}
          </Text>
        )}

        <TouchableOpacity style={styles.cta} onPress={handleSiguiente}>
          <Text style={styles.ctaText}>Siguiente</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.bg,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    padding: 20,
    paddingBottom: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: palette.text,
  },
  place: {
    fontSize: 24,
    fontWeight: "700",
    color: palette.text,
  },
  section: {
    fontSize: 16,
    fontWeight: "700",
    color: palette.muted,
    marginTop: 4,
  },
  sectionDanger: {
    fontSize: 16,
    fontWeight: "800",
    color: palette.danger,
    marginTop: 4,
  },
  hint: {
    fontSize: 15,
    color: palette.text,
    opacity: 0.9,
  },
  coords: {
    marginTop: 8,
    color: palette.muted,
  },
  cta: {
    marginTop: 16,
    paddingVertical: 16, 
    paddingHorizontal: 26, 
    backgroundColor: palette.accent,
    borderRadius: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  ctaText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0b1221",
  },
});
