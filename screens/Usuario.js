import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Keyboard,
} from "react-native";
import { styles } from "../assets/styles/UsuarioStyles";
import { Ionicons } from "@expo/vector-icons";
import firebase from "firebase/app";
import "firebase/firestore";

// Images
import Top from "../assets/top.png";
import FavoritosIMG from "../assets/join.png";
import Enviarbtn from "../assets/btnenviar.png";
import Up from "../assets/up.png";

const Usuario = ({ navigation, route }) => {
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const [cancionInput, setCancionInput] = useState("");
  const [cancionesAhora, setCancionesAhora] = useState([]);
  const [cancionesLista, setCancionesLista] = useState([]);
  const user = firebase.auth().currentUser;
  const eventID = route.params.eventId;
  const eventTitle = route.params.eventTitles;
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

  useEffect(() => {
    loadCanciones();
  }, []);

  const loadCanciones = async () => {
    try {
      const eventRef = firebase.firestore().collection("Events").doc(eventID);

      const ahoraSnapshot = await eventRef
        .collection("canciones")
        .where("activa", "==", true)
        .orderBy("votos", "desc")
        .get();

      const cancionesAhoraList = ahoraSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCancionesAhora(cancionesAhoraList);

      const listaSnapshot = await eventRef
        .collection("canciones")
        .orderBy("votos", "desc")
        .get();

      const cancionesListaList = listaSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCancionesLista(cancionesListaList);
    } catch (error) {
      console.error("Error loading canciones:", error);
    }
  };

  const handleChange = (text) => {
    setCancionInput(text);
  };

  const handleAgregarCancion = async () => {
    try {
      if (cancionInput.trim() !== "") {
        const eventRef = firebase.firestore().collection("Events").doc(eventID);

        const existingCancion = await eventRef
          .collection("canciones")
          .where("nombre", "==", cancionInput.trim())
          .get();

        if (existingCancion.empty) {
          const cancionDocRef = await eventRef.collection("canciones").add({
            nombre: cancionInput.trim(),
            activa: false,
            votos: 0,
            votantes: [],
          });

          const cancionID = cancionDocRef.id;
          await cancionDocRef.update({ id: cancionID });

          loadCanciones();
        } else {
          console.log("La canción ya existe en la lista.");
        }

        setCancionInput("");
      }
    } catch (error) {
      console.error("Error adding canción:", error);
    }
  };

  const handleVotarCancion = async (cancionID) => {
    try {
      const eventRef = firebase.firestore().collection("Events").doc(eventID);
      const cancionRef = eventRef.collection("canciones").doc(cancionID);

      // Verificar si la persona ya votó por esta canción
      const cancionDoc = await cancionRef.get();

      if (cancionDoc.exists) {
        const votantes = cancionDoc.data().votantes || [];

        if (!votantes.includes(user.uid)) {
          // Incrementar el contador de votos para la canción
          await cancionRef.update({
            votos: firebase.firestore.FieldValue.increment(1),
            votantes: [...votantes, user.uid],
          });

          // Actualizar la lista de canciones después de votar
          loadCanciones();
        } else {
          console.log("Ya has votado por esta canción.");
        }
      } else {
        console.error("La canción no existe en la colección.");
      }
    } catch (error) {
      console.error("Error voting for song:", error);
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
          <Text style={styles.cardTitle}>{eventTitle}</Text>
          <View style={styles.cardContainer}>
            <Text style={styles.tittlelow}>AGREGAR CANCION</Text>
            <View>
              <Text style={{ fontSize: 12, marginTop: 5, textAlign: "center" }}>
                NOMBRE DE LA CANCION
              </Text>
              <TextInput
                style={styles.input}
                keyboardType="default"
                onChangeText={handleChange}
                value={cancionInput}
              />
            </View>
            <TouchableOpacity onPress={handleAgregarCancion}>
              <Image style={styles.btnenviarimg} source={Enviarbtn} />
            </TouchableOpacity>
          </View>

          <View style={styles.cardContainer}>
            <Text style={styles.tittleList}>AHORA</Text>
            <View style={styles.divider} />
            {cancionesAhora.map((cancion) => (
              <View key={cancion.id} style={styles.eventContainer}>
                <Text style={styles.eventTitle}>{cancion.nombre}</Text>
              </View>
            ))}

            <Text style={styles.tittleList}>LISTA</Text>
            <View style={styles.divider} />
            {cancionesLista
              .filter((cancion) => !cancion.activa)
              .map((cancion) => (
                <View key={cancion.id} style={styles.cardsong}>
                  <View>
                    <Text style={styles.eventTitleaux}>{cancion.nombre}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.aux}
                    onPress={() => handleVotarCancion(cancion.id)}
                  >
                    <Image source={Up} style={styles.imgaux} />
                    <Text style={styles.textaux}>{cancion.votos}</Text>
                  </TouchableOpacity>
                </View>
              ))}
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
            onPress={() => navigation.navigate("Create")}
            style={styles.cornerButtonPressJoin}
          />
          <Image style={styles.bottomBannerImage} source={FavoritosIMG} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Usuario;
