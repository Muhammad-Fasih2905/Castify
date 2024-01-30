import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import styles from './styles';
import {Colors, themeGreen, themePink} from '../../constants/Colors';
import NewHeader from '../../components/newHeader/NewHeader';
// import { useDispatch } from 'react-redux';
// import { apiPasswordResetRequest } from '../../Redux/action/auth';

const InviteCode = ({navigation}) => {
  const [allow, setAllow] = useState(false);
  // const [forgotPassword,setForgotPassword]=useState({
  //   email:'',
  // })

  const themeChange = useColorScheme() === 'Male' ? 'Male' : 'female';

  const [inviteCode, setInviteCode] = useState(null);
  const [error, setError] = useState({emailFormat: false});
  //   const dispatch = useDispatch()

  // const handleChange = (key,value) =>{
  //  setForgotPassword(prev => ({
  //   ...prev,
  //   [key]:value,
  //  }))
  // }

  useEffect(() => {
    if (inviteCode) {
      setError(prev => ({...prev, emailFormat: false}));
    }
  }, [inviteCode]);
  useEffect(() => {
    if (inviteCode) {
      setAllow(true);
    } else {
      setAllow(false);
    }
  }, [inviteCode]);

  const handleSubmit = () => {
    // if (!inviteCode) {
    //   return;
    // }
    // if (!inviteCode.includes('@') || !inviteCode.includes('.')) {
    //   setError(prev => ({...prev, emailFormat: true}));
    //   return;
    // }
    let data = {inviteCode};

    // dispatch(apiPasswordResetRequest(data))
    // navigation.navigate("CreatePassword",email)
    navigation.navigate('Home');
  };
  return (
    <View flex={1} style={{backgroundColor: Colors.whiteThemeColor}}>
      {/* Header */}
      <NewHeader title=" Enter your invite code" navigation={navigation} />
      <View style={styles.subDiv}>
        <View
          style={{
            paddingHorizontal: 20,
            marginTop: 60,
          }}>
          {/* {..........Email..........} */}
          <View
            style={{
              ...styles.inputView,
              backgroundColor: Colors.whiteThemeColor,
            }}>
            <TextInput
              placeholder="invite code"
              keyboardType="invite code"
              style={styles.input}
              //   value={InviteCode?.InviteCode}
              onChangeText={e => setInviteCode(e)}
            />
          </View>
          <TouchableOpacity
            style={{
              paddingHorizontal: 25,
              alignSelf: 'flex-start',
            }}
            onPress={() => navigation.navigate('TalentScreen')}>
            <Text
              style={{
                alignSelf: 'flex-end',
                color: Colors.grayColor,
                marginTop: 10,
              }}>
              Don't have an invite code?
              <Text
                style={{
                  color: Colors.whiteColor,
                  fontWeight: '700',
                  textDecorationLine: 'underline',
                }}>
                Apply for one
              </Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{paddingHorizontal: 25}}
            onPress={() => navigation.navigate('LoginPassword')}>
            <Text
              style={{
                alignSelf: 'flex-start',

                color: Colors.grayColor,
                marginTop: 10,
              }}>
              Alredy have an account?
              <Text
                style={{
                  color: Colors.whiteColor,
                  fontWeight: '700',
                  textDecorationLine: 'underline',
                }}>
                Log in
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{color: Colors.Lightestgrey, textAlign: 'center'}}>
            by signing up, you agree to cameo's terms of service, including
            additional terms, additional privacy policy
          </Text>
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={!inviteCode && true}
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
    </View>
  );
};

export default InviteCode;
