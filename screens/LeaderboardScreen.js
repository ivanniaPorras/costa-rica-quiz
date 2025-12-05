import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View, StyleSheet } from "react-native";
import { collection, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

const palette = {
  bg: "#0c1221",
  card: "#121b2f",
  accent: "#2dd4bf",
  text: "#f8fafc",
  muted: "#cbd5e1",
  outline: "#1f2a44",
};

export default function LeaderboardScreen() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const gamesRef = collection(db, "games");
    const q = query(gamesRef, orderBy("score", "desc"), limit(10));

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
    const dateObj = item.createdAt && item.createdAt.toDate ? item.createdAt.toDate() : null;
    return (
      <View style={styles.row}>
        <Text style={styles.rank}>#{item.rank}</Text>
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.date}>{dateObj ? dateObj.toLocaleDateString() : "Sin fecha"}</Text>
        </View>
        <Text style={styles.score}>{item.score}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Leaderboard global</Text>
        <Text style={styles.subtitle}>Top 10 puntajes en tiempo real</Text>

        {loading ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color={palette.accent} />
          </View>
        ) : entries.length === 0 ? (
          <Text style={styles.empty}>No hay puntajes guardados aún.</Text>
        ) : (
          <FlatList
            data={entries}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.bg,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    width: "100%",
    maxWidth: 820,
    padding: 20,
    backgroundColor: palette.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: palette.outline,
    gap: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: palette.text,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: palette.muted,
    textAlign: "center",
    marginBottom: 10,
  },
  loader: {
    paddingVertical: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  empty: {
    paddingVertical: 16,
    color: palette.muted,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  rank: {
    width: 40,
    fontSize: 16,
    fontWeight: "800",
    color: palette.accent,
    textAlign: "left",
  },
  info: {
    flex: 1,
    marginHorizontal: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: palette.text,
  },
  date: {
    fontSize: 12,
    color: palette.muted,
  },
  score: {
    fontSize: 18,
    fontWeight: "800",
    color: palette.text,
  },
  separator: {
    height: 1,
    backgroundColor: palette.outline,
    opacity: 0.6,
  },
});
