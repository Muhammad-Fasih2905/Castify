import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/AntDesign';

import {
  apiDeleteFollowRequest,
  apiPostSendFollowRequest,
} from '../../src/Redux/action/followUser';
import {useDispatch, useSelector} from 'react-redux';

import NewHeader from '../../components/newHeader/NewHeader';

import {Colors, themePink} from '../../constants/Colors';

const SeeAllUsers = ({setShowAllUsers, showAllUsers, allUsers}) => {
  const navigation = useNavigation();

  const role2Users = allUsers.filter(user => user.role === '2');
  const {user} = useSelector(state => state.auth);

  const hasTrueFollower = role2Users.some(user => user.is_follower);

  const [isFollow, setIsFollow] = useState(
    hasTrueFollower.is_follower || false,
  );

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
    setIsFollow(true);
  };

  return (
    <View flex={1}>
      <View style={{...styles.Newheader}}>
        <View flex={0.2}>
          <TouchableOpacity onPress={() => setShowAllUsers(false)}>
            <Icon name="left" size={20} color={Colors.black} />
          </TouchableOpacity>
        </View>
        <Text flex={1} style={{fontSize: 18, color: Colors.black}}>
          Sell ALL Users
        </Text>
        <View flex={0.2} />
      </View>

      <ScrollView vertical showsVerticalScrollIndicator={false}>
        <View style={styles.tableRow}>
          {allUsers.map((item, index) => {
            if (item.role === '2' && user.id !== item.id) {
              return (
                <Animatable.View animation="slideInLeft" delay={200}>
                  <TouchableOpacity
                    style={styles.Suggestiondata}
                    onPress={() =>
                      navigation.navigate('TalentUserProfile', {
                        userData: item,
                      })
                    }>
                    {item?.pic ? (
                      <Image source={{uri: item?.pic}} style={styles.picture} />
                    ) : (
                      <View style={styles.container}>
                        <View style={styles.usernameContainer}>
                          <Text style={styles.username}>
                            {item?.email?.charAt(0).toUpperCase()}
                          </Text>
                        </View>
                      </View>
                    )}

                    <Text style={styles.Text}>{item?.name}</Text>
                    <Text
                      style={{
                        color: Colors.mediumGrayColor,
                        fontSize: 12,
                        fontWeight: '700',
                        bottom: 10,
                        alignSelf: 'flex-start',
                        paddingHorizontal: 29,
                      }}>
                      {item.category}
                    </Text>
                    <Text
                      style={{
                        ...styles.Text,
                        color: Colors.black,
                        fontSize: 10,
                      }}>
                      {item?.biography}
                    </Text>
                    <View style={{flexDirection: 'row', display: 'flex'}}>
                      {/* <TouchableOpacity
                        onPress={
                          isFollow ? handleUnfollow : () => handleFollow(item)
                        }
                        style={
                          isFollow
                            ? {...styles.RoleUnfollowbutton}
                            : styles.Rolefollowbutton
                        }>
                        <Text
                          style={
                            isFollow
                              ? {...styles.UnfollowText}
                              : styles.FollowText
                          }>
                          {isFollow ? 'Unfollow' : 'Follow'}
                        </Text>
                      </TouchableOpacity> */}
                      {/* <Text
                        style={{
                          ...styles.Text,
                          color: Colors.black,
                          fontSize: 10,
                        }}>
                        {item?.rs ? item?.rs : 'Rs 2000'}
                      </Text>
                      <Text
                        style={{
                          ...styles.Text,
                          color: Colors.black,
                          fontSize: 10,
                        }}>
                        {item?.hour ? item?.hour : '24 hr'}
                      </Text> */}
                    </View>
                  </TouchableOpacity>
                </Animatable.View>
              );
            }
            return null;
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default SeeAllUsers;

const styles = StyleSheet.create({
  Suggestiondata: {
    height: 260,
    width: 150,
    backgroundColor: Colors.whiteColor,
    marginTop: 10,
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
    bottom: 12,
  },
  picture: {
    height: 100,
    width: 100,
    borderRadius: 100,
    top: 12,
    borderWidth: 1,
    borderColor: Colors.grayColor,
  },
  Text: {
    fontSize: 16,
    color: Colors.black,
    alignSelf: 'flex-start',
    paddingHorizontal: 30,
  },
  // username first letter css
  container: {
    backgroundColor: Colors.profileColor,
    marginTop: 20,
    marginHorizontal: 17,
    borderRadius: 60,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
    bottom: 12,
  },
  // profile css
  usernameContainer: {
    // position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.profileColor,
    borderRadius: 60,
    padding: 5,
    width: 90,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  username: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  //   New Header CSS
  Newheader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'stretch',
    paddingHorizontal: 22,
    flexWrap: 'wrap',
  },

  // Follow Button Css

  RoleUnfollowbutton: {
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.grayColor,
    width: '79%',
    alignSelf: 'center',
    borderRadius: 20,
  },

  Rolefollowbutton: {
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themePink.pinkThemeColor,
    width: '79%',
    alignSelf: 'center',
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
});
