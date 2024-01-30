import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Colors} from '../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 16,
    borderRadius: 8,
    borderTopColor: Colors.grayColor,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayColor,
  },
  titleDes: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 16,
  },

  title: {
    width: 150,
    height: 34,
    backgroundColor: Colors.purpleDim,
    marginBottom: 8,
    borderRadius: 20,
  },
  description: {
    width: 230,
    height: 17,
    borderRadius: 20,
    backgroundColor: Colors.purpleDim,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.purpleDim,
  },

  // Name Container
  NameViewcontainer: {
    display: 'flex',
    alignSelf: 'center',
  },
  usernameContainer: {
    bottom: 0,
    right: 0,
    backgroundColor: Colors.profileColor,
    borderRadius: 60,
    padding: 5,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  username: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // Message Box Card
  NewMessageBox: {
    height: 35,
    width: '100%',
    // backgroundColor: Colors.whiteColor,
    marginTop: 12,
    flexDirection: 'row',
  },
});

export default styles;
