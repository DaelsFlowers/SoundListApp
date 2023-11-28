import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView, Keyboard } from "react-native";
import { styles } from "../assets/styles/HomeStyles.js";
import { Ionicons } from '@expo/vector-icons';

// Images
import Top from "../assets/top.png";
import Eventos from "../assets/eventos.png";
import Pref from "../assets/pref.png"

const Home = ({ navigation }) => {
  const [keyboardOffset, setKeyboardOffset] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      ({ endCoordinates }) => {
        setKeyboardOffset(endCoordinates.height);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
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
          <Text style={styles.cardTitle}>EVENTOS</Text>
          <View style={styles.cardContainer}>
            {/* Buscador */}
            <View style={styles.searchContainer}>
              <Ionicons name="search" size={24} color="black" />
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar eventos..."
              />
            </View>

            {/* Evento */}
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


          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <View style={styles.cornerButton}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Favoritos")}
            style={styles.cornerButtonPress}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("Join")}
            style={styles.cornerButtonPressJoin}
          />
          <Image style={styles.bottomBannerImage} source={Eventos} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;