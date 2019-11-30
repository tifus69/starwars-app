import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated
} from "react-native";
import Logo from "../assets/logo.png";
import { FontAwesome } from "@expo/vector-icons";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Questions from "./Questions";

let animatedValue = new Animated.Value(0);
let animatedViewValue = new Animated.Value(0);

const GET_PEOPLE = gql`
  query {
    people(search: "Yoda") {
      name
    }
  }
`;

const Home = () => {
  const [ready, setReadyStatus] = useState(false);
  const [name, setName] = useState("");
  const { data, loading, error } = useQuery(GET_PEOPLE);

  useEffect(() => {
    if (data) {
      setName(data.people.name);
    }
  }, [data]);

  const handlePress = () => {
    if (!ready) {
      Animated.timing(animatedValue, { toValue: 10 }).start();
      return setReadyStatus(true);
    }
    Animated.timing(animatedValue, { toValue: 1 }).start();
    return setReadyStatus(false);
  };

  const handlePressView = () => {
    Animated.timing(animatedViewValue, {
      toValue: 1,
      timing: 400
    }).start(() => {
      Animated.timing(animatedViewValue, {
        toValue: -1,
        duration: 400
      }).start();
    });
  };

  const animatedStyle = {
    opacity: animatedViewValue,
    zIndex: animatedViewValue
  };

  return (
    <TouchableOpacity
      style={{ flex: 1 }}
      activeOpacity={1}
      onPress={() => handlePressView()}
    >
      <View style={styles.container}>
        <Image source={Logo} style={styles.logo} />
        <Animated.View
          style={{ transform: [{ translateY: animatedValue }], zIndex: 1 }}
        >
          <TouchableOpacity
            onPress={() => handlePress()}
            style={styles.button}
            activeOpacity={1}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                opacity: ready ? 0.3 : 1
              }}
            >
              <FontAwesome name="star" size={32} style={styles.star} />
              <Text style={styles.buttonText}>
                Do. Or do not. There is no try.
              </Text>
              <FontAwesome name="star" size={32} style={styles.star} />
            </View>
          </TouchableOpacity>
        </Animated.View>
        <View style={styles.button2} />
        <Animated.View
          style={[styles.greenView, animatedStyle]}
        ></Animated.View>
        <ScrollView style={styles.scrollview}>
          {ready && <Questions name={name} loading={loading} />}
        </ScrollView>
      </View>
    </TouchableOpacity>
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
  logo: {
    width: 250,
    height: 150
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
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    borderColor: "#111",
    borderWidth: 1
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 18
  },
  star: {
    padding: 5
  },
  scrollview: {
    padding: 5,
    paddingTop: 10
  },
  greenView: {
    backgroundColor: "rgba(150,255,150,0.6)",
    height: 70,
    width: 320,
    marginTop: -70
  }
});

export default Home;
