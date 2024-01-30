import axios from 'axios';
import {appConfig} from '../config';

const authAPI = axios.create({
  baseURL: appConfig.BASE_URL,
  headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
});

const dataToFormData = data => {
  const formData = new FormData();
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      const element = data[key];
      formData.append(key, element);
    }
  }

  return formData;
};

// SIGNUP
function apiSignupService(action) {
  const headers = {
    'Content-Type': 'multipart/form-data',
    Accept: 'application/json',
  };

  let formData = dataToFormData(action.data);
  return authAPI.post(`/api/signup/`, formData, {headers});
}

// LOGIN
function apiLoginService(action) {
  return authAPI.post(`/api/login/`, action.data);
}

// Password reset email
function apiPasswordResetService(action) {
  return authAPI.post(`/password/reset/`, action.data, null);
}

// Change Passsword
function apiPasswordResetConfirmRequest(action) {
  const headers = {Authorization: `Bearer ${action.token}`};

  return authAPI.post(`/change-password/`, action.data, {headers});
}

// Patch profile
function apiPatchServiceRequest(action) {
  const headers = {
    'Content-Type': 'multipart/form-data',
    Accept: 'application/json',
    Authorization: `Bearer ${action.token}`,
  };

  let formData = dataToFormData(action.data);

  return authAPI.patch(`/user/api/profile/`, formData, {headers});
}

// Images profile
function apiImageServiceRequest(action) {
  const headers = {
    'Content-Type': 'multipart/form-data',
    Accept: 'application/json',
    Authorization: `Bearer ${action.token}`,
  };

  let formData = dataToFormData(action.data);

  return authAPI.post(`/api/api/UserImageGallery/`, formData, {headers});
}

// Get Profile
function apiGetProfileServiceRequest(action) {
  const headers = {Authorization: `Bearer ${action.token}`};

  return authAPI.get(`/user/api/profile/`, {headers});
}

// Reset Confirm Request
function apiPasswordConfirmRequest(action) {
  return authAPI.post(`/password/reset/confirm/`, action.data, null);
}

// Feedback
function apiFeedbackServicRequest(action) {
  const headers = {Authorization: `Bearer ${action.token}`};

  return authAPI.post(`/Feedback/api/feedback/`, action.data, {headers});
}

// Verify TOKEN
function apiVerifyTokenServicRequest(action) {
  const headers = {Authorization: `Bearer ${action.token}`};

  return authAPI.post(`/token/verify/`, action.token, {headers});
}
export const authService = {
  apiSignupService,
  apiLoginService,
  apiImageServiceRequest,
  apiPasswordResetService,
  apiPasswordResetConfirmRequest,
  apiPatchServiceRequest,
  apiGetProfileServiceRequest,
  apiFeedbackServicRequest,
  apiVerifyTokenServicRequest,
  apiPasswordConfirmRequest,
};
