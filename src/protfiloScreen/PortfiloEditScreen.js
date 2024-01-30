import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  Alert,
  useColorScheme,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {Colors, themePink} from '../../constants/Colors';

import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon5 from 'react-native-vector-icons/Entypo';

import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  api_patch_portfilo_request,
  api_portfilo_request,
} from '../Redux/action/portfilo';
import FastImage from 'react-native-fast-image';
import VideoPlayer from 'react-native-video-controls';
import ImagePicker from 'react-native-image-crop-picker';

const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');
const PortfiloEditScreen = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {get_portfilo, isPortfilo, portfilo_loading} = useSelector(
    state => state.portfilo,
  );
  const portfilo = get_portfilo || {};
  const {token, user} = useSelector(state => state.auth);
  const [selectedImages, setSelectedImages] = useState([null, null, null]);
  const [video, setVideo] = useState({});

  const [state, setState] = useState({});

  const themeChange = useColorScheme() === 'Male' ? 'Male' : 'female';
  const {item, coverPic, setCoverPic, profile_pic, setProfile_Pic} =
    route?.params || {};

  const handleEdit = () => {
    const PortfiloId = get_portfilo?.id;
    const hasNonNullImages = selectedImages.some(image => image !== null);
    let newPostData = {
      ...state,
    };
    if (Object.keys(coverPic).length > 0) {
      newPostData.coverPic = coverPic;
    }

    if (Object.keys(profile_pic).length > 0) {
      newPostData.profile_pic = profile_pic;
    }

    for (const key in newPostData) {
      if (newPostData[key] === '') {
        delete newPostData[key];
      }
    }

    if (hasNonNullImages) {
      newPostData = {
        ...newPostData,
        uploaded_images: selectedImages.filter(image => image !== null), // Remove null values
      };
    } else {
      delete newPostData.uploaded_images;
    }
    if (Object.keys(video).length) {
      newPostData = {
        ...newPostData,
        portfolioVideo: video,
      };
    }
    dispatch(api_patch_portfilo_request(token, newPostData, PortfiloId));
    navigation.navigate('ProtfiloScreen', {item: item});
    setState({});
    // setCoverPic({});
    setVideo({});
    // setProfile_Pic({});
  };

  const CreatePortfilo = () => {
    const creatorId = user?.id;
    const hasNonNullImages = selectedImages.some(image => image !== null);
    let newPostData = {
      ...state,
      user: creatorId,
    };
    if (Object.keys(coverPic).length > 0) {
      newPostData.coverPic = coverPic;
    }

    if (Object.keys(profile_pic).length > 0) {
      newPostData.profile_pic = profile_pic;
    }

    for (const key in newPostData) {
      if (newPostData[key] === '') {
        delete newPostData[key];
      }
    }

    if (hasNonNullImages) {
      newPostData = {
        ...newPostData,
        uploaded_images: selectedImages.filter(image => image !== null), // Remove null values
      };
    } else {
      delete newPostData.uploaded_images;
    }
    if (Object.keys(video).length) {
      newPostData = {
        ...newPostData,
        portfolioVideo: video,
      };
    }

    dispatch(api_portfilo_request(token, newPostData));
    navigation.navigate('ProtfiloScreen', {item: item});
    setSelectedImages([]);
    setVideo([]);
    setCoverPic([]);
    setProfile_Pic([]);
  };

  const handleChange = (key, value) => {
    setState(prev => ({...prev, [key]: value}));
  };

  const goBackHandler = () => {
    const discardMessage = portfilo?.id ? 'Edit Portfolio' : 'Create Portfolio';

    Alert.alert(
      'Alert',
      `Are you sure you want to discard the ${discardMessage}?`,
      [
        {
          text: 'Cancel',
          onPress: () => {
            navigation.navigate('ProtfiloScreen', {item: item});
            setState({});
          },
          style: 'cancel',
        },
        {
          text: 'Save',
          onPress: () => {
            if (portfilo?.id) {
              handleEdit();
            } else {
              CreatePortfilo();
            }
          },
        },
      ],
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        goBackHandler();
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  // Head SHots ADD
  const choosePic = () => {
    ImagePicker.openPicker({
      cropping: true,
      includeBase64: false,
    })
      .then(image => {
        // Find the first available slot in selectedImages to insert the image
        const firstEmptyIndex = selectedImages.findIndex(img => img === null);

        if (firstEmptyIndex !== -1) {
          const updatedImages = [...selectedImages];
          updatedImages[firstEmptyIndex] = {
            uri: image.path,
            type: image.mime,
            name: `image${firstEmptyIndex + 1}.jpg`,
          };

          setSelectedImages(updatedImages);
        }
      })
      .catch(error => {});
  };

  const deletePic = circleIndex => {
    // Create a copy of the selectedImages array and clear the selected image at the specified index
    const updatedImages = [...selectedImages];
    updatedImages[circleIndex] = null;
    setSelectedImages(updatedImages);
  };
  const pickVideoFromGallery = () => {
    ImagePicker.openPicker({
      mediaType: 'video',
      compressVideoPreset: 'HighestQuality',
      compressVideo: true,
      quality: 1,
    })
      .then(selectedVideo => {
        setVideo({
          uri: selectedVideo.path,
          type: selectedVideo.mime,
          name: 'video.mp4',
        });
      })
      .catch(error => {});
  };

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      showsVerticalScrollIndicator={false}
      flex={1}>
      {/* Header */}
      <View style={{...styles.Newheader}}>
        <View flex={0.2}>
          <TouchableOpacity onPress={goBackHandler}>
            <Icon2 name="left" size={20} color={Colors.black} />
          </TouchableOpacity>
        </View>
        <Text flex={1} style={{fontSize: 18, color: Colors.black}}>
          Portfilo Edit Screen
        </Text>
        <View flex={0.2} />
      </View>
      <View style={{flex: 1, flexDirection: 'column', marginVertical: 13}}>
        <View
          style={{
            flex: 1,
            marginVertical: 32,
            flexDirection: 'column',
            justifyContent: 'space-around',
            top: 15,
          }}>
          <Text
            style={{
              fontSize: 15,
              paddingHorizontal: 25,
              color: Colors.black,
              fontWeight: '600',
              top: 10,
            }}>
            Name
          </Text>
          <TextInput
            defaultValue={
              state?.portfolio_name
                ? state?.portfolio_name
                : portfilo.portfolio_name
            }
            onChangeText={e => handleChange('portfolio_name', e)}
            style={{
              width: '84%',
              height: 47,
              marginHorizontal: 25,
              top: 10,
              borderWidth: 1,
              borderColor: Colors.grayColor,
              marginVertical: 12,
              borderRadius: 7,
            }}
            placeholderTextColor={Colors.whiteColor}
          />

          <Text
            style={{
              fontSize: 15,
              paddingHorizontal: 25,
              color: Colors.black,
              fontWeight: '600',
              top: 10,
            }}>
            Category
          </Text>
          <TextInput
            defaultValue={
              state?.category ? state?.category : portfilo?.category
            }
            onChangeText={e => handleChange('category', e)}
            style={{
              width: '84%',
              height: 47,
              marginHorizontal: 25,
              top: 10,
              borderWidth: 1,
              borderColor: Colors.grayColor,
              marginVertical: 12,
              borderRadius: 7,
            }}
            placeholderTextColor={Colors.whiteColor}
          />

          <Text
            style={{
              fontSize: 15,
              paddingHorizontal: 25,
              color: Colors.black,
              fontWeight: '600',
              top: 10,
            }}>
            Address
          </Text>
          <TextInput
            defaultValue={state?.address ? state?.address : portfilo?.address}
            onChangeText={e => handleChange('address', e)}
            style={{
              width: '84%',
              height: 47,
              marginHorizontal: 25,
              top: 10,
              borderWidth: 1,
              borderColor: Colors.grayColor,
              marginVertical: 12,
              borderRadius: 7,
            }}
            placeholderTextColor={Colors.whiteColor}
          />
          <Text
            style={{
              fontSize: 15,
              paddingHorizontal: 25,
              color: Colors.black,
              fontWeight: '600',
              top: 10,
            }}>
            Height
          </Text>
          <TextInput
            keyboardType="numeric"
            defaultValue={state.height ? state.height : portfilo?.height}
            onChangeText={e => handleChange('height', e)}
            style={{
              width: '84%',
              height: 47,
              marginHorizontal: 25,
              top: 10,
              borderWidth: 1,
              borderColor: Colors.grayColor,
              marginVertical: 12,
              borderRadius: 7,
            }}
          />
          <Text
            style={{
              fontSize: 15,
              paddingHorizontal: 25,
              color: Colors.black,
              fontWeight: '600',
              top: 10,
            }}>
            Hair Color
          </Text>
          <TextInput
            defaultValue={
              state?.hairColor ? state?.hairColor : portfilo?.hairColor
            }
            onChangeText={e => handleChange('hairColor', e)}
            style={{
              width: '84%',
              height: 47,
              marginHorizontal: 25,
              top: 10,
              borderWidth: 1,
              borderColor: Colors.grayColor,
              marginVertical: 12,
              borderRadius: 7,
            }}
          />
          <Text
            style={{
              fontSize: 15,
              paddingHorizontal: 25,
              color: Colors.black,
              fontWeight: '600',
              top: 10,
            }}>
            Eyes Color
          </Text>
          <TextInput
            defaultValue={
              state?.eyesColor ? state?.eyesColor : portfilo?.eyesColor
            }
            onChangeText={e => handleChange('eyesColor', e)}
            style={{
              width: '84%',
              height: 47,
              marginHorizontal: 25,
              top: 10,
              borderWidth: 1,
              borderColor: Colors.grayColor,
              marginVertical: 12,
              borderRadius: 7,
            }}
          />
          <Text
            style={{
              fontSize: 15,
              paddingHorizontal: 25,
              color: Colors.black,
              fontWeight: '600',
              top: 10,
            }}>
            Waist
          </Text>
          <TextInput
            keyboardType="numeric"
            defaultValue={state?.waist ? state?.waist : portfilo?.waist}
            onChangeText={e => handleChange('waist', e)}
            style={{
              width: '84%',
              height: 47,
              marginHorizontal: 25,
              top: 10,
              borderWidth: 1,
              borderColor: Colors.grayColor,
              marginVertical: 12,
              borderRadius: 7,
            }}
          />
          <Text
            style={{
              fontSize: 15,
              paddingHorizontal: 25,
              color: Colors.black,
              fontWeight: '600',
              top: 10,
            }}>
            Weight
          </Text>
          <TextInput
            keyboardType="numeric"
            defaultValue={state?.weight ? state?.weight : portfilo?.weight}
            onChangeText={e => handleChange('weight', e)}
            style={{
              width: '84%',
              height: 47,
              marginHorizontal: 25,
              top: 10,
              borderWidth: 1,
              borderColor: Colors.grayColor,
              marginVertical: 12,
              borderRadius: 7,
            }}
          />
          <Text
            style={{
              fontSize: 15,
              paddingHorizontal: 25,
              color: Colors.black,
              fontWeight: '600',
              top: 10,
            }}>
            Body Type
          </Text>
          <TextInput
            defaultValue={
              state?.bodyType ? state?.bodyType : portfilo?.bodyType
            }
            onChangeText={e => handleChange('bodyType', e)}
            style={{
              width: '84%',
              height: 47,
              marginHorizontal: 25,
              top: 10,
              borderWidth: 1,
              borderColor: Colors.grayColor,
              marginVertical: 12,
              borderRadius: 7,
            }}
          />
          <Text
            style={{
              fontSize: 15,
              paddingHorizontal: 25,
              color: Colors.black,
              fontWeight: '600',
              top: 10,
            }}>
            Skills
          </Text>
          <TextInput
            defaultValue={state?.skills ? state?.skills : portfilo?.skills}
            onChangeText={e => handleChange('skills', e)}
            style={{
              width: '84%',
              height: 47,
              marginHorizontal: 25,
              top: 10,
              borderWidth: 1,
              borderColor: Colors.grayColor,
              marginVertical: 12,
              borderRadius: 7,
            }}
          />
          <Text
            style={{
              fontSize: 15,
              paddingHorizontal: 25,
              color: Colors.black,
              fontWeight: '600',
              top: 10,
            }}>
            Experiences
          </Text>
          <TextInput
            defaultValue={
              state?.pastExperiences
                ? state?.pastExperiences
                : portfilo?.pastExperiences
            }
            onChangeText={e => handleChange('pastExperiences', e)}
            style={{
              width: '84%',
              height: 47,
              marginHorizontal: 25,
              top: 10,
              borderWidth: 1,
              borderColor: Colors.grayColor,
              marginVertical: 12,
              borderRadius: 7,
            }}
          />
          <Text
            style={{
              fontSize: 15,
              paddingHorizontal: 25,
              color: Colors.black,
              fontWeight: '600',
            }}>
            About me
          </Text>
          <View style={{...styles.inputWidth, height: 120}}>
            <TextInput
              defaultValue={
                state?.description ? state?.description : portfilo?.description
              }
              onChangeText={e => handleChange('description', e)}
              style={{
                paddingHorizontal: 12,
                width: '100%',
                paddingBottom: 66,
              }}
            />
          </View>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          {Array.from({length: 3}).map((_, circleIndex) => (
            <TouchableOpacity
              key={circleIndex}
              style={styles.HeadShotsImageCircle}
              onPress={() => {
                if (!selectedImages[circleIndex]) {
                  // Allow choosing an image only if selectedImages[circleIndex] is falsy
                  choosePic();
                }
              }}>
              {selectedImages[circleIndex] ? (
                <View>
                  <Image
                    source={{uri: selectedImages[circleIndex].uri}}
                    style={styles.picture}
                  />
                  <TouchableOpacity
                    onPress={() => deletePic(circleIndex)}
                    style={styles.deleteButton}>
                    <Icon2
                      name="closecircleo"
                      size={20}
                      color={Colors.whiteColor}
                    />
                  </TouchableOpacity>
                </View>
              ) : portfilo?.gallery && portfilo?.gallery[circleIndex] ? (
                <Image
                  source={{uri: portfilo.gallery[circleIndex].image}}
                  style={styles.picture}
                />
              ) : (
                <Icon5 name="images" color={Colors.whiteColor} size={27} />
              )}
            </TouchableOpacity>
          ))}
        </View>
        <View style={{alignSelf: 'center', flex: 1, marginVertical: 20}}>
          <TouchableOpacity
            style={styles.IntroVideoCircle}
            // onPress={() => {
            //   if (user.role !== 1) {
            //     pickVideoFromGallery();
            //   }
            // }}
            onPress={pickVideoFromGallery}>
            {video && video.uri ? (
              <View style={styles.Arrowcontainer}>
                <VideoPlayer
                  source={{uri: video.uri}}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                  }}
                  controls={false}
                />
                <TouchableOpacity
                  onPress={() => setVideo(null)}
                  style={styles.deleteVideoButton}>
                  <Icon2
                    name="closecircleo"
                    size={20}
                    color={Colors.whiteColor}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <Icon2
                name="caretright"
                size={27}
                color={themePink.pinkThemeColor}
              />
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={portfilo?.id ? handleEdit : CreatePortfilo}
          style={[
            styles.CancelbtnModal,
            themeChange === 'Male' && allow
              ? {backgroundColor: themeGreen.greenThemeColor}
              : {backgroundColor: themePink.pinkThemeColor},
          ]}>
          {portfilo_loading ? (
            <ActivityIndicator size="large" color={Colors.whiteColor} />
          ) : (
            <Text style={styles.txtSubmit}>
              {portfilo?.id ? 'Edit Portfolio' : 'Create Portfolio'}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default PortfiloEditScreen;

const styles = StyleSheet.create({
  CancelbtnModal: {
    alignItems: 'center',
    backgroundColor: themePink.pinkThemeColor,
    marginHorizontal: 12,
    height: 40,
    borderRadius: 13,
    bottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
    marginVertical: 32,
  },
  Newheader: {
    width: '100%',
    paddingHorizontal: 20,
    position: 'absolute',
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  inputWidth: {
    display: 'flex',
    flexDirection: 'row',
    width: 300,
    height: 70,
    marginHorizontal: 22,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.grayColor,
    marginVertical: 12,
  },
  txtSubmit: {
    color: Colors.whiteColor,
    fontSize: 15,
    top: 8,
  },
  HeadShotsImageCircle: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderRadius: 55,
    borderColor: Colors.grayColor,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themePink.pinkThemeColor,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
  },
  IntroVideoCircle: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderRadius: 55,
    borderColor: Colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.whiteColor,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
    top: 22,
  },
  Arrowcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  videoContainer: {
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  video: {
    width: width,
    height: height * 0.6,
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
  deleteButton: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: Colors.redColor,
    borderRadius: 15,
    padding: 2,
  },
  picture: {
    width: 98,
    height: 98,
    borderRadius: 50,
  },
});
