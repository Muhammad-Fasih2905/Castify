import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import styles from './styles';
import {Colors, themeGreen, themePink} from '../../constants/Colors';
import NewHeader from '../../components/newHeader/NewHeader';

const UpdateEmail = ({navigation}) => {
  const themeChange = useColorScheme() === 'Male' ? 'Male' : 'female';

  const [allow, setAllow] = useState(false);
  const [email, setEmail] = useState(null);
  const [error, setError] = useState({emailFormat: false});
  //   useEffect(() => {
  //     if (email) {
  //       setError(prev => ({ ...prev, emailFormat: false, }))
  //     }
  //   }, [email])
  useEffect(() => {
    if (email) {
      setAllow(true);
    } else {
      setAllow(false);
    }
  }, [email]);

  const handleSubmit = () => {
    if (!email) {
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setError(prev => ({...prev, emailFormat: true}));
      return;
    }
  };
  return (
    <View flex={1}>
      {/* Header */}
      <NewHeader title="Change Email" navigation={navigation} />

      <View style={{paddingHorizontal: 20, marginTop: 60}}>
        {/* {..........Email..........} */}
        <View style={styles.EmailinputView}>
          <Text style={styles.EmailinputHead}>Email</Text>
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={e => setEmail(e)}
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
        <Text style={{...styles.txtSubmit}}>Update</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UpdateEmail;
