import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import firebase from "firebase/app";
import "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Screens
import LoginScreen from "./login/LoginScreen";
import RegisterScreen from "./login/RegisterScreen";
import Home from "./screens/Home";
import Favoritos from "./screens/Favoritos";
import Usuario from "./screens/Usuario";
import Administrador from "./screens/Administrador";
import Join from "./screens/Join";
import Create from "./screens/Create";
import SettingsAdmin from "./screens/SettingsAdmin";
import Perfil from "./screens/Perfil";

const Stack = createNativeStackNavigator();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const firebaseConfig = {
    apiKey: "AIzaSyAL2cKVzwNwSy9fyQ1U76_-KuNI8X5UwXM",
    authDomain: "soundlist-4a592.firebaseapp.com",
    databaseURL: "https://soundlist-4a592-default-rtdb.firebaseio.com",
    projectId: "soundlist-4a592",
    storageBucket: "soundlist-4a592.appspot.com",
    messagingSenderId: "545875860146",
    appId: "1:545875860146:web:b950bd207f66ef82e9c7ab",
    measurementId: "G-JPF08JFY1N",
  };

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  const screenOptions = { headerShown: false };

  const renderAuthenticatedScreens = () => (
    <>
      <Stack.Screen name="Home" component={Home} options={screenOptions} />
      <Stack.Screen name="Favoritos" component={Favoritos} options={screenOptions} />
      <Stack.Screen name="Join" component={Join} options={screenOptions} />
      <Stack.Screen name="Create" component={Create} options={screenOptions} />
      <Stack.Screen name="Usuario" component={Usuario} options={screenOptions} />
      <Stack.Screen name="Administrador" component={Administrador} options={screenOptions} />
      <Stack.Screen name="SettingsAdmin" component={SettingsAdmin} options={screenOptions} />
      <Stack.Screen name="Perfil" component={Perfil} options={screenOptions} />
    </>
  );

  const renderNonAuthenticatedScreens = () => (
    <>
      <Stack.Screen name="Login" component={LoginScreen} options={screenOptions} />
      <Stack.Screen name="Register" component={RegisterScreen} options={screenOptions} />
    </>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? renderAuthenticatedScreens() : renderNonAuthenticatedScreens()}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;