import React, {useState} from 'react';
import {useCallback} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';

import IconA from 'react-native-vector-icons/AntDesign';
import IconF from 'react-native-vector-icons/Ionicons';
import IconE from 'react-native-vector-icons/Entypo';

import {Colors, themeGreen, themePink} from '../../constants/Colors';
import {useSelector, useDispatch} from 'react-redux';
import {
  apiDeleteFollowRequest,
  apiPostSendFollowRequest,
  getAllFollowingRequest,
  getAllFollowersRequest,
} from '../../src/Redux/action/followUser';

import {useNavigation, useFocusEffect} from '@react-navigation/native';

import {apiGetUserPostRequest} from '../../src/Redux/action/post';

import Video from 'react-native-video';
// import FollowingUser from '../followingUsers/FollowingUser';
// import FollowUser from '../../components/followUsers/FollowUser';
import UserProfilePost from '../../components/UserProfilePost';

const UserProfileData = ({item}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);
  const [isActionSheetOpen1, setIsActionSheetOpen1] = useState(false);
  const [isFollow, setIsFollow] = useState(userData?.is_follower || false);
  const {token, user} = useSelector(state => state.auth);
  const {userGetPosts} = useSelector(state => state.post);

  const {allFollowers, allFollowing} = useSelector(state => state.follow);

  const dispatch = useDispatch();

  const themeChange = useColorScheme() === 'Male' ? 'Male' : 'female';

  const navigation = useNavigation();
  const handleUnfollow = () => {
    dispatch(apiDeleteFollowRequest(item.is_followed, token));
    setIsFollow(false);
  };

  const handleFollow = item => {
    dispatch(
      apiPostSendFollowRequest(
        {recieverID: item.id, senderID: user?.id},
        token,
      ),
    );
    setIsFollow(true);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      apiDeleteFollowRequest(item.is_followed, item.is_follower, token),
        dispatch(getAllFollowingRequest(item?.id, token));
      dispatch(getAllFollowersRequest(item?.id, token));
      dispatch(apiGetUserPostRequest(token, item?.id));
      setRefreshing(false);
    }, 2000);
  }, []);
  const getFirstLetter = () => {
    if (item && item?.name && item?.name.length > 0) {
      return item?.name.charAt(0).toUpperCase();
    }
    // Return a default value (e.g., '?' or any character you like) if the username is not available
    return '';
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

  useFocusEffect(
    useCallback(() => {
      dispatch(getAllFollowingRequest(item?.id, token));
      dispatch(getAllFollowersRequest(item?.id, token));
      dispatch(apiGetUserPostRequest(token, userData?.id));
    }, []),
  );

  const renderItem = useCallback(
    ({item}) => {
      return <UserProfilePost item={item} userData={userData} />;
    },
    [userGetPosts],
  );

  return (
    <View flex={1}>
      <Text>Hello</Text>
    </View>
    // <ScrollView
    //   //   contentContainerStyle={false}
    //   showsVerticalScrollIndicator={false}
    //   Vertical
    //   contentContainerStyle={{flexGrow: 1}}
    //   refreshControl={
    //     <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    //   }>
    //   {/* ..............Header.............. */}
    //   <View style={{...styles.Newheader}}>
    //     <View flex={0.2}>
    //       <TouchableOpacity onPress={() => navigation.goBack()}>
    //         <IconA name="left" size={20} color={Colors.black} />
    //       </TouchableOpacity>
    //     </View>
    //     <Text flex={1} style={{fontSize: 18, color: Colors.black}}>
    //       {item?.name}
    //     </Text>
    //     <View flex={0.2} />
    //   </View>
    //   <View
    //     style={{
    //       width: '100%',
    //       display: 'flex',
    //       flexDirection: 'column',
    //       alignSelf: 'center',
    //       top: 17,
    //       borderBottomColor: Colors.grayColor,
    //       borderBottomWidth: 1,
    //       height: '30%',
    //     }}>
    //     {item?.pic ? (
    //       <Image
    //         source={{uri: item?.pic}}
    //         style={{
    //           ...styles.otherpicture,
    //         }}
    //       />
    //     ) : (
    //       <View style={styles.container}>
    //         <View style={styles.usernameContainer}>
    //           <Text style={styles.username}>{getFirstLetter()}</Text>
    //         </View>
    //       </View>
    //     )}

    //     <TouchableOpacity>
    //       <Text
    //         style={{
    //           color: Colors.black,
    //           fontSize: 15,
    //           top: 15,
    //           textAlign: 'center',
    //         }}>
    //         {item?.name}
    //       </Text>
    //     </TouchableOpacity>
    //     <View style={styles.followerShowView}>
    //       <TouchableOpacity
    //         style={{
    //           display: 'flex',
    //           flexDirection: 'column',
    //           justifyContent: 'center',
    //           alignItems: 'center',
    //         }}
    //         onPress={openActionSheet}>
    //         <Text
    //           style={{
    //             fontSize: 15,
    //             fontWeight: '600',
    //             color: Colors.black,
    //           }}>
    //           Follower
    //         </Text>
    //         <Text
    //           style={{
    //             fontSize: 13,
    //             fontWeight: '700',
    //             color: Colors.black,
    //           }}>
    //           {item?.followersCount}
    //         </Text>
    //       </TouchableOpacity>
    //       <TouchableOpacity
    //         style={{
    //           display: 'flex',
    //           flexDirection: 'column',
    //           justifyContent: 'center',
    //           alignItems: 'center',
    //         }}
    //         onPress={openActionSheet1}>
    //         <Text
    //           style={{
    //             fontSize: 15,
    //             fontWeight: '600',
    //             color: Colors.black,
    //           }}>
    //           Following
    //         </Text>
    //         <Text
    //           style={{
    //             fontSize: 13,
    //             fontWeight: '700',
    //             color: Colors.black,
    //           }}>
    //           {item?.followingsCount}
    //         </Text>
    //       </TouchableOpacity>
    //     </View>
    //     <TouchableOpacity
    //       onPress={isFollow ? handleUnfollow : () => handleFollow(item)}
    //       style={
    //         isFollow ? {...styles.RoleUnfollowbutton} : styles.Rolefollowbutton
    //       }>
    //       <Text style={isFollow ? {...styles.UnfollowText} : styles.FollowText}>
    //         {isFollow ? 'Unfollow' : 'Follow'}
    //       </Text>
    //     </TouchableOpacity>
    //   </View>
    //   <View style={{top: 22, height: 790}}>
    //     {userGetPosts?.results ? (
    //       <FlatList
    //         data={userGetPosts?.results}
    //         keyExtractor={(item, index) => index.toString()}
    //         renderItem={renderItem}
    //         showsVerticalScrollIndicator={false}
    //         contentContainerStyle={{flexGrow: 1}}
    //       />
    //     ) : (
    //       <ActivityIndicator size="large" style={{top: 30}} />
    //     )}
    //   </View>
    //   {/* ...................Render the Props of Action Sheets............ */}
    //   {/* <FollowUser
    //     isOpen={isActionSheetOpen}
    //     onClose={closeActionSheet}
    //     allFollowers={allFollowers}
    //   /> */}

    //   {/* ...................Render the Props of Action Sheets FollowingUSer............ */}
    //   {/* <FollowingUser
    //     isOpen={isActionSheetOpen1}
    //     onClose={closeActionSheet1}
    //     allFollowing={allFollowing}
    //   /> */}
    // </ScrollView>
  );
};

export default UserProfileData;

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
