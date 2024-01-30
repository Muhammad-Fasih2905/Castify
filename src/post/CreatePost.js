import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  useColorScheme,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Modal from 'react-native-modal';
import Video from 'react-native-video';
import ImagePicker from 'react-native-image-crop-picker';
import VideoPlayer from 'react-native-video-controls';

import postbg from '../../assets/postbg.jpeg';

import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/Feather';
import Icon3 from 'react-native-vector-icons/Octicons';
import Icon4 from 'react-native-vector-icons/FontAwesome';

import {Colors, themeGreen, themePink} from '../../constants/Colors';

import {useRoute} from '@react-navigation/native';
import {apiPostCreatePostRequest} from '../Redux/action/post';
import {useSelector, useDispatch} from 'react-redux';

import Toast from 'react-native-toast-message';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CreatePost = ({navigation}) => {
  const [postData, setPostData] = useState({
    description: '',
  });
  const [pic, setPic] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  const [video, setVideo] = useState([]);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);

  let flatListRef;

  const scrollViewRef = useRef(null);

  const {token, user} = useSelector(state => state.auth);

  // const gender = user?.gender;
  // const themeChange = gender ? 'Male' : 'Female';
  const themeChange = useColorScheme() === 'Male' ? 'Male' : 'female';

  const dispatch = useDispatch();
  const route = useRoute();

  const {isLoading} = useSelector(state => state.post);

  useEffect(() => {
    if (route?.params?.pic) {
      setPic(prev => [...prev, route?.params?.pic]);
    }

    return () => {
      setPostData([]);
      setPic([]);
      setVideo([]);
    };
  }, [route?.params]);

  const handlePost = () => {
    const creatorId = user?.id;
    let newPostData = {
      ...postData,
      creator: creatorId,
    };

    if (pic.length) {
      newPostData = {
        ...newPostData,
        uploaded_images: pic,
      };
    }
    if (video.length) {
      newPostData = {
        ...newPostData,
        uploaded_videos: video,
      };
    }
    dispatch(apiPostCreatePostRequest(token, newPostData));
    navigation.goBack();
    setPostData({
      description: '',
    });
    setPic([]);
    setVideo([]);
  };

  const handleChange = (key, value) => {
    setPostData(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  function onCloseModal() {
    setModalShow(false);
  }

  const getFirstLetter = () => {
    if (user && user?.email && user?.email.length > 0) {
      return user?.email.charAt(0).toUpperCase();
    }
    // Return a default value (e.g., '?' or any character you like) if the username is not available
    return '';
  };

  const handleDeletePic = index => {
    const updatedPics = pic.filter((_, i) => i !== index);
    setPic(updatedPics);
  };

  const ChoosePic = () => {
    ImagePicker.openPicker({
      multiple: true,
      cropping: true,
      includeBase64: false,
    })
      .then(images => {
        setPic(prev => [
          ...prev,
          ...images.map((image, index) => ({
            uri: image.path,
            type: image.mime,
            name: `image${index + 1}.jpg`,
          })),
        ]);
      })
      .catch(error => {});
    setModalShow(false);
  };

  // Photos render Item
  const renderPicture = ({item, index}) => (
    <View style={styles.pictureContainer}>
      <Image source={{uri: item.uri}} style={styles.picture} />
      <TouchableOpacity
        onPress={() => handleDeletePic(index)}
        style={styles.deleteButton}>
        <Icon name="closecircleo" size={20} color={Colors.whiteColor} />
      </TouchableOpacity>
    </View>
  );
  const pickVideoFromGallery = () => {
    ImagePicker.openPicker({
      mediaType: 'video',
      compressVideoPreset: 'HighestQuality',
      compressVideo: true,
      quality: 1,
    })
      .then(selectedVideo => {
        if (selectedVideo && selectedVideo.path) {
          const videoDuration = selectedVideo.duration;

          // Check if the selected video duration is less than or equal to 10 seconds
          if (videoDuration > 10) {
            const newVideo = {
              uri: selectedVideo.path,
              type: selectedVideo.mime,
              name: 'video.mp4',
            };

            // Add the new video to the existing videos array
            setVideo(prevVideos => [...prevVideos, newVideo]);
          } else {
            Toast.show({
              type: 'error',
              text1: 'Selected video is too long (more than 10 seconds)',
            });
          }
        }
      })
      .catch(error => {
        // Handle any errors that occur during video selection
        console.error('Error selecting video:', error);
      });
    setModalShow(false);
  };

  const handleDeleteVideo = index => {
    const updatedVideos = [...video];
    updatedVideos.splice(index, 1);
    setVideo(updatedVideos);
    setSelectedVideoIndex(0);
  };

  const Camera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        if (image && image.path) {
          const newPic = {
            uri: image.path,
            type: image.mime,
            name: 'image.jpg',
          };
          setPic(prevPics => [...prevPics, newPic]);
        }
      })
      .catch(error => {});
    setModalShow(false);
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <Image source={postbg} style={styles.backgroundImage} />
      <View style={{...styles.Newheader}}>
        <View flex={0.2}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="left" size={20} color={Colors.whiteColor} />
          </TouchableOpacity>
        </View>
        <Text flex={1} style={{fontSize: 18, color: Colors.whiteColor}}>
          Create Post
        </Text>
        <View flex={0.2} />
      </View>
      <View style={styles.mainViewPost}>
        <View
          style={{display: 'flex', flexDirection: 'row', marginHorizontal: 12}}>
          {user?.pic_url ? (
            <Image
              source={{uri: user?.pic_url}}
              style={{
                ...styles.picture,
                width: 45,
                height: 45,
                borderRadius: 30,
              }}
            />
          ) : (
            <View style={styles.container}>
              <View style={styles.usernameContainer}>
                <Text style={styles.username}>{getFirstLetter()}</Text>
              </View>
            </View>
          )}
          <Text style={styles.UserNameText}>
            {user?.name || user?.username}
          </Text>
        </View>
        <TextInput
          style={{...styles.textInput}}
          multiline
          placeholder="Write your post here..."
          value={postData.description}
          onChangeText={e => handleChange('description', e)}
        />
        {/* ............New Images ADD Function Code..................*/}

        {pic.length > 0 && (
          <View
            style={{
              width: '100%',
              borderTopColor: Colors.mediumGrayColor,
              borderTopWidth: 1,
            }}>
            {pic.length > 0 && (
              <Text style={styles.selectedText}>Selected Pictures</Text>
            )}
            <View style={styles.Arrowcontainer}>
              {pic.length > 0 && (
                <TouchableOpacity
                  onPress={() => flatListRef.scrollToIndex({index: 0})}
                  style={styles.arrowButton}>
                  <Icon4 name="arrow-left" size={30} color={Colors.green} />
                </TouchableOpacity>
              )}
              <FlatList
                data={pic}
                renderItem={renderPicture}
                ref={ref => (flatListRef = ref)}
                keyExtractor={(item, index) => index.toString()}
                // numColumns={3}
                contentContainerStyle={styles.gallery}
                showsHorizontalScrollIndicator={false}
                horizontal
              />
              {pic.length > 0 && (
                <TouchableOpacity
                  onPress={() => flatListRef.scrollToEnd()}
                  style={styles.arrowButton}>
                  <Icon4 name="arrow-right" size={30} color={Colors.green} />
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}

        {video.length > 0 && (
          <View
            style={{
              width: '100%',
              borderTopColor: Colors.mediumGrayColor,
              borderTopWidth: 1,
            }}>
            <Text style={{fontSize: 15, fontWeight: '700', top: 5, left: 5}}>
              Selected Videos
            </Text>
            <View style={styles.Arrowcontainer}>
              <ScrollView
                ref={scrollViewRef}
                showsHorizontalScrollIndicator={false}
                horizontal
                contentContainerStyle={{paddingHorizontal: 10}}>
                <TouchableOpacity
                  style={{...styles.arrowButton, top: 63}}
                  onPress={() => {
                    scrollViewRef.current.scrollTo({x: 0, animated: true});
                  }}>
                  <Icon4 name="arrow-left" size={24} color={Colors.green} />
                </TouchableOpacity>
                {video.map((video, index) => (
                  <View key={index} style={{marginRight: 10}}>
                    <VideoPlayer
                      source={{uri: video.uri}}
                      style={{
                        width: 150,
                        height: 150,
                        borderRadius: 20,
                        top: 12,
                      }}
                      controls={false}
                    />
                    <TouchableOpacity
                      onPress={() => handleDeleteVideo(index)}
                      style={styles.deleteVideoButton}>
                      <Icon
                        name="closecircleo"
                        size={20}
                        color={Colors.whiteColor}
                      />
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
              <TouchableOpacity
                style={{...styles.arrowButton}}
                onPress={() => {
                  scrollViewRef.current.scrollToEnd({animated: true});
                }}>
                <Icon4 name="arrow-right" size={24} color={Colors.green} />
              </TouchableOpacity>
            </View>
            {pic.length > 0 ? null : (
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => setModalShow(true)}>
                <Icon name="pluscircleo" size={30} color={Colors.green} />
                <Text style={{...styles.addText, top: 6, right: 5}}>
                  Add More
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        <View
          style={{
            ...styles.Picscontainer,
          }}>
          {pic.length > 0 && (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setModalShow(true)}>
              <Icon name="pluscircleo" size={30} color={Colors.green} />
              <Text style={styles.addText}>Add More</Text>
            </TouchableOpacity>
          )}
        </View>
        {pic.length === 0 && video.length === 0 && (
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
            <TouchableOpacity
              style={styles.PhotoAndVideoView}
              onPress={pickVideoFromGallery}>
              <Icon3
                name="video"
                size={28}
                color={'green'}
                style={styles.iconStyle}
              />
              <Text style={styles.Text}>Video</Text>
            </TouchableOpacity>
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
        )}

        <TouchableOpacity
          onPress={handlePost}
          style={[
            styles.btnSubmit,
            {
              backgroundColor:
                themeChange === 'Male'
                  ? themeGreen.greenThemeColor
                  : themePink.pinkThemeColor,
            },
          ]}
          disabled={!postData?.description}>
          <Text style={styles.txtSubmit}>Post</Text>
        </TouchableOpacity>
      </View>
      {/* ..............Pic Modal............... */}
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
          <TouchableOpacity
            style={styles.PhotoAndVideoView}
            onPress={pickVideoFromGallery}>
            <Icon3
              name="video"
              size={28}
              color={'green'}
              style={styles.iconStyle}
            />
            <Text style={styles.Text}>Video</Text>
          </TouchableOpacity>
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
    </ScrollView>
  );
};

export default CreatePost;

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
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Add opacity to the white card
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  textInput: {
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

  // Username Work
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
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  username: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // Username Pic
  picture: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    borderRadius: 20,
  },
  // UsernameTExt
  UserNameText: {
    fontSize: 15,
    color: Colors.black,
    fontWeight: '600',
    alignSelf: 'center',
    paddingHorizontal: 12,
  },
  // PhotoAndVideoView
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
  TablePicAndCameraView: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
  },
  // PostPic csss
  PostPic: {
    width: 300,
    height: 400,
    borderRadius: 20,
    alignSelf: 'center',
  },
  // ADDED Pics CSSS
  Picscontainer: {
    // padding: 20,
    alignItems: 'center',
  },

  gallery: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  pictureContainer: {
    position: 'relative',
    margin: 4,
    top: 5,
  },
  picture: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  deleteButton: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: Colors.redColor,
    borderRadius: 15,
    padding: 2,
  },
  addButton: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 35,
  },
  addText: {
    marginLeft: 10,
    fontSize: 16,
    color: Colors.green,
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
  // Arrow container Css
  Arrowcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedText: {
    fontSize: 15,
    fontWeight: '700',
    top: 5,
    left: 5,
    marginBottom: 12,
  },
  arrowButton: {
    paddingHorizontal: 10,
  },

  // Video CSS
  videoContainer: {
    width: windowWidth,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  video: {
    width: windowWidth,
    height: windowHeight * 0.6,
  },
  deleteVideoButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  arrowButton: {
    paddingHorizontal: 10,
    opacity: 0.5,
  },
});
