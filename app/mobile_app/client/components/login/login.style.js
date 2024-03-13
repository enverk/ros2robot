

import { StyleSheet,Dimensions } from "react-native";

import { COLORS,FONT,SIZES} from "../../constants";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  login_container: {
    height: windowHeight,
    width: windowWidth,
    backgroundColor: COLORS.darkblue,
    flex: 1,
    position: 'relative',
  },
  welcomeMessage: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xxLarge,
    color: COLORS.softpink,
    marginTop: 2,
  },
  center_container: {
    padding: 20,
    
    width: '100%',
    height: 450,
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 120,
  },
  shadow_top: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 12,
  },
  shadow_bottom: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    zIndex: 12,
  },
  glocoach_logo: {
    height: 60,
    marginBottom: 60,
  },

  form_info: {
    width: '100%',
    marginTop: 0,
  },
  email_input: {
    height: 54,
    width: '100%',
    borderWidth: 1,
    padding: 11,
    color: '#ffffff',
    borderColor: '#FFFFFF80',
    borderRadius: 9,
    marginBottom: 10,
    fontSize: 16,
  },
  password_input: {
    height: 54,
    width: '100%',
    borderWidth: 1,
    padding: 11,
    color: '#ffffff',
    borderColor: '#FFFFFF80',
    borderRadius: 9,
    marginBottom: 10,
    fontSize: 16,
  },
  loginScreenButton: {
    marginTop: 10,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  loginText: {
    color: '#0222D8',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 16,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 5,
  },
  header:{
    fontSize:50,
    color:COLORS.white,
    height:'50px'
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center', // İçerikleri dikey eksende ortalar
  },
  signupText: {
    color: COLORS.softpink,
    marginRight: 10, // 'Sign In' butonundan önce biraz boşluk bırakır
  },
  signupBtn: {
    padding: 10, // Butonun tıklanabilir alanını arttırır
    // Butonunuz için başka stiller ekleyebilirsiniz
  },
});

export default styles;