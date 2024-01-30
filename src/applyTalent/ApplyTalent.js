import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
  Image,
} from 'react-native';
import {Select, Box, CheckIcon, Center} from 'native-base';

import {Colors, themeGreen, themePink} from '../../constants/Colors';
import NewHeader from '../../components/newHeader/NewHeader';

import {useNavigation} from '@react-navigation/native';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import DatePicker from 'react-native-date-picker';
import ImagePicker from 'react-native-image-crop-picker';
import Video from 'react-native-video';
import moment from 'moment';

import {useDispatch, useSelector} from 'react-redux';
import {api_signup_request} from '../Redux/action/auth';

const ApplyTalent = () => {
  const themeChange = useColorScheme() === 'Male' ? 'Male' : 'female';

  const dispatch = useDispatch();

  const navigation = useNavigation();

  const [showPic, setShowPic] = useState(false);
  const [showPic1, setShowPic1] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const [talentData, setTalentData] = useState({
    role: '2',
    email: '',
    password: '',
    name: '',
    dateOfBirth: '',
    gender: '',
    city: '',
    address: '',
    phone_number: '',
    height: '',
    body_size: '',
    biography: '',
    model_time: '',
    category: '',
  });
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const [open, setOpen] = useState(false);

  const [isBodySize, setIsBodySize] = useState([
    {id: 1, value: true, name: 'lean', selected: false},
    {id: 2, value: false, name: 'Muscular', selected: false},
    {id: 3, value: false, name: 'Normal', selected: false},
  ]);

  const [isOption, setIsOption] = useState([
    {id: 1, value: true, name: 'Fresh Start', selected: false},
    {id: 2, value: false, name: 'Already in', selected: false},
  ]);

  const authReducer = useSelector(state => state.auth);

  const handleChange = (key, value) => {
    setTalentData(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleShowPass = () => {
    setShowPass(prev => !prev);
  };

  //   Radio btn
  const onRadioBtnClick = selectedItem => {
    const updatedBodySize = isBodySize.map(item => {
      if (item.id === selectedItem.id) {
        return {...item, selected: true};
      } else {
        return {...item, selected: false};
      }
    });

    setTalentData(prevData => ({
      ...prevData,
      body_size: selectedItem.name,
    }));

    setIsBodySize(updatedBodySize);
  };

  const onSelectBtnClick = selectedItem => {
    const updatedStartModeling = isOption.map(item => {
      if (item.id === selectedItem.id) {
        return {...item, selected: true};
      } else {
        return {...item, selected: false};
      }
    });

    setTalentData(prevData => ({
      ...prevData,
      model_time: selectedItem.name,
    }));

    setIsOption(updatedStartModeling);
  };

  const handleTalent = () => {
    dispatch(api_signup_request(talentData));
  };

  useEffect(() => {
    if (authReducer?.signup_success) {
      alert('Signup success');
      // Use replace to navigate to the 'Home' screen and replace the current screen in the stack
      navigation.replace('Home');
    }
  }, [authReducer?.signup_success]);

  // Choose a Image
  const ChoosePic = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    })
      .then(image => {
        // Ensure that the image URL is valid before updating the profile data
        if (image && image?.path) {
          const updatedProfileData = {
            ...talentData,
            pic: {
              uri: image?.path,
              type: image?.mime,
              name: 'image.jpg',
            }, // Save the image URL directly to the pic property
          };
          setTalentData(updatedProfileData);
        }
      })
      .catch(error => {});
  };

  // Video Picker
  const pickVideoFromGallery = () => {
    ImagePicker.openPicker({
      mediaType: 'video',
      compressVideoPreset: 'HighestQuality',
      compressVideo: true,
      quality: 1,
    }).then(video => {
      if (video && video?.path) {
        const updatedProfileData = {
          ...talentData,
          video: {
            uri: video?.path,
            type: video?.mime,
            name: 'video.mp4',
          },
        };
        setTalentData(updatedProfileData);
      }
    });
  };

  return (
    <View flex={1}>
      <NewHeader title="Talent Signup" navigation={navigation} />

      <ScrollView>
        <View style={styles.mainInputView}>
          {/* {..........Email..........} */}
          <Text style={styles.inputHead}>Email</Text>
          <View style={styles.inputView}>
            <TextInput
              placeholder="you@example.com"
              keyboardType="email-address"
              style={styles.input}
              value={talentData?.email}
              onChangeText={e => {
                const lowercaseValue = e.charAt(0).toLowerCase() + e.slice(1);

                handleChange('email', lowercaseValue);
              }}
            />
          </View>

          {/* {..........Password..........} */}
          <Text style={styles.inputHead}>Password</Text>
          <View style={styles.inputView}>
            <View style={styles.passView}>
              <TextInput
                placeholder="Password"
                style={styles.input}
                secureTextEntry={!showPass}
                value={talentData?.password}
                onChangeText={e => handleChange('password', e)}
              />
              <TouchableOpacity
                style={{paddingHorizontal: 6}}
                onPress={handleShowPass}>
                <Icon1
                  name={showPass ? 'eye-off-outline' : 'eye-outline'}
                  size={24}
                  color="#828282"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* {..........Full Name..........} */}
          <Text style={styles.inputHead}>Username</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={talentData?.name}
              onChangeText={e => handleChange('name', e)}
            />
          </View>

          {/* {..........Gender..........} */}
          <Text style={styles.inputHead}>Gender</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.input}
              placeholder="Gender"
              value={talentData?.gender}
              onChangeText={e => handleChange('gender', e)}
            />
          </View>
          {/* {..........Category..........} */}
          <Text style={styles.inputHead}>Category</Text>
          <Box maxW="300" style={{marginVertical: 12}}>
            <Select
              selectedValue={talentData.category}
              minWidth="200"
              accessibilityLabel="Choose Service"
              placeholder="Choose Service"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={itemValue =>
                setTalentData(prevData => ({
                  ...prevData,
                  category: itemValue,
                }))
              }>
              <Select.Item label="trending" value="trending" />
              <Select.Item label="featured" value="featured" />
              <Select.Item label="creators" value="creators" />
              <Select.Item label="comedians" value="comedians" />
              <Select.Item label="new & noteworthy" value="new & noteworthy" />
              <Select.Item label="musicians" value="musicians" />
              <Select.Item label="queer Voices" value="queer Voices" />
              <Select.Item label="animal" value="animal" />
              <Select.Item label="Actor" value="Actor" />
              <Select.Item label="reality Tv" value="reality Tv" />
              <Select.Item label="Back For More" value="Back For More" />
            </Select>
          </Box>

          {/*.................Age............*/}

          <Text style={{...styles.inputHead, top: 10}}>Date Of Birth</Text>
          <View style={styles.inputView}>
            <TouchableOpacity onPress={() => setOpen(true)}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: 60,
                  marginTop: 15,
                }}>
                <Text style={{color: Colors.black}}>
                  {talentData?.dateOfBirth || 'Select'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

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
              setTalentData(prevProfileData => ({
                ...prevProfileData,
                dateOfBirth: formattedDate,
              }));
            }}
            onCancel={() => setOpen(false)}
          />

          {/* {..........City..........} */}
          <Text style={{...styles.inputHead, marginTop: 20}}>City</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.input}
              placeholder="City"
              value={talentData?.city}
              onChangeText={e => handleChange('city', e)}
            />
          </View>

          {/* {..........Address..........} */}
          <Text style={styles.inputHead}>Address</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.input}
              placeholder="Address"
              value={talentData?.address}
              onChangeText={e => handleChange('address', e)}
            />
          </View>

          {/* {..........PhoneNumber..........} */}
          <Text style={styles.inputHead}>Phone Number</Text>
          <View style={styles.inputView}>
            <TextInput
              keyboardType="number-pad"
              placeholder="Phone Number"
              style={styles.input}
              value={talentData?.phone_number}
              onChangeText={e => handleChange('phone_number', e)}
            />
          </View>

          {/* {..........Height (in cm)..........} */}
          <Text style={styles.inputHead}>Height (in cm)</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.input}
              placeholder="Heigth"
              value={talentData?.height}
              onChangeText={e => handleChange('height', e)}
            />
          </View>

          {/* {..........Images..........} */}
          <Text style={styles.inputHead}>Images</Text>
          <View style={styles.PicView}>
            <TouchableOpacity onPress={ChoosePic}>
              {showPic || talentData?.pic ? (
                <Image
                  source={{uri: talentData?.pic?.uri}}
                  style={{
                    width: 200,
                    height: 200,
                    marginVertical: 33,
                    marginHorizontal: 38,
                  }}
                />
              ) : (
                <>
                  <TouchableOpacity onPress={() => setShowPic(true)}>
                    <Text
                      style={{
                        ...styles.inputHead,
                        textAlign: 'center',
                        top: 90,
                      }}>
                      Choose Pic
                    </Text>
                  </TouchableOpacity>
                  <Image
                    source={{uri: talentData?.pic?.uri}}
                    style={{
                      width: 200,
                      height: 200,
                      opacity: 0,
                      position: 'absolute',
                      top: 0,
                      left: 0,
                    }}
                  />
                </>
              )}
            </TouchableOpacity>
          </View>

          {/* {..........VIDEO..........} */}
          <Text style={styles.inputHead}>Video</Text>
          <View
            style={{
              ...styles.PicView,
              marginBottom: 40,
              top: 22,
              height: '21%',
            }}>
            <TouchableOpacity onPress={pickVideoFromGallery}>
              {showPic1 || talentData?.video?.uri ? (
                <Video
                  source={{uri: talentData?.video?.uri}}
                  style={{
                    width: 250,
                    height: 350,
                    marginVertical: 13,
                    marginHorizontal: 13,
                  }}
                  controls={true}
                />
              ) : (
                <>
                  <TouchableOpacity onPress={() => setShowPic1(true)}>
                    <Text
                      style={{
                        ...styles.inputHead,
                        textAlign: 'center',
                        top: 90,
                      }}>
                      Choose Video
                    </Text>
                  </TouchableOpacity>
                  <Video
                    source={{uri: talentData?.video?.uri}}
                    style={{
                      width: 300,
                      height: 400,
                      marginVertical: 33,
                      marginHorizontal: 38,
                    }}
                    controls={true}
                  />
                </>
              )}
            </TouchableOpacity>
          </View>
          {/* {..........BodySize..........} */}

          <Text style={styles.inputHead}>Body Size</Text>
          {isBodySize.map(item => (
            <View style={styles.radioButtonContainer} key={item.id}>
              <TouchableOpacity
                onPress={() => onRadioBtnClick(item)}
                style={styles.radioButton}>
                {item?.selected ? (
                  <View style={styles.radioButtonIcon} />
                ) : null}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onRadioBtnClick(item)}>
                <Text style={styles.radioButtonText}>{item.name}</Text>
              </TouchableOpacity>
            </View>
          ))}

          {/* {..........Biography..........} */}
          <Text style={styles.inputHead}>Biography</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.input}
              placeholder="Biography"
              value={talentData?.biography}
              onChangeText={e => handleChange('biography', e)}
            />
          </View>
          {/* {..........Talent Requried..........} */}
          <Text>Select an option</Text>
          {isOption.map(item => (
            <View style={styles.radioButtonContainer} key={item.id}>
              <TouchableOpacity
                onPress={() => onSelectBtnClick(item)}
                style={styles.radioButton}>
                {item?.selected ? (
                  <View style={styles.radioButtonIcon} />
                ) : null}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onSelectBtnClick(item)}>
                <Text style={styles.radioButtonText}>{item.name}</Text>
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity
            onPress={handleTalent}
            style={[
              styles.btnSubmit,

              themeChange === 'Male' && allow
                ? {backgroundColor: themeGreen.greenThemeColor}
                : {backgroundColor: themePink.pinkThemeColor},
            ]}>
            <Text style={{...styles.txtSubmit}}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ApplyTalent;

const styles = StyleSheet.create({
  inputHead: {
    color: Colors.black,
    fontSize: 13,
    fontWeight: '700',
  },

  inputView: {
    borderBottomWidth: 1.5,
    borderBottomColor: Colors.grayColor,
    marginBottom: 20,
    borderStyle: 'solid',
    borderColor: Colors.grayColor,
  },

  PicView: {
    borderWidth: 1.5,
    borderColor: Colors.grayColor,
    marginBottom: 30,
    borderStyle: 'solid',
    width: '85%',
    height: '19%',
    top: 12,
    borderRadius: 20,
  },
  input: {
    height: 50,
    color: Colors.black,
    fontSize: 14,
  },
  mainInputView: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    marginHorizontal: 14,
    top: 29,
  },
  AgeBox: {
    display: 'flex',
    width: '80%',
    height: 79,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
    backgroundColor: Colors.whiteColor,
    alignSelf: 'center',
    paddingTop: 12,
    borderRadius: 12,
  },
  AgeView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  AgeText: {
    paddingHorizontal: 12,
    bottom: 6,
    fontSize: 15,
  },
  ageCaretup: {
    alignSelf: 'center',
  },

  //   radio button
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 45,
    padding: 9,
  },
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
  btnSubmit: {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    width: '95%',
    height: 50,
    borderRadius: 22,
    marginTop: 22,
    marginBottom: 44,
  },
  txtSubmit: {
    color: Colors.whiteColor,
    fontSize: 15,
  },

  passView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // width:'50%'
  },
});
