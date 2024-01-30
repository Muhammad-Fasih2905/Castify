import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Modal} from 'native-base';

import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/SimpleLineIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../../constants/Colors';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {clearToken} from '../../src/Redux/action/auth';
import {useNavigation} from '@react-navigation/native';

const {height, width} = Dimensions.get('window');

const ModalDrawer = props => {
  const {showDrawer, setShowDrawer} = props;
  const navigation = useNavigation();

  const dispatch = useDispatch();

  // Function to handle drawer toggle
  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };

  const logoutHandler = () => {
    dispatch(clearToken());
    // props.navigation.replace("SignInUp")

    // remove the user token from AsyncStorage

    AsyncStorage.removeItem('isLoggedIn');

    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{name: 'starter'}],
      });
    }, 0);
  };

  const handleNavigate = to => {
    toggleDrawer();
    navigation.navigate(to);
  };

  const handleNavigation = to => {
    toggleDrawer();
    navigation.navigate(to);
  };

  const handleOrderNavigation = to => {
    toggleDrawer();
    navigation.navigate(to);
  };

  return (
    <View
      flex={1}
      style={{
        height: height,
      }}>
      <Modal
        animationType="slide"
        transparent={true}
        animationInTiming={1000}
        isOpen={showDrawer}
        onClose={toggleDrawer}
        style={{
          height: '100%',
          width: width - 60,
          backgroundColor: Colors.whiteColor,
        }}>
        <Modal.CloseButton />
        <View
          style={{
            width: '100%',
            flex: 1,
            display: 'flex',
            justifyContent: 'space-around',
            bottom: 130,
          }}>
          <TouchableOpacity
            onPress={() => handleOrderNavigation('yourorder')}
            style={styles.drawerOrder}>
            <Icon name="videocamera" color={Colors.black} size={25} />
            <Text style={styles.text}>All Orders</Text>
          </TouchableOpacity>
        </View>
        <View style={{width: '100%', height: '30%'}}>
          <View style={styles.drawerBottomContent}>
            <TouchableOpacity
              style={styles.bottominsideContent}
              onPress={() => handleNavigate('settings')}>
              <Icon name="setting" color={Colors.black} size={25} />
              <Text
                style={{
                  fontSize: 17,
                  paddingHorizontal: 12,
                  color: Colors.black,
                }}>
                Settings
              </Text>
            </TouchableOpacity>
            {/*...............talent View.................*/}
            {/* <TouchableOpacity
              style={styles.bottominsideContent}
              onPress={() => handleNavigation('TalentScreen')}>
              <Icon2
                name="star-shooting-outline"
                color={Colors.black}
                size={25}
              />
              <Text
                style={{
                  fontSize: 17,
                  paddingHorizontal: 12,
                  color: Colors.black,
                }}>
                Apply to be talent
              </Text>
            </TouchableOpacity> */}
            {/*...............Log out View.................*/}
            <View style={styles.bottominsideContent}>
              <Icon1 name="logout" color={Colors.black} size={25} />
              <TouchableOpacity onPress={logoutHandler}>
                <Text
                  style={{
                    fontSize: 17,
                    paddingHorizontal: 12,
                    color: Colors.black,
                  }}>
                  Log out
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalDrawer;

const styles = StyleSheet.create({
  mainDrawerView: {
    flex: 1,
    // width: '90%',
    // minHeight: '30%',
  },

  drawerOrder: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 13,
    // justifyContent: 'space-around',
    // backgroundColor: 'red',
  },
  text: {
    fontSize: 16,
    paddingHorizontal: 14,
    color: Colors.black,
  },
  drawerBottomContent: {
    flex: 1,
    display: 'flex',
    borderTopWidth: 1,
    borderTopColor: Colors.grayColor,
  },
  bottominsideContent: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 30,
    paddingVertical: 13,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: width * 0.5, // Adjust the width as needed
    height: height,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
});
