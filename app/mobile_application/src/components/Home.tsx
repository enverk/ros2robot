import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../constants/theme"; 

const styles = StyleSheet.create({
    container: {
        flex:5,
        width:'100%',
        backgroundColor: COLORS.primary,
        
        paddingTop: 0
      },
  buttonContainer: {
    width: "100%",
    height:"20%"
  },
  welcomeMessage: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xLarge,
    color: COLORS.lightWhite,
    marginTop: 2,
    marginLeft:23,
  },
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: SIZES.large,
    height: 50,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginRight: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
    height: "100%",
  },
  searchInput: {
    fontFamily: FONT.regular,
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.medium,
  },
  inputText:{
    height:50,
    color:"black",
  },
  inputView: {
    marginTop:20,
    width: '90%',
    alignItems:'center',
    backgroundColor: "#ffffff",
    borderRadius: 25,
    height: 70,
    marginBottom: 20,
    marginLeft:23,
    justifyContent: "center",
    padding: 20,
    borderWidth: 1, // eklenen satır
    borderColor: '#D9D9D9', // eklenen satır
    shadowColor: '#000', // eklenen satır
    shadowOffset: { width: 0, height: 2 }, // eklenen satır
    shadowOpacity: 0.25, // eklenen satır
    shadowRadius: 3.84, // eklenen satır
    elevation: 5, // eklenen satır
  },
  searchBtnText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loginBtn: {
    width: "50%",
    height: "20%",
    backgroundColor: COLORS.softpurple,
    borderRadius: SIZES.xLarge,
    justifyContent: "center",
    alignItems: "center",
    flexDirection:'row',
  },
  
  searchBtn: {
    width: "90%",
    height: "10%",
    margin:'5%',
    marginTop:5,
    
    backgroundColor: COLORS.softpurple,
    borderRadius: SIZES.xLarge,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBtnImage: {
    width: "50%",
    height: "50%",
    tintColor: COLORS.white,
  },
  mapButton: {
    width: "90%",
    height: "10%",
    margin:'5%',
    marginTop:5,
    
    backgroundColor: COLORS.softpurple,
    borderRadius: SIZES.xLarge,
    justifyContent: "center",
    alignItems: "center",
  },
  mapButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
  modalContent: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: COLORS.softpurple,
    padding: 10,
    borderRadius: 25,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
 
 
 
});

export default styles;
