import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Image,
  ProgressBarAndroid,
  Button,
  Platform,
} from 'react-native';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Modal from 'react-native-modal';

import { apiGetPostsRequest } from '../Redux/action/post';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../../components/header';
import { Colors } from '../../constants/Colors';
import Icon from 'react-native-vector-icons/Entypo';
import Icon1 from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/Feather';
import Icon3 from 'react-native-vector-icons/Octicons';

import ImagePicker from 'react-native-image-crop-picker';
import { useCallback } from 'react';
import PostWork from '../../components/PostWork';
import HomeHeader from '../../components/homeHeader/HomeHeader';
import useNotificationHook from '../utils/NotificationHook';

import notifee from '@notifee/react-native';
import Toast from 'react-native-toast-message';
import { apiGetProfileRequest, signupToastTimeout } from '../Redux/action/auth';

const Home = () => {
  const [postContent, setPostContent] = useState('');

  const [isOpen, setIsOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();

  const { token, user, signupToast, personal_profile } = useSelector(
    state => state.auth,
  );

  const { allPosts, progressLoading, homeLoaderpost } = useSelector(
    state => state.post,
  );
  const { getNotificationsCount } = useNotificationHook();

  const getFirstLetter = () => {
    if (user?.email && user.email.length > 0) {
      return user.email.charAt(0).toUpperCase();
    }
    // Return a default value (e.g., '?' or any character you like) if the username is not available
    return '';
  };

  function onCloseModal() {
    setModalShow(false);
  }

  const ChoosePic = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: false,
    })
      .then(image => {
        if (image && image.path) {
          navigation.navigate('createPost', {
            pic: {
              uri: image.path,
              type: image.mime,
              name: 'image.jpg',
            },
          });
        }
      })
      .catch(error => { });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      dispatch(apiGetPostsRequest(token));
      setRefreshing(false);
    }, 2000);
  }, []);

  useFocusEffect(
    useCallback(() => {
      dispatch(apiGetProfileRequest(token));
      dispatch(apiGetPostsRequest(token));
    }, []),
  );
  useEffect(() => {
    getNotificationsCount(user?.id);
    const toastTimeout = setTimeout(() => {
      if (signupToast) {
        Toast.show({
          type: 'success',
          text1: 'Complete your portfolio',
          onPress: () => {
            navigation.navigate('ProtfiloScreen');
          },
          visibilityTime: 9000,
        });

        dispatch(signupToastTimeout());
      }
    }, 10000);

    return () => {
      clearTimeout(toastTimeout);
    };
  }, [signupToast]);

  const renderItem = useCallback(
    ({ item }) => {
      return <PostWork item={item} />;
    },
    [allPosts],
  );

  const Camera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        if (image && image.path) {
          navigation.navigate('createPost', {
            pic: {
              uri: image.path,
              type: image.mime,
              name: 'image.jpg',
            },
          });
        }
      })
      .catch(error => { });
    setModalShow(false);
  };
  // const Camera = () => {
  //   ImagePicker.openCamera({
  //     width: 300,
  //     height: 400,
  //     cropping: true,
  //   })
  //     .then(image => {
  //       if (image && image.path) {
  //         navigation.navigate('createPost', {
  //           pic: {
  //             uri: image.path,
  //             type: image.mime,
  //             name: 'image.jpg',
  //           },
  //         });
  //       }
  //     })
  //     .catch(error => {
  //     });
  //   setModalShow(false);
  // };

  // const pickVideoFromGallery = () => {
  //   ImagePicker.openPicker({
  //     mediaType: 'video',
  //     compressVideoPreset: 'HighestQuality',
  //     compressVideo: true,
  //     quality: 1,
  //   }).then(image => {
  //     if (image && image.path) {
  //       navigation.navigate('createPost', {
  //         pic: {
  //           uri: image.path,
  //           type: image.mime,
  //           name: 'image.jpg',
  //         },
  //       });
  //     }
  //   });
  //   setModalShow(false);
  // };

  async function onDisplayNotification() {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Notification Title',
      body: 'Main body content of the notification',
      android: {
        channelId,
        smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  }

  // {
  //   signupToast
  //     ? Toast.show({
  //         type: 'success',
  //         text1: 'Complete your portfilo',
  //         onPress: () => {
  //           navigation.navigate('ProtfiloScreen');
  //           Toast.hide();
  //         },
  //       })
  //     : null;
  // }
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}>
      <HomeHeader title="Home" />
      <View style={styles.container}>
        {/* Post Header */}
        <View style={styles.header}>
          {personal_profile?.pic ? (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Profile', { screenName: undefined })
              }>
              <Image
                source={{ uri: personal_profile?.pic }}
                style={{ width: 50, height: 50, borderRadius: 30, bottom: 5 }}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.Namecontainer}
              onPress={() =>
                navigation.navigate('Profile', { screenName: undefined })
              }>
              <View style={styles.usernameContainer}>
                <Text style={styles.username}>{getFirstLetter()}</Text>
              </View>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.textInput}
            onPress={() => navigation.navigate('createPost')}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '900',
                color: Colors.mediumGrayColor,
                top: 5,
                left: 5,
              }}>
              What's in your Mind
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalShow(true)}>
            <Icon
              name="images"
              size={28}
              color={'green'}
              style={styles.iconStyle}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* .......................Modal Show................... */}
      <Modal
        isVisible={modalShow}
        animationIn={'slideInUp'}
        animationInTiming={1500}
        animationOut="slideOutDown"
        animationOutTiming={1500}
        onBackButtonPress={onCloseModal}
        onBackdropPress={onCloseModal}
        style={styles.modal}>
        <View style={styles.TablePicAndCameraView}>
          <TouchableOpacity
            style={styles.PhotoAndVideoView}
            onPress={ChoosePic}>
            <Icon1
              name="images"
              size={28}
              color={'green'}
              style={styles.iconStyle}
            />
            <Text style={styles.Text}>Photo</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={styles.PhotoAndVideoView}
            onPress={pickVideoFromGallery}>
            <Icon3
              name="video"
              size={28}
              color={'green'}
              style={styles.iconStyle}
            />
            <Text style={styles.Text}>Video</Text>
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.PhotoAndVideoView} onPress={Camera}>
            <Icon2
              name="camera"
              size={28}
              color={'green'}
              style={styles.iconStyle}
            />
            <Text style={styles.Text}>Camera</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {/*..........All Post Show...................*/}
      {progressLoading ? (
        <View style={{ flexDirection: 'row', width: '100%' }}>
          <Text style={styles.text}>
            {progressLoading ? 'Uploading' : 'Finished'}
          </Text>
          {progressLoading && (
            <ProgressBarAndroid
              styleAttr="Horizontal"
              indeterminate={true}
              // progress={0.5}
              color={Colors.grayColor}
              style={styles.progressBar}
            />
          )}
        </View>
      ) : null}

      {/* {homeLoaderpost ? (
        <ActivityIndicator size="large" />
      ) : allPosts?.results?.length > 0 ? ( */}
      <FlatList
        data={allPosts?.results || []}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        ListHeaderComponent={() => {
          return homeLoaderpost ? (
            <ActivityIndicator size="large" />
          ) : !homeLoaderpost && !allPosts?.results?.length ? (
            <Text
              style={{
                fontSize: 14,
                color: Colors.black,
                fontWeight: '600',
                textAlign: 'center',
                alignSelf: 'center',
                alignItems: 'center',
              }}>
              No Posts
            </Text>
          ) : null;
        }}
      />
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    margin: 12,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  Namecontainer: {
    display: 'flex',
    alignSelf: 'center',
    bottom: 7,
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
    paddingHorizontal: 12,
  },

  // Post TExt Input
  textInput: {
    borderWidth: 1,
    borderColor: Colors.mediumGrayColor,
    padding: 10,
    marginBottom: 16,
    color: Colors.black, // Set text color for the input
    borderRadius: 30,
    width: '70%',
    marginHorizontal: 12,
    height: 55,
  },
  iconStyle: {
    bottom: 5,
    marginHorizontal: 12,
    right: 12,
  },
  // PostPic
  PostPic: {
    width: 300,
    height: 400,
    borderRadius: 20,
    alignSelf: 'center',
    marginVertical: 12,
  },
  thumbEmojiContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  // Modal CSS
  modal: {
    width: wp(100),
    height: wp(66),
    backgroundColor: Colors.whiteThemeColor,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
  },

  TablePicAndCameraView: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
  },
  PhotoAndVideoView: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.mediumGrayColor,
    width: '100%',
    paddingVertical: 12,
  },
  Text: {
    color: Colors.black,
    fontSize: 14,
    fontWeight: '600',
    paddingHorizontal: 10,
    top: 5,
  },
  // UnderLine CSS
  text: {
    fontSize: 15,
    fontWeight: '600',
    left: 13,
    color: Colors.black,
  },
  progressBar: {
    height: 20,
    marginTop: 3,
    left: 19,
    width: '73%',
  },
});
