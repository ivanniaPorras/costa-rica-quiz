import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { collection, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

// LeaderboardScreen muestra el top 10 de puntajes más altos en tiempo real
export default function LeaderboardScreen() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

 // useEffect para suscribirse a los cambios en la colección "games"
  useEffect(() => {
    const gamesRef = collection(db, "games");
    const q = query(gamesRef, orderBy("score", "desc"), limit(10));
    
// Suscripción en tiempo real a los datos del leaderboard
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc, index) => {
          const payload = doc.data();
          return {
            id: doc.id,
            rank: index + 1,
            name: payload.userName || "Sin nombre",
            score: payload.score || 0,
            createdAt: payload.createdAt,
          };
        });
        setEntries(data);
        setLoading(false);
      },
      (error) => {
        console.log("Error al cargar leaderboard:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }) => {
    const dateObj =
      item.createdAt && item.createdAt.toDate ? item.createdAt.toDate() : null;

    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingVertical: 10,
          borderBottomWidth: 1,
          borderColor: "#e0e0e0",
        }}
      >
        <Text style={{ width: 40, fontWeight: "bold", fontSize: 16 }}>
          #{item.rank}
        </Text>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item.name}</Text>
          <Text style={{ color: "#555" }}>
            {dateObj ? dateObj.toLocaleDateString() : "Sin fecha"}
          </Text>
        </View>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.score}</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#fff" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
        Leaderboard global
      </Text>
      <Text style={{ marginBottom: 20, color: "#555" }}>
        Top 10 puntajes (mayor a menor) en tiempo real.
      </Text>

      {loading ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      ) : entries.length === 0 ? (
        <Text>No hay puntajes guardados aún.</Text>
      ) : (
        <FlatList data={entries} renderItem={renderItem} keyExtractor={(item) => item.id} />
      )}
    </View>
  );
}
