import { StyleSheet, Dimensions } from "react-native";
import LinearGradient from "react-native-linear-gradient";
const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  topImage: {
    width: "100%",
    height: height * 0.07,
    resizeMode: "stretch",
  },
  middleContainer: {
    marginTop: 30,
    flex: 2,
    alignItems: "center",
  },
  cardContainer: {
    backgroundColor: "#fff",
    margin: width * 0.02,
    padding: width * 0.05,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: width * 0.05,
    width: width / 1.05,
  },
  cardTitle: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  cardText: {
    fontSize: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 10,
    marginBottom: 15,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  eventContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    width: width * 0.85,
    height: 50,
    padding: 10,
    borderRadius: 5,
    borderWidth: 0.8,
    borderColor: "#00000055",
    backgroundColor: "#CD7AD2",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  eventImage: {
    resizeMode: "stretch",
    width: 65,
    height: 65,
  },
  eventDetails: {
    flex: 1,
  },
  eventDetailsContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    flex: 1,
    marginLeft: 10,
    marginTop: 15,
    //backgroundColor:"#ff0000"
  },
  eventTitle: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  eventIcon: {
    width: 35,
    height: 35,
  },
  eventNumber: {
    fontSize: 20,
  },
  eventNumberContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  eventosButton: {
    alignItems: "center",
    marginTop: height * 0.02,
  },
  bottomContainer: {
    height: height * 0.1,
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
    width: width / 2.6,
    height: 65,
    bottom: 0,
    position: "absolute",
    //backgroundColor:"#00ff00",
    zIndex: 1,
    left: 0,
  },
  bottomBannerImage: {
    width: "100%",
    height: height * 0.1,
    resizeMode: "stretch",
  },
  cornerButtonPressJoin: {
    width: width / 4.8,
    height: 85,
    bottom: 0,
    position: "absolute",
    zIndex: 2,
    //backgroundColor: "#00fff0",
    alignSelf: "center",
  },
  divider: {
    height: 1,
    width: width / 1.2,
    backgroundColor: "#000",
    marginVertical: 15,
  },
  tittlelow: {
    fontSize: 20,
    textAlign: "center",
  },
  tittlelowSub: {
    fontSize: 12,
    textAlign: "center",
  },
  input: {
    marginTop: 5, // Ajuste responsivo para el margen superior del input
    height: height * 0.05, // Ajuste responsivo para la altura del input
    borderWidth: 1,
    borderColor: "#8120C950",
    width: "100%",
  },
  btnenviarimg: {
    alignSelf: "center",
    width: width / 2.5,
    height: 40,
    resizeMode: "stretch",
    marginTop: 10,
  },
  cardsong: {
    marginBottom: 10,
    width: width * 0.85,
    height: 70,
    padding: 10,
    borderRadius: 5,
    borderWidth: 0.8,
    borderColor: "#00000055",
    backgroundColor: "#CD7AD2",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  aux: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    right: 0,
    margin: 5,
  },
  aux1: {
    position: "absolute",
    alignItems: "center",
    right: 0,
    height: 70,
    //backgroundColor:"red",
    marginRight: 40,
  },
  imgaux: {
    width: 18,
    height: 25,
    resizeMode: "stretch",
    marginRight: 5,
    marginVertical: 3,
  },
  textaux: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    textAlignVertical: "center",
  },
  eventTitleaux: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    //backgroundColor:"#ff00ff",
    height: "100%",
    textAlignVertical: "center",
  },
  settingsimg: {
    position: "absolute",
    right: 0,
    margin: 3,
  },
  imgsetting: {
    width: 40,
    height: 40,
  },
  aux2:{
    position: "absolute",
    right: 0,
    margin: 5,
    verticalAlign:"middle",
    //backgroundColor:"red",
  },
  imgaux3:{
    width: 30,
    height: 30,
    resizeMode: "stretch",
  }
});
