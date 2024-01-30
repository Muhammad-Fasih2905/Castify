import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useCallback} from 'react';
import {Colors, themePink} from './../../constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/Fontisto';
import {useNavigation, useFocusEffect} from '@react-navigation/core';
import {useDispatch, useSelector} from 'react-redux';
import {getAllUserChatRequest} from '../../src/Redux/action/chat';

const HomeHeader = ({title}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {user, token} = useSelector(state => state.auth);

  const {userChatList} = useSelector(state => state.chat);

  console.log('userChat ==>', userChatList);
  const lastMessageIds = userChatList
    .map(item => item.last_message_by)
    .join(', ');

  console.log(lastMessageIds);

  const unseenChats = userChatList.filter(chat => !chat.is_seen);
  const chatCount = unseenChats.length;

  useFocusEffect(
    useCallback(() => {
      dispatch(getAllUserChatRequest(token));
    }, []),
  );
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 10,
        paddingHorizontal: 15,
        justifyContent: 'space-between',
      }}>
      <TouchableOpacity onPress={navigation.toggleDrawer}>
        <Icon name="ios-reorder-three" color={Colors.black} size={30} />
      </TouchableOpacity>
      <Text style={{...styles.Text, fontSize: 23}}>{title}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('UsersChatList')}>
        <Icon1
          name="messenger"
          color={Colors.black}
          size={25}
          style={{top: 6}}
        />
        {chatCount > 0 && lastMessageIds === user?.id && (
          <View
            style={{
              position: 'absolute',
              top: -5,
              right: -5,
              backgroundColor: themePink.pinkThemeColor,
              borderRadius: 10,
              width: 20,
              height: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'white', fontSize: 12}}>{chatCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeader;

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
