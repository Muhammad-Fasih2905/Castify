import firestore from '@react-native-firebase/firestore';
import {UPDATE_COUNT_NOTIFICATION} from '../Redux/constant/notification';
import {useDispatch} from 'react-redux';

const useNotificationHook = () => {
  const dispatch = useDispatch();

  const getNotificationsCount = async userId => {
    try {
      await firestore()
        .collection('notifications')
        .doc('user_' + userId)
        .onSnapshot(querySnapshot => {
          const data = querySnapshot?.data();
          if (data?.count) {
            dispatch({type: UPDATE_COUNT_NOTIFICATION, payload: data.count});
          } else {
            dispatch({type: UPDATE_COUNT_NOTIFICATION, payload: 0});
          }
        });
    } catch (error) {
      console.log('Notification Count Error', error);
    }
  };

  const handleUpdateNotificationCount = async userId => {
    try {
      const userDocRef = firestore()
        .collection('notifications')
        .doc('user_' + userId);
      const userDocSnapshot = await userDocRef.get();

      if (userDocSnapshot.exists) {
        const currentCount = userDocSnapshot.data().count || 0;
        const updatedCount = currentCount + 1;
        await userDocRef.update({count: updatedCount});
        return updatedCount;
      } else {
        console.log('User document not found, creating a new one');
        const updatedCount = 1;
        await userDocRef.set({count: updatedCount});
        return updatedCount;
      }
    } catch (error) {
      console.log('Error on Update notification count', error);
      return null;
    }
  };

  const deleteNotificationCount = async userId => {
    try {
      // Delete the notification count document
      await firestore()
        .collection('notifications')
        .doc('user_' + userId)
        .delete();

      dispatch({type: UPDATE_COUNT_NOTIFICATION, payload: 0});

      console.log('Notification count document deleted.');
    } catch (error) {
      console.error('Error deleting notification count:', error);
    }
  };

  return {
    getNotificationsCount,
    handleUpdateNotificationCount,
    deleteNotificationCount,
  };
};

export default useNotificationHook;
