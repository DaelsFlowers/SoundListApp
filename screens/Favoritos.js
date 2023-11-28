import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from "react-native";
import { styles } from "../assets/styles/FavoritosStyles";
import firebase from "firebase/app";
import "firebase/firestore";

// Images
import Top from "../assets/top.png";
import Pref from "../assets/pref.png";
import FavoritosIMG from "../assets/favoritos.png";

const Favoritos = ({ navigation }) => {
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const [userCreatedEvents, setUserCreatedEvents] = useState([]);
  const [userJoinedEvents, setUserJoinedEvents] = useState([]);
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
    // Cargar eventos creados por el usuario
    loadUserCreatedEvents();

    // Cargar eventos a los que el usuario se ha unido
    loadUserJoinedEvents();
  }, []);

  const loadUserCreatedEvents = async () => {
    try {
      const querySnapshot = await firebase
        .firestore()
        .collection("Events")
        .where("creador", "==", user.uid)
        .get();

      const createdEventsList = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      setUserCreatedEvents(createdEventsList);
    } catch (error) {
      console.error("Error loading user created events:", error);
    }
  };

  const loadUserJoinedEvents = async () => {
    try {
      const userDoc = await firebase
        .firestore()
        .collection("Users")
        .doc(user.uid)
        .get();

      const joinedEventsIds = userDoc.data().eventosEntrados || [];
      const joinedEventsPromises = joinedEventsIds.map(async (eventId) => {
        const eventDoc = await firebase
          .firestore()
          .collection("Events")
          .doc(eventId)
          .get();

        return {
          id: eventDoc.id,
          ...eventDoc.data(),
        };
      });

      const joinedEventsList = await Promise.all(joinedEventsPromises);

      setUserJoinedEvents(joinedEventsList);
    } catch (error) {
      console.error("Error loading user joined events:", error);
    }
  };

  const renderEventList = (events, title) => (
    <View style={styles.cardContainer}>
      <Text style={styles.tittlelow}>{title}</Text>
      <View style={styles.divider} />

      {events.map((event) => (
        <TouchableOpacity
          key={event.id}
          onPress={() => navigation.navigate("Usuario", { eventId: event.id })}
        >
          <View style={styles.eventContainer}>
            <Image style={styles.eventImage} source={Pref} />
            <View style={styles.eventDetailsContainer}>
              <View style={styles.eventDetails}>
                <Text style={styles.eventTitle}>{event.nombre}</Text>
              </View>
              <View style={styles.eventNumberContainer}>
                <Image style={styles.eventIcon} source={Pref} />
                <Text style={styles.eventNumber}>{event.personas}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

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

          {/* Eventos creados por el usuario */}
          {renderEventList(userCreatedEvents, "Mis Eventos")}

          {/* Eventos a los que el usuario se ha unido */}
          {renderEventList(userJoinedEvents, "Eventos Favoritos")}
        </View>
      </ScrollView>

      {/* Resto del componente... */}
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
