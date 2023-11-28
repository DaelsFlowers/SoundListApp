import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topContainer: {
    flex: 1,
  },
  bannerImage: {
    width: "100%",
    height: height * 0.17, // Ajuste responsivo para la altura del banner
    resizeMode: "stretch",
  },
  middleContainer: {
    marginTop: height * 0.001, // Ajuste responsivo para el margen superior
    flex: 2,
  },
  cardContainer: {
    backgroundColor: "#fff",
    margin: width * 0.04, // Ajuste responsivo para el margen
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: width * 0.05, // Ajuste responsivo para el radio de borde
  },
  input: {
    marginTop: height * 0.02, // Ajuste responsivo para el margen superior del input
    marginHorizontal: width * 0.05, // Ajuste responsivo para el margen horizontal del input
    height: height * 0.05, // Ajuste responsivo para la altura del input
    borderWidth: 1,
    borderColor: "#fff",
    borderBottomColor: "#000",
  },
  button: {
    margin: width * 0.04, // Ajuste responsivo para el margen del botón
    width: width * 0.4, // Ajuste responsivo para el ancho del botón
    height: height * 0.05, // Ajuste responsivo para la altura del botón
    alignSelf: "center",
    borderRadius: width * 0.02, // Ajuste responsivo para el radio de borde del botón
    shadowColor: "#0aa",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loginButton: {
    backgroundColor: "#D481C7",
  },
  bottomContainer: {
    height: height * 0.1,
  },
  bottomBannerImage: {
    width: "100%",
    height: height * 0.1,
    resizeMode: "stretch",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  cornerButton: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "flex-end",
    justifyContent: "flex-start",
  },
  cornerButtonPress: {
    width: width/2,
    height: 100,
    //backgroundColor:"#ff000070",
    position:"absolute",
    zIndex:1
  },
  passwordShowButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    position:"absolute",
    right: 0,
    bottom: 0,
  },
  passwordShowImage:{
    width:50,
    resizeMode:"stretch"
  }
});
