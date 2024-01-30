import axios from 'axios';
import {appConfig} from '../config';

const API = axios.create({
  baseURL: appConfig.BASE_URL,
});

// ------------------ *** NOTIFICATION *** ------------------
// Get Notifications
function getNotificationsServiceRequest(action) {
  const headers = {Authorization: `Bearer ${action.token}`};

  return API.get(`/notifications/`, {headers});
}

export const notificationsServices = {
  getNotificationsServiceRequest,
};
