import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Colors} from '../../constants/Colors';

const styles = StyleSheet.create({
  bgColor: {
    backgroundColor: Colors.lightGrayColor,
  },
  santosPRO: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Colors.whiteColor,
    borderTopWidth: 1.5,
    borderColor: Colors.Lightestgrey,
    paddingVertical: 20,
  },
  santosPROText: {
    marginRight: 130,
    fontSize: 17,
    fontWeight: 'bold',
  },
  AddExHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  settingsScreenView: {
    borderBottomWidth: 1.5,
    borderBottomColor: Colors.Lightestgrey,
    marginTop: 12,
  },
  profileView: {
    flexDirection: 'row-reverse',
    paddingHorizontal: 12,
  },
  settingsBg: {
    backgroundColor: Colors.whiteColor,
    height: 70,
    top: 12,
  },
  Unlockbtn: {
    backgroundColor: Colors.blueThemeColor,
    height: 33,
    width: 90,
    borderRadius: 6,
  },
  screenheader: {
    paddingHorizontal: 19,
    fontSize: 18,
    color: Colors.grayColor,
    fontWeight: '900',
    paddingVertical: 12,
  },
  soicalIcons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    height: 55,
    alignItems: 'center',
    top: 5,
  },
  instaPic: {
    width: 35,
    height: 35,
    borderRadius: 10,
  },
  btnSubmit: {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    width: '98%',
    height: 50,
    borderRadius: 8,
    marginTop: 22,
    marginBottom: 12,
    backgroundColor: Colors.whiteColor,
  },
  txtSubmit: {
    color: Colors.redColor,
    fontSize: 14,
  },

  disabledBtnSubmit: {
    backgroundColor: Colors.Lightestgrey,
  },
  modal: {
    width: wp(95),
    height: wp(50),
    backgroundColor: Colors.whiteThemeColor,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
  },
  AddProfileHeader: {
    // width: '89%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    // backgroundColor:'red'
  },
  ModalView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1.5,
    borderBottomColor: Colors.Lightestgrey,
    paddingHorizontal: 30,
  },
  CancelbtnModal: {
    alignItems: 'center',
    marginTop: 23,
    backgroundColor: Colors.blueThemeColor,
    marginHorizontal: 12,
    height: 38,
    borderRadius: 13,
  },
  Input: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: Colors.grayColor,
  },
  inputViewText: {
    fontSize: 14,
    color: Colors.grayColor,
  },
  inputView: {
    paddingHorizontal: 12,
  },
  input: {
    height: 40,
    // color: Colors.grayColor,
    fontSize: 14,
    // backgroundColor:'red',
    width: '60%',
    marginBottom: 12,
  },

  // Header
  Signupheader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  backarrow: {
    width: 20,
    height: 20,
  },
  UnitDiv: {
    display: 'flex',
    flex: 1,
  },
  UnitsColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  Units: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  UnitbtnSubmit: {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    width: '50%',
    backgroundColor: Colors.blueThemeColor,
    borderRadius: 5,
    height: 50,
    marginTop: 22,
    marginBottom: 12,
  },
  EmailinputView: {
    borderBottomWidth: 1.5,
    borderBottomColor: Colors.grayColor,
    marginBottom: 20,
  },
  EmailinputHead: {
    color: Colors.blackColor,
    fontSize: 13,
    fontWeight: '700',
  },
  btnSubmit: {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    width: '90%',
    height: 50,
    borderRadius: 8,
    marginTop: 22,
    bottom: 25,
  },
  txtSubmit: {
    color: Colors.whiteColor,
    fontSize: 15,
  },

  UpdatePasswordinputHead: {
    color: Colors.blackColor,
    fontSize: 13,
    fontWeight: '700',
  },

  // New csss
  inputHead: {
    color: Colors.black,
    fontSize: 13,
    fontWeight: '700',
    left: 22,
    top: 9,
  },

  inputPassView: {
    borderWidth: 1,
    borderBottomColor: Colors.grayColor,
    marginBottom: 20,
    borderStyle: 'solid',
    borderColor: Colors.grayColor,
    borderRadius: 20,
    top: 12,
    marginHorizontal: 12,
    marginVertical: 12,
  },
  passView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // width:'50%'
  },
});

export default styles;
