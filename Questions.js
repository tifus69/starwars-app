import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Logo from "./assets/logo.png";
import { FontAwesome } from "@expo/vector-icons";

const Questions = ({ name }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.question}>
        Wich of all StarWars movies has longest opening crawl ?{" "}
      </Text>
      <Text style={styles.response}> Return of Jedi</Text>
      <Text style={styles.question}>
        What character (person) appeared in the most of StarWars films ?
      </Text>
      <Text style={styles.response}>{name}</Text>
      <Text style={styles.question}>
        What species appeared in the most number of StarWars films ?
      </Text>
      <Text style={styles.response}>Human (5)</Text>
      <Text style={styles.response}>Human (5)</Text>
      <Text style={styles.response}>Human (5)</Text>
      <Text style={styles.question}>
        What planet in Starwars universe provided largest number of vehicule
        pilots ?
      </Text>
      <Text style={styles.response}>
        Planet: earth - Pilot: (12) Han Solo - Human, Yoda - Yodi
      </Text>
      <Text style={styles.response}>
        Planet: earth - Pilot: (12) Han Solo - Human, Yoda - Yodi
      </Text>
      <Text style={styles.response}>
        Planet: earth - Pilot: (12) Han Solo - Human, Yoda - Yodi
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center"
  },
  question: {
    color: "#fff"
  },
  response: {
    color: "yellow"
  }
});

export default Questions;
