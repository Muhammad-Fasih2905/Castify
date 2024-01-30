import React from 'react';
import {View, Text, TouchableOpacity, Image, Linking} from 'react-native';
import styles from './footer.style';
import {useSelector} from 'react-redux';
import {themePink} from '../../../../constants/Colors';
const Footer = ({url, handleApproved}) => {
  const {user} = useSelector(state => state.auth);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          handleApproved();
        }}
        style={[styles.applyBtn, {backgroundColor: themePink.pinkThemeColor}]}
        disabled={user.role === '1' ? true : false}>
        <Text style={styles.applyBtnText}>Apply for job</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
