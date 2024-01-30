import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Colors} from '../../constants/Colors';

const styles = StyleSheet.create({
  AvtarProfileBox: {
    marginTop: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.whiteColor,
  },
  AvatrText: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: Colors.whiteColor,
    justifyContent: 'space-between',
  },
  Avatarhead: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'red',
  },


});

export default styles;
