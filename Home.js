import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
  ActivityIndicator
} from "react-native";
import Logo from "./assets/logo.png";
import Questions from "./Questions";
import axios from "axios";
import { FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";
let animatedValue = new Animated.Value(1);

const Home = () => {
  const [showQuestions, setStatusQuestions] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const animatedStyle = {
    transform: [{ scale: animatedValue }]
  };

  const handlePress = () => {
    if (!showQuestions) {
      setLoading(true);
      Animated.timing(animatedValue, { toValue: 10 }).start();
    } else {
      Animated.timing(animatedValue, { toValue: 1 }).start();
    }
    axios
      .get("https://swapi.co/api/people/?search=yoda")
      .then(res => {
        setLoading(false);
        setName(res.data.results[0].name);
      })
      .then(() => setStatusQuestions(!showQuestions))
      .catch(error => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <Image source={Logo} style={{ width: 250, height: 150 }} />
      <Animated.View style={{ transform: [{ translateY: animatedValue }] }}>
        <TouchableOpacity
          onPress={() => handlePress()}
          style={styles.button}
          activeOpacity={1}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FontAwesome name="star" size={32} style={styles.star} />
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              Do. Or do not. There is no try.
            </Text>
            <FontAwesome name="star" size={32} style={styles.star} />
          </View>
        </TouchableOpacity>
      </Animated.View>
      <TouchableOpacity style={styles.button2}></TouchableOpacity>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="yellow" />
        </View>
      ) : (
        <ScrollView style={styles.scrollview}>
          {showQuestions && <Questions name={name} />}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100,
    fontFamily: "roboto"
  },
  button: {
    backgroundColor: "yellow",
    height: 50,
    width: 320,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    elevation: 3,
    borderColor: "#111",
    borderWidth: 1
  },
  button2: {
    backgroundColor: "yellow",
    height: 40,
    width: 320,
    borderRadius: 10,
    marginTop: -20,
    zIndex: -1,
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    borderColor: "#111",
    borderWidth: 1
  },
  star: {
    padding: 5
  },
  scrollview: {
    padding: 5,
    paddingTop: 10
  },
  loading: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  }
});

export default Home;
