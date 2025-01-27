import { Stack } from "expo-router";
import { SQLiteDatabase, SQLiteProvider } from "expo-sqlite";
import { StatusBar } from "expo-status-bar";
import React from "react";

const createDbIfNeeded = async (db: SQLiteDatabase) => {
    //
    console.log("Creating database");
    try {
      // Create a table
      const response = await db.execAsync(
        "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, image TEXT)"
      );
      console.log("Database created", response);
    } catch (error) {
      console.error("Error creating database:", error);
    }
  };

const RootLayout = () => {
return (
    <>
    <SQLiteProvider databaseName="test.db" onInit={createDbIfNeeded}>
    <Stack>
        <Stack.Screen name ="(tabs)" options={{ headerShown: false}}/>
        <Stack.Screen name ="modal-add-task" options={{ presentation: "modal"}}/>
        <Stack.Screen name="+not-found" />
    </Stack>
    </SQLiteProvider>
    <StatusBar style="auto" />
    </>
)
}

export default RootLayout