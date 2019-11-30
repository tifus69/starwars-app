import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import Home from "./components/Home";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import gql from "graphql-tag";

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: "http://192.168.1.40:4000/salutGraphQL"
});

const client = new ApolloClient({
  cache,
  link
});

const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        roboto: require("./assets/fonts/Roboto-Regular.ttf")
      });
      setFontLoaded(true);
    };
    loadFont();
  }, [fontLoaded]);

  return (
    fontLoaded && (
      <ApolloProvider client={client}>
        <Home />
      </ApolloProvider>
    )
  );
};

export default App;
