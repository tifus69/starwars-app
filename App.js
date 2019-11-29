import React, { useState, useEffect } from "react";

import * as Font from "expo-font";
import Home from "./Home";

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

  return fontLoaded && <Home />;
};

export default App;
