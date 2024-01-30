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
import {Colors, themeGreen, themePink} from '../../constants/Colors';
import {useDispatch, useSelector} from 'react-redux';
import {apiPasswordConfirmRequest} from '../Redux/action/auth';
import NewHeader from '../../components/newHeader/NewHeader';

const CreatePassword = ({navigation}) => {
  const auth = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const [showPass, setShowPass] = useState(false);
  const [showPass1, setShowPass1] = useState(false);
  const [allow, setAllow] = useState(false);
  const [createPassword, setCreatePassword] = useState({
    password: '',
    password2: '',
    token: '',
  });

  const [error, setError] = useState({
    token: false,
    unMatchPass: false,
    passLength: false,
  });

  useEffect(() => {
    setError(prev => ({
      ...prev,
      token: false,
      passLength: false,
      unMatchPass: false,
    }));
  }, [createPassword]);
  const handleShowPass = () => {
    setShowPass(!showPass);
  };

  const handleShowPass1 = () => {
    setShowPass1(!showPass1);
  };

  const handleChange = (key, value) => {
    setCreatePassword(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    if (createPassword.password && createPassword.password2) {
      setAllow(true);
    } else {
      setAllow(false);
    }
  }, [createPassword]);

  useEffect(() => {
    if (auth.reset) {
      navigation.replace('signup');
    }
  }, [auth.reset]);

  const handleSubmit = () => {
    const {token, password, password2} = createPassword;

    let passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^_&|*])[a-zA-Z0-9!@#$%^_&*]{7,15}$/;

    if (!password.match(passwordRegex)) {
      // badPassToast()
      setError(prev => ({...prev, passLength: true}));
      return;
    }

    if (password !== password2) {
      setError(prev => ({...prev, unMatchPass: true}));
      return;
    }
    dispatch(apiPasswordConfirmRequest(createPassword));
  };

  const themeChange = useColorScheme() === 'Male' ? 'Male' : 'female';

  return (
    <View flex={1}>
      {/* Header */}
      <NewHeader title="Create New Password" navigation={navigation} />

      <View style={{paddingHorizontal: 20, marginTop: 60}}>
        {/* {..........Password..........} */}
        <Text style={styles.inputHead}>New Password</Text>
        <View style={styles.inputView}>
          <View style={styles.passView}>
            <TextInput
              placeholder="Password"
              style={{...styles.input, width: '89%'}}
              secureTextEntry={!showPass}
              value={createPassword?.password}
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

        {/* .............Re-Type_Password............ */}
        <Text style={styles.inputHead}>Confirm Password</Text>
        <View style={styles.inputView}>
          <View style={styles.passView}>
            <TextInput
              placeholder="Confirm Password"
              style={{...styles.input, width: '89%'}}
              secureTextEntry={!showPass}
              value={createPassword?.password2}
              onChangeText={e => handleChange('password2', e)}
              autoCorrect={false}
              autoCapitalize="none"
              textContentType="none"
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
        {error.unMatchPass && (
          <View style={styles.errView}>
            <Text style={styles.errTxt}>Password do not match</Text>
          </View>
        )}

        <Text style={styles.inputHead}>Confirmation Code</Text>
        <View style={styles.inputView}>
          <TextInput
            keyboardType="number-pad"
            style={styles.input}
            placeholder="Code"
            placeholderTextColor={Colors.grayColor}
            onChangeText={e => handleChange('token', e)}
          />
        </View>
      </View>
      <TouchableOpacity
        style={[
          styles.btnSubmit,
          themeChange === 'Male' && allow
            ? {backgroundColor: themeGreen.greenThemeColor}
            : {backgroundColor: themePink.pinkThemeColor},
        ]}
        disabled={
          !createPassword.token ||
          !createPassword.password ||
          (!createPassword.password2 && true)
        }
        onPress={handleSubmit}>
        <Text style={{...styles.txtSubmit}}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreatePassword;
