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
    marginTop: height * 0.01,
    flex: 2,
    alignItems: "center",
  },
  cardContainer: {
    backgroundColor: "#fff",
    margin: width * 0.04,
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
  },
  cardTitle: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom:5
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
    marginBottom: 20,
    width: width * 0.85,
    height: 80,
    padding: 10,
    borderRadius: 5,
    borderWidth: 0.8,
    borderColor:"#00000055",
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
    marginTop: 10,
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
    //backgroundColor:"#00ffaf",
    zIndex: 1,
    left: 0
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
  cornerButtonPressaux: {
    width: width / 2.6,
    height: 65,
    bottom: 0,
    position: "absolute",
    //backgroundColor:"#00ff00",
    zIndex: 1,
  },
  divider: {
    height: 1,
    width: width/1.2,
    backgroundColor: "#000",
    marginVertical: 15,
  },
  tittlelow:{
    fontSize: 14,
    textAlign:"center"
  }
  
});
