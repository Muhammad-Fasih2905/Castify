import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import {Colors, themeGreen, themePink} from '../constants/Colors';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/Feather';
import Icon3 from 'react-native-vector-icons/Octicons';
const OpenGallery = ({setVideo, setPic, video}) => {
  // Old Code Function
  const ChoosePic = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: false,
    })
      .then(image => {
        if (image && image.path) {
          setPic({
            uri: image.path,
            type: image.mime,
            name: 'image.jpg',
          });
        }
      })
      .catch(error => {});
  };

  // New Code Function
  // const ChoosePic = () => {
  //   const remainingSlots = 10 - pic.length;

  //   if (remainingSlots <= 0) {
  //     return;
  //   }

  //   ImagePicker.openPicker({
  //     multiple: true,
  //     cropping: true,
  //     includeBase64: false,
  //   })
  //     .then(images => {
  //       if (Array.isArray(images) && images.length > 0) {
  //         const selectedImages = images.slice(0, remainingSlots); // Take only the allowed number of images
  //         const updatedPics = [
  //           ...pic,
  //           ...selectedImages.map(image => ({
  //             uri: image.path,
  //             type: image.mime,
  //             name: 'image.jpg',
  //           })),
  //         ];

  //         setPic(updatedPics);
  //       } else {
  //       }
  //     })
  //     .catch(error => {
  //     });
  // };
  // Old Camera Function Work
  const Camera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        if (image && image.path) {
          setPic({
            uri: image.path,
            type: image.mime,
            name: 'image.jpg',
          });
        }
      })
      .catch(error => {});
    // setDataShow(true);
  };

  // const Camera = () => {
  //   ImagePicker.openCamera({
  //     width: 300,
  //     height: 400,
  //     cropping: true,
  //   })
  //     .then(image => {
  //       if (image && image.path) {
  //         const newPic = {
  //           uri: image.path,
  //           type: image.mime,
  //           name: 'image.jpg',
  //         };
  //         setPic(prevPics => [...prevPics, newPic]); // Add the new image to the pic state
  //       }
  //     })
  //     .catch(error => {
  //     });
  // };

  const pickVideoFromGallery = () => {
    ImagePicker.openPicker({
      mediaType: 'video',
      compressVideoPreset: 'HighestQuality',
      compressVideo: true,
      quality: 1,
    }).then(video => {
      if (video && video.path) {
        setVideo({
          uri: video.path,
          type: video.mime,
          name: 'video.mp4',
        });
      }
    });
    // setDataShow(true);
  };

  return (
    <View style={styles.TablePicAndCameraView}>
      <TouchableOpacity style={styles.PhotoAndVideoView} onPress={ChoosePic}>
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
  );
};

export default OpenGallery;

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
});
