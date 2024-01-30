import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/SimpleLineIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../../constants/Colors';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {clearToken} from '../../src/Redux/action/auth';
import {DrawerActions} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';

const DrawerCustom = props => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const {user} = useSelector(state => state.auth);

  const logoutHandler = () => {
    dispatch(clearToken());
    AsyncStorage.clear();

    navigation.reset({
      index: 0,
      routes: [{name: 'starter'}],
    });

    navigation.dispatch(DrawerActions.closeDrawer());
  };

  const handleOrderNavigation = to => {
    navigation.dispatch(DrawerActions.closeDrawer());
    navigation.navigate(to);
  };

  const handleSettingNavigate = to => {
    navigation.dispatch(DrawerActions.closeDrawer());
    navigation.navigate(to);
  };
  return (
    <Animatable.View style={{flex: 1}} animation="slideInLeft" delay={200}>
      <View
        style={{
          width: '100%',
          flex: 1,
          display: 'flex',
          justifyContent: 'space-around',
          bottom: 130,
        }}>
        {user && user.role === '1' ? (
          <TouchableOpacity
            onPress={() => handleOrderNavigation('PortfiloTalentUsers')}
            style={styles.drawerOrder}>
            <Icon name="videocamera" color={Colors.black} size={25} />
            <Text style={styles.text}>Protfilo Talent Users</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => handleOrderNavigation('ProtfiloScreen')}
            style={styles.drawerOrder}>
            <Icon name="videocamera" color={Colors.black} size={25} />
            <Text style={styles.text}>Protfilo</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={{width: '100%', height: '30%'}}>
        <View style={styles.drawerBottomContent}>
          <TouchableOpacity
            style={styles.bottominsideContent}
            onPress={() => handleSettingNavigate('settings')}>
            <Icon name="setting" color={Colors.black} size={25} />
            <Text
              style={{
                fontSize: 17,
                paddingHorizontal: 12,
                color: Colors.black,
              }}>
              Settings
            </Text>
          </TouchableOpacity>
          {/*...............talent View.................*/}
          {/* <TouchableOpacity
              style={styles.bottominsideContent}
              onPress={() => handleNavigation('TalentScreen')}>
              <Icon2
                name="star-shooting-outline"
                color={Colors.black}
                size={25}
              />
              <Text
                style={{
                  fontSize: 17,
                  paddingHorizontal: 12,
                  color: Colors.black,
                }}>
                Apply to be talent
              </Text>
            </TouchableOpacity> */}
          {/*...............Log out View.................*/}
          <View style={styles.bottominsideContent}>
            <Icon1 name="logout" color={Colors.black} size={25} />
            <TouchableOpacity onPress={logoutHandler}>
              <Text
                style={{
                  fontSize: 17,
                  paddingHorizontal: 12,
                  color: Colors.black,
                }}>
                Log out
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Animatable.View>
  );
};

export default DrawerCustom;

const styles = StyleSheet.create({
  mainDrawerView: {
    flex: 1,
    // width: '90%',
    // minHeight: '30%',
  },

  drawerOrder: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 13,
    // justifyContent: 'space-around',
    // backgroundColor: 'red',
  },
  text: {
    fontSize: 16,
    paddingHorizontal: 14,
    color: Colors.black,
  },
  drawerBottomContent: {
    flex: 1,
    display: 'flex',
    borderTopWidth: 1,
    borderTopColor: Colors.grayColor,
  },
  bottominsideContent: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 30,
    paddingVertical: 13,
  },
});
