import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  useColorScheme,
  TouchableOpacity,
} from 'react-native';
import NewHeader from '../../components/newHeader/NewHeader';
import {Colors, themePink, themeGreen} from '../../constants/Colors';

const InvitionCode = ({navigation}) => {
  const themeChange = useColorScheme() === 'Male' ? 'Male' : 'female';

  return (
    <View>
      <NewHeader title="Invite Code" navigation={navigation} />

      <Text
        style={{
          fontSize: 22,
          color: Colors.black,
          top: 20,
          paddingHorizontal: 20,
        }}>
        Got a Castify invite code ?
      </Text>
      <View style={styles.inputWidth}>
        <TextInput placeholder="Code" style={{paddingHorizontal: 12}} />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('editProfile')}
        style={[
          styles.btnSubmit,

          themeChange === 'Male'
            ? {backgroundColor: themeGreen.greenThemeColor}
            : {backgroundColor: themePink.pinkThemeColor},
        ]}>
        <Text style={{...styles.txtSubmit}}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default InvitionCode;

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
    top: 50,
  },
  btnSubmit: {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    height: 50,
    width: 300,
    borderRadius: 22,
    top: 100,
  },
  txtSubmit: {
    color: Colors.whiteColor,
    fontSize: 15,
  },
});
