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
  TextInput,
  useColorScheme,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Modal from 'react-native-modal';
import StarRating from 'react-native-star-rating';
import {AutoScrollFlatList} from 'react-native-autoscroll-flatlist';
import FastImage from 'react-native-fast-image';

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
import handleSendNotification from '../../src/helper/sendNotfication';
import useNotificationHook from '../utils/NotificationHook';

const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');

const TalentProfile = () => {
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
  const [rating, setRating] = useState(0);
  const [feedBack, setFeedBack] = useState('');

  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);
  const [modalShow, setModalShow] = useState(false);

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
    dispatch(
      apiPostSendFollowRequest(
        {recieverID: item.id, senderID: user?.id},
        token,
      ),
    );
    setIsFollow(true);
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
    if (item?.id !== user.id) {
      handleSendNotification(notificationData);
    }
    if (item?.id !== user.id) {
      handleUpdateNotificationCount(item?.id);
    }
  };

  const handleRatingChange = newRating => {
    setRating(newRating);
  };

  const handleSaveRating = () => {
    console.log('Rating:', rating);
    onCloseModal();
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
  function onCloseModal() {
    setModalShow(false);
  }

  const handleChange = (key, value) => {
    setFeedBack(prev => ({
      ...prev,
      [key]: value,
    }));
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
      return (
        <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderBottomWidth: 1,
              borderBottomColor: Colors.grayColor,
            }}>
            <View
              style={{
                ...styles.followerShowView,
                width: width,
                top: 0,
              }}>
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
              {user.role === '1' && (
                <TouchableOpacity
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => setModalShow(true)}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '600',
                      color: Colors.black,
                    }}>
                    Rating
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: '700',
                      color: Colors.black,
                    }}>
                    {rating > 0 ? `${rating} Stars` : '0'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          <UserProfilePost item={item} />
        </View>
      );
    },
    [userGetPosts],
  );
  const userArray = [IdUser];
  return (
    <>
      {userArray.map((item, index) => {
        return (
          <>
            <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
              {/* ........Images............. */}
              <View flex={0.5}>
                <View style={{...styles.Newheader}}>
                  <View flex={0.2}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                      <IconA name="left" size={25} color={Colors.black} />
                    </TouchableOpacity>
                  </View>
                  <View flex={0.2} />
                </View>
                <View style={{height: 400}}>
                  <AutoScrollFlatList
                    data={item.images}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => (
                      <FastImage
                        source={{uri: item.image}}
                        style={{
                          width: width,
                          height: '100%',
                        }}
                        // resizeMode="cover"
                        resizeMode={FastImage.resizeMode.cover}
                      />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{flexGrow: 1}}
                    initialIndex={0}
                    autoplay={true}
                    loop={true}
                    autoplayInterval={700}
                  />
                </View>
              </View>

              <View
                style={{
                  flex: 1,
                  justifyContent: 'space-between',
                  backgroundColor: Colors.whiteColor,
                  borderTopLeftRadius: 50,
                  borderTopRightRadius: 50,
                }}>
                <View
                  style={{
                    flexDirection: 'column',
                    borderBottomWidth: 1,
                    borderBottomColor: Colors.grayColor,
                    height: 85,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      paddingTop: 20,
                    }}>
                    {item?.pic ? (
                      <FastImage
                        source={{uri: item?.pic}}
                        style={{
                          width: 55,
                          height: 55,
                          borderWidth: 1,
                          borderRadius: 20,
                          borderColor: Colors.grayColor,
                        }}
                      />
                    ) : (
                      <View style={styles.container}>
                        <View style={styles.usernameContainer}>
                          <Text style={styles.username}>
                            {getFirstLetter()}
                          </Text>
                        </View>
                      </View>
                    )}
                    <Text
                      style={{
                        fontSize: 21,
                        right: 35,
                        top: 4,
                        color: Colors.black,
                      }}>
                      {item.name}
                    </Text>
                    <TouchableOpacity
                      onPress={
                        isFollow ? handleUnfollow : () => handleFollow(userData)
                      }
                      style={
                        isFollow
                          ? {...styles.NewUnfollowButton}
                          : styles.NewfollowButton
                      }>
                      <Text
                        style={
                          isFollow
                            ? {...styles.UnfollowText}
                            : styles.FollowText
                        }>
                        {isFollow ? 'Unfollow' : 'Follow'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Text
                    style={{
                      textAlign: 'center',
                      right: 80,
                      bottom: 24,
                      color: Colors.mediumGrayColor,
                    }}>
                    {item.category}
                  </Text>
                </View>

                {userGetPosts?.results ? (
                  <FlatList
                    data={userGetPosts?.results}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{flexGrow: 1}}
                    style={{flexGrow: 1, top: 16, marginBottom: 13}}
                  />
                ) : (
                  <ActivityIndicator size="large" style={{top: 30}} />
                )}
              </View>
              {/* .................................User Content Box............... */}
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
            {/* ..............Rating Modal............... */}
            <Modal
              isVisible={modalShow}
              animationIn={'slideInUp'}
              animationInTiming={1500}
              animationOut="slideOutDown"
              animationOutTiming={1500}
              onBackButtonPress={onCloseModal}
              onBackdropPress={onCloseModal}
              style={styles.modal}>
              <View style={{padding: 16}}>
                <View style={{...styles.feedBackInput}}>
                  <TextInput
                    placeholder="FeedBack"
                    onChangeText={handleChange}
                    value={feedBack}
                  />
                </View>
                <StarRating
                  disabled={false}
                  maxStars={5}
                  rating={rating}
                  selectedStar={handleRatingChange}
                  starSize={25}
                  fullStarColor={Colors.ratingStar}
                />
                <TouchableOpacity
                  onPress={handleSaveRating}
                  style={{
                    backgroundColor: themePink.pinkThemeColor,
                    padding: 12,
                    borderRadius: 8,
                    marginTop: 20,
                  }}>
                  <Text style={{color: 'white', textAlign: 'center'}}>
                    FeedBack
                  </Text>
                </TouchableOpacity>
              </View>
            </Modal>
          </>
        );
      })}
    </>
  );
};

