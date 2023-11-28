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
import { styles } from "../assets/styles/RegisterStyles.js";

// Imágenes
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

  const [showPassword, setShowPassword] = useState(false);
  const [showBottomContainer, setShowBottomContainer] = useState(true);

  const handleChange = (text, eventName) => {
    setValues((prev) => ({ ...prev, [eventName]: text }));
  };

  function Register() {
    const { name, email, password, password2 } = values;

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
          style={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
          onPress={() => Keyboard.dismiss()}
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
                REGISTRAR CUENTA
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
                CONFIRMAR CONTRASEÑA
              </Text>
              <TextInput
                style={styles.input}
                keyboardType="default"
                onChangeText={(text) => handleChange(text, "password2")}
                secureTextEntry={!showPassword}
              />

              <View style={[styles.button, styles.loginButton]}>
                <Button title="REGISTRAR" color="#D481C7" onPress={Register} />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Contenedor Inferior */}
      {showBottomContainer && (
        <View style={styles.bottomContainer}>
          <View style={styles.cornerButton}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              style={styles.cornerButtonPress}
            />
            <Image style={styles.bottomBannerImage} source={ButtonRegister} />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
