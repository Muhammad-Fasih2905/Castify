import React, { useEffect, useState, useCallback } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import useMessage from './useMessage';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUserChatRequest } from '../Redux/action/chat';
import { getAllUsersRequest } from '../Redux/action/followUser';
import Icon from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../constants/Colors';

const UsersChatList = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const { token, user } = useSelector(state => state.auth);

  const { userChatList } = useSelector(state => state.chat);
  // console.log('userChatLsit ===>', userChatList);

  const renderChatItem = ({ item }) => {
    let isMe = user.id === item?.sender_id?.id ? true : false;

    let chatInfo =
      user?.id == item?.sender_id?.id ? item?.reciever_id : item?.sender_id;

    const senduserchat = item?.sendMsgs;
    // console.log('item ===>', item);

    return (
      <TouchableOpacity
        style={styles.chatItem}
        onPress={() => navigation.navigate('Chat', { item })}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            flex: 1,
          }}>
          {chatInfo?.pic ? (
            <Image
              source={{ uri: chatInfo?.pic }}
              style={{ width: 45, height: 45, borderRadius: 25 }}
            />
          ) : (
            <View style={styles.usernameContainer}>
              <Text style={styles.username}>
                {chatInfo?.username?.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
          <View
            style={{
              marginLeft: 12,
              alignSelf: 'flex-start',
              flex: 1,
            }}>
            <Text style={styles.chatName}>{chatInfo?.username}</Text>
            <Text style={styles.lastMessage}>
              {item?.last_message_update ?? 'null'}
            </Text>
          </View>
          {item?.sender_id?.id !== user?.id && !item?.is_seen && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{item?.count}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(getAllUserChatRequest(token));
    }, []),
  );

  return (
    <View style={styles.container}>
      <View style={{ ...styles.Newheader }}>
        <View flex={0.2}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="left" size={20} color={Colors.black} />
          </TouchableOpacity>
        </View>
        <Text flex={1} style={{ fontSize: 18, color: Colors.black }}>
          Chat List
        </Text>
        <View flex={0.2} />
      </View>
      <FlatList
        data={userChatList}
        keyExtractor={item => item.id}
        renderItem={renderChatItem}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('AllUsersChat')}
        style={{
          position: 'absolute',
          bottom: 90,
          right: 60,
          zIndex: 3,
        }}>
        <Icon name="message1" size={30} color={Colors.darkGrayColor} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  chatItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 12,
  },
  chatName: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 12,
    color: Colors.black,
  },
  lastMessage: {
    fontSize: 14,
    color: '#555',
    paddingHorizontal: 12,
  },
  unreadBadge: {
    backgroundColor: 'green',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  unreadText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  Newheader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  // Name Container
  NameViewcontainer: {
    display: 'flex',
    alignSelf: 'center',
  },
  usernameContainer: {
    bottom: 0,
    right: 0,
    backgroundColor: Colors.profileColor,
    borderRadius: 60,
    padding: 5,
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  username: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default UsersChatList;
