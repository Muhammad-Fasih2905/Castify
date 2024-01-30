import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  Animated,
} from 'react-native';
import styles from './styles';

import {Colors, themeGreen, themePink} from '../../constants/Colors';
import NewHeader from '../../components/newHeader/NewHeader';
import {useDispatch} from 'react-redux';
import {apiPasswordResetRequest} from '../Redux/action/auth';

const EmailSend = ({navigation}) => {
  const [allow, setAllow] = useState(false);

  const [email, setEmail] = useState(null);
  const [error, setError] = useState({emailFormat: false});
  const dispatch = useDispatch();

  const animationValue = new Animated.Value(-200);

  const handleSubmit = () => {
    if (!email) {
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setError(prev => ({...prev, emailFormat: true}));
      return;
    }
    let data = {email};

    dispatch(apiPasswordResetRequest(data));
    navigation.navigate('CreatePassword', email);
  };

  const animateComponent = () => {
    return Animated.timing(animationValue, {
      toValue: 0,
      duration: 1100,
      useNativeDriver: false,
    });
  };

  useEffect(() => {
    if (email) {
      setError(prev => ({...prev, emailFormat: false}));
    }
  }, [email]);
  useEffect(() => {
    if (email) {
      setAllow(true);
    } else {
      setAllow(false);
    }
  }, [email]);

  useEffect(() => {
    Animated.sequence([animateComponent(), animateComponent()]).start();
  }, []);

  const themeChange = useColorScheme() === 'Male' ? 'Male' : 'female';

  return (
    <View flex={1} style={{backgroundColor: Colors.whiteColor}}>
      {/* Header */}
      <NewHeader title="Forgot Password" navigation={navigation} />
      <Animated.View
        style={{...styles.subDiv, transform: [{translateX: animationValue}]}}>
        <View
          style={{
            paddingHorizontal: 20,
            marginTop: 60,
          }}>
          {/* {..........Email..........} */}
          <Text style={styles.inputHead}>Email or username</Text>
          <View style={styles.inputView}>
            <TextInput
              placeholder="you@example.com"
              keyboardType="email-address"
              style={styles.input}
              onChangeText={e => setEmail(e)}
              caretHidden={false}
              autoCapitalize="none"
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={!email && true}
          style={[
            styles.btnSubmit,
            themeChange === 'Male' && allow
              ? {backgroundColor: themeGreen.greenThemeColor}
              : {backgroundColor: themePink.pinkThemeColor},
          ]}>
          <Text style={{...styles.txtSubmit}}>Email password reset</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default EmailSend;
