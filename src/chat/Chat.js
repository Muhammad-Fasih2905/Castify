import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
} from 'react-native';
import { useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import axios from 'axios';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { Colors, themePink } from '../../constants/Colors';
import handleSendNotification from '../helper/sendNotfication';
import Toast from 'react-native-toast-message';

const Chat = ({ route }) => {
  const { item } = route.params;

  const { token, user } = useSelector(state => state.auth);

  const scrollViewRef = useRef(null);
  const inputRef = useRef(null);

  const navigation = useNavigation();
  const [chatInfo, setChatInfo] = useState({});

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState([]);
  const [messages, setMessages] = useState([]);
  // const chatRefId = `Chat-${(user?.id * item?.id).toString()}`;

  const chatRefId = chatInfo?.chat_id
    ? chatInfo?.chat_id
    : `Chat-${(user?.id * item?.id).toString()}`;

  const chatRef = firestore().collection('chatRoom').doc(chatRefId);

  // for local api's
  const createChat = async () => {
    let data = {
      chat_id: chatRefId,
      sender_id: user?.id,
      reciever_id: item?.id,
      last_message_update: input,
      count: 1,
      last_message_by: user?.id,
    };

    try {
      const response = await axios.post(
        'https://castify-backend-e09923eec6ea.herokuapp.com/chatsApi/',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      console.log('createChat Error ==>', error);
    }
  };
  const updateChat = async () => {
    let updatedCount = chatInfo?.count || 0;
    updatedCount++;

    let data = {
      last_message_update: input,
      count: updatedCount,
      is_seen: false,
      last_message_by: user?.id,
    };

    try {
      const response = await axios.patch(
        `https://castify-backend-e09923eec6ea.herokuapp.com/chatsApi/${chatInfo?.id}/`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log('updateChat', response);
      return response.data;
    } catch (error) {
      console.log('updateChat Error ==>', error);
    }
  };
  // /for local api's
  console.log("Chat info ==>", chatInfo);
  console.log("item ==>", item);
  let notificationData = {
    to:
      user?.id === user?.id
        ? chatInfo && chatInfo?.reciever_id?.fcm_token || item && item?.sender_id?.fcm_token
        : user?.fcm_token,
    notification: {
      title: 'New Message',
      body:
        user?.id === user?.id
          ? user?.username + chatInfo?.last_message_update
          : chatInfo &&
          chatInfo?.reciever_id?.username + chatInfo?.last_message_update,
      mutable_content: true,
      sound: 'Tri-tone',
      redirect_to: 'Message',
    },
    // data": {
    //   url: "https://www.w3schools.com/w3images/avatar2.png",
    //   dl: "<deeplink action on tap of notification>"
    // }
  };
  console.log('chatIbfo ==>', notificationData);

  const sendMessage = useCallback(async () => {
    try {
      if (!input) {
        Toast.show({
          type: 'error',
          text1: 'Type your message..',
        });
      }

      const timestamp = firestore.FieldValue.serverTimestamp();
      chatRef.collection('messages').add({
        userName: user?.username,
        message: input,
        userId: user?.id,
        timestamp: firestore.FieldValue.serverTimestamp(),
        count: 1,
      });

      // console.log('one');
      await handleSendNotification(notificationData);
      // console.log('two');

      if (chatInfo?.chat_id) {
        console.log('Chat ID ==>', chatInfo?.chat_id, chatInfo?.id);
        let res = await updateChat();
        setChatInfo(res);
        console.log('update res ==>', res);
      } else {
        console.log('four');
        let res = await createChat();
        console.log('create res ==>', res);
        console.log('four', res);
        setChatInfo(res);
      }
      setInput('');

      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          message: input,
          userId: user?.id,
          timestamp: timestamp,
        },
      ]);
      inputRef.current.blur();
      setTimeout(() => {
        scrollViewRef?.current?.scrollToEnd({ animated: true });
      }, 100);
    } catch (error) {
      console.log('Error ==> ', error);
    }
  }, [chatRef, input]);

  console.log('Chat ID ==>', chatInfo);

  const getMessages = useCallback(async () => {
    try {
      chatRef
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot(querySnapshot => {
          const data = querySnapshot?.docs?.map(doc => ({
            id: doc?.id,
            ...doc?.data(),
          }));

          setMessages(data);

          setTimeout(() => {
            scrollViewRef?.current?.scrollToEnd({ animated: true });
          }, 1000);
        });
    } catch (error) {
      console.log('Getting error while fetch chat!', error);
    }
  }, [chatRef]);

  const isToday = date => {
    const today = moment().startOf('day');
    const targetDate = moment(date).startOf('day');
    return today.isSame(targetDate);
  };

  const updateLastSeen = async () => {
    let updatedCount = chatInfo?.count || 0;
    updatedCount++;

    let data = {
      is_seen: true,
    };

    try {
      const response = await axios.patch(
        `https://castify-backend-e09923eec6ea.herokuapp.com/chatsApi/${chatInfo?.id}/`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log('updateChat', response);
      return response.data;
    } catch (error) {
      console.log('updateChat Error ==>', error);
    }
  };

  //input text with button function

  const handleInputChange = text => {
    setInput(text);
  };

  useEffect(() => {
    if (item) {
      setChatInfo(item);
    }

    return () => {
      setLoading(false);
      setMessages([]);
      setChatInfo({});
    };
  }, [item]);
  useEffect(() => {
    getMessages();
    if (!(chatInfo?.reciever_id?.id === user?.id || chatInfo?.sender_id?.id === user?.id)) {
      updateLastSeen();
    }

  }, [chatInfo]);


  // route.params?.item, chatInfo

  console.log("item?.reciever_id?.pic ==>", item);
  console.log("chatInfo?.reciever_id?.pic ==>", chatInfo);

  return (
    <View style={styles.container}>
      <View style={{ ...styles.Newheader }}>
        <View flex={0.2}>
          <TouchableOpacity
            onPress={() => navigation.navigate('UsersChatList')}>
            <Icon name="left" size={21} color={themePink.lightPinkThemeColor} />
          </TouchableOpacity>
        </View>
        {chatInfo?.reciever_id?.pic || item?.pic || chatInfo?.sender_id?.pic ? (
          <Image
            source={{ uri: item?.pic || chatInfo?.reciever_id?.pic || chatInfo?.sender_id?.pic }}
            style={{
              width: 55,
              height: 55,
              borderWidth: 1,
              borderRadius: 28,
              borderColor: themePink.lightPinkThemeColor,
            }}
          />
        ) : (
          <View style={styles.usernameContainer}>
            <Text style={styles.username}>
              {/* {item?.username?.charAt(0).toUpperCase()} */}
              {item?.username ? item.username.charAt(0).toUpperCase() : ''}
              {chatInfo?.sender_id?.username ? chatInfo.sender_id.username.charAt(0).toUpperCase() : ''}
            </Text>
          </View>
        )}

        <View flex={0.2} />
      </View>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          // console.log('item ==>', item);
          let isMe = item?.id == user?.id ? true : false;
          let isMessage = user.id === item?.userId ? true : false;

          return (
            <>
              <View
                style={[
                  styles.messageContainer,
                  {
                    alignSelf: isMessage ? 'flex-end' : 'flex-start',
                    backgroundColor: isMessage
                      ? themePink?.pinkThemeColor
                      : '#e097a6',
                  },
                ]}>
                <Text style={styles.messageText}>{item?.message}</Text>
              </View>
            </>
          );
        }}
        ListFooterComponent={
          <>
            {chatInfo?.last_message_update && chatInfo?.is_seen ? (
              <Text
                style={{
                  color: themePink.pinkThemeColor,
                  alignSelf: 'flex-end',
                  fontWeight: '500',
                }}>
                Seen
              </Text>
            ) : null}
          </>
        }
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={input}
          onChangeText={handleInputChange}
          ref={inputRef}
          placeholderTextColor={themePink.lightPinkThemeColor}
        />
        {input.length > 0 && (
          <TouchableOpacity
            style={[
              styles.sendButton,
              { backgroundColor: themePink.pinkThemeColor },
            ]}
            onPress={sendMessage}>
            <Text style={{ color: '#fff' }}>Send</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  messageContainer: {
    borderRadius: 8,
    padding: 8,
    marginVertical: 4,
    maxWidth: '70%',
  },
  messageText: {
    fontSize: 16,
    color: Colors.whiteColor,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: themePink.lightPinkThemeColor,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: themePink.lightPinkThemeColor,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: Colors.black,
  },
  sendButton: {
    backgroundColor: themePink.pinkThemeColor,
    borderRadius: 20,
    marginLeft: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Newheader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
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
    color: Colors.black
  },
});

export default Chat;
