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
import { styles } from "../assets/styles/AdministradorStyles";
import { Ionicons } from "@expo/vector-icons";

// Images
import Top from "../assets/top.png";
import FavoritosIMG from "../assets/join.png";
import Pref from "../assets/pref.png";
import Enviarbtn from "../assets/btnenviar.png";
import Up from "../assets/up.png";
import SettingsIco from "../assets/settingsico.png";
import Upadm from "../assets/Upadm.png";
import Delete from "../assets/delete.png";

const Administrador = ({ navigation }) => {
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
        <TouchableOpacity style={styles.settingsimg} onPress={() => navigation.navigate("SettingsAdmin")}>
          <Image style={styles.imgsetting} source={SettingsIco} />
        </TouchableOpacity>
        <View style={styles.middleContainer}>
          <Text style={styles.cardTitle}>TITULO DEL EVENTO</Text>

          <View style={styles.cardContainer}>
            <Text style={styles.tittleList}>AHORA</Text>
            <View style={styles.divider} />
            <View style={styles.cardsong}>
              <Text style={styles.eventTitleaux}>TITULO CANCION</Text>

              <TouchableOpacity style={styles.aux2}>
                <Image source={Delete} style={styles.imgaux3} />
              </TouchableOpacity>
            </View>
            <Text style={styles.tittleList}>LISTA</Text>
            <View style={styles.divider} />
            <View style={styles.cardsong}>
              <View>
                <Text style={styles.eventTitleaux}>TITULO CANCION</Text>
              </View>
              <View style={styles.aux1}>
                <Text style={styles.eventTitleaux}>5</Text>
              </View>
              <View style={styles.aux}>
                <TouchableOpacity>
                  <Image source={Upadm} style={styles.imgaux} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image source={Delete} style={styles.imgaux} />
                </TouchableOpacity>
              </View>
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

export default Administrador;
