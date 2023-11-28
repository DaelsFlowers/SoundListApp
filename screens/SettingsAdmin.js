import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  TextInput,
  Alert,
} from "react-native";
import { styles } from "../assets/styles/SettingsAdminStyles";
import { Ionicons } from "@expo/vector-icons";
import Top from "../assets/top.png";
import bar from "../assets/join.png";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import btncrear from "../assets/btncrear.png";
import update from "../assets/update.png";
import fevent from "../assets/fevent.png";

const SettingsAdmin = ({ route, navigation }) => {
  const auth = firebase.auth;
  const firestore = firebase.firestore;
  const user = firebase.auth().currentUser;
  const eventId = route.params?.eventId || "";

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
          <View style={styles.cardContainer}>
            <Text style={styles.cardTitle}>CONFIGURACION</Text>

            <View>
              <Text style={{ fontSize: 14, marginTop: 5, textAlign: "center" }}>
                CODIGO: {eventId.codigo}
              </Text>
              <Text style={{ fontSize: 14, marginTop: 5, textAlign: "center" }}>
                NOMBRE DEL EVENTO: {eventId.nombre}
              </Text>
              <Text style={{ fontSize: 14, marginTop: 5, textAlign: "center" }}>
                NIVEL: {eventId.nivel}
              </Text>
              <Text style={{ fontSize: 14, marginTop: 5, textAlign: "center" }}>
                INICIO: {eventId.inicio}
              </Text>
              <Text style={{ fontSize: 14, marginTop: 5, textAlign: "center" }}>
                FIN: {eventId.fin}
              </Text>
              <Text style={{ fontSize: 14, marginTop: 5, textAlign: "center" }}>
                VISIBILIDAD: {eventId.visibilidad}
              </Text>
            </View>

            <View
              style={[
                styles.btncontent,
                { flexDirection: "row", justifyContent: "space-between" },
              ]}
            >
              <TouchableOpacity onPress={() => firebase.auth().signOut()}>
                <Image style={styles.btncrear} source={update} />
              </TouchableOpacity>
              <TouchableOpacity >
                <Image style={styles.btncrear} source={fevent} />
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

export default SettingsAdmin;