export default TalentProfile;

const styles = StyleSheet.create({
  parentDiv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    top: 12,
    height: 30,
  },
  profileDataView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 25,
  },
  hrView: {
    top: 18,
    width: 100,
    height: 40,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  ReviewBox: {
    top: 18,
    width: '70%',
    height: 60,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
    alignSelf: 'center',
    marginTop: 32,
  },
  btnSubmit: {
    height: 50,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginHorizontal: 12,
  },
  btnchat: {
    height: 50,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    width: 100,
    display: 'flex',
    flexDirection: 'row',
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.whiteColor,
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  txtSubmit: {
    color: Colors.whiteColor,
    fontSize: 15,
  },
  followbutton: {
    height: 32,
    // backgroundColor: Colors.blueThemeColor,
    justifyContent: 'center',
    alignItems: 'center',
    // width: '79%',
    // borderRadius: 5,
    // marginHorizontal: 30,
  },
  BlockparentDiv: {
    paddingHorizontal: 20,
    top: 12,
    flex: 1,
    // backgroundColor:'red'
  },

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

  FollowBtn: {
    height: 45,
    width: '75%',
    alignSelf: 'center',
    backgroundColor: Colors.blueThemeColor,
    borderRadius: 20,
    justifyContent: 'center',
    marginBottom: 40,
  },
  picture: {
    display: 'flex',
    width: 45,
    height: 45,
    borderRadius: 30,
    marginHorizontal: 12,
    borderWidth: 1,
    borderColor: Colors.grayColor,
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

  // Role 2 User Profile
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
    // paddingVertical: 14,
    position: 'absolute',
    zIndex: 1,
  },

  // New Unfollow Button

  NewUnfollowButton: {
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.grayColor,
    width: '35%',
    alignSelf: 'center',
    borderRadius: 20,
  },
  NewfollowButton: {
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themePink.pinkThemeColor,
    width: '35%',
    alignSelf: 'center',
    borderRadius: 20,
  },
  // FeddBack Input
  feedBackInput: {
    display: 'flex',
    flexDirection: 'row',
    width: 300,
    height: 50,
    marginHorizontal: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.grayColor,
    bottom: 25,
  },
  modal: {
    width: wp(95),
    height: wp(80),
    backgroundColor: Colors.whiteThemeColor,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
  },
});