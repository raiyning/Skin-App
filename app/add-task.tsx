import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const AddTaskScreen = () => {
  const [title, setTitle] = useState(""); // State for title
  const [description, setDescription] = useState(""); // State for description
  const [emoji, setEmoji] = useState(""); // State for emoji
  const [progress, setProgress] = useState("0/1"); // Default progress state
  const router = useRouter();

  const handleAddTask = () => {
    if (!title || !description || !emoji) {
      alert("Please fill out all fields!"); // Validation check
      return;
    }
console.log("add task")
    router.back(); // Navigate back to the main screen
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
