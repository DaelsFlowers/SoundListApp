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
import { styles } from "../assets/styles/RegisterStyles.js";
import { TouchableOpacity } from "react-native";

// Images
import TopLogin from "../assets/topLogin.png";
import ButtonRegister from "../assets/buttonRegister.png";
import Show from "../assets/show.png";
import Hide from "../assets/hide.png";

export default function RegisterScreen({ navigation }) {
  const auth = firebase.auth;
  const firestore = firebase.firestore;

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const handleChange = (text, eventName) => {
    setValues((prev) => ({ ...prev, [eventName]: text }));
  };

  const [showPassword, setShowPassword] = useState(false);

  function Register() {
    const { name, email, password, password2, phone } = values;

    if (password == password2) {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          firestore().collection("Users").doc(auth().currentUser.uid).set({
            uid: auth().currentUser.uid,
            name,
            email,
            password,
            password2,
            phone,
          });
          alert("CUENTA CREADA");
        })
        .catch((error) => {
          alert(error.message);
          console.log(error.message);
        });
    } else {
      alert("LAS CONTRASEÑAS SON DIFERENTES");
    }
  }
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

              <Text style={{ marginLeft: 30, fontSize: 14, marginTop: 10 }}>
                NOMBRE
              </Text>
              <TextInput
                style={styles.input}
                keyboardType="default"
                onChangeText={(text) => handleChange(text, "name")}
              />
              <Text style={{ marginLeft: 30, fontSize: 14, marginTop: 10 }}>
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

              <Text style={{ marginLeft: 30, fontSize: 14, marginTop: 10 }}>
                CONTRASEÑA
              </Text>
              <TextInput
                style={styles.input}
                keyboardType="default"
                onChangeText={(text) => handleChange(text, "password2")}
                secureTextEntry={!showPassword}
              />

              <View style={[styles.button, styles.loginButton]}>
                <Button
                  title="INGRESAR"
                  color="#D481C7"
                  onPress={() => Register()}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Bottom Container */}
      <View style={styles.bottomContainer}>
        <View style={styles.cornerButton}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={styles.cornerButtonPress}
          />
          <Image style={styles.bottomBannerImage} source={ButtonRegister} />
        </View>
      </View>
    </SafeAreaView>
  );
}
