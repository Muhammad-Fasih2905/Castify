import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Colors, themePink} from '../../constants/Colors';

const styles = StyleSheet.create({
  mainProfile: {
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'column',
    alignSelf: 'center',
    marginTop: 20,
  },
  ProfileAvtar: {
    width: wp('40%'),
    height: hp('20%'),
    borderRadius: 84,
    borderWidth: 10,
    alignSelf: 'center',
  },
  pencil: {
    display: 'flex',
    alignSelf: 'flex-end',
  },

  modalProfilePicContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 20,
  },
  zoomedImage: {
    width: 300,
    height: 650,
    borderRadius: 25,
  },
  closeButton: {
    position: 'absolute',
    top: 9,
    right: 20,
  },

  inputTextHead: {
    color: Colors.blackTheme,
    fontSize: 16,
    paddingLeft: 22,
  },
  inputsView: {
    display: 'flex',
    flexDirection: 'column',
    width: wp('90%'),
    marginTop: 20,
    paddingHorizontal: 10,
  },
  inputs: {
    height: 50,
    width: wp('70%'),
    borderStyle: 'solid',
    borderRadius: 20,
  },
  btnSubmit: {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    height: 50,
    width: 300,
    borderRadius: 22,
    top: 40,
  },
  txtSubmit: {
    color: Colors.whiteColor,
    fontSize: 15,
  },
  settingsScreenView: {
    borderBottomWidth: 1.5,
    borderBottomColor: Colors.Lightestgrey,
    marginTop: 30,
  },
  profileView: {
    flexDirection: 'row-reverse',
    paddingHorizontal: 12,
  },

  postbtn: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 14,
    width: '25%',
    height: 85,
    alignSelf: 'center',
  },
  container: {
    // position: 'relative',
    display: 'flex',
    alignSelf: 'center',
    // bottom: 103,
  },
  usernameContainer: {
    // position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.profileColor,
    borderRadius: 60,
    padding: 5,
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  username: {
    fontWeight: 'bold',
    textAlign: 'center',
  },

  picture: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.grayColor,
  },
  //   PostPic
  PostPic: {
    width: 300,
    height: 400,
    borderRadius: 20,
    alignSelf: 'center',
    marginVertical: 12,
  },
  // followerShowView

  followerShowView: {
    display: 'flex',
    flexDirection: 'row',
    width: '70%',
    height: 55,
    alignSelf: 'center',
    top: 20,
    justifyContent: 'space-around',
  },
  ApplicateUserProfile: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 55,
    alignSelf: 'center',
    top: 20,
    justifyContent: 'space-around',
    borderBottomColor:Colors.Lightestgrey,
    borderBottomWidth:1
  },
  // UnderLine CSS
  text: {
    fontSize: 15,
    fontWeight: '600',
    left: 13,
    color: Colors.black,
  },
  progressBar: {
    height: 20,
    marginTop: 3,
    left: 19,
    width: '73%',
  },

  // Modal Css

  modal: {
    width: wp(95),
    height: wp(80),
    backgroundColor: Colors.whiteThemeColor,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
  },

  ModalView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1.5,
    borderBottomColor: Colors.Lightestgrey,
    paddingHorizontal: 30,
    paddingVertical: 12,
  },
  CancelbtnModal: {
    alignItems: 'center',
    marginTop: 23,
    backgroundColor: Colors.blueThemeColor,
    marginHorizontal: 12,
    height: 38,
    borderRadius: 13,
  },

  // FeddBack Input
  feedBackInput: {
    display: 'flex',
    flexDirection: 'row',
    width: 300,
    height: 50,
    marginHorizontal: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.grayColor,
    bottom: 25,
  },
});

export default styles;
