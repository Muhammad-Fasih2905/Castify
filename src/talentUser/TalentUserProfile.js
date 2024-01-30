import React, {useEffect, useState, useRef, useImperativeHandle} from 'react';
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
  Dimensions,
  TextInput,
  Actionsheet,
  ImageBackground,
  PanResponder,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Modal from 'react-native-modal';
import StarRating from 'react-native-star-rating';
import BottomSheet from '@gorhom/bottom-sheet';
import {Menu, Pressable, Avatar} from 'native-base';
// import {
//   Gesture,
//   GestureDetector,
//   GestureHandlerRootView,
// } from 'react-native-gesture-handler';

import IconA from 'react-native-vector-icons/AntDesign';
import IconF from 'react-native-vector-icons/Ionicons';
import IconE from 'react-native-vector-icons/Entypo';

import {Colors, themeGreen, themePink} from '../../constants/Colors';
import {useSelector, useDispatch} from 'react-redux';
import {
  apiDeleteFollowRequest,
  apiPostSendFollowRequest,
  apiBlockUserRequest,
  apiDeteleBlockUserRequest,
  getAllFollowingRequest,
  getAllFollowersRequest,
} from '../Redux/action/followUser';
import {apiGetUserPostRequest} from '../Redux/action/post';

import {
  reviewData,
  VideoData,
} from '../../components/videoDumyData/VideoDummyData';

import {useNavigation, useFocusEffect} from '@react-navigation/native';

import Video from 'react-native-video';
import FollowingUser from '../followingUsers/FollowingUser';
import FollowUser from '../../components/followUsers/FollowUser';
import UserProfilePost from '../../components/UserProfilePost';
import FastImage from 'react-native-fast-image';
import useNotificationHook from '../../src/utils/NotificationHook';
import handleSendNotification from '../../src/helper/sendNotfication';
import {color} from 'react-native-reanimated';

const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');

// const MAX_TRANSLATE_Y = -height + 50;

