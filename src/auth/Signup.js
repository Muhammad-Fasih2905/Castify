import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import DatePicker from 'react-native-date-picker';
import Toast from 'react-native-toast-message';
import moment from 'moment';

// import CheckBox from '@react-native-community/checkbox';
import backbtn from '../../assets/back-button.png';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/AntDesign';
import {Checkbox} from 'native-base';
import {Colors, themeGreen, themePink} from '../../constants/Colors';
import {useDispatch, useSelector} from 'react-redux';
import {api_signup_request} from '../Redux/action/auth';
import NewHeader from '../../components/newHeader/NewHeader';

const Signup = ({navigation}) => {
  const authReducer = useSelector(state => state.auth);
  const toast = useToast();

  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState(
    colorScheme === 'Male' ? 'Male' : 'female',
  );

  useEffect(() => {
    // Check if the user is logged in and their name matches the desired username for a specific theme
    if (authReducer?.user?.name === authReducer?.user?.name) {
      setTheme('Male'); // Set the theme to 'Male' or any other theme value you want
    } else {
      setTheme(colorScheme === 'Male' ? 'Male' : 'female');
    }
  }, [authReducer, colorScheme]);

  const [signUpFormObj, setSignUpFormObj] = useState({
    role: '1',
    email: '',
    name: '',
    password: '',
    gender: '',
    dateOfBirth: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isBodySize, setIsBodySize] = useState([
    {id: 1, value: true, name: 'Male', selected: false},
    {id: 2, value: false, name: 'Female', selected: false},
    {id: 3, value: false, name: 'Rather Not To Say', selected: false},
  ]);

  const [showPass, setShowPass] = useState(false);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));

  const handleChange = (key, value) => {
    setSignUpFormObj(prev => ({
      ...prev,
      [key]: value,
    }));
  };
  const handleShowPass = () => {
    setShowPass(!showPass);
  };

  const onRadioBtnClick = selectedItem => {
    const updatedBodySize = isBodySize.map(item => {
      if (item.id === selectedItem.id) {
        return {...item, selected: true};
      } else {
        return {...item, selected: false};
      }
    });

    setSignUpFormObj(prevData => ({
      ...prevData,
      gender: selectedItem.name,
    }));

    setIsBodySize(updatedBodySize);
  };

  const dispatch = useDispatch();

  const handleSignup = async () => {
    if (
      signUpFormObj.password &&
      confirmPassword &&
      signUpFormObj.password === confirmPassword
    ) {
      dispatch(api_signup_request(signUpFormObj));
    } else {
      Toast.show({
        type: 'error',
        text1: 'Passwords do not match..',
      });
    }
  };

  useEffect(() => {
    if (authReducer?.signup_success) {
      navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      });
    }
  }, [authReducer, navigation]);

  return (
    <ScrollView flex={1} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <NewHeader title="Sign Up" navigation={navigation} />
      <Animatable.View
        animation="slideInLeft"
        delay={700}
        style={styles.Suggestiondata}>
        <View style={{paddingHorizontal: 20, marginTop: 60}}>
          <Text style={styles.inputHead}>Full Name</Text>
          <View style={styles.inputView}>
            <TextInput
              placeholder="Enter your name"
              style={styles.input}
              value={signUpFormObj?.name}
              onChangeText={e => handleChange('name', e)}
            />
          </View>
          {/* {..........Email..........} */}
          <Text style={styles.inputHead}>Email</Text>
          <View style={styles.inputView}>
            <TextInput
              placeholder="you@example.com"
              keyboardType="email-address"
              style={{...styles.input, zIndex: 1}}
              value={signUpFormObj?.email}
              onChangeText={e => {
                const lowercaseValue = e.charAt(0).toLowerCase() + e.slice(1);

                handleChange('email', lowercaseValue);
              }}
              caretHidden={false}
              autoCorrect={false}
              autoCapitalize="none"
              textContentType="none"
            />
          </View>
          {/* {..........Password..........} */}
          <Text style={styles.inputHead}>Password</Text>
          <View style={styles.inputView}>
            <View style={styles.passView}>
              <TextInput
                placeholder="Password"
                style={{...styles.input, width: '89%'}}
                secureTextEntry={!showPass}
                value={signUpFormObj?.password}
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
                value={confirmPassword}
                onChangeText={setConfirmPassword}
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
          {/* ...................Birthday.............. */}
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <Text style={{fontSize: 15, paddingHorizontal: 22}}>Birthday</Text>
            <TouchableOpacity onPress={() => setOpen(true)}>
              <View
                style={{...styles.inputWidth, justifyContent: 'space-between'}}>
                <Text style={styles.dateText}>
                  {signUpFormObj?.dateOfBirth || (
                    <Icon1
                      name="calendar"
                      size={23}
                      color={Colors.darkGrayColor}
                      style={{top: 20, paddingHorizontal: 12}}
                    />
                  )}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* .............Date Of Birth Modal............... */}

          <DatePicker
            modal
            open={open}
            date={moment(date, 'YYYY-MM').toDate()}
            mode="date"
            format="YYYY-MM-DD"
            onConfirm={selectedDate => {
              const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
              setDate(formattedDate);
              setOpen(false);
              setSignUpFormObj(prevProfileData => ({
                ...prevProfileData,
                dateOfBirth: formattedDate,
              }));
            }}
            onCancel={() => setOpen(false)}
          />
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
          <View style={{alignItems: 'center', flex: 1}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('LoginPassword')}>
              <Text
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 12,
                  color: Colors.black,
                }}>
                Already have an account?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animatable.View>
      <Animatable.View animation="slideInLeft" delay={700} style={{bottom: 22}}>
        <TouchableOpacity
          onPress={handleSignup}
          // disabled={!allow}
          style={[
            styles.btnSubmit,
            theme === colorScheme
              ? {backgroundColor: themeGreen.greenThemeColor}
              : {backgroundColor: themePink.pinkThemeColor},
          ]}>
          <Text style={{...styles.txtSubmit}}>Sign Up</Text>
        </TouchableOpacity>
      </Animatable.View>
    </ScrollView>
  );
};

export default Signup;
