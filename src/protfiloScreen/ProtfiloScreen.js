import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  useColorScheme,
  Dimensions,
  Image,
  Alert,
  Button,
  TouchableWithoutFeedback,
} from 'react-native';
import Modal from 'react-native-modal';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import FastImage from 'react-native-fast-image';
import ImagePicker from 'react-native-image-crop-picker';

import {DataTable} from 'react-native-paper';
import VideoPlayer from 'react-native-video-controls';

import {useFocusEffect, useNavigation} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

import {useDispatch, useSelector} from 'react-redux';
import {
  api_get_portfilo_request,
  api_portfilo_Delete_Like_request,
  api_portfilo_Like_request,
  api_portfilo_request,
  api_rating_portfilo_request,
} from '../Redux/action/portfilo';
import usePortfilo from './usePortfilo';

import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/FontAwesome';
import Icon4 from 'react-native-vector-icons/FontAwesome5';
import Icon5 from 'react-native-vector-icons/Entypo';
import Icon7 from 'react-native-vector-icons/Octicons';
import Icon8 from 'react-native-vector-icons/Feather';

import {Colors, themeGreen, themePink} from '../../constants/Colors';
import {apiPatchProfileRequest} from '../Redux/action/auth';
import useNotificationHook from '../utils/NotificationHook';

const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');

