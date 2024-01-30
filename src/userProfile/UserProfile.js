import React, {useState, useEffect} from 'react';
import {useCallback} from 'react';

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  useColorScheme,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

import {useRoute} from '@react-navigation/native';

import {Colors, themeGreen, themePink} from '../../constants/Colors';
import UserProfilePost from '../../components/UserProfilePost';

import IconA from 'react-native-vector-icons/AntDesign';
import IconF from 'react-native-vector-icons/Ionicons';
import IconE from 'react-native-vector-icons/Entypo';

import {getUserIDRequest} from '../Redux/action/followUser';
import {
  apiDeleteFollowRequest,
  apiPostSendFollowRequest,
  getAllFollowingRequest,
  getAllFollowersRequest,
} from '../Redux/action/followUser';
import {apiGetUserPostRequest} from '../../src/Redux/action/post';

import {useDispatch, useSelector} from 'react-redux';

import {useNavigation, useFocusEffect} from '@react-navigation/native';
import FollowingUser from '../followingUsers/FollowingUser';
import UsersActionSheet from '../../components/usersActionSheet/UsersActionSheet';
import useNotificationHook from '../../src/utils/NotificationHook';
import handleSendNotification from '../../src/helper/sendNotfication';

const UserProfile = () => {
  const route = useRoute();
  const userId = route.params?.userId;

  const themeChange = useColorScheme() === 'Male' ? 'Male' : 'female';

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {token, user} = useSelector(state => state.auth);

  const {userGetPosts} = useSelector(state => state.post);
  const {allFollowUsers, allFollowing} = useSelector(state => state.follow);
  const {handleUpdateNotificationCount} = useNotificationHook();

  const {IdUser} = useSelector(state => state.follow);

  const [refreshing, setRefreshing] = useState(false);
  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);
  const [isActionSheetOpen1, setIsActionSheetOpen1] = useState(false);
  const [isFollow, setIsFollow] = useState(IdUser?.is_follower || false);

  const getFirstLetter = () => {
    if (IdUser && IdUser?.email && IdUser?.email.length > 0) {
      return IdUser?.email.charAt(0).toUpperCase();
    }
    // Return a default value (e.g., '?' or any character you like) if the username is not available
    return '';
  };

  const handleUnfollow = () => {
    dispatch(apiDeleteFollowRequest(IdUser.is_followed, token));
    setIsFollow(false);
  };

  const handleFollow = item => {
    let notificationData = {
      to: item?.fcm_token,

      notification: {
        title: user?.username,
        body: `${user?.username} Send follow request`,
        mutable_content: true,
        sound: 'Tri-tone',
        redirect_to: 'Like',
      },
    };

    handleSendNotification(notificationData);
    handleUpdateNotificationCount(item?.id);
    dispatch(
      apiPostSendFollowRequest(
        {recieverID: item.id, senderID: user?.id},
        token,
      ),
    );
    setIsFollow(true);
  };

  const openActionSheet = () => {
    setIsActionSheetOpen(true);
  };

  const openActionSheet1 = () => {
    setIsActionSheetOpen1(true);
  };
  const closeActionSheet = () => {
    setIsActionSheetOpen(false);
  };
  const closeActionSheet1 = () => {
    setIsActionSheetOpen1(false);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      dispatch(getUserIDRequest(userId, token));
      dispatch(
        apiDeleteFollowRequest(IdUser?.is_followed, IdUser?.is_follower, token),
      );
      dispatch(getAllFollowingRequest(IdUser?.id, token));
      dispatch(getAllFollowersRequest(IdUser?.id, token));
      dispatch(apiGetUserPostRequest(token, IdUser?.id));
      setRefreshing(false);
    }, 2000);
  }, []);

  useFocusEffect(
    useCallback(() => {
      dispatch(getUserIDRequest(userId, token));
      dispatch(getAllFollowingRequest(IdUser?.id, token));
      dispatch(getAllFollowersRequest(IdUser?.id, token));
      dispatch(apiGetUserPostRequest(token, IdUser?.id));
    }, []),
  );

  useEffect(() => {
    dispatch(getUserIDRequest(userId, token));
  }, []);

  // const renderItem = useCallback(
  //   ({item}) => {
  //     return ;
  //   },
  //   [IdUser],
  // );
  const renderItem = useCallback(
    ({item}) => {
      return <UserProfilePost item={item} />;
    },
    [userGetPosts],
  );
  const userArray = [IdUser];
  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {userArray.map((item, index) => {
        return (
          <>
            {/* ..............Header.............. */}
            <View style={{...styles.Newheader}}>
              <View flex={0.2}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <IconA name="left" size={20} color={Colors.black} />
                </TouchableOpacity>
              </View>
              <Text flex={1} style={{fontSize: 18, color: Colors.black}}>
                {item?.name}
              </Text>
              <View flex={0.2} />
            </View>
            <View
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignSelf: 'center',
                top: 17,
                borderBottomColor: Colors.grayColor,
                borderBottomWidth: 1,
                height: 250,
              }}>
              {item?.pic ? (
                <Image
                  source={{uri: item?.pic}}
                  style={{
                    ...styles.otherpicture,
                  }}
                />
              ) : (
                <View style={styles.container}>
                  <View style={styles.usernameContainer}>
                    <Text style={styles.username}>{getFirstLetter()}</Text>
                  </View>
                </View>
              )}

              <TouchableOpacity>
                <Text
                  style={{
                    color: Colors.black,
                    fontSize: 15,
                    top: 15,
                    textAlign: 'center',
                  }}>
                  {item?.name}
                </Text>
              </TouchableOpacity>
              <View style={styles.followerShowView}>
                <TouchableOpacity
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={openActionSheet}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '600',
                      color: Colors.black,
                    }}>
                    Follower
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: '700',
                      color: Colors.black,
                    }}>
                    {item?.followersCount}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={openActionSheet1}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '600',
                      color: Colors.black,
                    }}>
                    Following
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: '700',
                      color: Colors.black,
                    }}>
                    {item?.followingsCount}
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={isFollow ? handleUnfollow : () => handleFollow(item)}
                style={
                  isFollow
                    ? {...styles.RoleUnfollowbutton}
                    : styles.Rolefollowbutton
                }>
                <Text
                  style={
                    isFollow ? {...styles.UnfollowText} : styles.FollowText
                  }>
                  {isFollow ? 'Unfollow' : 'Follow'}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{top: 22, marginBottom: 30}}>
              {userGetPosts?.results ? (
                <FlatList
                  data={userGetPosts?.results}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={renderItem}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{flexGrow: 1}}
                />
              ) : (
                <ActivityIndicator size="large" style={{top: 30}} />
              )}
            </View>
            {/* ...................Render the Props of Action Sheets............ */}
            <UsersActionSheet
              isOpen={isActionSheetOpen}
              onClose={closeActionSheet}
              allFollowUsers={allFollowUsers}
            />

            {/* ...................Render the Props of Action Sheets FollowingUSer............ */}
            <FollowingUser
              isOpen={isActionSheetOpen1}
              onClose={closeActionSheet1}
              allFollowing={allFollowing}
            />
          </>
        );
      })}
    </ScrollView>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  //  User Profile
  followerShowView: {
    display: 'flex',
    flexDirection: 'row',
    width: '70%',
    height: 55,
    alignSelf: 'center',
    top: 20,
    justifyContent: 'space-around',
  },

  Rolefollowbutton: {
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themePink.pinkThemeColor,
    width: '65%',
    alignSelf: 'center',
    top: 29,
    borderRadius: 20,
  },
  RoleUnfollowbutton: {
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.grayColor,
    width: '65%',
    alignSelf: 'center',
    top: 29,
    borderRadius: 20,
  },
  FollowText: {
    fontSize: 16,
    color: Colors.whiteColor,
    fontWeight: '600',
  },
  UnfollowText: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: '600',
  },
  // Header
  Newheader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  otherpicture: {
    display: 'flex',
    width: 45,
    height: 45,
    borderRadius: 30,
    marginHorizontal: 155,
    borderWidth: 1,
    borderColor: Colors.grayColor,
  },
  container: {
    display: 'flex',
    alignSelf: 'center',
  },
  usernameContainer: {
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
