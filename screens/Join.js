import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  Alert,
} from "react-native";
import { styles } from "../assets/styles/JoinStyles";
import { Ionicons } from "@expo/vector-icons";

// Images
import Top from "../assets/top.png";
import bar from "../assets/join.png";
import Pref from "../assets/pref.png";
import btnenviar from "../assets/btnenviar.png";

const Join = ({ navigation }) => {
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const [inputCode, setInputCode] = useState("");

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      ({ endCoordinates }) => {
        setKeyboardOffset(endCoordinates.height);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardOffset(0);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleChange = (text, field) => {
    // Handle changes in the input field (if needed)
    setInputCode(text);
  };

  const handleJoinEvent = () => {
    // Replace 'yourEventArray' with the actual array containing your events
    const event = yourEventArray.find((e) => e.codigo === inputCode);

    if (event) {
      // Code found, navigate or perform actions accordingly
      // You can add logic to add the user to the event
      Alert.alert("Success", "Joined the event successfully");
    } else {
      // Code not found, display a message
      Alert.alert("Error", "Group not found. Please enter a valid code.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Image style={styles.topImage} source={Top} />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: keyboardOffset }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.middleContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Create")}>
            <View style={styles.cardContainer}>
              <Text style={styles.cardTitle}>CREAR TU EVENTO</Text>
              <Text style={styles.tittlelow}>
                CREA TU EVENTO PERSONAL O PUBLICO
              </Text>
            </View>
          </TouchableOpacity>

          <View style={styles.cardContainer}>
            <Text style={styles.cardTitle}>UNETE AL EVENTO</Text>
            <Text style={styles.tittlelow}>
              CODIGO DE ACCESO DEL EVENTO PARA INGRESAR
            </Text>
            <TextInput
              style={styles.input}
              keyboardType="default"
              onChangeText={(text) => handleChange(text, "codigo")}
            />
            <TouchableOpacity onPress={handleJoinEvent}>
              <Image style={styles.btnenviarimg} source={btnenviar} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <View style={styles.cornerButton}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            style={styles.cornerButtonPress}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("Join")}
            style={styles.cornerButtonPressJoin}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("Favoritos")}
            style={styles.cornerButtonPressaux}
          />
          <Image style={styles.bottomBannerImage} source={bar} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Join;
