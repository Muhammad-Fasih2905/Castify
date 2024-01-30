import React, { useState, useEffect } from 'react';
import { useCallback } from 'react';
import {
  View,
  Text,
  useColorScheme,
  TouchableOpacity,
  RefreshControl,
  TextInput,
  Icon,
  ScrollView,
  FlatList,
  Image,
  ActivityIndicator,
  ProgressBarAndroid,
} from 'react-native';
import StarRating from 'react-native-star-rating';
import {
  useNavigation,
  useFocusEffect,
  useRoute,
} from '@react-navigation/native';

import Header from '../../components/header';
import UsersActionSheet from '../../components/usersActionSheet/UsersActionSheet';
import { apiGetProfileRequest } from '../Redux/action/auth';
import { apiGetUserPostRequest } from '../Redux/action/post';
import {
  getAllUserFollowersRequest,
  getAllFollowingRequest,
} from '../Redux/action/followUser';

import { useDispatch, useSelector } from 'react-redux';

import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon4 from 'react-native-vector-icons/FontAwesome5';

import { Colors, themeGreen, themePink } from '../../constants/Colors';
import FollowingUser from '../followingUsers/FollowingUser';
import styles from './styles';
import UserPost from '../../components/UserPost';
import Modal from 'react-native-modal';
import { Appbar } from 'react-native-paper';

