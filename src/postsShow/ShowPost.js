import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  useColorScheme,
  TouchableOpacity,
  Image,
  FlatList,
  RefreshControl,
  ScrollView,
} from 'react-native';
import {Avatar} from 'native-base';

import postbg from '../../assets/postbg.jpeg';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Entypo';
import {Colors} from '../../constants/Colors';

import {useDispatch, useSelector} from 'react-redux';
import {
  apiGetPostsRequest,
  apiPostLikePostRequest,
  apiDeleteLikePostRequest,
  apiGetFollowerGetUserPostRequest,
  apiGetCommentsPostRequest,
} from '../Redux/action/post';

const ShowPost = ({navigation}) => {
  const initialEmojis = [
    {emoji: '😃', count: 0},
    {emoji: '❤️', count: 0},
    {emoji: '👍', count: 0},
  ];

  const [emojis, setEmojis] = useState(initialEmojis);
  const [refreshing, setRefreshing] = useState(false);

  const {allPosts} = useSelector(state => state.post);
  const {token, user} = useSelector(state => state.auth);
  const {comments} = useSelector(state => state.post);

  const filteredPosts = allPosts.filter(post => post?.creator?.id !== user.id);
  const topTwoComments = comments.slice(0, 2);

  const dispatch = useDispatch();

  const handleEmojiClick = (index, item) => {
    setEmojis(prevEmojis => {
      const updatedEmojis = prevEmojis.map((emoji, i) => {
        if (i === index) {
          // Check if the user has already liked the post
          if (emoji.liked) {
            // If already liked, trigger unlike functionality and delete the like from the API data
            const data = {
              postId: item.id,
              likeId: emoji.likeId, // Assuming 'likeId' is the ID of the like in the API data
            };
            dispatch(apiDeleteLikePostRequest(data, token));
            return {
              ...emoji,
              count: emoji.count - 1,
              liked: false,
              likeId: null,
            }; // Set 'likeId' to null to indicate that the like has been deleted
          } else {
            // If not liked, trigger like functionality
            return {...emoji, count: emoji.count + 1, liked: true};
          }
        }
        return emoji;
      });

      // Create a new data object with the updated emojis count
      const data = {
        post: item.id,
        user: user.id,
        likeEmoji: updatedEmojis.map(emoji => ({
          emoji: emoji.emoji,
          count: emoji.count,
          likeId: emoji.likeId, // Include 'likeId' for all emojis in the updatedEmojis array
        })),
        likes_count: item?.likes_count + (updatedEmojis[index].liked ? 1 : 0), // Increment the like count if liked, otherwise keep it unchanged
      };

      // Dispatch the API request to update the like and emojis count
      dispatch(apiPostLikePostRequest(token, data));

      // Return the updated emojis array
      return updatedEmojis;
    });
  };
  useEffect(() => {
    dispatch(apiGetPostsRequest(token));
    dispatch(apiGetCommentsPostRequest(token, allPosts?.id));
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      dispatch(apiGetPostsRequest(token));
      dispatch(apiGetCommentsPostRequest(token, allPosts?.id));

      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View flex={1}>
      <Image source={postbg} style={styles.backgroundImage} />
      <View style={{...styles.Newheader}}>
        <View flex={0.2}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="left" size={20} color={Colors.black} />
          </TouchableOpacity>
        </View>
        <Text flex={1} style={{fontSize: 18, color: Colors.whiteColor}}>
          Show Post
        </Text>
        <View flex={0.2} />
      </View>
      <View style={styles.mainViewPost}>
        <FlatList
          data={filteredPosts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => {
            const timestamp = item?.created; // Assuming 'created' is the timestamp field in your item object
            const date = new Date(timestamp);
            const time = date.toLocaleString('en-US', {
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
            });
            return (
              <View
                style={{
                  backgroundColor: Colors.whiteColor,
                  borderRadius: 10,
                  padding: 10,
                  marginBottom: 10,
                  marginVertical: 15,
                }}>
                {/* User info and post day row */}
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Avatar
                    style={{marginHorizontal: 12}}
                    source={{
                      uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
                    }}></Avatar>
                  <View>
                    <Text style={{fontWeight: 'bold'}}>
                      {item?.creator?.username}
                    </Text>
                    <Text>{time}</Text>
                  </View>
                  <Icon1
                    name="dots-three-horizontal"
                    size={20}
                    style={{marginLeft: 'auto'}}
                  />
                </View>

                {/* Post description */}
                <Text style={{marginTop: 10, fontSize: 17}}>
                  {item.description}
                </Text>

                {/* Emojis */}
                <View style={{flexDirection: 'row', marginTop: 10}}>
                  {emojis.map((emoji, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleEmojiClick(index, item)}>
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
                  ))}
                </View>

                {/* Comments */}
                <FlatList
                  data={topTwoComments}
                  renderItem={({item}) => (
                    <View
                      style={{
                        width: '100%',
                        height: 60,
                        paddingHorizontal: 12,
                        paddingVertical: 9,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        backgroundColor: '#EFF1F3',
                        borderRadius: 12,
                        margin: 12,
                        alignSelf: 'center',
                      }}>
                      <View style={{display: 'flex', flexDirection: 'row'}}>
                        <Avatar
                          style={{marginHorizontal: 12}}
                          source={{
                            uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
                          }}></Avatar>

                        <View
                          style={{display: 'flex', flexDirection: 'column'}}>
                          <Text style={{fontSize: 15}}>
                            {item?.user?.username}
                          </Text>
                          <Text>{item?.comment}</Text>
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
                          }}>
                          {time}
                        </Text>
                      </View>
                    </View>
                  )}
                  showsVerticalScrollIndicator={false}
                />

                <TouchableOpacity
                  onPress={() => navigation.navigate('comments', {post: item})}>
                  <Text
                    style={{
                      fontSize: 15,
                      marginVertical: 12,
                    }}>
                    View All Comments
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </View>
  );
};

export default ShowPost;

const styles = StyleSheet.create({
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
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
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.mediumGrayColor,
    padding: 10,
    marginBottom: 16,
    color: Colors.black, // Set text color for the input
    marginVertical: 44,
  },
  btnSubmit: {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    height: 50,
    width: 300,
    borderRadius: 22,
    marginVertical: 33,
  },
  txtSubmit: {
    color: Colors.whiteColor,
    fontSize: 15,
  },
  Newheader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
});