const TalentUserProfile = ({route}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);
  const [isActionSheetOpen1, setIsActionSheetOpen1] = useState(false);
  const [DataSheetOpen, setDataSheetOpen] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedBack, setFeedBack] = useState('');

  const {userData} = route.params;
  const [isFollow, setIsFollow] = useState(userData?.is_follower || false);
  const {token, user} = useSelector(state => state.auth);
  const {userGetPosts} = useSelector(state => state.post);

  const {allFollowers, allFollowing, blockUser} = useSelector(
    state => state.follow,
  );

  const {handleUpdateNotificationCount} = useNotificationHook();

  const dispatch = useDispatch();

  const themeChange = useColorScheme() === 'Male' ? 'Male' : 'female';

  const navigation = useNavigation();

  // const context = useSharedValue({y: 0});

  // const translateY = useSharedValue(0);

  // const gesture = Gesture.Pan()
  //   .onStart(() => {
  //     context.value = {y: translateY.value};
  //   })
  //   .onUpdate(event => {
  //     translateY.value = event.translationY + context.value.y;
  //     translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
  //   })
  //   .onEnd(() => {
  //     if (translateY.value > -height / 3) {
  //       (translateY.value = withTiming(-height / 3)), {damping: 50};
  //     } else if (translateY.value < -height / 1.5) {
  //       translateY.value = withSpring(MAX_TRANSLATE_Y, {damping: 50});
  //     }
  //   });

  // const rBottomSheetStyle = useAnimatedStyle(() => {
  //   const borderRadius = interpolate(
  //     translateY.value,
  //     [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
  //     [25, 5],
  //     Extrapolate.CLAMP,
  //   );
  //   return {
  //     borderRadius,
  //     transform: [{translateY: translateY.value}],
  //   };
  // });

  const handleUnfollow = () => {
    dispatch(apiDeleteFollowRequest(userData.is_followed, token));
    setIsFollow(false);
  };

  console.log('UserData ==>', userData);
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
    if (item?.id !== user.id) {
      handleSendNotification(notificationData);
    }
    if (item?.id !== user.id) {
      handleUpdateNotificationCount(item?.id);
    }
    dispatch(
      apiPostSendFollowRequest(
        {recieverID: item.id, senderID: user?.id},
        token,
      ),
    );
    setIsFollow(true);
  };

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  function onCloseModal() {
    setModalShow(false);
  }
  const handleSaveRating = () => {
    onCloseModal();
  };

  const handleRatingChange = newRating => {
    setRating(newRating);
  };
  // Block user work
  const handleBlockUser = () => {
    const data = {
      user: userData?.id,
      blocked_by: user?.id,
    };
    dispatch(apiBlockUserRequest(token, data));
  };

  const Unblock = () => {
    dispatch(apiDeteleBlockUserRequest(userData.is_blocked, token));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      apiDeleteFollowRequest(userData.is_followed, userData.is_follower, token),
        dispatch(getAllFollowingRequest(userData?.id, token));
      dispatch(getAllFollowersRequest(userData?.id, token));
      dispatch(apiGetUserPostRequest(token, userData?.id));
      setRefreshing(false);
    }, 2000);
  }, []);

  const getFirstLetter = () => {
    if (userData && userData?.name && userData?.name.length > 0) {
      return userData?.name.charAt(0).toUpperCase();
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

  const openDataActionSheet = () => {
    setDataSheetOpen(true);
  };
  const closeActionSheet = () => {
    setIsActionSheetOpen(false);
  };
  const closeActionSheet1 = () => {
    setIsActionSheetOpen1(false);
  };
  const handleChange = (key, value) => {
    setFeedBack(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const closeDataActionSheet = () => {
    setDataSheetOpen(false);
  };

  if (userData?.is_blocked) {
    return (
      <ScrollView
        style={styles.BlockparentDiv}
        contentContainerStyle={{flexGrow: 1}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View
          style={{
            flexDirection: 'row',
            display: 'flex',
            flex: 1,
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <IconA name="left" size={20} color={Colors.black} />
          </TouchableOpacity>
          <TouchableOpacity style={{left: 120}}>
            <IconA name="upload" size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{paddingHorizontal: 22}}
            onPress={handleOpen}>
            <Menu
              shadow={2}
              w="190"
              trigger={triggerProps => {
                return (
                  <Pressable
                    accessibilityLabel="More options menu"
                    {...triggerProps}>
                    <IconE name="dots-three-horizontal" size={20} />
                  </Pressable>
                );
              }}>
              <Menu.Item onPress={Unblock}>UnBlock</Menu.Item>
            </Menu>
          </TouchableOpacity>
        </View>
        <View
          style={{display: 'flex', justifyContent: 'space-around', flex: 1}}>
          <View style={styles.container}>
            <View style={styles.usernameContainer}>
              <Text style={styles.username}>Unblock</Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={Unblock}
            style={{...styles.FollowBtn, backgroundColor: Colors.redColor}}>
            <Text
              style={{
                fontSize: 15,
                color: Colors.whiteColor,
                textAlign: 'center',
              }}>
              Unblock
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  useFocusEffect(
    useCallback(() => {
      dispatch(getAllFollowingRequest(userData?.id, token));
      dispatch(getAllFollowersRequest(userData?.id, token));
      dispatch(apiGetUserPostRequest(token, userData?.id));
    }, []),
  );

  const renderItem = useCallback(
    ({item}) => {
      return (
        <View style={{flex: 1}}>
          <UserProfilePost item={item} userData={userData} />
        </View>
      );
    },
    [userGetPosts],
  );
  const renderItemRole2 = useCallback(
    ({item}) => {
      return <UserProfilePost item={item} userData={userData} />;
    },
    [userGetPosts],
  );

  console.log('UserData ===>', userData);

  return (
    <>
      {userData?.role === '1' ? (
        // Code for role '1'
        <ScrollView
          contentContainerStyle={false}
          showsVerticalScrollIndicator={false}
          Vertical>
          {/* ..............Header.............. */}
          <View
            style={{
              ...styles.Newheader,
              paddingVertical: 7,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View flex={0.2}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <IconA name="left" size={20} color={Colors.black} />
              </TouchableOpacity>
            </View>
            <Text flex={1} style={{fontSize: 18, color: Colors.black}}>
              {userData?.name}
            </Text>
            <View flex={0.2} />
          </View>
          <View
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignSelf: 'center',
              top: 30,
              borderBottomColor: Colors.grayColor,
              borderBottomWidth: 1,
              height: '30%',
            }}>
            {userData?.pic ? (
              <Image
                source={{uri: userData?.pic}}
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
                {userData?.username}
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
                  {userData?.followersCount}
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
                  {userData?.followingsCount}
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={isFollow ? handleUnfollow : () => handleFollow(userData)}
              style={
                isFollow
                  ? {...styles.RoleUnfollowbutton}
                  : styles.Rolefollowbutton
              }>
              <Text
                style={isFollow ? {...styles.UnfollowText} : styles.FollowText}>
                {isFollow ? 'Unfollow' : 'Follow'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{top: 22, height: 790}}>
            {userGetPosts?.results ? (
              <FlatList
                data={userGetPosts?.results}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItemRole2}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow: 1}}
              />
            ) : (
              <ActivityIndicator size="large" style={{top: 30}} />
            )}
          </View>
        </ScrollView>
      ) : userData?.role === '2' ? (
        <View style={{flex: 1}}>
          <View style={{...styles.NewRole2header}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <IconA name="left" size={25} color={Colors.black} />
            </TouchableOpacity>
          </View>
          <View style={styles.mainBottomView}>
            <FlatList
              data={userData.images}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <FastImage
                  source={{uri: item.image}}
                  style={{
                    width: width,
                  }}
                />
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{flexGrow: 1}}
            />
          </View>
          <View style={[styles.bottomContainer]}>
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
                {userData?.pic ? (
                  <View style={styles.Role2Usercontainer}>
                    <FastImage
                      source={{uri: userData?.pic}}
                      style={{
                        width: 55,
                        height: 55,
                        borderWidth: 1,
                        borderRadius: 20,
                        borderColor: Colors.grayColor,
                      }}
                    />
                    <View
                      style={{
                        flexDirection: 'column',
                        width: 100,
                        left: 5,
                      }}>
                      <Text
                        style={{
                          fontSize: 21,
                          // right: 35,
                          top: 4,
                          color: Colors.black,
                        }}>
                        {userData?.username}
                      </Text>
                      <Text
                        style={{
                          // textAlign: 'center',
                          // right: 80,
                          // bottom: 24,
                          color: Colors.mediumGrayColor,
                        }}>
                        {userData?.category}
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View style={styles.Role2Usercontainer}>
                    <View style={styles.usernameContainer}>
                      <Text style={styles.username}>{getFirstLetter()}</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'column',
                        width: 100,
                        left: 5,
                      }}>
                      <Text
                        style={{
                          fontSize: 21,
                          // right: 35,
                          top: 4,
                          color: Colors.black,
                        }}>
                        {userData?.username}
                      </Text>
                      <Text
                        style={{
                          // textAlign: 'center',
                          // right: 80,
                          // bottom: 24,
                          color: Colors.mediumGrayColor,
                        }}>
                        {userData?.category}
                      </Text>
                    </View>
                  </View>
                )}

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
                      isFollow ? {...styles.UnfollowText} : styles.FollowText
                    }>
                    {isFollow ? 'Unfollow' : 'Follow'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {userGetPosts?.results ? (
              <FlatList
                data={userGetPosts?.results}
                keyExtractor={(item, index) => item.id.toString()}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow: 1}}
                style={{flex: 1, top: 16, marginBottom: 13}}
                ListHeaderComponent={() => {
                  return (
                    <View style={{flex: 1, flexDirection: 'column'}}>
                      <View
                        style={{
                          ...styles.followerShowView,
                          width: width,
                          top: 0,
                          borderBottomWidth: 1,
                          borderBottomColor: Colors.grayColor,
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
                            {userData?.followersCount}
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
                            {userData?.followingsCount}
                          </Text>
                        </TouchableOpacity>
                      </View>
                      {userData.portfolio === null ? null : (
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate('TalentUserShowPortfilo', {
                              userData: userData,
                            })
                          }
                          style={styles.ViewPortfiloButton}>
                          <Text
                            style={{
                              color: Colors.whiteColor,
                            }}>
                            View Portfilo
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  );
                }}
              />
            ) : (
              <ActivityIndicator size="large" style={{top: 30}} />
            )}
          </View>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={false}
          showsVerticalScrollIndicator={false}
          Vertical>
          {/* ..............Header.............. */}
          <View style={{...styles.Newheader, paddingVertical: 7}}>
            <View flex={0.2}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <IconA name="left" size={20} color={Colors.black} />
              </TouchableOpacity>
            </View>
            <Text flex={1} style={{fontSize: 18, color: Colors.black}}>
              {userData?.username}
            </Text>
            <View flex={0.2} />
          </View>
          <View
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignSelf: 'center',
              top: 60,
              borderBottomColor: Colors.grayColor,
              borderBottomWidth: 1,
              height: 260,
            }}>
            {userData?.pic ? (
              <Image source={{uri: userData?.pic}} style={styles.picture} />
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
                {userData?.username}
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
                  {userData?.followersCount}
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
                  {userData?.followingsCount}
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={isFollow ? handleUnfollow : () => handleFollow(userData)}
              style={
                isFollow
                  ? {...styles.RoleUnfollowbutton}
                  : styles.Rolefollowbutton
              }>
              <Text
                style={isFollow ? {...styles.UnfollowText} : styles.FollowText}>
                {isFollow ? 'Unfollow' : 'Follow'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{height: 'auto', top: 12}}>
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
        </ScrollView>
      )}
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
            <Text style={{color: 'white', textAlign: 'center'}}>FeedBack</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {/* ...................Render the Props of Action Sheets............ */}
      <FollowUser
        isOpen={isActionSheetOpen}
        onClose={closeActionSheet}
        allFollowers={allFollowers}
      />

      {/* ...................Render the Props of Action Sheets FollowingUSer............ */}
      <FollowingUser
        isOpen={isActionSheetOpen1}
        onClose={closeActionSheet1}
        allFollowing={allFollowing}
      />
    </>
  );
};

export default TalentUserProfile;

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
    justifyContent: 'center',
    alignItems: 'center',
  },
  BlockparentDiv: {
    paddingHorizontal: 20,
    top: 12,
    flex: 1,
  },

  container: {
    display: 'flex',
    alignSelf: 'center',
  },
  Role2container: {
    display: 'flex',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  Role2Usercontainer: {
    alignSelf: 'center',
    flexDirection: 'row',
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
    paddingHorizontal: 10,
  },
  NewRole2header: {
    width: '100%',
    paddingHorizontal: 20,
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
  ViewPortfiloButton: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themePink.pinkThemeColor,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 20,
    marginVertical: 20,
  },
  // bottomContainer
  bottomContainer: {
    // height: height,
    flex: 1,
    backgroundColor: Colors.whiteThemeColor,
    // position: 'absolute',
    // top: 200,
    borderRadius: 25,
  },
  // mainBottomView
  mainBottomView: {
    // flex: 1,
    width: '100%',
    height: 200,
    alignItems: 'center',
  },
  // Line
  line: {
    width: 75,
    height: 4,
    backgroundColor: Colors.grayColor,
    alignSelf: 'center',
    marginVertical: 15,
    borderRadius: 2,
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
