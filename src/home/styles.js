import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Colors, themePink} from './../../constants/Colors';

const styles = StyleSheet.create({
  HomeHeaderView: {
    display: 'flex',
    backgroundColor: Colors.SeaBlue,
    height: '100%',
  },
  profilehead: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  left: {
    marginLeft: 0,
    marginRight: 'auto',
  },
  Avatarhead: {
    width: 45,
    height: 45,
  },
  HeadText: {
    color: Colors.Lightestgrey,
    fontSize: 13,
  },
  Card: {
    display: 'flex',
    backgroundColor: Colors.whiteColor,
    height: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  ShareLogo: {
    width: 90,
    height: 90,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  shareView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingBottom: 12,
    borderBottomColor: Colors.grayColor,
  },
  TranscationAbout: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 10,
    marginTop: 55,
  },
  TranscationBtn: {
    width: '50%',
    backgroundColor: Colors.SeaBlue,
    alignItems: 'center',
    height: 35,
    borderRadius: 5,
    justifyContent: 'center',
    marginHorizontal: 5,
    alignSelf: 'center',
    marginTop: 45,
  },
  searchView: {
    height: 80,
    width: '90%',
    // backgroundColor:Colors.grayColor,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  Suggestiondata: {
    height: 300,
    width: 200,
    // flex: 1,
    backgroundColor: Colors.whiteColor,
    marginHorizontal: 10,
    marginTop: 12,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
    borderRadius: 12,
    bottom: 6,
  },
  picture: {
    height: 140,
    width: 120,
    borderRadius: 10,
    top: 12,
  },
  Text: {
    fontSize: 16,
    color: Colors.black,
    alignSelf: 'flex-start',
    paddingHorizontal: 30,
  },
  ModalContent: {
    width: wp('70%'),
    height: hp('100%'),
  },
  // block User Css
  BlockparentDiv: {
    paddingHorizontal: 20,
    top: 12,
    flex: 1,
  },

  blockcontainer: {
    // position: 'relative',
    display: 'flex',
    alignSelf: 'center',
    bottom: 103,
  },
  blockpicture: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  blockusernameContainer: {
    // position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.grayColor,
    borderRadius: 95,
    padding: 5,
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blockusername: {
    fontWeight: 'bold',
    textAlign: 'center',
  },

  blockBtn: {
    height: 45,
    width: '75%',
    alignSelf: 'center',
    backgroundColor: Colors.blueThemeColor,
    borderRadius: 20,
    justifyContent: 'center',
    marginBottom: 40,
  },

  // username first letter css
  container: {
    backgroundColor: Colors.profileColor,
    marginTop: 20,
    marginHorizontal: 17,
    borderRadius: 60,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
    bottom: 12,
  },
  // profile css
  usernameContainer: {
    // position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.profileColor,
    borderRadius: 60,
    padding: 5,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  username: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  // Follow Button Css

  RoleUnfollowbutton: {
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.grayColor,
    width: '65%',
    alignSelf: 'center',
    top: 29,
    borderRadius: 20,
  },

  Rolefollowbutton: {
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themePink.pinkThemeColor,
    width: '65%',
    alignSelf: 'center',
    top: 29,
    borderRadius: 20,
  },
});

export default styles;
