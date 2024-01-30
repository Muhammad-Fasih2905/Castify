import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';

import {Colors, themeGreen, themePink} from '../../constants/Colors';

import NewHeader from '../../components/newHeader/NewHeader';
import {useDispatch, useSelector} from 'react-redux';
import {apiPasswordResetConfirmRequest} from '../Redux/action/auth';

const UpdatePassword = ({navigation}) => {
  const [allow, setAllow] = useState(false);
  const [updatePassword, setUpdatePassword] = useState({
    old_password: '',
    new_password: '',
    confirm_password: '',
  });
  const [error, setError] = useState({updatePasswordFormat: false});
  const [showPass, setShowPass] = useState(false);
  const [showPass1, setShowPass1] = useState(false);
  const [showPass2, setShowPass2] = useState(false);

  useEffect(() => {
    if (updatePassword) {
      setAllow(true);
    } else {
      setAllow(false);
    }
  }, [updatePassword]);

  const token = useSelector(state => state.auth.token);

  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(apiPasswordResetConfirmRequest(token, updatePassword));
    setUpdatePassword({
      old_password: '',
      new_password: '',
      confirm_password: '',
    });
    navigation.goBack();
  };

  const themeChange = useColorScheme() === 'Male' ? 'Male' : 'female';

  const handleChange = (key, value) => {
    setUpdatePassword(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleShowPass = () => {
    setShowPass(!showPass);
  };
  const handleShowPass1 = () => {
    setShowPass1(!showPass1);
  };

  const handleShowPass2 = () => {
    setShowPass2(!showPass2);
  };

  return (
    <Animatable.View animation="slideInLeft" delay={200} flex={1}>
      {/* Header */}
      <NewHeader title="Update Password" navigation={navigation} />
      {/*     
      <View
        style={{
          marginTop: 60,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottomWidth: 1.5,
          borderBottomColor: Colors.grayColor,
          marginBottom: 20,
          marginHorizontal: 15,
        }}>
        {..........Old Passsword..........}
        <Text style={styles.UpdatePasswordinputHead}></Text>
        <View style={styles.UpdatePasswordinputView}></View>
      </View> */}
      <View
        style={{
          flexDirection: 'column',
          // justifyContent: 'center',
          top: 64,
          flex: 1,
        }}>
        <Text style={styles.inputHead}>Old Password</Text>
        <View style={styles.inputPassView}>
          <View style={styles.passView}>
            <TextInput
              value={updatePassword.old_password}
              onChangeText={e => handleChange('old_password', e)}
              secureTextEntry={!showPass1}
              style={{
                width: '85%',
                marginHorizontal: 6,
                borderRadius: 10,
              }}
            />

            <TouchableOpacity
              style={{paddingHorizontal: 6}}
              onPress={handleShowPass1}>
              <Icon
                name={showPass1 ? 'eye-off-outline' : 'eye-outline'}
                size={24}
                color="#828282"
              />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.inputHead}>New Password</Text>
        <View style={styles.inputPassView}>
          <View style={styles.passView}>
            <TextInput
              value={updatePassword.new_password}
              onChangeText={e => handleChange('new_password', e)}
              secureTextEntry={!showPass}
              style={{width: '85%', marginHorizontal: 6, borderRadius: 10}}
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

        <Text style={styles.inputHead}>Confirm Passsword</Text>
        <View style={styles.inputPassView}>
          <View style={styles.passView}>
            <TextInput
              value={updatePassword.confirm_password}
              onChangeText={e => handleChange('confirm_password', e)}
              secureTextEntry={!showPass2}
              style={{width: '85%', marginHorizontal: 6, borderRadius: 10}}
            />

            <TouchableOpacity
              style={{paddingHorizontal: 6}}
              onPress={handleShowPass2}>
              <Icon
                name={showPass2 ? 'eye-off-outline' : 'eye-outline'}
                size={24}
                color="#828282"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* ..........Confirm Passsword.......... */}
      {/* <View
        style={{
          marginTop: 60,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottomWidth: 1.5,
          borderBottomColor: Colors.grayColor,
          marginBottom: 20,
          marginHorizontal: 15,
        }}>
        <View style={styles.UpdatePasswordinputView}>
          <Text style={styles.UpdatePasswordinputHead}></Text>
        </View>
      </View> */}
      <TouchableOpacity
        onPress={handleSubmit}
        disabled={!updatePassword && true}
        style={[
          styles.btnSubmit,
          themeChange === 'Male' && allow
            ? {backgroundColor: themeGreen.greenThemeColor}
            : {backgroundColor: themePink.pinkThemeColor},
        ]}>
        <Text style={{...styles.txtSubmit}}>Update</Text>
      </TouchableOpacity>
    </Animatable.View>
  );
};

export default UpdatePassword;
