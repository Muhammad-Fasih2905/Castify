import {
  useColorScheme,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../../components/header';
import facebook from '../../assets/facebook-logo.png';
import styles from './styles';
import {Colors, themeGreen, themePink} from '../../constants/Colors';
import {useDispatch, useSelector} from 'react-redux';
import {api_login_request} from '../Redux/action/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({props, navigation}) => {
  const dispatch = useDispatch();
  const authReducer = useSelector(state => state.auth);

  // const themeChange = useColorScheme() === 'Male' ? 'Male' : 'female';

  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState(colorScheme);

  const [loginFormObj, setLoginFormObj] = useState({
    email: '',
  });
  const [showPass, setShowPass] = useState(false);
  const [allow, setAllow] = useState(false);

  const handleChange = (key, value) => {
    setLoginFormObj(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleShowPass = () => {
    setShowPass(!showPass);
  };

  const handleLogin = async () => {
    if (!loginFormObj.email) {
      alert('please fill all fields');
    } else {
      navigation.navigate('InviteCode');
      // dispatch(api_login_request(loginFormObj));
      AsyncStorage.setItem('isLoggedIn', 'true');
    }
  };

  useEffect(() => {
    if (loginFormObj.email) {
      setAllow(true);
    } else {
      setAllow(false);
    }
    if (authReducer?.user?.name === 'male') {
      setTheme('male'); // Set the theme to 'male' if the user's name is 'male'
    } else if (authReducer?.user?.name === 'female') {
      setTheme('female'); // Set the theme to 'female' if the user's name is 'female'
    } else {
      setTheme(colorScheme);
    }
  }, [authReducer, colorScheme, loginFormObj]);

  useEffect(() => {
    AsyncStorage.getItem('isLoggedIn').then(value => {
      if (value === 'true') {
        navigation.navigate('Home');
      }
    });
  }, [authReducer.login_success]);

  return (
    <View
      flex={1}
      style={{
        backgroundColor: Colors.whiteColor,
      }}>
      {/* Header */}
      <Header title="Log in or sign up" navigation={navigation} />
      <View style={{paddingHorizontal: 20, marginTop: 60}}>
        {/* {..........Email..........} */}
        <Text style={styles.inputHead}>Your email</Text>
        <View style={styles.inputView}>
          <TextInput
            placeholder="you@example.com"
            keyboardType="email-address"
            style={styles.input}
            value={loginFormObj?.email}
            onChangeText={e => {
              const lowercaseValue = e.charAt(0).toLowerCase() + e.slice(1);

              handleChange('email', lowercaseValue);
            }}
          />
        </View>

        <TouchableOpacity
          onPress={handleLogin}
          disabled={!allow}
          style={[
            styles.btnSubmit,

            theme === 'Male' && allow
              ? {backgroundColor: themeGreen.greenThemeColor}
              : {backgroundColor: themePink.pinkThemeColor},
          ]}>
          <Text style={{...styles.txtSubmit}}>Continue</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{paddingHorizontal: 25}}
        onPress={() => navigation.navigate('LoginPassword')}>
        <Text
          style={{
            alignSelf: 'flex-end',
            color: Colors.grayColor,
            marginTop: 10,
          }}>
          Want to verify another way?
          <Text
            style={{
              color: Colors.whiteColor,
              fontWeight: '700',
              textDecorationLine: 'underline',
            }}>
            Log in with password
          </Text>
        </Text>
      </TouchableOpacity>

      <View style={styles.lineView}>
        <View style={styles.line} />

        <View style={styles.line} />
      </View>
      {/* {..........Social btn..........} */}
      <View style={styles.mainbtnview}>
        <TouchableOpacity
          style={{
            ...styles.btnSubmit,
            flexDirection: 'row',
            backgroundColor: Colors.whiteThemeColor,
            borderRadius: 22,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,

            elevation: 4,
          }}>
          <Image source={facebook} style={styles.Googleimage} />
          <Text
            style={{
              color: Colors.blueThemeColor,
              fontSize: 17,
              paddingHorizontal: 12,
            }}>
            Continue with Facebook
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
