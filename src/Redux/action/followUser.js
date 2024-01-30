import * as types from '../constant/followUser';
import {useSelector} from 'react-redux';

// Get All Users
export const getAllUsersRequest = token => ({
  type: types.API_GET_ALL_USERS_REQUEST,
  token,
});

export const getAllUsersSuccess = response => ({
  type: types.API_GET_ALL_USERS_SUCCESS,
  response,
});

export const getAllUsersFailed = response => ({
  type: types.API_GET_ALL_USERS_FAILED,
  response,
});

// Get All Users With User ID
export const getUserIDRequest = (userId, token) => ({
  type: types.API_GET_USER_ID_REQUEST,
  userId,
  token,
});

export const getUserIDSuccess = response => ({
  type: types.API_GET_USER_ID_SUCCESS,
  response,
});

export const getUserIDFailed = response => ({
  type: types.API_GET_USER_ID_FAILED,
  response,
});

// Get All Login User Followers
export const getAllUserFollowersRequest = token => ({
  type: types.API_GET_ALL_USERS_FOLLOWER_REQUEST,
  token,
});

export const getAllUserFollowersSuccess = response => ({
  type: types.API_GET_ALL_USERS_FOLLOWER_SUCCESS,
  response,
});

export const getAllUserFollowersFailed = response => ({
  type: types.API_GET_ALL_USERS_FOLLOWER_FAILED,
  response,
});

// Get All Following Api
export const getAllFollowingRequest = (userId, token) => ({
  type: types.API_GET_ALL_FOLLOWING_REQUEST,
  userId,
  token,
});

export const getAllFollowingSuccess = response => ({
  type: types.API_GET_ALL_FOLLOWING_SUCCESS,
  response,
});

export const getAllFollowingFailed = response => ({
  type: types.API_GET_ALL_FOLLOWING_FAILED,
  response,
});

// Get All Followers Api With User id
export const getAllFollowersRequest = (userId, token) => ({
  type: types.API_GET_ALL_FOLLOWERS_REQUEST,
  userId,
  token,
});

export const getAllFollowersSuccess = response => ({
  type: types.API_GET_ALL_FOLLOWERS_SUCCESS,
  response,
});

export const getAllFollowersFailed = response => ({
  type: types.API_GET_ALL_FOLLOWERS_FAILED,
  response,
});

// Follow
export const apiPostSendFollowRequest = (data, token) => ({
  type: types.API_POST_FOLLOW_REQUEST,
  data,
  token,
});
export const apiPostSendFollowSuccess = response => ({
  type: types.API_POST_FOLLOW_SUCCESS,
  response,
});
export const apiPostSendFollowFailed = response => ({
  type: types.API_POST_FOLLOW_FAILED,
  response,
});

//DELETE Follower
export const apiDeleteFollowRequest = (data, token) => ({
  type: types.API_DELETE_FOLLOW_REQUEST,
  data,
  token,
});
export const apiDeleteFollowSuccess = (response, action) => ({
  type: types.API_DELETE_FOLLOW_SUCCESS,
  response,
  action,
});
export const apiDeleteFollowFailed = response => ({
  type: types.API_DELETE_FOLLOW_FAILED,
  response,
});

// Get APi Block User
export const apiGetBlockUserRequest = token => ({
  type: types.API_GET_BLOCK_USER_REQUEST,
  token,
});
export const apiGetBlockUserSuccess = response => ({
  type: types.API_GET_BLOCK_USER_SUCCESS,
  response,
});
export const apiGetBlockUserFailed = response => ({
  type: types.API_GET_BLOCK_USER_FAILED,
  response,
});

// DELETE Block User
export const apiDeteleBlockUserRequest = (data, token) => ({
  type: types.API_DELETE_BLOCK_USER_REQUEST,
  data,
  token,
});
export const apiDeteleBlockUserSuccess = (response, action) => ({
  type: types.API_DELETE_BLOCK_USER_SUCCESS,
  response,
  action,
});
export const apiDeteleBlockUserFailed = response => ({
  type: types.API_DELETE_BLOCK_USER_FAILED,
  response,
});

// Block User
export const apiBlockUserRequest = (token, data) => ({
  type: types.API_BLOCK_USER_REQUEST,
  token,
  data,
});
export const apiBlockUserSuccess = response => ({
  type: types.API_BLOCK_USER_SUCCESS,
  response,
});
export const apiBlockUserFailed = response => ({
  type: types.API_BLOCK_USER_FAILED,
  response,
});
