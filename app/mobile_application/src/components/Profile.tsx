import { StyleSheet } from 'react-native';
import { COLORS, FONT, SIZES } from '../constants/theme';

const profilestyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor:COLORS.primary
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  infoContainer: {
    color: COLORS.lightWhite,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    color: COLORS.lightWhite,
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 8,
  },
  value: {
    color: COLORS.lightWhite,
    fontSize: 20,
    flex: 1,
  },
  loadingText: {
    alignSelf: 'center',
  },
  buttonContainer: {
    alignSelf: 'center',
    width: '50%',
    marginTop: 20,
  },
  buttonText: {
    textAlign: 'center',
    color: COLORS.lightWhite,
    fontSize: 20,
  },
  button: {
    backgroundColor: COLORS.softpurple,
    padding: 10,
    borderRadius: 25,
  },
  profileIconContainer: {
    alignItems: 'center',
  },
  profileIcon: {
    backgroundColor: COLORS.darkblue,
    width: 150,
    height: 150,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileIconText: {
    color: COLORS.lightWhite,
    fontSize: 75,
  },
});

export default profilestyles;
