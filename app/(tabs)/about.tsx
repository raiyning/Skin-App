import { router, Stack, useFocusEffect } from "expo-router";
import React, { useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useSQLiteContext } from "expo-sqlite";


const AboutScreen = () => {
  const [data, setData] = React.useState< { id: number; name: string; email: string }[]>([]);
  const database = useSQLiteContext();
  useFocusEffect(
    useCallback(() => {
      loadData(); // Fetch data when the screen is focused
    }, [])
  );

  const headerRight = () => (
    <TouchableOpacity
      onPress={() => router.push("/modal-add-task")}
      style={{ marginRight: 10 }}
    >
      <FontAwesome name="plus-circle" size={28} color="yellow" />
    </TouchableOpacity>
  );

  const loadData = async () => {
    const result = await database.getAllAsync<{
      id: number;
      name: string;
      email: string;
    }>("SELECT * FROM users");
    setData(result);
  };

  const handleDelete = async (id: number) => {
    try{
      await database.runAsync("DELETE FROM users WHERE id=?;", [id])
      loadData()
    } catch (e) {
      console.error(e)
    }

  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerRight }} />
      <View>
        <FlatList
          data={data}
          renderItem={({
            item,
          }: {
            item: { id: number; name: string; email: string };
          }) => (
            <View style={{ padding: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text style= {{ fontSize: 16, fontWeight: "bold", color: "white" }}>{item.name}</Text>
                  <Text style= {{ fontSize: 10, color: "white" }} >{item.email}</Text>
                </View>
                <View
                style={{flex: 1, flexDirection: "row", justifyContent:"flex-end", gap: 10 }}
                >
                <TouchableOpacity
                  onPress={() => {
                    router.push(`/modal-add-task?id=${item.id}`);
                  }}
                  style={styles.button}
                >
                  <Text style={[styles.buttonText, {color: "black"}]}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    handleDelete(item.id)
                  }}
                  style={[styles.button, {backgroundColor: "red"}]}
                >
                  <Text style={[styles.buttonText] }>Delete</Text>
                </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black", padding: 16 },
  button: {
    height: 30,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: "yellow",
    alignContent: "flex-end",
  },
  buttonText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
  },
  title: { fontSize: 16, fontWeight: "bold", color: "white" },
});



export default AboutScreen;