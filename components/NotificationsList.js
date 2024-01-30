import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image,
} from 'react-native';
import moment from 'moment/moment';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors} from '../constants/Colors';
import * as Animatable from 'react-native-animatable';
import FastImage from 'react-native-fast-image';
import CastifyPic from '../assets/Castify.png';

const NotificationsList = ({item}) => {
  const timestamp = item?.updated;
  const date = new Date(timestamp);
  const now = new Date();
  const timeDifference = now - date;
  let time;

  if (timeDifference < 12 * 60 * 60 * 1000) {
    // Less than 12 hours, show the time in 'numeric' format
    time = time = 'Just now';
  } else if (timeDifference < 24 * 60 * 60 * 1000) {
    // Less than 24 hours, show "12 hours ago"
    time = '12 hr ';
  } else if (timeDifference < 2 * 24 * 60 * 60 * 1000) {
    // Between 24 and 48 hours, show "1 day ago"
    time = '1 day ';
  } else if (timeDifference < 7 * 24 * 60 * 60 * 1000) {
    // Between 2 and 7 days, show the time difference in days
    const daysAgo = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
    time = `${daysAgo} ${daysAgo === 1 ? 'day' : 'days'} `;
  } else if (timeDifference < 30 * 24 * 60 * 60 * 1000) {
    // Between 7 and 30 days, show the time difference in weeks
    const weeksAgo = Math.floor(timeDifference / (7 * 24 * 60 * 60 * 1000));
    time = `${weeksAgo} ${weeksAgo === 1 ? 'week' : 'weeks'} `;
  } else {
    // More than 30 days, show the time difference in months and days
    const monthsAgo = Math.floor(timeDifference / (30 * 24 * 60 * 60 * 1000));
    const daysAgo = Math.floor(
      (timeDifference % (30 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000),
    );
    time = `${monthsAgo} ${monthsAgo === 1 ? 'month' : 'months'} ${daysAgo} ${
      daysAgo === 1 ? 'day' : 'days'
    } `;
  }
  function capitalizeFirstLetter(string) {
    return string?.charAt(0)?.toUpperCase() + string?.slice(1);
  }

  console.log('Notification ==>', item);

  return (
    <>
      <Animatable.View animation="slideInLeft" delay={200} style={{flex: 1}}>
        <View style={styles.container}>
          {/* <Text style={{fontSize: 17, fontWeight: '700', color: Colors.black}}>
            Today
          </Text> */}

          <View style={styles.NewMessageBox}>
            {item?.sender?.pic ? (
              <FastImage
                source={{uri: item?.sender?.pic}}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 30,
                }}
              />
            ) : item?.sender?.username ? (
              <View style={styles.NameViewcontainer}>
                <View style={styles.usernameContainer}>
                  <Text style={styles.username}>
                    {item?.sender?.username?.charAt(0)?.toUpperCase()}
                  </Text>
                </View>
              </View>
            ) : (
              <FastImage
                source={CastifyPic}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 30,
                  borderWidth: 1,
                  borderColor: Colors.grayColor,
                }}
              />
            )}

            <View
              style={{flexDirection: 'column', flex: 1, paddingHorizontal: 7}}>
              {item?.sender?.username !== null ? (
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: '700',
                    color: Colors.black,
                  }}>
                  {capitalizeFirstLetter(item?.sender?.username)}
                </Text>
              ) : (
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: '700',
                    color: Colors.black,
                  }}>
                  {item?.title}
                </Text>
              )}

              <View
                style={{
                  width: '100%',
                  height: 50,
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    color: Colors.black,
                  }}>
                  {item?.body}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '800',
                    color: Colors.mediumGrayColor,
                    left: 5,
                  }}>
                  {time}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Animatable.View>
    </>
  );
};

export default NotificationsList;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 16,
    borderRadius: 8,
    borderTopColor: Colors.grayColor,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayColor,
  },
  titleDes: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 16,
  },

  title: {
    width: 150,
    height: 34,
    backgroundColor: Colors.purpleDim,
    marginBottom: 8,
    borderRadius: 20,
  },
  description: {
    width: 230,
    height: 17,
    borderRadius: 20,
    backgroundColor: Colors.purpleDim,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.purpleDim,
  },

  // Name Container
  NameViewcontainer: {
    display: 'flex',
    alignSelf: 'center',
  },
  usernameContainer: {
    bottom: 0,
    right: 0,
    backgroundColor: Colors.profileColor,
    borderRadius: 60,
    padding: 5,
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  username: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // Message Box Card
  NewMessageBox: {
    height: 35,
    width: '100%',
    // backgroundColor: Colors.whiteColor,
    marginVertical: 12,
    flexDirection: 'row',
  },
});
