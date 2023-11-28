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
import { styles } from "../assets/styles/FavoritosStyles";
import { Ionicons } from "@expo/vector-icons";

// Images
import Top from "../assets/top.png";
import FavoritosIMG from "../assets/favoritos.png";
import Pref from "../assets/pref.png";

const Favoritos = ({ navigation }) => {
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
          <Text style={styles.cardTitle}>FAVORITOS</Text>
          <View style={styles.cardContainer}>
            <Text style={styles.tittlelow}>Mis Eventos</Text>
            <View style={styles.divider} />
            {/* Evento */}
            <TouchableOpacity onPress={() => navigation.navigate("Usuario")}>
              <View style={styles.eventContainer}>
                <Image style={styles.eventImage} source={Pref} />
                <View style={styles.eventDetailsContainer}>
                  <View style={styles.eventDetails}>
                    <Text style={styles.eventTitle}>ERROR_NAME</Text>
                  </View>
                  <View style={styles.eventNumberContainer}>
                    <Image style={styles.eventIcon} source={Pref} />
                    <Text style={styles.eventNumber}>42</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>

            <Text style={styles.tittlelow}>Favoritos</Text>
            <View style={styles.divider} />

            <TouchableOpacity onPress={() => navigation.navigate("Administrador")}>
              <View style={styles.eventContainer}>
                <Image style={styles.eventImage} source={Pref} />
                <View style={styles.eventDetailsContainer}>
                  <View style={styles.eventDetails}>
                    <Text style={styles.eventTitle}>ERROR_NAME</Text>
                  </View>
                  <View style={styles.eventNumberContainer}>
                    <Image style={styles.eventIcon} source={Pref} />
                    <Text style={styles.eventNumber}>42</Text>
                  </View>
                </View>
              </View>
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
          <Image style={styles.bottomBannerImage} source={FavoritosIMG} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Favoritos;
