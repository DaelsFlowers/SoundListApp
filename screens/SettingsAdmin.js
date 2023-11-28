// screens/Create.js
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
const SettingsAdmin = ({ navigation }) => {
  const auth = firebase.auth;
  const firestore = firebase.firestore;
  const user = firebase.auth().currentUser;

  const [values, setValues] = useState({
    codigo: "",
    creador: "",
    nombre: "",
    nivel: "",
    inicio: "",
    fin: "",
    visibilidad: "",
  });

  const handleChange = (text, eventName) => {
    setValues((prev) => ({ ...prev, [eventName]: text }));
  };

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

  function handleCreateEvent() {
    const { codigo, creador, nombre, nivel, inicio, fin, visibilidad } = values;

    if (codigo.trim() !== "") {
      firestore()
        .collection("Eventos")
        .where("userid", "==", user.uid)
        .get()
        .then((snahp) => {
          const cantidad = snahp.size;
          if (cantidad < 3) {
            firestore()
              .collection("Eventos")
              .doc()
              .set({
                id: (user.uid + cantidad).toString(),
                codigo,
                creador,
                nombre,
                nivel,
                inicio,
                fin,
                visibilidad,
              });
            Alert.alert("Evento Creado");
            loadData();
          } else {
            Alert.alert("YA CUENTA CON 3 EVENTOS");
          }
        })
        .catch((error) => {
          console.log("Error creating event: ", error);
        });
    } else {
      Alert.alert("EL CÓDIGO NO PUEDE SER NULO");
    }
  }

  async function loadData() {
    try {
      const querySnapshot = await firestore()
        .collection("Eventos")
        .where("userid", "==", user.uid)
        .get();

      if (!querySnapshot.empty) {
        const EventosList = [];
        querySnapshot.forEach((doc) => {
          EventosList.push(doc.data());
        });
        setProductsList(EventosList);
      }

      const docRef = await firestore().collection("Users").doc(user.uid).get();
      setnames(docRef.data().name);
      setPhone(docRef.data().phone);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadData();
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
                CODIGO
              </Text>
              <TextInput
                style={styles.input}
                keyboardType="default"
                onChangeText={(text) => handleChange(text, "codigo")}
              />
            </View>

            <View>
              <Text style={{ fontSize: 14, marginTop: 5, textAlign: "center" }}>
                NOMBRE DEL EVENTO
              </Text>
              <TextInput
                style={styles.input}
                keyboardType="default"
                onChangeText={(text) => handleChange(text, "nombre")}
              />
            </View>

            <View>
              <Text style={{ fontSize: 14, marginTop: 5, textAlign: "center" }}>
                NIVEL
              </Text>
              <TextInput
                style={styles.input}
                keyboardType="default"
                onChangeText={(text) => handleChange(text, "nivel")}
              />
            </View>

            <View style={styles.dateFormContainer}>
              <View style={styles.dateForm}>
                <Text style={styles.dateTitle}>INICIO</Text>
                <TextInput
                  style={styles.inputdate}
                  keyboardType="default"
                  onChangeText={(text) => handleChange(text, "inicio")}
                />
              </View>

              <View style={styles.dateForm}>
                <Text style={styles.dateTitle}>FIN</Text>
                <TextInput
                  style={styles.inputdate}
                  keyboardType="default"
                  onChangeText={(text) => handleChange(text, "fin")}
                />
              </View>
            </View>

            <View>
              <Text style={{ fontSize: 14, marginTop: 5, textAlign: "center" }}>
                VISIBILIDAD
              </Text>
              <TextInput
                style={styles.input}
                keyboardType="default"
                onChangeText={(text) => handleChange(text, "visibilidad")}
              />
            </View>

            <View
              style={[
                styles.btncontent,
                { flexDirection: "row", justifyContent: "space-between" },
              ]}
            >
              <TouchableOpacity onPress={handleCreateEvent}>
                <Image style={styles.btncrear} source={update} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCreateEvent}>
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
