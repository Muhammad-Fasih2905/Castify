import * as types from '../constant/auth';

export const api_signup_request = data => ({
  type: types.API_SIGNUP_REQUEST,
  data,
});
export const api_signup_success = response => ({
  type: types.API_SIGNUP_SUCCESS,
  response,
});
export const api_signup_failed = response => ({
  type: types.API_SIGNUP_FAILED,
  response,
});

export const api_login_request = data => ({
  type: types.API_LOGIN_REQUEST,
  data,
});
export const api_login_success = response => ({
  type: types.API_LOGIN_SUCCESS,
  response,
});
export const api_login_failed = response => ({
  type: types.API_LOGIN_FAILED,
  response,
});

// logout
export const clearToken = () => ({
  type: types.CLEAR_TOKEN,
});

export const signupToastTimeout = () => ({
  type: types.CLEAR_TOAST_TIMEOUT,
});

// Password reset confirm
export const apiPasswordResetConfirmRequest = (token, data) => ({
  type: types.API_PASSWORD_RESET_CONFIRM_REQUEST,
  token,
  data,
});

export const apiPasswordResetConfirmSuccess = response => ({
  type: types.API_PASSWORD_RESET_CONFIRM_SUCCESS,
  response,
});

export const apiPasswordResetConfirmFailed = response => ({
  type: types.API_PASSWORD_RESET_CONFIRM_FAILED,
  response,
});

export const setLoginCallBack = payload => ({
  type: types.LOGIN_CALLBACK,
  payload,
});

// Request password reset
export const apiPasswordResetRequest = data => ({
  type: types.API_PASSWORD_RESET_REQUEST,
  data,
});

export const apiPasswordResetSuccess = response => ({
  type: types.API_PASSWORD_RESET_SUCCESS,
  response,
});

export const apiPasswordResetFailed = response => ({
  type: types.API_PASSWORD_RESET_FAILED,
  response,
});

// Password  confirm
export const apiPasswordConfirmRequest = data => ({
  type: types.API_PASSWORD_REQUEST,
  data,
});

export const apiPasswordConfirmSuccess = response => ({
  type: types.API_PASSWORD_SUCCESS,
  response,
});

export const apiPasswordConfirmFailed = response => ({
  type: types.API_PASSWORD_FAILED,
  response,
});

// Patch Profile
export const apiPatchProfileRequest = (data, token) => ({
  type: types.API_PATCH_PROFILE_REQUEST,
  data,
  token,
});

export const apiPatchProfileSuccess = response => ({
  type: types.API_PATCH_PROFILE_SUCCESS,
  response,
});

export const apiPatchProfileFailed = response => ({
  type: types.API_PATCH_PROFILE_FAILED,
  response,
});

//Get Profile
export const apiGetProfileRequest = token => ({
  type: types.API_GET_PROFILE_REQUEST,
  token,
});

export const apiGetProfileSuccess = response => ({
  type: types.API_GET_PROFILE_SUCCESS,
  response,
});

export const apiGetProfileFailed = response => ({
  type: types.API_GET_PROFILE_FAILED,
  response,
});

// Feedback
export const apiFeedBackRequest = (data, token) => ({
  type: types.API_FEED_BACK_REQUEST,
  data,
  token,
});

export const apiFeedBackSucces = response => ({
  type: types.API_FEED_BACK_SUCCESS,
  response,
});

export const apiFeedBackFailed = response => ({
  type: types.API_FEED_BACK_FAILED,
  response,
});

// Token

export const apiVerifyTokenRequest = token => ({
  type: types.API_Verify_TOKEN_REQUEST,
  token,
});

export const apiVerifyTokenSucces = response => ({
  type: types.API_Verify_TOKEN_SUCCESS,
  response,
});

export const apiVerifyTokenFailed = response => ({
  type: types.API_Verify_TOKEN_FAILED,
  response,
});

// Images Profile
export const apiImagesProfileRequest = (data, token) => ({
  type: types.API_IMAGES_PROFILE_REQUEST,
  data,
  token,
});

export const apiImagesProfileSuccess = response => ({
  type: types.API_IMAGES_PROFILE_SUCCESS,
  response,
});

export const apiImagesProfileFailed = response => ({
  type: types.API_IMAGES_PROFILE_FAILED,
  response,
});
