import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  scrollX,
  ScrollView,
} from 'react-native';
import {
  useToast,
  VStack,
  HStack,
  Center,
  IconButton,
  CloseIcon,
  Alert,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
// import Icon1 from 'react-native-vector-icons/Ionicons';
import {Colors, themePink} from '../../constants/Colors';
import Video from 'react-native-video';

const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');

const SplashScreen = () => {
  const authReducer = useSelector(state => state.auth);
  const navigation = useNavigation();

  const [loader, setLoader] = useState(true);

  const dispatch = useDispatch();

  const handleLoginPress = () => {
    navigation.navigate('LoginPassword');
  };

  const handleSignupPress = () => {
    navigation.navigate('TalentScreen');
  };

  const SpecialLogin = () => {
    navigation.navigate('specialLogin');
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('token');

        if (value) {
          navigation.replace('Home');
        }
      } catch (e) {}
    };

    setTimeout(() => {
      getData();
    }, 700);
  }, [navigation]);

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 1200);
  }, [loader]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/Castify.png')}
        style={styles.backgroundVideo}
      />
      {loader ? (
        <ActivityIndicator size="large" />
      ) : (
        <Animatable.View animation="fadeIn" delay={1000}>
          <View style={styles.authbtnView}>
            <TouchableOpacity
              style={{
                ...styles.track,
                width: '94%',
                backgroundColor: themePink.pinkThemeColor,
              }}
              onPress={handleLoginPress}>
              <Text
                style={{
                  color: Colors.whiteColor,
                  fontWeight: 'bold',
                  fontSize: 16,
                  paddingHorizontal: 5,
                }}>
                Login as Talent
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.track,
                width: '94%',
                backgroundColor: themePink.pinkThemeColor,
              }}
              onPress={handleSignupPress}>
              <Text
                style={{
                  color: Colors.whiteColor,
                  fontWeight: 'bold',
                  fontSize: 16,
                }}>
                Talent Sign up
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={SpecialLogin}>
              <Text
                style={{
                  color: Colors.black,
                  fontWeight: 'bold',
                  fontSize: 16,
                  alignSelf: 'center',
                  textDecorationLine: 'underline',
                  textDecorationStyle: 'solid',
                  marginTop: 25,
                }}>
                Special Login
              </Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      )}
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 40,
    color: Colors.whiteColor,
    fontSize: 25,
  },
  subDiv: {
    display: 'flex',
    flexDirection: 'column',
    height: height,
    justifyContent: 'space-between',
  },
  backgroundVideo: {
    alignSelf: 'center',
    left: 13,
  },

  textContainer: {
    fontSize: 15,
  },
  btnView: {
    display: 'flex',
    alignSelf: 'center',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  authbtnView: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 15,
    marginTop: 35,
  },
  track: {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    width: '45%',
    height: 50,
    borderRadius: 8,
    marginTop: 22,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: Colors.grayColor,
    flexDirection: 'row',
    borderRadius: 15,
  },
});
