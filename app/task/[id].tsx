import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useSystem } from "@/lib/powersync/PowerSync";
import { TASKS_TABLE } from "@/lib/powersync/AppSchema";

const TaskDetails = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // Get the task ID from the URL parameters
  const { db } = useSystem();

  const [task, setTask] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [newTitle, setNewTitle] = useState<string| null>('');
  const [newDescription, setNewDescription] = useState<string | null>('');

  useEffect(() => {
    const fetchTaskById = async () => {
      try {
        setLoading(true);
        // Query the task by ID using Kysely
        const data = await db
          .selectFrom(TASKS_TABLE)
          .where("task_uuid", "=", id) // Assuming 'task_uuid' is the ID in the database
          .selectAll()
          .execute();

        if (data.length > 0) {
          setTask(data[0]);
          setNewTitle(data[0].title);
          setNewDescription(data[0].description);
        } else {
          setTask(null); // Task not found
        }
      } catch (error) {
        console.error("Error fetching task:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTaskById();
  }, [id, db]);

  const handleDelete = async () => {
    try {
      await db.deleteFrom(TASKS_TABLE).where("task_uuid", "=", id).execute();
      router.push('/'); // Navigate back to the task list after deletion
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await db
        .updateTable(TASKS_TABLE)
        .set({ title: newTitle, description: newDescription })
        .where("task_uuid", "=", id)
        .execute();
      // Update task in state
      setTask({ ...task, title: newTitle, description: newDescription });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading task...</Text>
      </View>
    );
  }

  if (!task) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Task not found!</Text>
        <Button title="Go Back" onPress={() => router.back()} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>{task.emoji}</Text>
      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.description}>{task.description}</Text>
      <Text style={styles.progress}>Progress: {task.progress}</Text>

      <TextInput
        style={styles.input}
        placeholder="Update title"
        value={newTitle || ""}
        onChangeText={setNewTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Update description"
        value={newDescription || ""}
        onChangeText={setNewDescription}
      />

      <TouchableOpacity onPress={handleUpdate} style={styles.updateButton}>
        <Text style={styles.buttonText}>Update Task</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
        <Text style={styles.buttonText}>Delete Task</Text>
      </TouchableOpacity>

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
  input: {
    height: 40,
    borderColor: "white",
    borderWidth: 1,
    color: "white",
    paddingLeft: 8,
    marginBottom: 16,
    width: "100%",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    padding: 10,
    fontSize: 16,
  },
  updateButton: {
    backgroundColor: "green",
    width: "100%",
    marginBottom: 16,
  },
  deleteButton: {
    backgroundColor: "red",
    width: "100%",
    marginBottom: 16,
  },
  errorText: { fontSize: 18, color: "red", textAlign: "center", marginBottom: 16 },
  loadingText: { fontSize: 18, color: "white", textAlign: "center", marginBottom: 16 },
});

export default TaskDetails;
