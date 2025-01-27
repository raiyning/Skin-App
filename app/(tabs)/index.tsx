// index.tsx
import React , { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Text, TouchableOpacity} from "react-native";
import CircleButton from "@/components/CircleButton";
import { Stack, useRouter } from "expo-router";
import { Tasks } from "@/types/task"
import TaskCard from "@/components/TaskCard"; // Import the TaskCard component
import FontAwesome from "@expo/vector-icons/FontAwesome";


const App = () => {

  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const tasks: Tasks = [
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

    
    

  const handleTaskPress = (taskId: number) => {
    router.push(`/task/${taskId}`); // Navigate to the dynamic task details page
  };
  const onAddTask = () => {
    router.push("/add-task"); // Navigate to Add Task screen
  };

  const headerRight = () => (
    <TouchableOpacity
      onPress={() => router.push("/modal-add-task")}
      style={{ marginRight: 10 }}
    >
      <FontAwesome name="plus-circle" size={28} color="yellow" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen options={{headerRight}}/>
      <ScrollView>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
            />
          ))
        ) : (
          <Text style={styles.emptyText}>No tasks available. Add a task!</Text>
        )}
      </ScrollView>
      <View style={styles.optionsContainer}>
        <CircleButton onPress={onAddTask} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black", padding: 16 },
  taskCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    borderRadius: 16,
    marginVertical: 8,
    padding: 16,
  },
  emoji: { fontSize: 32, marginRight: 16 },
  taskContent: { flex: 1 },
  taskTitle: { fontSize: 16, fontWeight: "bold", color: "white" },
  taskDescription: { fontSize: 14, color: "#aaa", marginTop: 4 },
  progress: { fontSize: 14, color: "white" },
  optionsContainer: {
    position: "absolute",
    bottom: 80,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  emptyText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});

export default App;