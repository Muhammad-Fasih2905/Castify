import React, {useEffect} from 'react';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';

import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/AntDesign';

import styles from './styles';

import {getNotificationsRequest} from '../Redux/action/notification';
import {Colors} from '../../constants/Colors';
import NotificationsList from '../../components/NotificationsList';
import Header from '../../components/header';
import useNotificationHook from '../utils/NotificationHook';

const Inbox = () => {
  const {notifications} = useSelector(state => state.notifications);
  const {token, user} = useSelector(state => state.auth);
  const {notificationCount} = useSelector(state => state.notifications);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {deleteNotificationCount} = useNotificationHook();

  useEffect(() => {
    dispatch(getNotificationsRequest(token));
    if (notificationCount) {
      deleteNotificationCount(user?.id);
    }
  }, []);

  return (
    <View style={{backgroundColor: Colors.whiteColor, flex: 1}}>
      <Header title="Notification" />

      <FlatList
        data={notifications}
        renderItem={({item}) => <NotificationsList item={item} />}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() => <View style={{marginBottom: 40}} />}
      />

      {/* <Animatable.View animation="slideInLeft" delay={200} style={{flex: 1}}> */}
      {/* <View style={styles.container}>
          <Text style={{fontSize: 17, fontWeight: '700', color: Colors.black}}>
            Today
          </Text>
          <View style={styles.NewMessageBox}>
            <View style={styles.NameViewcontainer}>
              <View style={styles.usernameContainer}>
                <Text style={styles.username}>J</Text>
              </View>
            </View>
            <View
              style={{
                left: 7,
                width: '100%',
                height: 50,
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: '700',
                  color: Colors.black,
                  top: 6,
                }}>
                New User
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  color: Colors.black,
                  top: 6,
                  left: 7,
                }}>
                Like Your Photo.
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: '800',
                  color: Colors.mediumGrayColor,
                  top: 6,
                  left: 9,
                }}>
                13h
              </Text>
            </View>
          </View>
        </View> */}
      {/* ..................second................... */}
      {/* <View style={{...styles.container, borderTopWidth: 0}}>
          <Text style={{fontSize: 17, fontWeight: '700', color: Colors.black}}>
            Yesterday
          </Text>
          <View style={styles.NewMessageBox}>
            <View style={styles.NameViewcontainer}>
              <View style={styles.usernameContainer}>
                <Text style={styles.username}>J</Text>
              </View>
            </View>
            <View
              style={{
                left: 7,
                width: '100%',
                height: 50,
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: '700',
                  color: Colors.black,
                  top: 6,
                }}>
                New User
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  color: Colors.black,
                  top: 6,
                  left: 7,
                }}>
                Like Your Photo.
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: '800',
                  color: Colors.mediumGrayColor,
                  top: 6,
                  left: 9,
                }}>
                13h
              </Text>
            </View>
          </View>
        </View> */}
      {/* ..................third................... */}
      {/* <View
          style={{
            ...styles.container,
            borderTopWidth: 0,
            borderBottomWidth: 0,
          }}>
          <Text style={{fontSize: 17, fontWeight: '700', color: Colors.black}}>
            This Week
          </Text>
          <View style={styles.NewMessageBox}>
            <View style={styles.NameViewcontainer}>
              <View style={styles.usernameContainer}>
                <Text style={styles.username}>J</Text>
              </View>
            </View>
            <View
              style={{
                left: 7,
                width: '100%',
                height: 50,
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: '700',
                  color: Colors.black,
                  top: 6,
                }}>
                New User
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  color: Colors.black,
                  top: 6,
                  left: 7,
                }}>
                Like Your Photo.
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: '800',
                  color: Colors.mediumGrayColor,
                  top: 6,
                  left: 9,
                }}>
                13h
              </Text>
            </View>
          </View> */}
      {/* ..................fourth................... */}

      {/* <View style={{...styles.NewMessageBox, marginTop: 29}}>
            <View style={styles.NameViewcontainer}>
              <View style={styles.usernameContainer}>
                <Text style={styles.username}>J</Text>
              </View>
            </View>
            <View
              style={{
                left: 7,
                width: '90%',
                height: 50,
                flexDirection: 'row',
                top: 4,
              }}>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: '700',
                  color: Colors.black,
                }}>
                New User
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  color: Colors.black,
                  left: 7,
                }}>
                Like Your Photo.
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: '800',
                  color: Colors.mediumGrayColor,
                  left: 9,
                }}>
                13h
              </Text>
            </View>
          </View> */}

      {/* ................................Fiveth............ */}
      {/* <View style={{...styles.NewMessageBox, marginTop: 29}}>
            <View style={styles.NameViewcontainer}>
              <View style={styles.usernameContainer}>
                <Text style={styles.username}>J</Text>
              </View>
            </View>
            <View
              style={{
                left: 7,
                width: '90%',
                height: 50,
                flexDirection: 'row',
                top: 4,
              }}>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: '700',
                  color: Colors.black,
                }}>
                New User
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  color: Colors.black,
                  left: 7,
                }}>
                Like Your Photo.
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: '800',
                  color: Colors.mediumGrayColor,
                  left: 9,
                }}>
                13h
              </Text>
            </View>
          </View>
        </View> */}
      {/* </Animatable.View> */}
    </View>
  );
};

export default Inbox;
