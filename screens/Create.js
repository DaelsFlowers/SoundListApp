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
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { styles } from "../assets/styles/CreateStyles";
import Top from "../assets/top.png";
import bar from "../assets/join.png";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import btncrear from "../assets/btncrear.png";
import { Picker } from "@react-native-picker/picker";
import { addDays, addWeeks, format } from "date-fns";

const Create = ({ navigation }) => {
  const firestore = firebase.firestore;
  const user = firebase.auth().currentUser;

  const [values, setValues] = useState({
    codigo: "",
    creador: "",
    nombre: "",
    nivel: "",
    duracion: "1 día", // Valor predeterminado
    visibilidad: "publico",
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
    const { codigo, nombre, nivel, duracion, visibilidad } = values;
  
    if (codigo.trim() !== "" && nombre.trim() !== "") {
      firestore()
        .collection("Events")
        .where("creador", "==", user.uid)
        .get()
        .then((snapshot) => {
          const cantidad = snapshot.size;
          if (cantidad < 3) {
            const currentDate = new Date();
            let endDate;
  
            switch (duracion) {
              case "1 día":
                endDate = addDays(currentDate, 1);
                break;
              case "3 días":
                endDate = addDays(currentDate, 3);
                break;
              case "1 semana":
                endDate = addWeeks(currentDate, 1);
                break;
              default:
                endDate = addDays(currentDate, 1);
            }
  
            firestore()
              .collection("Events")
              .add({
                codigo,
                creador: user.uid,
                nombre,
                nivel,
                inicio: format(currentDate, "yyyy-MM-dd"),
                fin: format(endDate, "yyyy-MM-dd"),
                visibilidad,
              })
              .then(() => {
                Alert.alert("Éxito", "Evento creado exitosamente.");
                loadData();
                // Limpiar el formulario
                setValues({
                  codigo: "",
                  creador: "",
                  nombre: "",
                  nivel: "",
                  duracion: "1 día",
                  visibilidad: "publico",
                });
                // Ocultar el teclado si está activo
                Keyboard.dismiss();
              })
              .catch((error) => {
                Alert.alert("Error", "Error al crear el evento.");
                console.log("Error creating event: ", error);
              });
          } else {
            Alert.alert("Error", "Ya cuenta con 3 eventos.");
          }
        })
        .catch((error) => {
          Alert.alert("Error", "Error al verificar eventos existentes.");
          console.log("Error checking existing events: ", error);
        });
    } else {
      Alert.alert("Error", "El código y el nombre no pueden ser nulos.");
    }
  }
  

  async function loadData() {
    try {
      const querySnapshot = await firestore()
        .collection("Events")
        .where("creador", "==", user.uid)
        .get();
  
      if (!querySnapshot.empty) {
        const eventosList = [];
        querySnapshot.forEach((doc) => {
          eventosList.push(doc.data());
        });
  
        // Asegúrate de incluir todas las propiedades en el estado
        const updatedValues = {
          ...values,
          eventosList, // o cualquier otra propiedad que necesites
        };
  
        setValues(updatedValues);
      }
  
      const docRef = await firestore().collection("Users").doc(user.uid).get();
      setValues((prev) => ({
        ...prev,
        names: docRef.data().name,
        phone: docRef.data().phone,
      }));
    } catch (error) {
      console.log(error);
    }
  }
  

  useEffect(() => {
    loadData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{ flex: 1 }}
      >
        <Image style={styles.topImage} source={Top} />

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: keyboardOffset }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.middleContainer}>
            

            <View style={styles.cardContainer}>
              <Text style={styles.cardTitle}>CREAR UN EVENTO</Text>

              <View>
                <Text
                  style={{ fontSize: 14, marginTop: 5, textAlign: "center" }}
                >
                  CODIGO
                </Text>
                <TextInput
                  style={styles.input}
                  keyboardType="default"
                  onChangeText={(text) => handleChange(text, "codigo")}
                />
              </View>

              <View>
                <Text
                  style={{ fontSize: 14, marginTop: 5, textAlign: "center" }}
                >
                  NOMBRE DEL EVENTO
                </Text>
                <TextInput
                  style={styles.input}
                  keyboardType="default"
                  onChangeText={(text) => handleChange(text, "nombre")}
                />
              </View>

              <View>
                <Text
                  style={{ fontSize: 14, marginTop: 5, textAlign: "center" }}
                >
                  NIVEL
                </Text>
                <Picker
                  style={styles.input}
                  selectedValue={values.nivel}
                  onValueChange={(itemValue) => handleChange(itemValue, "nivel")}
                >
                  <Picker.Item label="Pequeña" value="pequena" />
                  <Picker.Item label="Mediana" value="mediana" />
                  <Picker.Item label="Grande" value="grande" />
                </Picker>
              </View>

              <View>
                <Text
                  style={{ fontSize: 14, marginTop: 5, textAlign: "center" }}
                >
                  DURACIÓN
                </Text>
                <Picker
                  style={styles.input}
                  selectedValue={values.duracion}
                  onValueChange={(itemValue) =>
                    handleChange(itemValue, "duracion")
                  }
                >
                  <Picker.Item label="1 día" value="1 día" />
                  <Picker.Item label="3 días" value="3 días" />
                  <Picker.Item label="1 semana" value="1 semana" />
                </Picker>
              </View>

              <View>
                <Text
                  style={{ fontSize: 14, marginTop: 5, textAlign: "center" }}
                >
                  VISIBILIDAD
                </Text>
                <Picker
                  style={styles.input}
                  selectedValue={values.visibilidad}
                  onValueChange={(itemValue) =>
                    handleChange(itemValue, "visibilidad")
                  }
                >
                  <Picker.Item label="Público" value="publico" />
                  
                </Picker>
              </View>

              <View style={styles.btncontent}>
                <TouchableOpacity onPress={handleCreateEvent}>
                  <Image style={styles.btncrear} source={btncrear} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

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

export default Create;
