import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import firebase from "firebase/app";
import "firebase/auth";
import { styles } from "../assets/styles/LoginStyles.js";

// Imágenes
import TopLogin from "../assets/topLogin.png";
import ButtonLogin from "../assets/buttonLogin.png";
import Show from "../assets/show.png";
import Hide from "../assets/hide.png";

export default function LoginScreen({ navigation }) {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [showBottomContainer, setShowBottomContainer] = useState(true);

  const handleChange = (text, eventName) => {
    setValues((prev) => ({ ...prev, [eventName]: text }));
  };

  const login = () => {
    const { email, password } = values;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {})
      .catch((error) => {
        alert(error.message);
      });
  };

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setShowBottomContainer(false);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setShowBottomContainer(true);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          style={{ flex: 1, flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Contenedor Superior */}
          <View style={styles.topContainer}>
            <View style={styles.topContainerAux}></View>
            <Image style={styles.bannerImage} source={TopLogin} />
          </View>

          {/* Contenedor Medio */}
          <View style={styles.middleContainer}>
            <View style={styles.cardContainer}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 32,
                  marginTop: 20,
                  fontWeight: "bold",
                }}
              >
                INICIAR SESIÓN
              </Text>

              <Text style={{ marginLeft: 30, fontSize: 16, marginTop: 50 }}>
                CORREO
              </Text>
              <TextInput
                style={styles.input}
                keyboardType="default"
                onChangeText={(text) => handleChange(text, "email")}
              />

              <Text style={{ marginLeft: 30, fontSize: 16, marginTop: 20 }}>
                CONTRASEÑA
              </Text>
              <View>
                <TextInput
                  style={styles.input}
                  keyboardType="default"
                  onChangeText={(text) => handleChange(text, "password")}
                  secureTextEntry={!showPassword}
                />
                <View style={styles.passwordShowButtonContainer}>
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Image
                      source={showPassword ? Hide : Show}
                      style={styles.passwordShowImage}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={[styles.button, styles.loginButton]}>
                <Button title="INGRESAR" color="#D481C7" onPress={login} />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Contenedor Inferior */}
      {showBottomContainer && (
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Register")}
            style={styles.cornerButtonPress}
          />
          <Image style={styles.bottomBannerImage} source={ButtonLogin} />
        </View>
      )}
    </SafeAreaView>
  );
}