const ProtfiloScreen = ({route}) => {
  const themeChange = useColorScheme() === 'Male' ? 'Male' : 'female';

  const dispatch = useDispatch();
  const {myRating, setMyRating, postRating, patchRating, updateViewCount} =
    usePortfilo();

  const {item} = route?.params || {};

  const [modalShow, setModalShow] = useState(false);
  const [coverPic, setCoverPic] = useState({});
  const [profile_pic, setProfile_Pic] = useState({});
  const [isPortfolioCreated, setIsPortfolioCreated] = useState(false);
  const [modalShow1, setModalShow1] = useState(false);
  const [portfiloModal, setPortfiloModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  // profile selected
  const [selectedProfile, setselectedProfile] = useState(null);
  const [profileModal, setprofileModal] = useState(false);
  //cover Image selected
  const [coverPicModal, setcoverPicModal] = useState(false);
  const [coverImage, setCoverImage] = useState(null);
  const [Like, setLike] = useState(false);

  const navigation = useNavigation();

  const {token, user} = useSelector(state => state.auth);
  const {get_portfilo} = useSelector(state => state.portfilo);
  const {handleUpdateNotificationCount} = useNotificationHook();

  let userId = null;
  let username = null;

  if (user && user?.role === '2') {
    userId = user.id;
    username = user.username;
  }
  const idToSend = item?.id || userId !== user?.id;

  const getFirstLetter = () => {
    if (username === user?.username) {
      return username?.charAt(0).toUpperCase();
    } else if (item && item?.email && item?.email.length > 0) {
      return item?.email.charAt(0).toUpperCase();
    }
    return '';
  };

  function onCloseModal() {
    setModalShow(false);
  }
  function onCloseModal1() {
    setModalShow1(false);
  }

  function onClosePortfiloModal() {
    setPortfiloModal(false);
  }

  const openModal = imageIndex => {
    setSelectedImage(get_portfilo?.gallery[imageIndex]?.image);
    setModalVisible(true);
  };

  const openProfileModal = imageIndex => {
    setselectedProfile(
      imageIndex !== null
        ? get_portfilo?.gallery[imageIndex]?.image
        : profile_pic.uri || item?.pic || get_portfilo?.user?.pic,
    );
    setprofileModal(true);
    setModalShow1(false);
  };

  const openCoverPicModal = (imageIndex, isCoverPic) => {
    // When a user clicks on a profile picture, gallery image, or cover picture,
    // set the selected image URL accordingly
    setCoverImage(
      imageIndex !== null
        ? get_portfilo?.gallery[imageIndex]?.image
        : isCoverPic
        ? get_portfilo?.coverPic || coverPic?.uri
        : profile_pic.uri || item?.pic || get_portfilo?.user?.pic,
    );
    setcoverPicModal(true);
  };

  const ChoosePic = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: false,
    })
      .then(image => {
        if (image && image.path) {
          setCoverPic({
            uri: image.path,
            type: image.mime,
            name: 'image.jpg',
          });
        }
      })
      .catch(error => {});
    setModalShow(false);
  };

  const ProfileChoosePic = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: false,
    })
      .then(image => {
        if (image && image.path) {
          setProfile_Pic({
            uri: image.path,
            type: image.mime,
            name: 'image.jpg',
          });
        }
      })
      .catch(error => {});
    setModalShow1(false);
  };

  const Camera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        if (image && image.path) {
          setCoverPic({
            uri: image.path,
            type: image.mime,
            name: 'image.jpg',
          });
        }
      })
      .catch(error => {});
    setModalShow(false);
  };

  const ProfileCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        if (image && image.path) {
          setProfile_Pic({
            uri: image.path,
            type: image.mime,
            name: 'image.jpg',
          });
        }
      })
      .catch(error => {});
    setModalShow1(false);
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(api_get_portfilo_request(token, idToSend));
    }, [get_portfilo]),
  );

  useEffect(() => {
    if (get_portfilo?.my_like) {
      setLike(true);
    } else {
      setLike(false);
    }

    if (get_portfilo?.ratings?.length) {
      const newRatingCount = get_portfilo?.ratings[0] || null;
      setMyRating(newRatingCount);
    }
    const viewData = {
      user: user?.id,
      view: get_portfilo?.id,
    };
    updateViewCount(viewData);
  }, [get_portfilo]);

  //Cover pic modal function

  const coverPicOpen = () => {
    setcoverPicModal(true);
    setModalShow(false);
  };

  const handleNavigateEditScreen = () => {
    if (user.role !== '1') {
      navigation.navigate('PortfiloEditScreen', {
        item,
        coverPic,
        setCoverPic,
        profile_pic,
        setProfile_Pic,
      });
    }
  };
  // console.log('portfilo ==>', );

  const handleLikePost = portfilo => {
    const result = portfilo?.my_like;
    console.log('portfilo ==>', portfilo);
    if (result === false) {
      let data = {
        portfolio: portfilo?.id,
        user: user.id,
        likeEmoji: '1',
      };
      dispatch(api_portfilo_Like_request(token, data));
      setLike(true);

      if (portfilo?.user?.id !== user?.id) {
        handleUpdateNotificationCount(portfilo?.user?.id);
      }
    } else {
      dispatch(api_portfilo_Delete_Like_request(token, get_portfilo?.id));
      setLike(false);
    }
  };

  const handleStarPress = starIndex => {
    // Patch
    if (myRating && Object.keys(myRating)?.length) {
      const newRating = starIndex + 0;
      const ratingData = {
        rating: newRating,
      };
      patchRating(ratingData, myRating?.id);
    } else {
      // POst
      const newRating = starIndex + 0;
      const ratingData = {
        rating: newRating,
        portfolio: get_portfilo?.id,
        user: user?.id,
      };
      postRating(ratingData);
    }
  };

  const renderStars = () => {
    const rating = Math.round(get_portfilo?.average_rating || 0);

    return (
      <Icon3 name="star" size={15} color={rating >= 1 ? 'gold' : 'gray'} />
    );
  };

  // console.log('get_portfilo gallery get ==>', get_portfilo);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1}}
      style={{flex: 1}}>
      {/* Top Header */}
      {get_portfilo?.coverPic || coverPic?.uri ? (
        <FastImage
          source={{
            uri: get_portfilo?.coverPic || coverPic?.uri,
          }}
          style={{
            width: width,
            height: 350,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.8,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      ) : (
        <View
          style={{
            width: width,
            height: 350,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.8,
            backgroundColor: Colors.mediumGrayColor,
          }}
        />
      )}
      <Animatable.View
        animation="fadeIn"
        delay={1000}
        style={{width: width, flex: 1}}>
        {/* Header */}
        <View style={styles.Newheader}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon2 name="left" size={25} color={Colors.grayColor} />
          </TouchableOpacity>
          {user.role === '1' ? (
            <TouchableOpacity onPress={() => setcoverPicModal(true)}>
              <Icon3 name="pencil-square" size={25} color={Colors.grayColor} />
            </TouchableOpacity>
          ) : user.role === '2' ? (
            <TouchableOpacity onPress={() => setModalShow(true)}>
              <Icon3 name="pencil-square" size={25} color={Colors.grayColor} />
            </TouchableOpacity>
          ) : null}
        </View>

        {/* User Information */}
        <View style={{flex: 1, alignSelf: 'center', top: 20, zIndex: 1}}>
          <TouchableOpacity
            onPress={() => {
              if (user.role === '1') {
                setModalShow1(false);
              } else {
                setModalShow1(true);
              }
            }}>
            {get_portfilo?.user?.pic ||
            profile_pic?.uri ||
            item?.pic ||
            get_portfilo?.profile_pic ? (
              <TouchableOpacity onPress={() => setModalShow1(true)}>
                <Image
                  source={{
                    uri:
                      profile_pic.uri ||
                      item?.pic ||
                      get_portfilo?.user?.pic ||
                      get_portfilo?.profile_pic,
                  }}
                  style={styles.ProfilePicture}
                />
              </TouchableOpacity>
            ) : (
              <View style={styles.container}>
                <View style={styles.usernameContainer}>
                  <Text style={styles.username}>{getFirstLetter()}</Text>
                </View>
              </View>
            )}
          </TouchableOpacity>
          <View
            style={{
              alignSelf: 'center',
              justifyContent: 'center',
              top: 14,
              width: 300,
              height: 280,
            }}>
            <Text
              style={{
                color: Colors.grayColor,
                fontSize: 14,
                textAlign: 'center',
                fontWeight: '800',
              }}>
              {get_portfilo?.category || item?.category}
            </Text>
            <Text
              style={{
                color: Colors.grayColor,
                fontSize: 15,
                textAlign: 'center',
                fontWeight: '800',
              }}>
              {get_portfilo?.portfolio_name || item?.username}
            </Text>
            <Text
              style={{
                color: Colors.grayColor,
                fontSize: 15,
                fontWeight: '800',
                textAlign: 'center',
              }}>
              {get_portfilo?.address || item?.address}
            </Text>
            <View style={{flexDirection: 'row', alignSelf: 'center'}}>
              {get_portfilo?.average_rating != null ? (
                <>
                  <Icon3 name="star" size={15} color="gold" />
                  <Text style={{color: Colors.grayColor, marginLeft: 5}}>
                    {get_portfilo?.average_rating.toFixed(2)}
                  </Text>
                </>
              ) : (
                <Text style={{color: Colors.grayColor}}>0</Text>
              )}
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              height: 200,
              justifyContent: 'space-evenly',
            }}>
            {user.role === '1' ? (
              <TouchableOpacity onPress={() => handleLikePost(get_portfilo)}>
                {Like ? (
                  <Icon2
                    name="like1"
                    color={themePink.pinkThemeColor}
                    size={27}
                    style={{left: 5, bottom: 3}}
                  />
                ) : (
                  <Icon8
                    name="thumbs-up"
                    size={27}
                    style={{left: 5, bottom: 3}}
                  />
                )}
              </TouchableOpacity>
            ) : (
              <Icon2
                name="like1"
                color={themePink.pinkThemeColor}
                size={27}
                style={{left: 5, bottom: 3}}
              />
            )}
            <Text
              style={{
                color: Colors.grayColor,
                fontSize: 15,
                top: 3,
                fontWeight: '800',
              }}>
              {get_portfilo?.likes_count || 0}
            </Text>
            <Icon2 name="eye" color={themePink.pinkThemeColor} size={27} />
            <Text
              style={{
                color: Colors.grayColor,
                fontSize: 15,
                top: 4,
                fontWeight: '800',
              }}>
              {get_portfilo?.viewsCount || 0}
            </Text>
            {user?.role === '1' ? (
              <>
                {[1, 2, 3, 4, 5].map(starIndex => (
                  <TouchableOpacity
                    key={starIndex}
                    onPress={() => handleStarPress(starIndex)}>
                    <Icon3
                      name={starIndex <= myRating?.rating ? 'star' : 'star-o'}
                      size={22}
                      color={starIndex <= myRating?.rating ? 'yellow' : 'gray'}
                    />
                  </TouchableOpacity>
                ))}
              </>
            ) : (
              <>
                {[1, 2, 3, 4, 5].map(starIndex => (
                  <TouchableOpacity key={starIndex}>
                    <Icon3
                      name={starIndex <= myRating?.rating ? 'star' : 'star-o'}
                      size={22}
                      color={starIndex <= myRating?.rating ? 'yellow' : 'gray'}
                    />
                  </TouchableOpacity>
                ))}
              </>
            )}
          </View>
        </View>
      </Animatable.View>

      <Animatable.View
        animation="fadeIn"
        delay={1000}
        style={{width: width, flex: 1, bottom: 122}}>
        <TouchableOpacity
          style={[
            styles.btnSubmit,

            themeChange === 'Male' && allow
              ? {backgroundColor: themeGreen.greenThemeColor}
              : {backgroundColor: themePink.pinkThemeColor},
          ]}>
          <Icon4
            name="crown"
            size={17}
            color={Colors.YellowColor}
            style={{right: 6, bottom: 1}}
          />
          <Text style={styles.txtSubmit}>Get Premium</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            top: 17,
          }}>
          {user.role === '1' ? null : (
            <>
              <View
                style={{
                  flex: 1,
                  borderTopColor: Colors.grayColor,
                  borderTopWidth: 1,
                }}
              />
              <TouchableOpacity
                onPress={handleNavigateEditScreen}
                style={{
                  justifyContent: 'flex-end',
                  alignSelf: 'flex-end',
                  marginVertical: 12,
                  marginHorizontal: 15,
                }}>
                <Icon3
                  name="pencil-square"
                  size={28}
                  color={Colors.grayColor}
                />
              </TouchableOpacity>
            </>
          )}
          <Text
            style={{
              fontSize: 15,
              paddingHorizontal: 25,
              color: Colors.black,
              fontWeight: '600',
            }}>
            About me
          </Text>
          <TouchableOpacity style={{...styles.inputWidth, height: 120}}>
            <Text
              style={{
                color: Colors.black,
                fontWeight: '600',
                paddingHorizontal: 12,
                paddingVertical: 10,
              }}>
              {get_portfilo?.description || item?.biography}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            top: 37,
          }}>
          <Text
            style={{
              fontSize: 15,
              paddingHorizontal: 25,
              color: Colors.black,
              fontWeight: '600',
            }}>
            Head-shots
          </Text>

          {/* Condition Work for Role !== 1  */}
          {/* ==========================OLd WOrk==================== */}
          {/* <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
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
                ) : get_portfilo &&
                  get_portfilo[0]?.gallery &&
                  get_portfilo &&
                  get_portfilo[0]?.gallery[circleIndex] ? (
                  <Image
                    source={{uri: get_portfilo[0].gallery[circleIndex].image}}
                    style={styles.picture}
                  />
                ) : (
                  <Icon5 name="images" color={Colors.whiteColor} size={27} />
                )}
              </TouchableOpacity>
            ))}
          </View> */}
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            {get_portfilo?.gallery?.length === 0 || !get_portfilo?.gallery ? (
              <>
                <TouchableOpacity
                  style={styles.HeadShotsImageCircle}
                  onPress={() => setModalVisible(true)}>
                  <Icon5 name="images" color={Colors.whiteColor} size={27} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.HeadShotsImageCircle}
                  onPress={() => setModalVisible(true)}>
                  <Icon5 name="images" color={Colors.whiteColor} size={27} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.HeadShotsImageCircle}
                  onPress={() => setModalVisible(true)}>
                  <Icon5 name="images" color={Colors.whiteColor} size={27} />
                </TouchableOpacity>
              </>
            ) : (
              get_portfilo?.gallery?.map((galleryArray, outerIndex) => (
                <TouchableOpacity
                  key={outerIndex}
                  style={styles.HeadShotsImageCircle}
                  onPress={() => openModal(outerIndex)}>
                  <Image
                    source={{uri: galleryArray.image}}
                    style={styles.picture}
                  />
                </TouchableOpacity>
              ))
            )}
          </View>
        </View>

        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            top: 47,
          }}>
          <Text
            style={{
              fontSize: 15,
              paddingHorizontal: 25,
              color: Colors.black,
              fontWeight: '600',
            }}>
            Intro video
          </Text>
          <View
            style={{
              alignSelf: 'center',
              width: '100%',
              alignItems: 'center',
            }}>
            <View
              style={{
                borderTopColor: Colors.grayColor,
                borderTopWidth: 1,
                width: '80%',
                marginHorizontal: 45,
              }}
            />
            {get_portfilo?.portfolioVideo ? (
              <TouchableOpacity style={styles.IntroVideoCircle}>
                <View style={styles.Arrowcontainer}>
                  <VideoPlayer
                    source={{
                      uri: get_portfilo?.portfolioVideo,
                    }}
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 50,
                    }}
                    controls={false}
                  />
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.IntroVideoCircle}>
                <Icon2
                  name="caretright"
                  size={27}
                  color={themePink.pinkThemeColor}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Animatable.View>

      <View style={styles.datialButton}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>
              <Text
                style={{
                  color: Colors.whiteColor,
                  fontSize: 14,
                  fontWeight: '700',
                }}>
                User Details
              </Text>
            </DataTable.Title>
            <DataTable.Title style={{left: 2}}>
              {user.role !== 1 ? null : (
                <TouchableOpacity>
                  <Icon3
                    name="pencil-square-o"
                    size={25}
                    color={Colors.whiteColor}
                  />
                </TouchableOpacity>
              )}
            </DataTable.Title>
          </DataTable.Header>
          <DataTable.Row>
            <DataTable.Cell>
              <Text
                style={{
                  fontWeight: '700',
                  color: Colors.whiteColor,
                }}>
                Height
              </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={{color: Colors.whiteColor}}>
                {get_portfilo?.height || item?.height}
              </Text>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>
              <Text style={{fontWeight: '700', color: Colors.whiteColor}}>
                Hair Color
              </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={{color: Colors.whiteColor}}>
                {get_portfilo?.hairColor}
              </Text>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>
              <Text style={{fontWeight: '700', color: Colors.whiteColor}}>
                Eyes Color
              </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={{color: Colors.whiteColor}}>
                {get_portfilo?.eyesColor}
              </Text>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>
              <Text style={{fontWeight: '700', color: Colors.whiteColor}}>
                Waist
              </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={{color: Colors.whiteColor}}>
                {get_portfilo?.waist}
              </Text>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>
              <Text style={{fontWeight: '700', color: Colors.whiteColor}}>
                Weight
              </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={{color: Colors.whiteColor}}>
                {get_portfilo?.weight}
              </Text>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>
              <Text style={{fontWeight: '700', color: Colors.whiteColor}}>
                Body Type
              </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={{color: Colors.whiteColor}}>
                {get_portfilo?.bodyType || item?.body_size}
              </Text>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>
              <Text style={{fontWeight: '700', color: Colors.whiteColor}}>
                Skills
              </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={{color: Colors.whiteColor}}>
                {get_portfilo?.skills}
              </Text>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>
              <Text style={{fontWeight: '700', color: Colors.whiteColor}}>
                Experiences
              </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={{color: Colors.whiteColor}}>
                {get_portfilo?.pastExperiences || item?.model_time}
              </Text>
            </DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </View>

      {/* <TouchableOpacity
        onPress={isPortfolioCreated ? PortfiloEdit : CreatePortfilo}
        style={[
          styles.Editbtn,
          themeChange === 'Male' && allow
            ? {backgroundColor: themeGreen.greenThemeColor}
            : {backgroundColor: themePink.pinkThemeColor},
        ]}>
        <Text style={styles.txtSubmit}>
          {isPortfolioCreated ? 'Edit Portfolio' : 'Create Portfolio'}
        </Text>
      </TouchableOpacity> */}

      {/* ================================Cover pic Modal ================================ */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={coverPicModal}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          {get_portfilo?.coverPic ? (
            <Image
              source={{uri: get_portfilo?.coverPic}}
              style={styles.zoomedImage}
            />
          ) : (
            <Text
              style={{
                color: Colors.whiteColor,
                fontSize: 14,
                fontWeight: '600',
              }}>
              No Cover Pic
            </Text>
          )}
          <TouchableOpacity
            onPress={() => setcoverPicModal(false)}
            style={styles.closeButton}>
            <Icon4 name="times-circle" color={Colors.whiteColor} size={30} />
          </TouchableOpacity>
        </View>
      </Modal>

      {/* ..............Back Profile Modal............... */}
      <Modal
        isVisible={modalShow}
        animationIn={'slideInUp'}
        animationInTiming={1500}
        animationOut="slideOutDown"
        animationOutTiming={1500}
        onBackButtonPress={onCloseModal}
        onBackdropPress={onCloseModal}
        style={styles.backgroundCoverModal}>
        <View style={{flex: 1, flexDirection: 'column', paddingVertical: 30}}>
          {user?.role === '1' ? null : (
            <>
              <TouchableOpacity onPress={Camera}>
                <View style={styles.ModalView}>
                  <Icon2 name="camera" size={25} color={Colors.green} />
                  <Text
                    style={{
                      paddingHorizontal: 12,
                      fontSize: 15,
                      fontWeight: '600',
                      top: 1,
                    }}>
                    Select Camera Photo
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={ChoosePic}>
                <View style={{...styles.ModalView, paddingTop: 20}}>
                  <Icon5 name="images" size={25} color={Colors.green} />
                  <Text
                    style={{
                      paddingHorizontal: 12,
                      fontSize: 15,
                      fontWeight: '600',
                    }}>
                    Select Library Photo
                  </Text>
                </View>
              </TouchableOpacity>
            </>
          )}

          <TouchableOpacity onPress={coverPicOpen}>
            <View style={{...styles.ModalView, paddingTop: 20}}>
              <Icon4 name="images" size={25} color={Colors.green} />
              <Text
                style={{
                  paddingHorizontal: 12,
                  fontSize: 15,
                  fontWeight: '600',
                }}>
                See Full Cover Pic
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onCloseModal}
            style={{...styles.CancelbtnModal, marginTop: 30}}>
            <Text style={{paddingTop: 8, color: Colors.whiteColor}}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {/* ..............Profile Modal............... */}
      <Modal
        isVisible={modalShow1}
        animationIn={'slideInUp'}
        animationInTiming={1500}
        animationOut="slideOutDown"
        animationOutTiming={1500}
        onBackButtonPress={onCloseModal1}
        onBackdropPress={onCloseModal1}
        style={styles.backgroundModal}>
        <View style={{flex: 1, flexDirection: 'column', paddingVertical: 30}}>
          {user?.role === '1' ? null : (
            <>
              <TouchableOpacity onPress={ProfileCamera}>
                <View style={styles.ModalView}>
                  <Icon2 name="camera" size={25} color={Colors.green} />
                  <Text
                    style={{
                      paddingHorizontal: 12,
                      fontSize: 15,
                      fontWeight: '600',
                      top: 1,
                    }}>
                    Select Camera Photo
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={ProfileChoosePic}>
                <View style={{...styles.ModalView, paddingTop: 20}}>
                  <Icon5 name="images" size={25} color={Colors.green} />
                  <Text
                    style={{
                      paddingHorizontal: 12,
                      fontSize: 15,
                      fontWeight: '600',
                    }}>
                    Select Library Photo
                  </Text>
                </View>
              </TouchableOpacity>
            </>
          )}
          <TouchableOpacity onPress={() => openProfileModal(null)}>
            <View style={{...styles.ModalView, paddingTop: 20}}>
              <Icon4 name="images" size={25} color={Colors.green} />
              <Text
                style={{
                  paddingHorizontal: 12,
                  fontSize: 15,
                  fontWeight: '600',
                }}>
                See Full Profile Pic
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onCloseModal1}
            style={{...styles.CancelbtnModal, top: 10}}>
            <Text style={{paddingTop: 8, color: Colors.whiteColor}}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {/* ...............................Profile Pic Modal............................... */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={profileModal}
        onRequestClose={() => setprofileModal(false)}>
        <View style={styles.modalContainer}>
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
            onPress={() => setprofileModal(false)}
            style={styles.closeButton}>
            <Icon4 name="times-circle" color={Colors.whiteColor} size={30} />
          </TouchableOpacity>
        </View>
      </Modal>
      {/* ....................................HeadShotPic........................... */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          {selectedImage ? (
            <Image source={{uri: selectedImage}} style={styles.zoomedImage} />
          ) : (
            <Text
              style={{
                color: Colors.whiteColor,
                fontSize: 14,
                fontWeight: '600',
              }}>
              No HeadShots
            </Text>
          )}
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={{...styles.closeButton}}>
            <Icon4 name="times-circle" color={Colors.whiteColor} size={30} />
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default ProtfiloScreen;

const styles = StyleSheet.create({
  // circle Zoom PIc show
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 20,
  },
  zoomedImage: {
    width: 300,
    height: 650,
    borderRadius: 25,
  },
  closeButton: {
    position: 'absolute',
    top: 9,
    right: 20,
  },
  Newheader: {
    width: '100%',
    paddingHorizontal: 20,
    position: 'absolute',
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ProfilePicture: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: Colors.grayColor,
    position: 'absolute',
    zIndex: 2,
    top: 22,
  },

  container: {
    display: 'flex',
    alignSelf: 'center',
    position: 'absolute',
    zIndex: 2,
    top: 22,
  },
  usernameContainer: {
    bottom: 0,
    right: 0,
    backgroundColor: Colors.profileColor,
    borderRadius: 60,
    padding: 5,
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  username: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  //   input Wdith

  inputWidth: {
    display: 'flex',
    flexDirection: 'row',
    width: 300,
    height: 70,
    marginHorizontal: 22,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.grayColor,
  },
  inputHead: {
    color: Colors.black,
    fontSize: 13,
    fontWeight: '700',
    left: 24,
    top: 9,
  },
  inputView: {
    borderWidth: 1,
    borderBottomColor: Colors.grayColor,
    marginBottom: 16,
    borderStyle: 'solid',
    borderColor: Colors.grayColor,
    borderRadius: 20,
    top: 12,
    width: '86%',
    left: 12,
  },
  input: {
    height: 50,
    color: Colors.black,
    fontSize: 14,
    left: 12,
  },
  //   Gender Radio Button
  radioButton: {
    height: 20,
    width: 20,
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginRight: 20,
    marginLeft: 12,
    top: 12,
    padding: 9,
  },
  radioButtonIcon: {
    height: 14,
    width: 14,
    borderRadius: 7,
    backgroundColor: '#98CFB6',
  },
  radioButtonText: {
    fontSize: 16,
    marginLeft: 16,
  },

  //   Protfilo button
  btnSubmit: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    width: '75%',
    height: 50,
    borderRadius: 22,
    marginTop: 22,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
  },
  txtSubmit: {
    color: Colors.whiteColor,
    fontSize: 15,
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
  //   datialButton
  datialButton: {
    flexDirection: 'row',
    // justifyContent: 'center',
    backgroundColor: themePink.pinkThemeColor,
    width: '90%',
    // height: '30%',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
    marginVertical: 20,
    marginHorizontal: 20,
    bottom: 20,
  },
  // Edit Data Button
  Editbtn: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    width: '65%',
    height: 50,
    borderRadius: 22,
    marginTop: 22,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
    bottom: 43,
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
  //   PIc and Video Show
  TablePicAndCameraView: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
  },
  Text: {
    color: Colors.black,
    fontSize: 14,
    fontWeight: '600',
    paddingHorizontal: 10,
    top: 5,
  },
  Picscontainer: {
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
    width: 98,
    height: 98,
    borderRadius: 50,
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
  deleteButton: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: Colors.redColor,
    borderRadius: 15,
    padding: 2,
  },
  //   Modal CSS
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
  // Modal Css

  backgroundModal: {
    width: wp(95),
    height: hp(40),
    backgroundColor: Colors.whiteThemeColor,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
  },
  backgroundCoverModal: {
    width: wp(95),
    height: hp(40),
    backgroundColor: Colors.whiteThemeColor,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
  },

  PortfiloModal: {
    width: wp(95),
    height: hp(100),
    backgroundColor: Colors.whiteThemeColor,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
  },

  ModalView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1.5,
    borderBottomColor: Colors.Lightestgrey,
    paddingHorizontal: 30,
    paddingVertical: 12,
  },
  CancelbtnModal: {
    alignItems: 'center',
    marginTop: 16,
    backgroundColor: themePink.pinkThemeColor,
    marginHorizontal: 12,
    height: 38,
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
  },
});
