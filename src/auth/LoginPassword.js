import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  useColorScheme,
  ActivityIndicator,
} from 'react-native';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import styles from './styles';
import {Colors, themeGreen, themePink} from '../../constants/Colors';

import {useDispatch, useSelector} from 'react-redux';
import {api_login_request} from '../Redux/action/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

import NewHeader from '../../components/newHeader/NewHeader';
import {useNavigation} from '@react-navigation/native';

const LoginPassword = () => {
  const dispatch = useDispatch();
  const authReducer = useSelector(state => state.auth);
  const {loginLoader} = useSelector(state => state.auth);
  const navigation = useNavigation();

  // const themeChange = useColorScheme() === 'Male' ? 'Male' : 'female';

  const [loginFormObj, setLoginFormObj] = useState({
    email: '',
    password: '',
  });
  const [showPass, setShowPass] = useState(false);
  const [allow, setAllow] = useState(false);
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState(colorScheme);

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
    if (!loginFormObj.email || !loginFormObj.password) {
    } else {
      dispatch(api_login_request(loginFormObj));
      AsyncStorage.setItem('isLoggedIn', 'true');
      // const token = await messaging().getToken();
      // console.log('FCM Token:', token);
    }
  };

  useEffect(() => {
    if (loginFormObj.email && loginFormObj.password) {
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

  // useEffect(() => {
  //   AsyncStorage.getItem('isLoggedIn').then(value => {
  //     if (value === 'true') {
  //       navigation.navigate('Home');
  //     }
  //   });
  // }, [authReducer.login_success]);

  useEffect(() => {
    if (authReducer?.login_success) {
      navigation.replace('Home');
    }
  }, [authReducer, navigation]);

  // useEffect(() => {
  //   // Request permission to receive notifications
  //   messaging()
  //     .requestPermission()
  //     .then(() => {
  //       console.log('Permission granted!');
  //       handleLogin();
  //     })
  //     .catch(error => {
  //       console.log('Permission denied:', error);
  //     });
  // }, []);

  return (
    <View flex={1} style={{backgroundColor: Colors.whiteThemeColor}}>
      {/* Header */}
      <NewHeader title="Talent Sign In" navigation={navigation} />
      <Animatable.View
        style={{...styles.subDiv}}
        animation="slideInLeft"
        delay={300}>
        <View style={{paddingHorizontal: 20, marginTop: 60}}>
          {/* {..........Email..........} */}
          <Text style={styles.inputHead}>Email or username</Text>
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
              caretHidden={false}
              autoCapitalize="none"
            />
          </View>
          {/* {..........Password..........} */}
          <Text style={styles.inputHead}>Your Password</Text>
          <View style={styles.inputView}>
            <View style={styles.passView}>
              <TextInput
                placeholder="Password"
                style={{...styles.input, width: '89%'}}
                secureTextEntry={!showPass}
                value={loginFormObj?.password}
                onChangeText={e => handleChange('password', e)}
                autoCorrect={false}
                autoCapitalize="none"
                textContentType="none"
              />
              <TouchableOpacity
                style={{paddingHorizontal: 6}}
                onPress={handleShowPass}>
                <Icon
                  name={showPass ? 'eye-off-outline' : 'eye-outline'}
                  size={24}
                  color="#828282"
                />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={{paddingHorizontal: 15}}
            onPress={() => navigation.navigate('EmailSend')}>
            {/* Want to verify another way? */}
            <Text
              style={{
                color: Colors.Lightestgrey,
                fontWeight: '700',
                textDecorationLine: 'underline',
                marginTop: 6,
              }}>
              Forgot your password?
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            ...styles.mainbtnview,
            flexDirection: 'column',
          }}>
          <TouchableOpacity
            onPress={handleLogin}
            disabled={!allow}
            style={[
              styles.btnSubmit,
              theme === 'Male' && allow
                ? {backgroundColor: themeGreen.greenThemeColor}
                : {backgroundColor: themePink.pinkThemeColor},
            ]}>
            {loginLoader ? (
              <ActivityIndicator size="large" color={Colors.whiteColor} />
            ) : (
              <Text style={{...styles.txtSubmit}}>Sign in</Text>
            )}
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default LoginPassword;
