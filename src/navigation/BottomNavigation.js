import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import IconA from 'react-native-vector-icons/AntDesign';
import IconB from 'react-native-vector-icons/MaterialIcons';
import {Image, StyleSheet, Text} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Home from '../home/Home';
import {Colors} from '../../constants/Colors';
import Inbox from '../inbox/NotificationScreen';
import Jobs from '../jobs/Jobs';
import Profile from '../Profile/Profile';
import {View} from 'native-base';
import Browse from '../browse/Browse';
import {useSelector} from 'react-redux';
const Tab = createMaterialBottomTabNavigator();
function Bottom_Tabs() {
  const {notificationCount} = useSelector(state => state.notifications);
  return (
    <Tab.Navigator
      activeColor={Colors.black}
      inactiveBackgroundColor={Colors.blueThemeColor}
      inactiveColor="grey"
      labeled={false}
      barStyle={{
        backgroundColor: Colors.whiteColor,
      }}
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'red',
        },
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <View style={styles.Container}>
              <IconA name="home" size={22} color={color} />
              <Text
                style={{
                  ...styles.Text,
                  color: Colors.black,
                  paddingHorizontal: 27,
                }}>
                Home
              </Text>
            </View>
          ),
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <View style={styles.Container}>
              <Icon name="search-outline" size={22} color={color} />
              <Text
                style={{
                  ...styles.Text,
                  color: Colors.black,
                  paddingHorizontal: 24,
                }}>
                Browse
              </Text>
            </View>
          ),
        }}
        name="Browse"
        component={Browse}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <View style={styles.Container}>
              <IconB name="work-outline" size={22} color={color} />
              <Text
                style={{
                  ...styles.Text,
                  color: Colors.black,
                  paddingHorizontal: 20,
                }}>
                Jobs
              </Text>
            </View>
          ),
        }}
        name="Job"
        component={Jobs} // This prevents the screen from rendering
      />

      {/* <Tab.Screen
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <View style={styles.Container}>
              <Icon name="ios-heart-outline" size={22} color={color} />
              <Text
                style={{
                  ...styles.Text,
                  color: Colors.black,
                  paddingHorizontal: 20,
                }}>
                Follower
              </Text>
            </View>
          ),
        }}
        name="Following"
        component={Following}
      /> */}
      <Tab.Screen
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <View style={{...styles.Container}}>
              <View>
                <Icon
                  name={notificationCount ? 'ios-heart' : 'ios-heart-outline'}
                  size={23}
                  color={notificationCount ? 'red' : color}
                />
                {notificationCount ? (
                  <Text style={styles.notiText}>{notificationCount}</Text>
                ) : null}
              </View>
              <Text
                style={{
                  ...styles.Text,
                  color: Colors.black,
                  // paddingHorizontal: 10,
                }}>
                Notification
              </Text>
            </View>
          ),
        }}
        name="Inbox"
        component={Inbox}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <View style={styles.Container}>
              <Icon name="ios-person-outline" size={22} color={color} />
              <Text
                style={{
                  ...styles.Text,
                  color: Colors.black,
                  paddingHorizontal: 25,
                }}>
                Profile
              </Text>
            </View>
          ),
        }}
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  image: {height: 32, width: 32},
  Text: {
    fontSize: 11,
    color: Colors.black,
    // alignSelf: 'flex-start',
    paddingHorizontal: 10,
  },
  Container: {
    width: 85,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notiText: {
    color: Colors.whiteColor,
    left: 0,
    position: 'absolute',
    top: 4,
    bottom: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 10,
  },
});
export default Bottom_Tabs;
