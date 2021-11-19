import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Home } from "./pages/home";
import { Main } from "./main";

export default function App() {
  return (
    <View style={styles.container}>
      <Main />
      {/* <List /> */}
      {/* <Text>Trop facile, mais pas tant que ça</Text> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
