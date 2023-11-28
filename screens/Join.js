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
} from "react-native";
import { styles } from "../assets/styles/JoinStyles";
import { Ionicons } from "@expo/vector-icons";

// Images
import Top from "../assets/top.png";
import bar from "../assets/join.png";
import Pref from "../assets/pref.png";

const Join = ({ navigation }) => {
  const [keyboardOffset, setKeyboardOffset] = useState(0);

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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Image style={styles.topImage} source={Top} />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: keyboardOffset }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.middleContainer}>
          <TouchableOpacity  onPress={() => navigation.navigate("Create")}>
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
              CODIGO DE ACCESO DEL EVENTO PARA INGREAR
            </Text>
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
