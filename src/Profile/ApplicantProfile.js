import React, {useState, useEffect} from 'react';
import {useCallback} from 'react';
import {
  View,
  Text,
  useColorScheme,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import {
  useNavigation,
  useFocusEffect,
  useRoute,
} from '@react-navigation/native';

import UsersActionSheet from '../../components/usersActionSheet/UsersActionSheet';
import {apiGetUserPostRequest} from '../Redux/action/post';
import {
  getAllUserFollowersRequest,
  getAllFollowingRequest,
  getUserIDRequest,
} from '../Redux/action/followUser';

import {useDispatch, useSelector} from 'react-redux';

import Icon4 from 'react-native-vector-icons/FontAwesome5';

import {Colors, themeGreen, themePink} from '../../constants/Colors';
import FollowingUser from '../followingUsers/FollowingUser';
import styles from './styles';
import UserPost from '../../components/UserPost';
import Modal from 'react-native-modal';
import {Appbar} from 'react-native-paper';
const ApplicantProfile = () => {
  const route = useRoute();
  console.log(route);
  const [refreshing, setRefreshing] = useState(false);
  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);
  const [isActionSheetOpen1, setIsActionSheetOpen1] = useState(false);
  const [selectedProfile, setselectedProfile] = useState(null);
  const [modalShow1, setModalShow1] = useState(false);

  const themeChange = useColorScheme() === 'Male' ? 'Male' : 'female';

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {token} = useSelector(state => state.auth);

  // const gender = personal_profile?.gender;
  // const themeChange = gender ? 'Male' : 'Female';

  const {userGetPosts, progressLoading} = useSelector(state => state.post);
  const {allFollowUsers, allFollowing, IdUser} = useSelector(
    state => state.follow,
  );
  // console.log('IdUser ===>', IdUser);
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

  const openProfileModal = image => {
    if (image) {
      setselectedProfile(image);
      setModalShow1(true);
    } else {
      setselectedProfile(null);
      setModalShow1(true);
    }
  };

  const getFirstLetter = () => {
    if (IdUser && IdUser?.email && IdUser?.email.length > 0) {
      return IdUser?.email.charAt(0).toUpperCase();
    }
    // Return a default value (e.g., '?' or any character you like) if the username is not available
    return '';
  };
  const [id, setId] = useState(null);
  console.log(id, 'ID========');
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      dispatch(getUserIDRequest(id, token));
      dispatch(apiGetUserPostRequest(token, id));
      dispatch(getAllFollowingRequest(id, token));
      dispatch(getAllUserFollowersRequest(token));
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    dispatch(getUserIDRequest(id, token));
    dispatch(apiGetUserPostRequest(token, id));
    dispatch(getAllFollowingRequest(id, token));
    dispatch(getAllUserFollowersRequest(token));
  }, []);

  useFocusEffect(
    useCallback(() => {
      dispatch(getUserIDRequest(id, token));
      dispatch(apiGetUserPostRequest(token, id));
      dispatch(getAllFollowingRequest(id, token));
      dispatch(getAllUserFollowersRequest(token));
    }, []),
  );
  const renderItem = useCallback(
    ({item}) => {
      return <UserPost item={item} />;
    },
    [userGetPosts],
  );
  useEffect(() => {
    setId(route.params.id);
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteThemeColor}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}
        style={{backgroundColor: Colors.whiteColor}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Appbar.Header>
          <Appbar.BackAction
            onPress={() => {
              navigation.navigate('JobDetails');
            }}
          />
          <Appbar.Content title="ApplicantProfile" />
        </Appbar.Header>
        <View
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignSelf: 'center',
          }}>
          <TouchableOpacity onPress={() => openProfileModal(IdUser?.pic)}>
            {IdUser?.pic ? (
              <Image source={{uri: IdUser?.pic}} style={styles.picture} />
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
              {IdUser?.name}
            </Text>
          </TouchableOpacity>
          <View style={styles.ApplicateUserProfile}>
            <TouchableOpacity
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={openActionSheet}>
              <Text
                style={{fontSize: 15, fontWeight: '600', color: Colors.black}}>
                Follower
              </Text>
              <Text
                style={{fontSize: 13, fontWeight: '700', color: Colors.black}}>
                {IdUser?.followersCount}
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
                style={{fontSize: 15, fontWeight: '600', color: Colors.black}}>
                Following
              </Text>
              <Text
                style={{fontSize: 13, fontWeight: '700', color: Colors.black}}>
                {IdUser?.followingsCount}
              </Text>
            </TouchableOpacity>
          </View>

          <>
            {userGetPosts?.results ? (
              <FlatList
                data={userGetPosts?.results}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow: 1}}
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
            <Image source={{uri: selectedProfile}} style={styles.zoomedImage} />
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

export default ApplicantProfile;
