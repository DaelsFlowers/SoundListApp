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
import { styles } from "../assets/styles/UsuarioStyles";
import { Ionicons } from "@expo/vector-icons";

// Images
import Top from "../assets/top.png";
import FavoritosIMG from "../assets/join.png";
import Pref from "../assets/pref.png";
import Enviarbtn from "../assets/btnenviar.png";
import Up from "../assets/up.png";

const Usuario = ({ navigation }) => {
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
          <Text style={styles.cardTitle}>TITULO DEL EVENTO</Text>
          <View style={styles.cardContainer}>
            <Text style={styles.tittlelow}>AGREGAR CANCION</Text>
            <View>
              <Text style={{ fontSize: 12, marginTop: 5, textAlign: "center" }}>
                NOMBRE DE LA CANCION
              </Text>
              <TextInput
                style={styles.input}
                keyboardType="default"
                onChangeText={(text) => handleChange(text, "nivel")}
              />
            </View>
            <TouchableOpacity>
              <Image style={styles.btnenviarimg} source={Enviarbtn} />
            </TouchableOpacity>
          </View>

          <View style={styles.cardContainer}>
            <Text style={styles.tittleList}>AHORA</Text>
            <View style={styles.divider} />
            <View style={styles.eventContainer}>
              <Text style={styles.eventTitle}>TITULO CANCION</Text>
            </View>
            <Text style={styles.tittleList}>LISTA</Text>
            <View style={styles.divider} />
            <View style={styles.cardsong}>
              <View>
                <Text style={styles.eventTitleaux}>TITULO CANCION</Text>
              </View>
              <TouchableOpacity style={styles.aux}>
                  <Image source={Up} style={styles.imgaux} />
                  <Text style={styles.textaux}>5</Text>
              </TouchableOpacity>
            </View>
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

export default Usuario;
