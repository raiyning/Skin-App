import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useSystem } from "@/lib/powersync/PowerSync";

const AddTaskScreen = () => {
  const { db } = useSystem();
  const [title, setTitle] = useState(""); // State for title
  const [id, setId] = useState(""); // State for title
  const [description, setDescription] = useState(""); // State for description
  const [emoji, setEmoji] = useState(""); // State for emoji
  const [progress, setProgress] = useState("0/1"); // Default progress state
  const router = useRouter();

  const handleAddTask = async () => {
    if (!title || !description || !emoji) {
      alert("Please fill out all fields!"); // Validation check
      return;
    }
    try {
      // Insert a new row in the "tasks" table
      await db
        .insertInto("tasks")
        .values({
          // Adjust the column names to match your actual DB schema
          id,
          title,
          description,
          emoji,
          progress
          // e.g., if you have user_id, created_at, etc. add them here
        })
        .execute();

      // PowerSync automatically picks this up and syncs to Supabase in the background.
      // Once done, navigate back or show a success message
      router.back();

    } catch (err) {
      console.error("Error adding task:", err);
      alert("There was an error adding the task.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Task Title:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter task title"
        placeholderTextColor="#fff"
      />
      <Text style={styles.label}>Task Id:</Text>
      <TextInput
        style={styles.input}
        value={id}
        onChangeText={setId}
        placeholder="Enter id"
        placeholderTextColor="#fff"
      />

      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter task description"
        placeholderTextColor="#fff"
      />

      <Text style={styles.label}>Emoji:</Text>
      <TextInput
        style={styles.input}
        value={emoji}
        onChangeText={setEmoji}
        placeholder="Enter emoji (e.g., 📝)"
        placeholderTextColor="#fff"
      />

      <Text style={styles.label}>Progress (optional):</Text>
      <TextInput
        style={styles.input}
        value={progress}
        onChangeText={setProgress}
        placeholder="Enter progress (e.g., 0/1)"
        placeholderTextColor="#fff"
      />

      <Button title="Add Task" onPress={handleAddTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black", padding: 16 },
  label: { fontSize: 16, marginBottom: 8, color: "white" },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 8,
    color: "#fff",
  },
});

export default AddTaskScreen;
