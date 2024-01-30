import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
  ActivityIndicator,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { Colors, themeGreen, themePink } from '../../constants/Colors';
import NewHeader from '../../components/newHeader/NewHeader';

import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { api_signup_request } from '../Redux/action/auth';
import Toast from 'react-native-toast-message';
import messaging from '@react-native-firebase/messaging';

const TalentScreen = () => {
  const themeChange = useColorScheme() === 'Male' ? 'Male' : 'female';

  const dispatch = useDispatch();

  const navigation = useNavigation();

  const [showPass, setShowPass] = useState(false);
  const [showPass1, setShowPass1] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');

  const [talentData, setTalentData] = useState({
    role: '2',
    email: '',
    password: '',
    name: '',
  });
  const [isBodySize, setIsBodySize] = useState([
    { id: 1, value: true, name: 'Male', selected: false },
    { id: 2, value: false, name: 'Female', selected: false },
    { id: 3, value: false, name: 'Rather not to say', selected: false },
  ]);

  const authReducer = useSelector(state => state.auth);
  const { signupLoader } = useSelector(state => state.auth);

  const handleChange = (key, value) => {
    setTalentData(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleShowPass = () => {
    setShowPass(prev => !prev);
  };
  const onRadioBtnClick = selectedItem => {
    const updatedBodySize = isBodySize.map(item => {
      if (item.id === selectedItem.id) {
        return { ...item, selected: true };
      } else {
        return { ...item, selected: false };
      }
    });

    setTalentData(prevData => ({
      ...prevData,
      gender: selectedItem.name,
    }));

    setIsBodySize(updatedBodySize);
  };

  const handleShowPass1 = () => {
    setShowPass1(prev => !prev);
  };

  const handleTalent = async () => {
    if (
      talentData.password &&
      confirmPassword &&
      talentData.password === confirmPassword
    ) {
      const token = await messaging().getToken();
      let TalentSignupData = {
        ...talentData,
        fcm_token: token,
      };
      dispatch(api_signup_request(TalentSignupData));
    } else {
      Toast.show({
        type: 'error',
        text1: 'Passwords do not match..',
      });
    }
  };

  useEffect(() => {
    if (authReducer?.signup_success) {
      navigation.replace('Home', { isNewUser: true });
    }
  }, [authReducer?.signup_success]);
  // useEffect(() => {
  //   messaging()
  //     .requestPermission()
  //     .then(() => {
  //       console.log('Permission granted!');
  //       handleTalent();
  //     })
  //     .catch(error => {
  //       console.log('Permission denied:', error);
  //     });
  // }, []);

  return (
    <View flex={1}>
      <NewHeader title="Talent Signup" navigation={navigation} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Animatable.View
          animation="slideInLeft"
          delay={300}
          style={styles.mainInputView}>
          {/* {..........Name..........} */}
          <Text style={styles.inputHead}>Name</Text>
          <View style={styles.inputView}>
            <TextInput
              placeholder="Full Name"
              style={styles.input}
              value={talentData?.name}
              placeholderTextColor={Colors.grayColor}
              onChangeText={e => handleChange('name', e)}
            />
          </View>
          {/* {..........Email..........} */}
          <Text style={styles.inputHead}>Email</Text>
          <View style={styles.inputView}>
            <TextInput
              placeholder="you@example.com"
              keyboardType="email-address"
              style={styles.input}
              value={talentData?.email}
              onChangeText={e => {
                const lowercaseValue = e.charAt(0).toLowerCase() + e.slice(1);

                handleChange('email', lowercaseValue);
              }}
              placeholderTextColor={Colors.grayColor}
              autoCapitalize="none"
              caretHidden={false}
            />
          </View>

          {/* {..........Password..........} */}
          <Text style={styles.inputHead}>Password</Text>
          <View style={styles.inputView}>
            <View style={styles.passView}>
              <TextInput
                placeholder="Password"
                style={styles.input}
                secureTextEntry={!showPass}
                value={talentData?.password}
                onChangeText={e => handleChange('password', e)}
                placeholderTextColor={Colors.grayColor}
              />
              <TouchableOpacity
                style={{ paddingHorizontal: 6 }}
                onPress={handleShowPass}>
                <Icon1
                  name={showPass ? 'eye-off-outline' : 'eye-outline'}
                  size={24}
                  color="#828282"
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* .............Re-Type_Password............ */}
          <Text style={styles.inputHead}>Confirm Password</Text>
          <View style={styles.inputView}>
            <View style={styles.passView}>
              <TextInput
                placeholder="Confirm Password"
                style={{ ...styles.input, width: '89%' }}
                secureTextEntry={!showPass1}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                autoCorrect={false}
                autoCapitalize="none"
                textContentType="none"
              />
              <TouchableOpacity
                style={{ paddingHorizontal: 6 }}
                onPress={handleShowPass1}>
                <Icon1
                  name={showPass1 ? 'eye-off-outline' : 'eye-outline'}
                  size={24}
                  color="#828282"
                />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.inputHead}>Gender</Text>
          {isBodySize.map(item => (
            <View style={styles.radioButtonContainer} key={item.id}>
              <TouchableOpacity
                onPress={() => onRadioBtnClick(item)}
                style={styles.radioButton}>
                {item.selected ? <View style={styles.radioButtonIcon} /> : null}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onRadioBtnClick(item)}>
                <Text style={styles.radioButtonText}>{item.name}</Text>
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity
            onPress={handleTalent}
            style={[
              styles.btnSubmit,

              themeChange === 'Male' && allow
                ? { backgroundColor: themeGreen.greenThemeColor }
                : { backgroundColor: themePink.pinkThemeColor },
            ]}>
            {signupLoader ? (
              <ActivityIndicator size="large" color={Colors.whiteColor} />
            ) : (
              <Text style={{ ...styles.txtSubmit }}>Continue</Text>
            )}
          </TouchableOpacity>
        </Animatable.View>
      </ScrollView>
    </View>
  );
};

export default TalentScreen;

const styles = StyleSheet.create({
  inputHead: {
    color: Colors.black,
    fontSize: 13,
    fontWeight: '700',
    left: 6,
  },

  inputView: {
    borderWidth: 1,
    marginBottom: 20,
    borderStyle: 'solid',
    borderColor: Colors.grayColor,
    borderRadius: 20,
    top: 12,
  },

  // categoryOption

  categoryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderBottomColor: Colors.grayColor,
    marginBottom: 20,
    borderStyle: 'solid',
    borderColor: Colors.grayColor,
    borderRadius: 20,
    top: 12,
  },

  PicView: {
    borderWidth: 1.5,
    borderColor: Colors.grayColor,
    marginBottom: 30,
    borderStyle: 'solid',
    width: '65%',
    height: '10%',
    top: 12,
    borderRadius: 20,
    alignSelf: 'center',
  },
  input: {
    height: 50,
    color: Colors.black,
    fontSize: 14,
    left: 12,
  },
  mainInputView: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    marginHorizontal: 14,
    top: 29,
  },
  AgeBox: {
    display: 'flex',
    width: '80%',
    height: 79,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
    backgroundColor: Colors.whiteColor,
    alignSelf: 'center',
    paddingTop: 12,
    borderRadius: 12,
  },
  AgeView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  AgeText: {
    paddingHorizontal: 12,
    bottom: 6,
    fontSize: 15,
  },
  ageCaretup: {
    alignSelf: 'center',
  },

  //   radio button
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 45,
    padding: 9,
  },
  radioButton: {
    height: 20,
    width: 20,
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonIcon: {
    height: 14,
    width: 14,
    borderRadius: 7,
    backgroundColor: '#98CFB6',
  },
  radioButtonText: {
    fontSize: 16,
    marginLeft: 16,
  },
  btnSubmit: {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    width: '95%',
    height: 50,
    borderRadius: 22,
    marginTop: 22,
    marginBottom: 44,
  },
  txtSubmit: {
    color: Colors.whiteColor,
    fontSize: 15,
  },

  passView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // width:'50%'
  },

  // Modal Css

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

  // Bio Input
  BioinputWidth: {
    display: 'flex',
    flexDirection: 'row',
    width: 300,
    height: 70,
    marginHorizontal: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.grayColor,
  },

  // Modal Content Css
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal1: {
    width: wp(98),
    height: wp(155),
    backgroundColor: Colors.whiteThemeColor,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
  },
  optionItem: {
    width: '100%',
    flexDirection: 'column',
    borderBottomColor: Colors.grayColor,
    borderBottomWidth: 1,
    padding: 15,
    height: 50,
  },
});
