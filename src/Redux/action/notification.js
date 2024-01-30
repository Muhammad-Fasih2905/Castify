import * as types from '../constant/notification';

// ------------------ *** NOTIFICATION *** ------------------
// Get Notifications
export const getNotificationsRequest = token => ({
  type: types.API_GET_NOTIFICATIONS_REQUEST,
  token,
});
export const getNotificationsSuccess = response => ({
  type: types.API_GET_NOTIFICATIONS_SUCCESS,
  response,
});
export const getNotificationsFailed = response => ({
  type: types.API_GET_NOTIFICATIONS_FAILED,
  response,
});
