import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  RefreshControl,
  TouchableOpacity,
  View,
  useColorScheme,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {BackHandler} from 'react-native';
import axios from 'axios';

import Modal from 'react-native-modal';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Entypo';
import Icon4 from 'react-native-vector-icons/FontAwesome5';
import DatePicker from 'react-native-date-picker';
import ImagePicker from 'react-native-image-crop-picker';
import moment from 'moment';

import NewHeader from '../../components/newHeader/NewHeader';
import {Colors, themeGreen, themePink} from '../../constants/Colors';
import {
  ImageZoomModal,
  CommentsModal,
} from '../../components/imageZoom/ImageZoom';

import {
  apiPatchProfileRequest,
  apiGetProfileRequest,
  apiImagesProfileRequest,
} from '../Redux/action/auth';
import {useDispatch, useSelector} from 'react-redux';

const EditProfile = ({navigation}) => {
  const [open, setOpen] = useState(false);
  const [allow, setAllow] = useState(false);
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const [refreshing, setRefreshing] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [profileImages, setProfileImages] = useState({
    image: [],
  });
  const [profileModal, setprofileModal] = useState(false);
  // const [showFullImage, setShowFullImage] = useState()
  // const [showComments, setShowComments] = useState({
  //   isVisible: false
  // })

  const themeChange = useColorScheme() === 'Male' ? 'Male' : 'female';

  const dispatch = useDispatch();

  const {token, personal_profile, profileUsernameUpdateError, user} =
    useSelector(state => state.auth);

  const [editProfile, SetEditprofile] = useState({
    name: personal_profile?.name || '',
    username: personal_profile?.username || '',
    biography: personal_profile?.biography || '',
    dateOfBirth: personal_profile?.dateOfBirth || '',
    pic: personal_profile?.pic || null,
    price: personal_profile?.price || '',
  });

  const handleChange = (key, value) => {
    SetEditprofile(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const EditProfile = async () => {
    try {
      if (profileImages.image.length > 0) {
        // Create an array of promises for the API requests
        const apiRequests = profileImages.image.map(image => {
          const data = {
            user: user.id,
            image: image,
          };
          return dispatch(apiImagesProfileRequest(data, token));
          // return ApiCall(data);
        });

        // Wait for all API requests to complete
        await Promise.all(apiRequests);

        // After all API requests are complete, clear the profileImages state
        setProfileImages({image: []});

        // Then, dispatch the apiPatchProfileRequest
        dispatch(apiPatchProfileRequest(editProfile, token));

        // Finally, navigate back
        navigation.goBack();
      } else {
        // If there are no images to upload, just dispatch the apiPatchProfileRequest
        await dispatch(apiPatchProfileRequest(editProfile, token));

        // Finally, navigate back
        navigation.goBack();
      }
    } catch (error) {
      // Handle any errors here
      console.error('Error:', error);
    }
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
      setRefreshing(false);
    }, 2000);
  }, []);

  // Choose a Image
  const ChoosePic = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: false,
    })
      .then(image => {
        if (image && image.path) {
          SetEditprofile(prevProfile => ({
            ...prevProfile,
            pic: {
              uri: image.path,
              type: image.mime,
              name: 'image.jpg',
            },
          }));
        }
      })
      .catch(error => {});
    setModalShow(false);
  };

  const ChooseTalentPic = () => {
    ImagePicker.openPicker({
      multiple: true,
      cropping: true,
      includeBase64: false,
    })
      .then(images => {
        if (Array.isArray(images) && images.length > 0) {
          const updatedPics = [
            ...profileImages.image,
            ...images.map(image => ({
              uri: image.path,
              type: image.mime,
              name: 'image.jpg',
            })),
          ];

          setProfileImages({image: updatedPics}); // Update the state with the new image array
        } else {
        }
      })
      .catch(error => {
        // Handle error
      });
  };

  const handleDeletePic = index => {
    const updatedPics = [...profileImages.image];
    updatedPics.splice(index, 1);
    setProfileImages({image: updatedPics}); // Update the state with the new image array
  };

  function onCloseModal() {
    setModalShow(false);
  }

  const handleCloseModal = () => {
    setprofileModal(false);
    setModalShow(false);
  };

  const showZoomingProfile = () => {
    setModalShow(false);
    setprofileModal(true);
  };

  // UseEffects

  useEffect(() => {
    dispatch(apiGetProfileRequest(token));
  }, []);

  useEffect(() => {
    const isEditProfileFilled =
      editProfile?.name !== personal_profile?.name ||
      editProfile?.username !== personal_profile?.username ||
      editProfile?.dateOfBirth !== personal_profile?.dateOfBirth ||
      editProfile?.pic ||
      editProfile?.biography !== personal_profile?.biography;

    if (isEditProfileFilled) {
      setAllow(true);
    } else {
      setAllow(false);
    }

    return () => {
      dispatch({type: 'CLEAR_ERROR'});
    };
  }, [editProfile]);

  // const handleDeletePic = index => {
  //   const updatedPics = [...profileImages.image]; // Create a copy of the pics array
  //   updatedPics.splice(index, 1); // Remove the image at the specified index
  //   SetEditprofile(prevProfile => ({...prevProfile, image: updatedPics}));
  // };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <NewHeader title="Edit Profile" navigation={navigation} />
      <TouchableOpacity onPress={() => setModalShow(true)}>
        {personal_profile?.pic || editProfile?.pic ? (
          <Image
            source={{
              uri: editProfile?.pic?.uri || personal_profile?.pic,
            }}
            style={{
              width: 70,
              height: 70,
              borderRadius: 50,
              alignSelf: 'center',
            }}
          />
        ) : (
          <View style={styles.container}>
            <View style={styles.usernameContainer}>
              <Text style={styles.username}>{getFirstLetter()}</Text>
            </View>
          </View>
        )}

        <Text style={{textAlign: 'center', top: 15, fontSize: 16}}>
          Profile picture
        </Text>
      </TouchableOpacity>
      {/* ..........Name Field................. */}
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          marginTop: 20,
        }}>
        <Text
          style={{fontSize: 15, paddingHorizontal: 22, color: Colors.black}}>
          Name
        </Text>
        <View style={styles.inputWidth}>
          <TextInput
            placeholder="Enter Your Name"
            defaultValue={personal_profile?.name || editProfile?.name}
            style={{paddingHorizontal: 12}}
            onChangeText={e => handleChange('name', e)}
          />
        </View>
      </View>
      {/* .................Username Field............... */}
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          marginTop: 20,
        }}>
        <Text
          style={{fontSize: 15, paddingHorizontal: 22, color: Colors.black}}>
          Username
        </Text>
        <View style={styles.inputWidth}>
          <TextInput
            placeholder="Enter Your Username"
            defaultValue={personal_profile?.username || editProfile?.username}
            style={{paddingHorizontal: 12}}
            onChangeText={e => handleChange('username', e)}
            autoCorrect={false}
            autoCapitalize="none"
            textContentType="none"
          />
        </View>
        {profileUsernameUpdateError ? (
          <Text
            style={{
              color: Colors.redColor,
              marginTop: 5,
              paddingHorizontal: 27,
            }}>
            {profileUsernameUpdateError}
          </Text>
        ) : null}
      </View>
      {/* ...........Bio................. */}
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          marginTop: 20,
        }}>
        <Text
          style={{fontSize: 15, paddingHorizontal: 22, color: Colors.black}}>
          Bio
        </Text>
        <View style={{...styles.inputWidth, height: 120}}>
          <TextInput
            placeholder="Say something about yourself"
            defaultValue={personal_profile?.biography || editProfile?.biography}
            style={{paddingHorizontal: 12, bottom: 40}}
            onChangeText={e => handleChange('biography', e)}
            multiline
          />
        </View>
      </View>
      {/* ...................Birthday.............. */}
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          marginTop: 20,
        }}>
        <Text
          style={{fontSize: 15, paddingHorizontal: 22, color: Colors.black}}>
          Birthday
        </Text>
        <TouchableOpacity onPress={() => setOpen(true)}>
          <View style={{...styles.inputWidth, justifyContent: 'space-between'}}>
            <Text style={styles.dateText}>
              {personal_profile?.dateOfBirth || editProfile?.dateOfBirth || (
                <Icon1
                  name="calendar"
                  size={23}
                  color={Colors.darkGrayColor}
                  style={{top: 20, paddingHorizontal: 12}}
                />
              )}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {user.role === '2' ? (
        <>
          {/* .................Price Field............... */}
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              marginTop: 20,
              bottom: 10,
            }}>
            <Text
              style={{
                fontSize: 15,
                paddingHorizontal: 22,
                color: Colors.black,
              }}>
              Your Price
            </Text>
            <View style={styles.inputWidth}>
              <TextInput
                placeholder="Enter Your Price"
                defaultValue={editProfile?.price}
                style={{paddingHorizontal: 12}}
                onChangeText={e => handleChange('price', e)}
              />
            </View>
          </View>
          {profileImages?.image.length > 0 ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{flexGrow: 1, flexDirection: 'row'}}>
              {profileImages?.image.map((pic, index) => (
                <>
                  <Image
                    key={index}
                    source={{uri: pic.uri}}
                    style={{
                      backgroundColor: 'red',
                      width: 200,
                      height: 200,
                      marginHorizontal: 25,
                      // top: 5,
                      borderRadius: 20,
                    }}
                  />
                  <TouchableOpacity onPress={() => handleDeletePic(index)}>
                    <Icon2
                      name="cross"
                      size={28}
                      color={Colors.mediumGrayColor}
                      style={{
                        display: 'flex',
                        alignSelf: 'flex-end',
                        right: 15,
                        bottom: 7,
                        top: 2,
                      }}
                    />
                  </TouchableOpacity>
                </>
              ))}
              {profileImages.image.length < 5 && (
                <TouchableOpacity
                  style={{
                    ...styles.PhotoAndVideoView,
                    flexDirection: 'column',
                    borderBottomWidth: 0,
                    top: 66,
                  }}
                  onPress={ChooseTalentPic}>
                  <Icon2
                    name="plus"
                    size={28}
                    color={'green'}
                    style={{left: 12}}
                  />
                  <Text
                    style={{...styles.PicText, paddingHorizontal: 0, right: 8}}>
                    Add More
                  </Text>
                </TouchableOpacity>
              )}
            </ScrollView>
          ) : (
            <View style={styles.TablePicAndCameraView}>
              <TouchableOpacity
                style={styles.PhotoAndVideoView}
                onPress={ChooseTalentPic}>
                <Icon2
                  name="images"
                  size={28}
                  color={'green'}
                  style={styles.iconStyle}
                />
                <Text style={styles.PicText}>Photo</Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      ) : null}

      {/* .............Date Of Birth Modal............... */}

      <DatePicker
        modal
        open={open}
        date={moment(date, 'YYYY-MM').toDate()}
        mode="date"
        format="YYYY-MM-DD"
        onConfirm={selectedDate => {
          const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
          setDate(formattedDate);
          setOpen(false);
          SetEditprofile(prevProfileData => ({
            ...prevProfileData,
            dateOfBirth: formattedDate,
          }));
        }}
        onCancel={() => setOpen(false)}
      />
      {/* ..................Save btn............... */}

      <TouchableOpacity
        onPress={EditProfile}
        style={[
          styles.btnSubmit,
          {
            backgroundColor: allow
              ? themeChange === 'Male'
                ? themeGreen.greenThemeColor
                : themePink.pinkThemeColor
              : 'lightgray',
          },
        ]}
        disabled={!allow}>
        <Text style={{...styles.txtSubmit}}>Save</Text>
      </TouchableOpacity>

      {/* ..............Profile Modal............... */}
      <Modal
        isVisible={modalShow}
        animationIn={'slideInUp'}
        animationInTiming={1500}
        animationOut="slideOutDown"
        animationOutTiming={1500}
        onBackButtonPress={onCloseModal}
        onBackdropPress={onCloseModal}
        style={styles.modal}>
        <View style={{flex: 1, flexDirection: 'column', paddingVertical: 30}}>
          <TouchableOpacity onPress={showZoomingProfile}>
            <View style={styles.ModalView}>
              <Icon1 name="camera" size={25} color={Colors.grayColor} />
              <Text
                style={{
                  paddingHorizontal: 12,
                  fontSize: 15,
                  fontWeight: '600',
                  top: 1,
                }}>
                View Profile
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={ChoosePic}>
            <View style={{...styles.ModalView, paddingTop: 20}}>
              <Icon1 name="camera" size={25} color={Colors.grayColor} />
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
          <TouchableOpacity
            onPress={onCloseModal}
            style={styles.CancelbtnModal}>
            <Text style={{paddingTop: 8, color: Colors.whiteColor}}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* ...............................Zooming Zoom out Profile Pic Modal............................... */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={profileModal}
        onRequestClose={handleCloseModal}>
        <View style={styles.modalContainer}>
          {personal_profile?.pic || editProfile?.pic ? (
            <Image
              source={{
                uri: editProfile?.pic?.uri || personal_profile?.pic,
              }}
              style={{
                width: 150,
                height: 150,
                borderRadius: 75,
                alignSelf: 'center',
              }}
            />
          ) : (
            <Text style={{textAlign: 'center', fontSize: 16, marginTop: 20}}>
              No Pic
            </Text>
          )}
          <TouchableOpacity
            onPress={handleCloseModal}
            style={styles.closeButton}>
            <Icon4 name="times-circle" color={Colors.whiteColor} size={30} />
          </TouchableOpacity>
        </View>
      </Modal>

      {/* ..........Zooming ZoomOut................ */}
      {/* <ImageZoomModal
        showFullImage={showFullImage}
        setShowFullImage={setShowFullImage}
      /> */}
    </ScrollView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
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
  btnSubmit: {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    height: 50,
    width: 300,
    borderRadius: 22,
    top: 30,
    marginBottom: 40,
  },
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
  txtSubmit: {
    color: Colors.whiteColor,
    fontSize: 15,
  },
  dateText: {
    alignSelf: 'center',
    paddingHorizontal: 20,
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
    width: 65,
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.mediumGrayColor,
  },
  username: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // Modal Css

  modal: {
    width: wp(95),
    height: wp(50),
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
    marginTop: 23,
    backgroundColor: Colors.blueThemeColor,
    marginHorizontal: 12,
    height: 38,
    borderRadius: 13,
  },
  // Pic Style
  TablePicAndCameraView: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
  },

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
  PicText: {
    color: Colors.black,
    fontSize: 14,
    fontWeight: '600',
    paddingHorizontal: 10,
    top: 5,
  },
});
