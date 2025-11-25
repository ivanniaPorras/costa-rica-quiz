import React, { useState, useEffect } from "react";
import { View, Text, Button, ScrollView } from "react-native";
import PLACES from "../data/places";
import MapaCR from "../components/MapaCR";
import { calcularDistancia } from "../utils/distance";
import { calcularPuntos } from "../utils/scoring";

export default function GameScreen({ route, navigation }) {
    const { level } = route.params; // recibe el nivel

    const [lugaresFiltrados, setLugaresFiltrados] = useState([]);
    const [indexRonda, setIndexRonda] = useState(0);
    const [latJugador, setLatJugador] = useState(null);
    const [lngJugador, setLngJugador] = useState(null);
    const [puntosRondas, setPuntosRondas] = useState([]);

    useEffect(() => {
        // filtra los lugares
        const filtrados = PLACES.filter((l) => l.dificultad === level);

        // los mecla
        const mezclados = filtrados.sort(() => Math.random() - 0.5);

        // por ahora usa los primeros 3 para probarlo
        setLugaresFiltrados(mezclados.slice(0, 3));
    }, [level]);

    if (lugaresFiltrados.length === 0) {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>Cargando lugares...</Text>
            </View>
        );
    }

    const lugarActual = lugaresFiltrados[indexRonda];

    const handleSiguiente = () => {
        if (!latJugador || !lngJugador) {
            alert("Debes seleccionar un punto en el mapa.");
            return;
        }

        // Coordenadas reales del lugar actual
        const latReal = lugarActual.lat;
        const lngReal = lugarActual.lng;

        // Calcula distancia
        const distancia = calcularDistancia(latJugador, lngJugador, latReal, lngReal);

        // Calcula puntos
        const puntos = calcularPuntos(distancia);

        // Guarda puntaje de esta ronda
        setPuntosRondas((prev) => [...prev, puntos]);

        // Pasa a la siguiente ronda
        if (indexRonda + 1 >= lugaresFiltrados.length) {
            navigation.navigate("Results", {
                total: lugaresFiltrados.length,
                nivel: level,
                puntos: [...puntosRondas, puntos],  // envia puntajes
            });
        } else {
            setIndexRonda(indexRonda + 1);
            setLatJugador(null);
            setLngJugador(null);
        }
    };


    return (
        <ScrollView
            contentContainerStyle={{
                padding: 20,
                alignItems: "center",
            }}
        >
            <Text style={{ fontSize: 24, marginBottom: 10 }}>
                Ronda {indexRonda + 1}
            </Text>

            <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
                {lugarActual.nombre}
            </Text>

            <Text style={{ fontWeight: "bold", marginTop: 10 }}>Pistas:</Text>
            {lugarActual.pistas.map((p, i) => (
                <Text key={i}>• {p}</Text>
            ))}

            <Text
                style={{
                    marginTop: 20,
                    fontWeight: "bold",
                }}
            >
                Selecciona en el mapa:
            </Text>

            <MapaCR
                onSelect={(lat, lng) => {
                    setLatJugador(lat);
                    setLngJugador(lng);
                }}
            />

            {latJugador && lngJugador && (
                <Text style={{ marginTop: 10 }}>
                    Ubicación seleccionada: {latJugador.toFixed(4)},{" "}
                    {lngJugador.toFixed(4)}
                </Text>
            )}

            <View style={{ marginTop: 20, width: "80%" }}>
                <Button title="Siguiente" onPress={handleSiguiente} />
            </View>
        </ScrollView>
    );
}
