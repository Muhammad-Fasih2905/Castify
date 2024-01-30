import * as types from '../constant/portfilo';

// POst
export const api_portfilo_request = (token, data) => ({
  type: types.API_PORTFILO_REQUEST,
  token,
  data,
});
export const api_portfilo_success = response => ({
  type: types.API_PORTFILO_SUCCESS,
  response,
});
export const api_portfilo_failed = response => ({
  type: types.API_PORTFILO_FAILED,
  response,
});

// Get
export const api_get_portfilo_request = (token, data) => ({
  type: types.API_GET_PORTFILO_REQUEST,
  token,
  data,
});
export const api_get_portfilo_success = response => ({
  type: types.API_GET_PORTFILO_SUCCESS,
  response,
});
export const api_get_portfilo_failed = response => ({
  type: types.API_GET_PORTFILO_FAILED,
  response,
});

// patch
export const api_patch_portfilo_request = (token, data, USERID) => ({
  type: types.API_PATCH_PORTFILO_REQUEST,
  token,
  data,
  USERID,
});
export const api_patch_portfilo_success = response => ({
  type: types.API_PATCH_PORTFILO_SUCCESS,
  response,
});
export const api_patch_portfilo_failed = response => ({
  type: types.API_PATCH_PORTFILO_FAILED,
  response,
});

// Like
export const api_portfilo_Like_request = (token, data) => ({
  type: types.API_LIKE_PORTFILO_REQUEST,
  token,
  data,
});
export const api_portfilo_Like_success = response => ({
  type: types.API_LIKE_PORTFILO_SUCCESS,
  response,
});
export const api_portfilo_Like_failed = response => ({
  type: types.API_LIKE_PORTFILO_FAILED,
  response,
});

//Delete Like
export const api_portfilo_Delete_Like_request = (token, data) => ({
  type: types.API_DELETE_LIKE_PORTFILO_REQUEST,
  token,
  data,
});
export const api_portfilo_Delete_Like_success = response => ({
  type: types.API_DELETE_LIKE_PORTFILO_SUCCESS,
  response,
});
export const api_portfilo_Delete_Like_failed = response => ({
  type: types.API_DELETE_LIKE_PORTFILO_FAILED,
  response,
});

//rating Portfilo
export const api_rating_portfilo_request = (token, data) => ({
  type: types.API_RATING_PORTFILO_REQUEST,
  token,
  data,
});
export const api_rating_portfilo_success = response => ({
  type: types.API_RATING_PORTFILO_SUCCESS,
  response,
});
export const api_rating_portfilo_failed = response => ({
  type: types.API_RATING_PORTFILO_FAILED,
  response,
});
