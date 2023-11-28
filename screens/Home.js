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
import { styles } from "../assets/styles/HomeStyles.js";
import { Ionicons } from "@expo/vector-icons";
import firebase from "firebase/app";
import "firebase/firestore";

// Images
import Top from "../assets/top.png";
import Eventos from "../assets/eventos.png";
import Pref from "../assets/pref.png";
import imagen1 from "../assets/peq.png";
import imagen2 from "../assets/med.png";
import imagen3 from "../assets/gra.png";

const Home = ({ navigation }) => {
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const [events, setEvents] = useState([]);
  const user = firebase.auth().currentUser;

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
    // Cargar eventos públicos al montar el componente
    loadPublicEvents();
  }, []);

  const loadPublicEvents = async () => {
    try {
      const querySnapshot = await firebase
        .firestore()
        .collection("Events")
        .where("visibilidad", "==", "publico")
        .get();

      const eventsList = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      setEvents(eventsList);
    } catch (error) {
      console.error("Error loading public events:", error);
    }
  };

  const handleJoinEvent = async (eventId) => {
    try {
      const userRef = firebase.firestore().collection("Users").doc(user.uid);
      const userDoc = await userRef.get();
  
      if (!userDoc.exists) {
        // Manejar el caso si el documento de usuario no existe
        return;
      }
  
      const eventosEntrados = userDoc.data().eventosEntrados || [];
  
      if (!eventosEntrados.includes(eventId)) {
        // Incrementar el contador de personas solo la primera vez
        await firebase.firestore().collection("Events").doc(eventId).update({
          personas: firebase.firestore.FieldValue.increment(1),
        });
  
        // Actualizar la lista de eventos después de unirse
        await userRef.update({
          eventosEntrados: [...eventosEntrados, eventId],
        });
  
        // Obtener el evento después de unirse
        const eventDoc = await firebase.firestore().collection("Events").doc(eventId).get();
  
        if (eventDoc.exists) {
          const evento = eventDoc.data();
          if (evento.creador === user.uid) {
            // Redireccionar a la pantalla de administrador
            navigation.navigate("Administrador", { eventId });
          } else {
            // Redireccionar a la pantalla de usuario
            navigation.navigate("Usuario", { eventId });
          }
        } else {
          console.log("El evento no existe.");
        }
  
        loadPublicEvents(); // Actualizar la lista de eventos públicos
      } else {
        // Redireccionar al usuario sin incrementar el contador ni mostrar el mensaje
        const eventDoc = await firebase.firestore().collection("Events").doc(eventId).get();
  
        if (eventDoc.exists) {
          const evento = eventDoc.data();
          if (evento.creador === user.uid) {
            // Redireccionar a la pantalla de administrador
            navigation.navigate("Administrador", { eventId });
          } else {
            // Redireccionar a la pantalla de usuario
            navigation.navigate("Usuario", { eventId });
          }
        } else {
          console.log("El evento no existe.");
        }
      }
    } catch (error) {
      console.error("Error joining event:", error);
    }
  };

  const getImageSource = (tamano) => {
    switch (tamano) {
      case "pequeno":
        return imagen1;
      case "mediano":
        return imagen2;
      case "grande":
        return imagen3;
      default:
        return imagen1;
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

            {/* Eventos públicos */}
            {events.map((event) => (
              <TouchableOpacity
                key={event.id}
                onPress={() => handleJoinEvent(event.id)}
              >
                <View style={styles.eventContainer}>
                  <Image
                    style={styles.eventImage}
                    source={getImageSource(event.tamano)}
                  />
                  <View style={styles.eventDetailsContainer}>
                    <View style={styles.eventDetails}>
                      <Text style={styles.eventTitle}>{event.nombre}</Text>
                    </View>
                    <View style={styles.eventNumberContainer}>
                      <Image
                        style={styles.eventIcon}
                        source={Pref}
                      />
                      <Text style={styles.eventNumber}>{event.personas}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Resto del componente... */}
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
