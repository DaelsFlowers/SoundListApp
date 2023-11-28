import React, { useState } from "react";
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
} from "react-native";
import firebase from "firebase/app";
import "firebase/auth";
import { styles } from "../assets/styles/LoginStyles.js";
import { TouchableOpacity } from "react-native";

// Images
import TopLogin from "../assets/topLogin.png";
import ButtonLogin from "../assets/buttonLogin.png";
import Show from "../assets/show.png";
import Hide from "../assets/hide.png";

export default function LoginScreen({ navigation }) {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

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

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          style={{ flex: 1 }}
        >
          <View style={styles.topContainer}>
            <View style={styles.topContainerAux}></View>
            <Image style={styles.bannerImage} source={TopLogin} />
          </View>

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
                INICIAR SESION
              </Text>

              <Text style={{ marginLeft: 30, fontSize: 16, marginTop: 50 }}>
                CORREO
              </Text>
              <TextInput
                style={styles.input}
                keyboardType="default"
                placeholder="Ingresa tu correo"
                onChangeText={(text) => handleChange(text, "email")}
              />

              <Text style={{ marginLeft: 30, fontSize: 16, marginTop: 20 }}>
                CONTRASEÑA
              </Text>
              <View>
                <TextInput
                  style={styles.input}
                  keyboardType="default"
                  placeholder="Ingresa tu contraseña"
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

      {/* Bottom Container */}
      <View style={styles.bottomContainer}>
        <View style={styles.cornerButton}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Register")}
            style={styles.cornerButtonPress}
          />
          <Image style={styles.bottomBannerImage} source={ButtonLogin} />
        </View>
      </View>
    </SafeAreaView>
  );
}
