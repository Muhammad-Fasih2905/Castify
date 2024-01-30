import axios from 'axios';
import {appConfig} from '../config';

const API = axios.create({
  baseURL: appConfig.BASE_URL,
  headers: {Accept: 'application/json', 'Content-Type': 'multipart/form-data'},
});

const dataToFormData = data => {
  const formData = new FormData();
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      const element = data[key];
      if (key === 'uploaded_images' || key === 'uploaded_videos') {
        if (Array.isArray(element)) {
          for (let i = 0; i < element.length; i++) {
            formData.append(`${key}`, element[i]);
          }
        } else {
          formData.append(key, element);
        }
      } else {
        formData.append(key, element);
      }
    }
  }
  return formData;
};

// Get portfilo
function apigetportfiloService(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${action.token}`,
  };

  return API.get(`/portfolio/portfolio/${action.data}/`, {headers});
}

// Create Portfilo
function apiportfiloService(action) {
  const headers = {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${action.token}`,
  };

  let formData = dataToFormData(action.data);
  return API.post('/portfolio/portfolio/', formData, {headers});
}

// patch portfilo
function apipatchportfiloService(action) {
  const headers = {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${action.token}`,
  };
  let formData = dataToFormData(action.data);
  return API.patch(`/portfolio/portfolio/${action.USERID}/`, formData, {
    headers,
  });
}

// Like portfilo
function apiportfiloLikeService(action) {
  const headers = {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${action.token}`,
  };
  return API.post(`/portfolio/likePortfolio/`, action.data, {
    headers,
  });
}

// Delete Like portfilo
function apiportfiloDeleteLikeService(action) {
  const headers = {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${action.token}`,
  };
  return API.delete(`/portfolio/likePortfolio/${action.data}/`, {
    headers,
  });
}

function apiratingPortfiloService(action) {
  const headers = {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${action.token}`,
  };
  return API.post(`/portfolio/portfolioRating/`, action.data, {
    headers,
  });
}

export const postServices = {
  apiportfiloService,
  apigetportfiloService,
  apipatchportfiloService,
  apiportfiloLikeService,
  apiportfiloDeleteLikeService,
  apiratingPortfiloService,
};