const Profile = () => {
  const route = useRoute();
  const [refreshing, setRefreshing] = useState(false);
  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);
  const [isActionSheetOpen1, setIsActionSheetOpen1] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedBack, setFeedBack] = useState('');
  const [selectedProfile, setselectedProfile] = useState(null);
  const [modalShow1, setModalShow1] = useState(false);

  const themeChange = useColorScheme() === 'Male' ? 'Male' : 'female';

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { token, personal_profile, user } = useSelector(state => state.auth);

  // const gender = personal_profile?.gender;
  // const themeChange = gender ? 'Male' : 'Female';

  const { userGetPosts, progressLoading } = useSelector(state => state.post);
  const { allFollowUsers, allFollowing } = useSelector(state => state.follow);

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

  const handleRatingChange = newRating => {
    setRating(newRating);
  };

  const handleSaveRating = () => {
    console.log('Rating:', rating);
    onCloseModal();
  };

  const openProfileModal = image => {
    if (image) {
      setselectedProfile(image);
      setModalShow1(true);
    } else {
      setselectedProfile(null);
      setModalShow1(true);
    }
  };

  const handleChange = (key, value) => {
    setFeedBack(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const getFirstLetter = () => {
    if (
      personal_profile &&
      personal_profile?.email &&
      personal_profile?.email.length > 0
    ) {
      return personal_profile?.email.charAt(0).toUpperCase();
    }
    // Return a default value (e.g., '?' or any character you like) if the username is not available
    return '';
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      dispatch(apiGetProfileRequest(token));
      dispatch(apiGetUserPostRequest(token, user?.id));
      dispatch(getAllFollowingRequest(user?.id, token));
      dispatch(getAllUserFollowersRequest(token));
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    dispatch(apiGetProfileRequest(token));
    dispatch(apiGetUserPostRequest(token, user?.id));
    dispatch(getAllFollowingRequest(user?.id, token));
    dispatch(getAllUserFollowersRequest(token));
  }, []);

  useFocusEffect(
    useCallback(() => {
      dispatch(apiGetUserPostRequest(token, user?.id));
      dispatch(apiGetProfileRequest(token));
      dispatch(getAllFollowingRequest(user?.id, token));
      dispatch(getAllUserFollowersRequest(token));
    }, []),
  );

  const renderItem = useCallback(
    ({ item }) => {
      return <UserPost item={item} />;
    },
    [userGetPosts],
  );

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteThemeColor }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ backgroundColor: Colors.whiteColor }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {route?.params?.screenName === 'About' ? (
          <Appbar.Header>
            <Appbar.BackAction
              onPress={() => {
                navigation.navigate('JobDetails');
              }}
            />
            <Appbar.Content title="Profile" />
          </Appbar.Header>
        ) : (
          <Header title="Profile" navigation={navigation} />
        )}
        <View
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignSelf: 'center',
          }}>
          <TouchableOpacity
            onPress={() => openProfileModal(personal_profile?.pic)}>
            {personal_profile?.pic ? (
              <Image
                source={{ uri: personal_profile?.pic }}
                style={styles.picture}
              />
            ) : (
              <View style={styles.container}>
                <View style={styles.usernameContainer}>
                  <Text style={styles.username}>{getFirstLetter()}</Text>
                </View>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('editProfile')}>
            <Text
              style={{
                color: Colors.black,
                fontSize: 15,
                top: 15,
                textAlign: 'center',
              }}>
              {personal_profile?.name}
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
                style={{ fontSize: 15, fontWeight: '600', color: Colors.black }}>
                Follower
              </Text>
              <Text
                style={{ fontSize: 13, fontWeight: '700', color: Colors.black }}>
                {personal_profile?.followersCount}
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
                style={{ fontSize: 15, fontWeight: '600', color: Colors.black }}>
                Following
              </Text>
              <Text
                style={{ fontSize: 13, fontWeight: '700', color: Colors.black }}>
                {personal_profile?.followingsCount}
              </Text>
            </TouchableOpacity>
            {user.id ? null : (
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

          <TouchableOpacity
            onPress={() => navigation.navigate('editProfile')}
            style={[
              styles.btnSubmit,

              themeChange === 'Male'
                ? { backgroundColor: themeGreen.greenThemeColor }
                : { backgroundColor: themePink.pinkThemeColor },
            ]}>
            <Text style={{ ...styles.txtSubmit }}>Edit Profile</Text>
          </TouchableOpacity>
          <View style={styles.settingsScreenView}>
            <TouchableOpacity
              style={[styles.postbtn]}
              onPress={() => navigation.navigate('createPost')}>
              <Icon2
                name="pluscircle"
                color={Colors.grayColor}
                size={25}
                style={{ top: 12 }}
              />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '700',
                  paddingTop: 15,
                }}>
                Create a Feed
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => navigation.navigate('yourorder')}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 50,
                }}>
                <View style={styles.profileView}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '700',
                      marginBottom: 15,
                      paddingHorizontal: 10,
                    }}>
                    Your orders
                  </Text>
                  <Icon2 size={20} name="videocamera" />
                </View>
                <Icon1
                  size={22}
                  style={{paddingRight: 12, bottom: 7}}
                  name="chevron-forward"
                />
              </View>
            </TouchableOpacity> */}
          </View>
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
            <View style={{ padding: 16 }}>
              <View style={{ ...styles.feedBackInput }}>
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
                <Text style={{ color: 'white', textAlign: 'center' }}>
                  FeedBack
                </Text>
              </TouchableOpacity>
            </View>
          </Modal>
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

          <>
            {userGetPosts?.results ? (
              <FlatList
                data={userGetPosts?.results}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}
              />
            ) : (
              <ActivityIndicator size="large" />
            )}
          </>
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
      </ScrollView>
      {/* ------------------------------Show Profile Modal-------------------------------- */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalShow1}
        onRequestClose={() => setModalShow1(false)}>
        <View style={styles.modalProfilePicContainer}>
          {selectedProfile ? (
            <Image source={{ uri: selectedProfile }} style={styles.zoomedImage} />
          ) : (
            <Text
              style={{
                color: Colors.whiteColor,
                fontSize: 14,
                fontWeight: '600',
              }}>
              No Pic
            </Text>
          )}
          <TouchableOpacity
            onPress={() => setModalShow1(false)}
            style={styles.closeButton}>
            <Icon4 name="times-circle" color={Colors.whiteColor} size={30} />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default Profile;
