import React, {useEffect, useState} from 'react';
import {useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

import postbg from '../../assets/postbg.jpeg';
import {Colors} from '../../constants/Colors';
import useNotificationHook from '../../src/utils/NotificationHook';
import handleSendNotification from '../../src/helper/sendNotfication';
import Icon from 'react-native-vector-icons/AntDesign';

import {
  apiGetCommentsPostRequest,
  apiPostCommentsPostRequest,
} from '../../src/Redux/action/post';
import {useSelector, useDispatch} from 'react-redux';

const Comments = ({route, item}) => {
  const navigation = useNavigation();
  const [comment, setComment] = useState('');

  const {post} = route.params;

  const dispatch = useDispatch();

  const {token, user} = useSelector(state => state.auth);
  const {comments} = useSelector(state => state.post);
  const {handleUpdateNotificationCount} = useNotificationHook();

  useEffect(() => {
    dispatch(apiGetCommentsPostRequest(token, post?.id));
  }, [post]);

  useFocusEffect(
    useCallback(() => {
      dispatch(apiGetCommentsPostRequest(token, post?.id));
    }, []),
  );
  const SendComment = () => {
    const commentData = {
      comment: comment.comment,
      post: post?.id,
      user: user?.id,
    };
    dispatch(apiPostCommentsPostRequest(token, commentData));
    let notificationData = {
      to: post?.creator?.fcm_token,

      notification: {
        title: user?.username,
        body: `${user?.username} Comment on your post`,
        mutable_content: true,
        sound: 'Tri-tone',
        redirect_to: 'Comment',
      },
    };

    handleSendNotification(notificationData);
    handleUpdateNotificationCount(user?.id);
    setComment('');
  };

  const getFirstLetter = () => {
    if (comments && comments.length > 0) {
      // Use map() to extract the first letter of each comment's username
      const firstLetters = comments.map(comment => {
        const username = comment.user?.name;
        return username && username.length > 0
          ? username.charAt(0).toUpperCase()
          : '?';
      });

      // Return the first letter directly from the array
      return firstLetters[0] || '?'; // Return '?' if the array is empty
    }

    // Return a default value (e.g., '?' or any character you like) if comments is not available or empty
    return '?';
  };

  const handleGoBack = () => {
    // You can pass the comments data to the previous screen's state
    navigation.goBack();
  };

  // Usage:
  const firstLetter = getFirstLetter();

  return (
    <View flex={1}>
      {/* ............Header.............. */}
      <Image source={postbg} style={styles.backgroundImage} />
      <View style={{...styles.Newheader}}>
        <View flex={0.2}>
          <TouchableOpacity onPress={handleGoBack}>
            <Icon name="left" size={20} color={Colors.whiteColor} />
          </TouchableOpacity>
        </View>
        <Text flex={1} style={{fontSize: 18, color: Colors.whiteColor}}>
          Comments
        </Text>
        <View flex={0.2} />
      </View>
      <View style={styles.mainViewPost}>
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 20,
            width: '100%',
            flex: 1,
          }}>
          {comments ? (
            <FlatList
              data={comments}
              renderItem={({item}) => {
                const timestamp = item?.created; // Assuming 'created' is the timestamp field in your item object
                const date = new Date(timestamp);
                const now = new Date();
                const timeDifference = now - date; // Calculate the time difference in milliseconds

                let time;

                if (timeDifference < 12 * 60 * 60 * 1000) {
                  // Less than 12 hours, show the time in 'numeric' format
                  time = time = 'Just now';
                } else if (timeDifference < 24 * 60 * 60 * 1000) {
                  // Less than 24 hours, show "12 hours ago"
                  time = '12 hr ';
                } else if (timeDifference < 2 * 24 * 60 * 60 * 1000) {
                  // Between 24 and 48 hours, show "1 day ago"
                  time = '1 day ';
                } else if (timeDifference < 7 * 24 * 60 * 60 * 1000) {
                  // Between 2 and 7 days, show the time difference in days
                  const daysAgo = Math.floor(
                    timeDifference / (24 * 60 * 60 * 1000),
                  );
                  time = `${daysAgo} ${daysAgo === 1 ? 'day' : 'days'} `;
                } else if (timeDifference < 30 * 24 * 60 * 60 * 1000) {
                  // Between 7 and 30 days, show the time difference in weeks
                  const weeksAgo = Math.floor(
                    timeDifference / (7 * 24 * 60 * 60 * 1000),
                  );
                  time = `${weeksAgo} ${weeksAgo === 1 ? 'week' : 'weeks'} `;
                } else {
                  // More than 30 days, show the time difference in months and days
                  const monthsAgo = Math.floor(
                    timeDifference / (30 * 24 * 60 * 60 * 1000),
                  );
                  const daysAgo = Math.floor(
                    (timeDifference % (30 * 24 * 60 * 60 * 1000)) /
                      (24 * 60 * 60 * 1000),
                  );
                  time = `${monthsAgo} ${
                    monthsAgo === 1 ? 'month' : 'months'
                  } ${daysAgo} ${daysAgo === 1 ? 'day' : 'days'} `;
                }
                return (
                  <View>
                    <View
                      style={{
                        width: '100%',
                        paddingHorizontal: 12,
                        paddingVertical: 9,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        backgroundColor: Colors.whiteColor,
                        borderRadius: 12,
                        margin: 12,
                        alignSelf: 'center',
                      }}>
                      <View style={{display: 'flex', flexDirection: 'row'}}>
                        {item?.user?.pic ? (
                          <Image
                            source={{uri: item?.user?.pic}}
                            style={{height: 40, width: 40, borderRadius: 15}}
                          />
                        ) : (
                          <View style={styles.container}>
                            <View style={styles.usernameContainer}>
                              <Text style={styles.username}>{firstLetter}</Text>
                            </View>
                          </View>
                        )}
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            paddingHorizontal: 12,
                            width: 150,
                          }}>
                          <Text style={{fontSize: 15, color: Colors.black}}>
                            {item?.user?.name || item?.user?.lastName}
                          </Text>
                          <Text
                            style={{
                              color: Colors.black,
                            }}>
                            {item?.comment}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'column',
                          top: 12,
                        }}>
                        <Text
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            color: Colors.black,
                          }}>
                          {time}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              }}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <ActivityIndicator size="large" />
          )}
        </View>

        <View
          style={{
            width: '100%',
            flexDirection: 'row',
          }}>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              display: 'flex',
              height: 50,
              justifyContent: 'flex-end',
              alignItems: 'center',
              borderTopWidth: 1,
              borderTopColor: Colors.mediumGrayColor,
            }}>
            <TextInput
              style={{width: '70%', height: 50}}
              placeholder="Add a Comment"
              onChangeText={text =>
                setComment(prevComment => ({...prevComment, comment: text}))
              }
              value={comment.comment}
              placeholderTextColor={Colors.mediumGrayColor}
            />
            <TouchableOpacity onPress={SendComment}>
              <Text
                style={{color: Colors.mediumGrayColor, paddingHorizontal: 12}}>
                Comment
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Comments;

const styles = StyleSheet.create({
  // Header
  Signupheader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  AccountsettingsScreenView: {
    borderBottomWidth: 1.5,
    borderBottomColor: Colors.Lightestgrey,
    marginTop: 12,
  },
  UsernameView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
  },
  profileView: {
    flexDirection: 'row-reverse',
    paddingHorizontal: 12,
  },
  usernameTxt: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  mainViewPost: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    // justifyContent: 'space-evenly',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Add opacity to the white card
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  Newheader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
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
});
