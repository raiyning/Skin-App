import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import {Task} from '@/types/task'


interface TaskCardProps {
  task: Task; // Single task to display
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/task/${task.id}`); // Navigate to the task details page
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Text style={styles.emoji}>{task.emoji}</Text>
      <View style={styles.content}>
        <Text style={styles.title}>{task.title}</Text>
        <Text style={styles.description} numberOfLines={1}>
          {task.description}
        </Text>
      </View>
      <Text style={styles.progress}>{task.progress}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    borderRadius: 16,
    marginVertical: 8,
    padding: 16,
  },
  emoji: { fontSize: 32, marginRight: 16 },
  content: { flex: 1 },
  title: { fontSize: 16, fontWeight: "bold", color: "white" },
  description: { fontSize: 14, color: "#aaa", marginTop: 4 },
  progress: { fontSize: 14, color: "white" },
});

export default TaskCard;
