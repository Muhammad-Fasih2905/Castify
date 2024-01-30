import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from './../../constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import ModalDrawer from '../modalDrawer/ModalDrawer';
import {useNavigation} from '@react-navigation/core';

const Header = ({title}) => {
  const [showDrawer, setShowDrawer] = useState(false);

  const navigation = useNavigation();

  const toggleDrawer = () => {
    // setShowDrawer(!showDrawer);
    navigation.toggleDrawer;
  };

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 10,
        paddingHorizontal: 15,
      }}>
      <TouchableOpacity onPress={navigation.toggleDrawer}>
        <Icon name="ios-reorder-three" color={Colors.black} size={30} />
      </TouchableOpacity>
      {/* {showDrawer && (
        <ModalDrawer showDrawer={showDrawer} setShowDrawer={setShowDrawer} />
      )} */}
      <Text style={{...styles.Text, fontSize: 23}}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 55,
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 25,
  },

  // Header
  Signupheader: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  backarrow: {
    width: 20,
    height: 20,
  },
  Text: {
    fontSize: 16,
    color: Colors.black,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
  },
});
