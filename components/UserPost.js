import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  ScrollView,
  RefreshControl,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Menu, Pressable} from 'native-base';

import {
  apiPostLikePostRequest,
  apiDeleteLikePostRequest,
  apiPostDeletePostRequest,
} from '../src/Redux/action/post';
import {useDispatch, useSelector} from 'react-redux';

import {Colors} from '../constants/Colors';
import Icon from 'react-native-vector-icons/Entypo';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/EvilIcons';
import Icon3 from 'react-native-vector-icons/Entypo';

import ImagePicker from 'react-native-image-crop-picker';
import Video from 'react-native-video';
import FastImage from 'react-native-fast-image';
import VideoPlayer from 'react-native-video-controls';
import handleSendNotification from '../src/helper/sendNotfication';
import useNotificationHook from '../src/utils/NotificationHook';

const {width} = Dimensions.get('window');

const UserPost = ({item}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {token, user} = useSelector(state => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [visibleItems, setVisibleItems] = useState(0);

  const [like, setLike] = useState(item?.my_like ? true : false);
  const [emojis, setEmojis] = useState([
    {id: 2, emoji: '😃', count: item.hahaha_likes},
    {id: 3, emoji: '❤️', count: item.heart_likes},
    {id: 1, emoji: '👍', count: item.thumbUp_likes},
  ]);

  const {handleUpdateNotificationCount} = useNotificationHook();

  const handleEmojiClick = (selectedEmoji, item) => {
    setEmojis(prevEmojis => {
      // Find the selected emoji within the emojis array
      const emojiToUpdate = prevEmojis.find(
        emoji => emoji.id === selectedEmoji.id,
      );

      if (!emojiToUpdate) {
        return prevEmojis; // Return unchanged emojis if the emoji isn't found
      }

      if (item.my_like && item.my_like !== selectedEmoji.id) {
        // User already liked a different emoji, so perform unlike action
        const deleteData = {
          my_like: item.my_like,
        };
        dispatch(apiDeleteLikePostRequest(deleteData, token));
      }

      if (item.my_like !== selectedEmoji.id) {
        if (item?.creator?.id !== user?.id) {
          handleUpdateNotificationCount(item?.creator?.id);
        }
        let notificationData = {
          to: item?.creator?.fcm_token,

          notification: {
            title: user?.username,
            body: `${user?.username} Like Your Post`,
            mutable_content: true,
            sound: 'Tri-tone',
            redirect_to: 'Like',
          },
        };
        if (item?.creator?.id !== user.id) {
          handleSendNotification(notificationData);
        }
        // Perform like action for the selected emoji
        const data = {
          post: item.id,
          user: user?.id,
          likeEmoji: selectedEmoji.id,
        };
        dispatch(apiPostLikePostRequest(token, data));
      }

      // Toggle the 'liked' property for the emoji
      const updatedEmojis = prevEmojis.map(emoji => {
        if (emoji.id === selectedEmoji.id) {
          return {...emoji, liked: !emoji.liked};
        }
        return emoji;
      });

      return updatedEmojis;
    });
  };

  useEffect(() => {
    setEmojis([
      {id: 2, emoji: '😃', count: item.hahaha_likes},
      {id: 3, emoji: '❤️', count: item.heart_likes},
      {id: 1, emoji: '👍', count: item.thumbUp_likes},
    ]);
  }, [item]);

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
    const daysAgo = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
    time = `${daysAgo} ${daysAgo === 1 ? 'day' : 'days'} `;
  } else if (timeDifference < 30 * 24 * 60 * 60 * 1000) {
    // Between 7 and 30 days, show the time difference in weeks
    const weeksAgo = Math.floor(timeDifference / (7 * 24 * 60 * 60 * 1000));
    time = `${weeksAgo} ${weeksAgo === 1 ? 'week' : 'weeks'} `;
  } else {
    // More than 30 days, show the time difference in months and days
    const monthsAgo = Math.floor(timeDifference / (30 * 24 * 60 * 60 * 1000));
    const daysAgo = Math.floor(
      (timeDifference % (30 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000),
    );
    time = `${monthsAgo} ${monthsAgo === 1 ? 'month' : 'months'} ${daysAgo} ${
      daysAgo === 1 ? 'day' : 'days'
    } `;
  }

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleDeletePost = post => {
    dispatch(apiPostDeletePostRequest(token, post?.id));
  };

  const handleScroll = event => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const itemWidth = width; // Width of each item (adjust to your item width)

    // Calculate the current item index
    const currentItemIndex = Math.round(contentOffsetX / itemWidth);

    // Update the current index state
    setVisibleItems(currentItemIndex);
  };

  return (
    <View
      style={{
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        marginVertical: 15,
        margin: 12,
      }}>
      {/* User info and post day row */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: 35,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity>
            {item?.creator?.pic ? (
              <FastImage
                source={{uri: item?.creator?.pic}}
                style={{
                  width: 33,
                  height: 33,
                  borderRadius: 20,
                  marginHorizontal: 9,
                  bottom: 6,
                }}
              />
            ) : (
              <View style={styles.container}>
                <View style={styles.usernameContainer}>
                  <Text style={styles.username}>
                    {item?.creator?.email.charAt(0).toUpperCase()}
                  </Text>
                </View>
              </View>
            )}
          </TouchableOpacity>
          <View
            style={{
              left: 7,
              flexDirection: 'row',
              bottom: 7,
            }}>
            <Text style={{fontWeight: 'bold', color: Colors.black}}>
              {item?.creator?.name
                ? item?.creator?.name
                : item?.creator?.lastName}
            </Text>
            <Text style={{color: Colors.black, left: 14}}>{time}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={handleOpen}>
          <Menu
            shadow={2}
            w="190"
            trigger={triggerProps => {
              return (
                <Pressable
                  accessibilityLabel="More options menu"
                  {...triggerProps}>
                  <Icon3
                    name="dots-three-horizontal"
                    size={20}
                    style={{marginLeft: 'auto'}}
                  />
                </Pressable>
              );
            }}>
            {item?.creator?.id == user?.id && (
              <Menu.Item onPress={() => handleDeletePost(item)}>
                <Text style={{color: 'red', fontWeight: '600'}}>
                  Delete Post
                </Text>
              </Menu.Item>
            )}
          </Menu>
        </TouchableOpacity>
      </View>
      {/* Post description */}
      <Text
        style={{
          marginTop: 10,
          fontSize: 17,
          marginHorizontal: 22,
          color: Colors.black,
        }}>
        {item?.description}
      </Text>
      <View>
        {item?.uploads.length > 1 && (
          <View style={styles.countOverlay}>
            <Text style={styles.countText}>
              {visibleItems + 1}/{item?.uploads?.length}
            </Text>
          </View>
        )}
        <FlatList
          data={item?.uploads}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View style={styles.postImagesContainer}>
              {item.image && (
                <FastImage source={{uri: item.image}} style={styles.PostPic} />
              )}

              {item.postVideo && (
                <VideoPlayer
                  source={{uri: item.postVideo}}
                  style={{width: 300, height: 300, borderRadius: 15}}
                  controls={false}
                  paused={true}
                />
              )}
            </View>
          )}
          showsHorizontalScrollIndicator={false}
          horizontal
          pagingEnabled
          onScroll={event => handleScroll(event)}
          onMomentumScrollEnd={event => handleScroll(event)}
        />
      </View>

      {/* Emojis */}
      <View
        style={{
          flexDirection: 'row',
          marginTop: 10,
          borderBottomWidth: 1,
          borderColor: Colors.mediumGrayColor,
        }}>
        <TouchableOpacity
          onPress={() => handleEmojiClick({id: 1}, item)}
          style={styles.thumbEmojiContainer}>
          {item?.my_like ? (
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 16,
                paddingHorizontal: 12,
              }}>
              {emojis.find(e => e.id == item?.likeEmoji)?.emoji}
            </Text>
          ) : (
            <Icon1
              name="like2"
              size={22}
              color={Colors.black}
              style={{paddingHorizontal: 12}}
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={{top: 9}}
          onPress={() => navigation.navigate('comments', {post: item})}>
          <Icon2
            name="comment"
            size={30}
            color={Colors.black}
            style={{paddingHorizontal: 12}}
          />
        </TouchableOpacity>
        {emojis.map((emoji, emojiIndex) => {
          return (
            <TouchableOpacity
              key={emojiIndex}
              onPress={() => handleEmojiClick(emoji, item)}
              style={{
                alignSelf: 'flex-end',
                left: 60,
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 16,
                  paddingHorizontal: 12,
                }}>
                {emoji.emoji}
              </Text>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 16,
                  paddingHorizontal: 15,
                }}>
                {emoji.count}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {item.latest_comments.map((comment, commentIndex) => (
        <View
          key={commentIndex}
          style={{
            width: '100%',
            paddingHorizontal: 12,
            paddingVertical: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderRadius: 12,
            margin: 12,
            alignSelf: 'center',
            borderColor: Colors.mediumGrayColor,
            borderBottomWidth: 1,
          }}>
          {/* Commenter's avatar or placeholder */}
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}>
            {comment.user?.pic ? (
              <FastImage
                source={{uri: comment.user?.pic}}
                style={{height: 30, width: 30, borderRadius: 15}}
              />
            ) : (
              <View style={{...styles.Namecontainer}}>
                <View
                  style={{
                    ...styles.usernameContainer,
                    width: 35,
                    height: 35,
                  }}>
                  <Text style={styles.username}>
                    {comment.user?.name?.charAt(0).toUpperCase()}
                  </Text>
                </View>
              </View>
            )}

            {/* Commenter's name and comment */}
            <View
              style={{
                flexDirection: 'column',
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                  width: 150,
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    color: Colors.black,
                    bottom: 8,
                    fontWeight: '700',
                  }}>
                  {comment.user?.name
                    ? comment.user?.name
                    : comment.user?.lastName}
                </Text>
                <Text
                  style={{
                    display: 'flex',
                    color: Colors.black,
                    bottom: 8,
                    left: 10,
                  }}>
                  {time}
                </Text>
              </View>
              <Text style={{color: Colors.black, left: 12, bottom: 8}}>
                {comment.comment}
              </Text>
            </View>
          </View>
        </View>
      ))}
      <TouchableOpacity
        onPress={() => navigation.navigate('comments', {post: item})}>
        <Text
          style={{
            fontSize: 15,
            marginVertical: 12,
            color: Colors.black,
          }}>
          View All Comments
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserPost;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 5,
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
    fontSize: 14,
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
    // paddingHorizontal: 12,
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
  },
  iconStyle: {
    bottom: 5,
    marginHorizontal: 12,
    right: 12,
  },
  // PostPic
  PostPic: {
    width: 310,
    height: 400,
    borderRadius: 20,
    alignSelf: 'center',
    marginVertical: 12,
  },
  thumbEmojiContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  postImagesContainer: {
    marginRight: 10,
  },
  countContainer: {
    bottom: 0,
    right: 0,
    padding: 5,
    borderRadius: 5,
  },
  countText: {
    color: Colors.black,
  },

  countOverlay: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    zIndex: 1,
  },
  countText: {
    color: Colors.whiteColor,
    fontWeight: '700',
  },
});
