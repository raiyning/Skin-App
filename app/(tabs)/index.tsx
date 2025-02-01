import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from "react-native";
import { Stack, useRouter } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import TaskCard from "@/components/TaskCard";
import CircleButton from "@/components/CircleButton";
import { Tasks, Task } from "@/types/task"; // Example types
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSystem } from "@/lib/powersync/PowerSync";
import { TASKS_TABLE } from "@/lib/powersync/AppSchema"

const App = () => {
  const router = useRouter();

  const [tasks, setTasks] = useState<Tasks>([]);
  const [loading, setLoading] = useState<boolean>(true);


  const { supabaseConnector, powersync, db } = useSystem();
  const onSignOut = async () => {
    await powersync.disconnect();
    await supabaseConnector.client.auth.signOut();
  };

  // 1. Fetch initial data
const fetchTasks = async () => {
  try {
    setLoading(true);
    
    // Query tasks using Kysely
    const data = await db
      .selectFrom("tasks") // Adjust table name if needed
      .selectAll()
      .execute();
    setTasks(data);
  } catch (err) {
    console.error("Error fetching tasks:", err);
  } finally {
    setLoading(false);
  }
};

  // 2. Set up realtime subscription
  useEffect(() => {
    fetchTasks(); // Fetch tasks on mount
  }, []);

  const handleTaskPress = (taskId: number) => {
    router.push(`/task/${taskId}`);
  };

  const onAddTask = () => {
    router.push("/add-task");
  };

  const HeaderRight = () => (
    <TouchableOpacity
      onPress={() => router.push("/modal-add-task")}
      style={{ marginRight: 10 }}
    >
      <FontAwesome name="plus-circle" size={28} color="yellow" />
    </TouchableOpacity>
  );

  const HeaderLeft = () => (
    <TouchableOpacity onPress={onSignOut}>
    <Ionicons name="log-out-outline" size={24} color="white" />
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <Stack.Screen   
      options={{ 
        headerRight: () => <HeaderRight />,
        headerLeft: () => <HeaderLeft/>
      }}  
      />
      {loading && <Text style={styles.loadingText}>Loading...</Text>}

      <ScrollView>
        {!loading && tasks.length > 0 ? (
          tasks.map((task) => (
            <TouchableOpacity key={Number(task.id)} onPress={() => handleTaskPress(Number(task.id))}>
              <TaskCard task={task} />
            </TouchableOpacity>
          ))
        ) : !loading ? (
          <Text style={styles.emptyText}>No tasks available. Add a task!</Text>
        ) : null}
      </ScrollView>

      <View style={styles.optionsContainer}>
        <CircleButton onPress={onAddTask} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 16,
  },
  loadingText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 20,
  },
  emptyText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  optionsContainer: {
    position: "absolute",
    bottom: 80,
    left: 0,
    right: 0,
    alignItems: "center",
  },
});

export default App;
