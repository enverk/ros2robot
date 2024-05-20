import { StyleSheet } from 'react-native';
import { COLORS,SIZES,FONT } from '../constants/theme';

const loginstyles = StyleSheet.create({
    
    container: {
        flex:5,
        width:'100%',
        backgroundColor: COLORS.darkblue,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 0
      },
      welcomeMessage: {
        fontFamily: FONT.bold,
        fontSize: SIZES.xLarge,
        color: COLORS.softpink,
        marginTop: 2,
        marginBottom:5,
      },
    loginText:{
        color:"black",
        fontSize: SIZES.large
      },
    loginBtn:{
        width:200,
        backgroundColor:COLORS.softpurple,
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        marginBottom:75,

      },
      inputText:{
        height:50,
        color:"black",
        

      },
      inputView: {
        width: 300,
        backgroundColor: "#ffffff",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
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
      signupText: {
        color: COLORS.softpink,
        marginRight: 10, // 'Sign In' butonundan önce biraz boşluk bırakır
      },
      signupBtn: {
        padding: 10, // Butonun tıklanabilir alanını arttırır
      },
      
  });

  export default loginstyles;