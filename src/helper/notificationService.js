import {Platform} from 'react-native';
import notifee from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import navigationService from '../Navigation/navigationService';

export async function requestNotificationPermission() {
  try {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      getFCMToken();
      console.log('Notification permission granted');
    } else {
      console.log('Notification permission denied');
    }
  } catch (error) {
    console.log('Error requesting notification permission: ', error);
  }
}

async function getFCMToken() {
  let checkToken = await AsyncStorage.getItem('fcmToken');
  console.log('FCM Token ==> ', checkToken);

  if (!checkToken) {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
      console.log('FCM Token:', fcmToken);
    } catch (error) {
      console.log('Error fetching FCM token: ', error);
    }
  }
}

async function onDisplayNotification(data) {
  // Request permissions (required for iOS)
  if (Platform.OS == 'ios') {
    await notifee.requestPermission();
  }

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    sound: 'default',
  });

  // Display a notification
  await notifee.displayNotification({
    title: data?.notification?.title,
    body: data?.notification?.body,
    android: {
      channelId,
      // smallIcon: "name-of-a-small-icon", // optional, defaults to 'ic_launcher'.
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: 'default',
      },
    },
  });
}

export const notificationListener = async () => {
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    console.log('A New FCM message received!', remoteMessage);
    // navigationService.navigate("Messages");
    onDisplayNotification(remoteMessage);
  });

  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
    // navigation.navigate(remoteMessage.data.type);

    if (remoteMessage?.data && remoteMessage?.data?.redirect_to == 'Comment') {
      navigationService.navigate(Comments);
    }
    if (remoteMessage?.data && remoteMessage?.data?.redirect_to == 'Like') {
      navigationService.navigate(Home);
    }

    // setTimeout(() => {
    // }, 1200);
    console.log('Background State', remoteMessage.notification);
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
        // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        console.log('Remote Message', remoteMessage.notification);
      }
      // setLoading(false);
    });

  return unsubscribe;
};
