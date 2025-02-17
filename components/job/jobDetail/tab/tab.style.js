import {StyleSheet} from 'react-native';
import {COLORS, SHADOWS, SIZES, themePink} from '../../../../constants/Colors';
const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.small,
    marginBottom: SIZES.small / 2,
    marginHorizontal: 25,
    paddingTop: 20,
  },
  btn: (name, activeTab) => ({
    paddingVertical: SIZES.medium,
    paddingHorizontal: SIZES.xLarge,
    backgroundColor: name === activeTab ? themePink.pinkThemeColor : '#F3F4F8',
    borderRadius: SIZES.medium,
    marginLeft: 2,
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
  }),
  btnText: (name, activeTab) => ({
    fontFamily: 'DMMedium',
    fontSize: SIZES.small,
    color: name === activeTab ? '#fff' : '#AAA9B8',
  }),
});

export default styles;
