import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {Colors} from '../../constants/Colors';

const NewHeader = ({title, navigation}) => {
  return (
    <View style={{...styles.Newheader}}>
      <View flex={0.2}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="left" size={20} color={Colors.black} />
        </TouchableOpacity>
      </View>
      <Text flex={1} style={{fontSize: 18, color: Colors.black}}>
        {title}
      </Text>
      <View flex={0.2} />
    </View>
  );
};

export default NewHeader;

const styles = StyleSheet.create({
  // Header
  Newheader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
});
