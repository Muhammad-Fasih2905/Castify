import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
} from 'react-native';
import React, {useState} from 'react';
import Castify from '../../assets/Castify.png';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors, themeGreen, themePink} from '../../constants/Colors';
import {Button} from 'react-native-paper';

const JobsHeader = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchInputChange = query => {
    setSearchQuery(query);
  };
  const themeChange = useColorScheme() === 'Male' ? 'Male' : 'female';

  return (
    <View style={styles.mainHead}>
      <View style={styles.searchView}>
        <Image source={Castify} style={styles.HeadUserPic} />
        <View
          style={{
            flexDirection: 'row',
            height: '47%',
            width: '80%',
            backgroundColor: Colors.whiteColor,
            marginHorizontal: 17,
            marginVertical: 20,
            alignItems: 'center',
            justifyContent: 'space-around',
            borderRadius: 22,
          }}>
          <Icon name="search" color={Colors.mediumGrayColor} size={20} />
          <TextInput
            style={{width: '80%', padding: 2}}
            placeholder="Search"
            value={searchQuery}
            onChangeText={handleSearchInputChange}
            scrollEnabled={false}
          />
        </View>
        <Icon1
          name="message-processing-outline"
          color={Colors.mediumGrayColor}
          size={25}
          style={styles.IconChat}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <Button style={styles.buttonHead} icon="bookmark" mode="contained">
          My jobs
        </Button>
        <Button style={styles.buttonHead} icon="notebook" mode="contained">
          Post a job
        </Button>
      </View>
    </View>
  );
};

export default JobsHeader;

const styles = StyleSheet.create({
  mainHead: {
    flexDirection: 'column',
    width: '100%',
    height: '25%',
  },
  HeadUserPic: {
    width: 45,
    height: 45,
    marginVertical: 18,
    borderColor: Colors.grayColor,
    borderWidth: 1,
    borderRadius: 25,
    marginHorizontal: 8,
  },

  searchView: {
    height: 80,
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  IconChat: {
    marginVertical: 25,
  },
  buttonHead: {
    width: '45%',
    color: Colors.whiteColor,
    backgroundColor: themePink.pinkThemeColor,
  },
});
