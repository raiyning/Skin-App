import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

const TaskDetails = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // Get the task ID from the URL parameters
  const tasks = [
    {
      id: 1,
      title: "Bedtime Oral Health",
      description: "1. Floss 2. Brush teeth 3. Whitening product 4. Clean",
      emoji: "🦷",
      progress: "0/1",
    },
    {
      id: 2,
      title: "Gym",
      description: "Look good",
      emoji: "💪",
      progress: "0/1",
    }]
    // Find the task by ID

  if (!tasks[0]) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Task not found!</Text>
        <Button title="Go Back" onPress={() => router.back()} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>{tasks[0].emoji}</Text>
      <Text style={styles.title}>{tasks[0].title}</Text>
      <Text style={styles.description}>{tasks[0].description}</Text>
      <Text style={styles.progress}>Progress: {tasks[0].progress}</Text>
      <Button title="Go Back" onPress={() => router.back()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black", padding: 16, alignItems: "center" },
  emoji: { fontSize: 48, marginBottom: 16 },
  title: { fontSize: 24, fontWeight: "bold", color: "white", marginBottom: 8 },
  description: { fontSize: 16, color: "#aaa", marginBottom: 16 },
  progress: { fontSize: 16, color: "white", marginBottom: 16 },
  errorText: { fontSize: 18, color: "red", textAlign: "center", marginBottom: 16 },
});

export default TaskDetails;
