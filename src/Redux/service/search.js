import axios from 'axios';
import {appConfig} from '../../Redux/config';

const API = axios.create({
  baseURL: appConfig.BASE_URL,
  headers: {Accept: 'application/json', 'Content-Type': 'multipart/form-data'},
});

// Get Users Search
function apiGetUsersSearchRequest(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${action.token}`,
  };

  return API.get(`/api/api/allUsers/?search=${action.data}`, {
    headers,
  });
}

export const searchServices = {
  apiGetUsersSearchRequest,
};
