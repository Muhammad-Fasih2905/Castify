import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {
  apiDeleteFollowRequest,
  apiPostSendFollowRequest,
} from '../../src/Redux/action/followUser';

import {useDispatch, useSelector} from 'react-redux';

import * as Animatable from 'react-native-animatable';

import {useNavigation} from '@react-navigation/native';

import {Colors, themePink} from '../../constants/Colors';
import useNotificationHook from '../../src/utils/NotificationHook';
import handleSendNotification from '../../src/helper/sendNotfication';

const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');

const PortfiloTalentUsersComp = ({item, index}) => {
  const {token, user} = useSelector(state => state.auth);
  const {handleUpdateNotificationCount} = useNotificationHook();

  const [isFollow, setIsFollow] = useState(item?.is_follower || false);

  const navigation = useNavigation();

  const dispatch = useDispatch();

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
    setIsFollow(true);
  };

  const getFirstLetter = user => {
    if (user?.name && user.name.length > 0) {
      return user.name.charAt(0).toUpperCase();
    }
    return '';
  };

  return (
    <Animatable.View key={index} animation="slideInLeft" delay={index * 200}>
      <TouchableOpacity
        key={index}
        style={styles.Suggestiondata}
        onPress={() =>
          navigation.navigate('ProtfiloScreen', {
            item: item,
          })
        }>
        {item?.pic ? (
          <Image source={{uri: item?.pic}} style={styles.picture} />
        ) : (
          <View style={styles.container}>
            <View style={styles.usernameContainer}>
              <Text style={styles.username}>{getFirstLetter(item)}</Text>
            </View>
          </View>
        )}
        <View
          style={{
            flexDirection: 'column',
            alignSelf: 'center',
            marginVertical: 12,
          }}>
          <View style={{flexDirection: 'column', alignSelf: 'center'}}>
            <Text style={styles.Text}>{item.name}</Text>
            <Text
              style={{
                color: Colors.mediumGrayColor,
                fontSize: 12,
                fontWeight: '700',
              }}>
              {item.category}
            </Text>
          </View>
          <Text
            style={{
              color: Colors.black,
              fontSize: 11,
              marginHorizontal: 10,
              top: 5,
            }}>
            {item.biography}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            display: 'flex',
          }}>
          <TouchableOpacity
            onPress={isFollow ? handleUnfollow : () => handleFollow(item)}
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
      </TouchableOpacity>
    </Animatable.View>
  );
};

export default PortfiloTalentUsersComp;

const styles = StyleSheet.create({
  HomeHeaderView: {
    display: 'flex',
    backgroundColor: Colors.SeaBlue,
    height: '100%',
  },
  profilehead: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  left: {
    marginLeft: 0,
    marginRight: 'auto',
  },
  Avatarhead: {
    width: 45,
    height: 45,
  },
  HeadText: {
    color: Colors.Lightestgrey,
    fontSize: 13,
  },
  Card: {
    display: 'flex',
    backgroundColor: Colors.whiteColor,
    height: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  ShareLogo: {
    width: 90,
    height: 90,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  shareView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingBottom: 12,
    borderBottomColor: Colors.grayColor,
  },
  TranscationAbout: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 10,
    marginTop: 55,
  },
  TranscationBtn: {
    width: '50%',
    backgroundColor: Colors.SeaBlue,
    alignItems: 'center',
    height: 35,
    borderRadius: 5,
    justifyContent: 'center',
    marginHorizontal: 5,
    alignSelf: 'center',
    marginTop: 45,
  },
  searchView: {
    height: 80,
    width: '90%',
    // backgroundColor:Colors.grayColor,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  Suggestiondata: {
    height: 270,
    width: width / 2.3,
    // flex: 1,
    backgroundColor: Colors.whiteColor,
    marginHorizontal: 10,
    marginTop: 12,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
    borderRadius: 12,
    bottom: 6,
  },
  picture: {
    height: 100,
    width: 100,
    borderRadius: 10,
    top: 12,
    borderWidth: 1,
    borderColor: Colors.grayColor,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 12,
  },
  Text: {
    fontSize: 14,
    color: Colors.black,
  },
  ModalContent: {
    width: wp('70%'),
    height: hp('100%'),
  },
  // block User Css
  BlockparentDiv: {
    paddingHorizontal: 20,
    top: 12,
    flex: 1,
  },

  blockcontainer: {
    // position: 'relative',
    display: 'flex',
    alignSelf: 'center',
    bottom: 103,
  },
  blockpicture: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  blockusernameContainer: {
    // position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.grayColor,
    borderRadius: 95,
    padding: 5,
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blockusername: {
    fontWeight: 'bold',
    textAlign: 'center',
  },

  blockBtn: {
    height: 45,
    width: '75%',
    alignSelf: 'center',
    backgroundColor: Colors.blueThemeColor,
    borderRadius: 20,
    justifyContent: 'center',
    marginBottom: 40,
  },

  // username first letter css
  container: {
    backgroundColor: Colors.profileColor,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
    width: 100,
    height: 100,
    justifyContent: 'center',
    top: 12,
  },
  // profile css
  usernameContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  username: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  // Follow Button Css

  RoleUnfollowbutton: {
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.grayColor,
    width: '70%',
    alignSelf: 'center',
    borderRadius: 20,
  },

  Rolefollowbutton: {
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themePink.pinkThemeColor,
    width: '70%',
    alignSelf: 'center',
    borderRadius: 20,
  },
  FollowText: {
    fontSize: 13,
    color: Colors.whiteColor,
    fontWeight: '600',
  },
  UnfollowText: {
    color: Colors.black,
    fontSize: 13,
    fontWeight: '600',
  },
});
