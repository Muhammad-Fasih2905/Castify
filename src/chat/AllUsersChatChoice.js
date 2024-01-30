import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import {Colors} from '../../constants/Colors';
import {getAllUsersRequest} from '../Redux/action/followUser';
import {useNavigation} from '@react-navigation/native';

const AllUsersChatChoice = () => {
  const dispatch = useDispatch();
  const {token, user} = useSelector(state => state.auth);
  const {allUsers} = useSelector(state => state.follow);
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getAllUsersRequest(token));
  }, []);

  const renderChatItem = ({item}) => {
    let isMe = user.id === item?.sender_id?.id ? true : false;
    if (item.id === user.id) {
      return null;
    }
    const senduserchat = item?.sendMsgs;
    return (
      <TouchableOpacity
        style={styles.chatItem}
        onPress={() => navigation.navigate('Chat', {item})}>
        {item?.pic ? (
          <Image
            source={{uri: item?.pic}}
            style={{width: 45, height: 45, borderRadius: 25}}
          />
        ) : (
          <View style={styles.NameViewcontainer}>
            <View style={styles.usernameContainer}>
              <Text style={styles.username}>
                {item?.username?.charAt(0).toUpperCase()}
              </Text>
            </View>
          </View>
        )}
        <View>
          <Text style={styles.chatName}>{item?.username}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{...styles.Newheader}}>
        <View flex={0.2}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="left" size={20} color={Colors.black} />
          </TouchableOpacity>
        </View>
        <Text flex={1} style={{fontSize: 18, color: Colors.black}}>
          Choose User To Chat
        </Text>
        <View flex={0.2} />
      </View>
      <FlatList
        data={allUsers}
        keyExtractor={item => item.id}
        renderItem={renderChatItem}
        showsVerticalScrollIndicator={false}
        Vertical
      />
    </View>
  );
};

export default AllUsersChatChoice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  chatItem: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
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
    // paddingVertical: 17,
    marginVertical: 12,
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
