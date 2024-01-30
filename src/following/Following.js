import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Center, HStack, Stack, Avatar} from 'native-base';

import Header from '../../components/header';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../../constants/Colors';

import {useDispatch, useSelector} from 'react-redux';
import {getAllUserFollowersRequest} from '../Redux/action/followUser';

const Following = () => {
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {token} = useSelector(state => state.auth);

  const {allFollowUsers} = useSelector(state => state.follow);

  // if (allFollowUsers && allFollowUsers.length > 0) {
  //   allFollowUsers.forEach(user => {
  //     const followingCount = user;
  //   });
  // }

  useEffect(() => {
    dispatch(getAllUserFollowersRequest(token));
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      dispatch(getAllUserFollowersRequest(token));

      setRefreshing(false);
    }, 2000);
  }, []);

  const getFirstLetter = () => {
    const firstLetters = allFollowUsers.map(user => {
      const senderName = user?.senderID?.name;
      if (senderName && senderName.length > 0) {
        return senderName.charAt(0).toUpperCase();
      }
      // Return a default value (e.g., '?' or any character you like) if the username is not available
      return '';
    });

    // Assuming you want to return the first letter of the first user in the array
    // If there are no users or the first user's name is not available, it will return an empty string
    return firstLetters[0] || '';
  };

  return (
    <View style={{backgroundColor: Colors.whiteColor, flex: 1}}>
      <Header title="Followers" />
      {/* ........Following Work............ */}

      <FlatList
        data={allFollowUsers}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <Animatable.View animation="slideInLeft" delay={200}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Post');
              }}
              style={{
                backgroundColor: Colors.whiteThemeColor,
                width: '90%',
                alignSelf: 'center',
                borderRadius: 10,
                height: 180,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: 0.32,
                shadowRadius: 5.46,

                elevation: 9,
                top: 22,
                margin: 12,
              }}>
              <View
                style={{
                  backgroundColor: Colors.whiteThemeColor,
                  flexDirection: 'row',
                  alignSelf: 'center',
                  paddingTop: 20,
                }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    paddingRight: 83,
                  }}>
                  <Text style={{color: Colors.black, fontSize: 23}}>
                    {item?.senderID?.name}
                  </Text>
                  <Text style={{color: Colors.grayColor, fontSize: 12}}>
                    {item?.senderID?.category}
                  </Text>
                </View>
                {item?.senderID?.pic ? (
                  <Image
                    source={{uri: item?.senderID?.pic}}
                    style={{height: 40, width: 40, borderRadius: 15}}
                  />
                ) : (
                  <View style={styles.container}>
                    <View style={styles.usernameContainer}>
                      <Text style={styles.username}>{getFirstLetter()}</Text>
                    </View>
                  </View>
                )}
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  paddingTop: 20,
                }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    paddingTop: 30,
                    paddingLeft: 20,
                  }}>
                  <Text style={{color: Colors.grayColor, fontSize: 15}}>
                    Followers
                  </Text>
                  <Text style={{color: Colors.black, fontSize: 18}}>
                    {item?.followersCount || 0}
                  </Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    paddingTop: 30,
                    paddingLeft: 20,
                  }}>
                  <Text style={{color: Colors.grayColor, fontSize: 15}}>
                    Following
                  </Text>
                  <Text style={{color: Colors.black, fontSize: 18}}>
                    {item?.followingCount || 0}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </Animatable.View>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default Following;

const styles = StyleSheet.create({
  container: {
    // position: 'relative',
    display: 'flex',
    alignSelf: 'center',
    // bottom: 103,
  },
  usernameContainer: {
    // position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.profileColor,
    borderRadius: 60,
    padding: 5,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  username: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
