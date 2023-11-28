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
import { styles } from "../assets/styles/AdministradorStyles";
import { Ionicons } from "@expo/vector-icons";
import firebase from "firebase/app";
import "firebase/firestore";

// Images
import Top from "../assets/top.png";
import FavoritosIMG from "../assets/join.png";
import Pref from "../assets/pref.png";
import Enviarbtn from "../assets/btnenviar.png";
import Up from "../assets/up.png";
import SettingsIco from "../assets/settingsico.png";
import Upadm from "../assets/Upadm.png";
import Delete from "../assets/delete.png";

const Administrador = ({ route, navigation }) => {
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const [cancionesAhora, setCancionesAhora] = useState([]);
  const [cancionesLista, setCancionesLista] = useState([]);
  const user = firebase.auth().currentUser;
  const eventID = route.params.eventId; // Obtener el ID del evento desde las props de navegación
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

      // Filtrar la canción activa si existe
      const cancionesListaFiltrada = cancionesListaList.filter(
        (cancion) =>
          !cancionesAhoraList.find((c) => c.id === cancion.id && c.activa)
      );

      setCancionesLista(cancionesListaFiltrada);
    } catch (error) {
      console.error("Error loading canciones:", error);
    }
  };

  const handleEliminarCancion = async (cancionID) => {
    try {
      const eventRef = firebase.firestore().collection("Events").doc(eventID);
      const cancionRef = eventRef.collection("canciones").doc(cancionID);

      // Eliminar la canción
      await cancionRef.delete();

      // Actualizar la lista de canciones AHORA después de eliminar
      const updatedCancionesAhora = cancionesAhora.filter(
        (cancion) => cancion.id !== cancionID
      );
      setCancionesAhora(updatedCancionesAhora);

      // Eliminar la canción de la lista general
      setCancionesLista(
        cancionesLista.filter((cancion) => cancion.id !== cancionID)
      );
    } catch (error) {
      console.error("Error deleting song:", error);
    }
  };

  const handleToggleActiva = async (cancionID, activa) => {
    try {
      const eventRef = firebase.firestore().collection("Events").doc(eventID);
      const cancionRef = eventRef.collection("canciones").doc(cancionID);

      // Verificar si hay otra canción activa
      const cancionesAhoraActivas = cancionesAhora.filter(
        (cancion) => cancion.activa && cancion.id !== cancionID
      );

      if (activa || cancionesAhoraActivas.length === 0) {
        // Cambiar el estado de activa de la canción
        await cancionRef.update({
          activa: !activa,
        });

        // Actualizar la lista de canciones después de cambiar el estado
        loadCanciones();
      } else {
        console.log("Ya hay otra canción activa.");
      }
    } catch (error) {
      console.error("Error toggling song activation:", error);
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
            <Text style={styles.tittleList}>AHORA</Text>
            <View style={styles.divider} />
            {cancionesAhora.map((cancion) => (
              <View key={cancion.id} style={styles.cardsong}>
                <Text style={styles.eventTitleaux}>{cancion.nombre}</Text>
                <TouchableOpacity
                  style={styles.aux2}
                  onPress={() => handleEliminarCancion(cancion.id)}
                >
                  <Image source={Delete} style={styles.imgaux3} />
                </TouchableOpacity>
              </View>
            ))}

            <Text style={styles.tittleList}>LISTA</Text>
            <View style={styles.divider} />
            {cancionesLista.map((cancion) => (
              <View key={cancion.id} style={styles.cardsong}>
                <View>
                  <Text style={styles.eventTitleaux}>{cancion.nombre}</Text>
                </View>
                <View style={styles.aux1}>
                  <Text style={styles.eventTitleaux}>{cancion.votos}</Text>
                </View>
                <View style={styles.aux}>
                  <TouchableOpacity
                    onPress={() =>
                      handleToggleActiva(
                        cancion.id,
                        cancionesAhora.find((c) => c.activa)?.id === cancion.id
                      )
                    }
                  >
                    <Image source={Upadm} style={styles.imgaux} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleEliminarCancion(cancion.id)}
                  >
                    <Image source={Delete} style={styles.imgaux} />
                  </TouchableOpacity>
                </View>
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

export default Administrador;
