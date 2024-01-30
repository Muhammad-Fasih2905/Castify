import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
} from 'react-native';
import styles from './styles';
import {Colors, themeGreen, themePink} from '../../constants/Colors';
import Header from '../../components/header';
// import { useDispatch } from 'react-redux';
// import { apiPasswordResetRequest } from '../../Redux/action/auth';

const CheckEmail = ({navigation}) => {
  const themeChange = useColorScheme() === 'Male' ? 'Male' : 'female';

  const [allow, setAllow] = useState(false);
  // const [forgotPassword,setForgotPassword]=useState({
  //   email:'',
  // })

  const [code, setCode] = useState(null);
  const [error, setError] = useState({codeFormat: false});
  //   const dispatch = useDispatch()

  // const handleChange = (key,value) =>{
  //  setForgotPassword(prev => ({
  //   ...prev,
  //   [key]:value,
  //  }))
  // }

  useEffect(() => {
    if (code) {
      setError(prev => ({...prev, codeFormat: false}));
    }
  }, [code]);
  useEffect(() => {
    if (code) {
      setAllow(true);
    } else {
      setAllow(false);
    }
  }, [code]);

  const handleSubmit = () => {
    // if (!code) {
    //   return;
    // }
    // if (!code.includes('0123') || code.length !== 6) {
    //   setError(prev => ({...prev, codeFormat: true}));
    //   return;
    // }
    // let data = {code};
    navigation.navigate('Home');

    // dispatch(apiPasswordResetRequest(data))
    // navigation.navigate("CreatePassword",email)
  };
  return (
    <View flex={1} style={{backgroundColor: Colors.whiteThemeColor}}>
      {/* Header */}
      <Header title="Check your email" navigation={navigation} />
      <View style={{...styles.subDiv}}>
        <View
          style={{
            paddingHorizontal: 20,
            marginTop: 60,
          }}>
          {/* {..........Email..........} */}
          <Text style={styles.inputHead}>
            Please click the link or enter the code sent to ABC@gmail.com to
            continue
          </Text>
          <View style={styles.inputView}>
            <TextInput
              placeholder="ABCDEF"
              style={styles.input}
              // value={forgotPassword?.email}
              onChangeText={e => setCode(e)}
            />
          </View>
          <TouchableOpacity style={{paddingHorizontal: 25}}>
            <Text
              style={{
                alignSelf: 'flex-start',

                color: Colors.grayColor,
              }}>
              Didn't receive the code?
              <Text
                style={{
                  color: Colors.whiteColor,
                  fontWeight: '700',
                  textDecorationLine: 'underline',
                }}>
                Resend code
              </Text>
            </Text>
          </TouchableOpacity>
          <View style={{marginTop: 30}}>
            <View style={{...styles.lineView, marginTop: 0, paddingBottom: 23}}>
              <View style={styles.line} />
            </View>
            <TouchableOpacity
              style={{paddingHorizontal: 25}}
              onPress={() => navigation.navigate('Login')}>
              <Text
                style={{
                  alignSelf: 'flex-start',

                  color: Colors.grayColor,
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
          </View>
        </View>
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={!code && true}
          style={[
            styles.btnSubmit,
            themeChange === 'Male' && allow
              ? {backgroundColor: themeGreen.greenThemeColor}
              : {backgroundColor: themePink.pinkThemeColor},
          ]}>
          <Text style={{...styles.txtSubmit}}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CheckEmail;
