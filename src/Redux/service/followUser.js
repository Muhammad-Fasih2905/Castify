import axios from 'axios';
import {appConfig} from '../config';

const API = axios.create({
  baseURL: appConfig.BASE_URL,
});

// ============= GET ALL USERS =============

function usersServiceRequest(action) {
  const headers = {Authorization: `Bearer ${action.token}`};

  return API.get(`/api/api/allUsers/`, {headers});
}

// ============= GET USER ID =============
function userIdServiceRequest(action) {
  console.log("action get by Id Services ===>",action);
  const headers = {Authorization: `Bearer ${action.token}`};
  return API.get(`/user-detail/${action.userId}/`, {headers});
}

// ============= GET ALL Follow Login USERS =============

function getFollowUsersServiceRequest(action) {
  const headers = {Authorization: `Bearer ${action.token}`};

  return API.get(`/follower/my-followers/`, {headers});
}

// ============= GET ALL Following Login USERS =============

function getFollowingUsersServiceRequest(action) {
  const headers = {Authorization: `Bearer ${action.token}`};

  return API.get(
    `/follower/followers-followings/${action.userId}/followings/`,
    {headers},
  );
}

// ============= GET ALL Follower USER With User ID =============

function getFollowerUsersServiceRequest(action) {
  const headers = {Authorization: `Bearer ${action.token}`};

  return API.get(
    `/follower/followers-followings/${action.userId}/followers/`,

    {headers},
  );
}

// ============== Follow User =============
function followUserServiceRequest(action) {
  const headers = {Authorization: `Bearer ${action.token}`};

  return API.post(`/follower/Follower/`, action.data, {headers});
}
// ======================DELETE Follow USer =========
function deletefollowUserServiceRequest(action) {
  const headers = {Authorization: `Bearer ${action.token}`};
  return API.delete(`/follower/Follower/${action.data}/`, {headers});
}

// block user api
function apiBlockUserRequest(action) {
  const headers = {
    Authorization: `Bearer ${action.token}`,
  };

  return API.post(`/api/api/BlockUser/`, action.data, {headers});
}

// GET API BLOCK USER
function apiGetBlockUserRequest(action) {
  const headers = {
    Authorization: `Bearer ${action.token}`,
  };

  return API.get(`/api/api/BlockUser/block_list/`, {headers});
}

// DElETE API BLOCK USER
function apiDeleteBlockUserRequest(action) {
  const headers = {
    Authorization: `Bearer ${action.token}`,
  };

  return API.delete(`/api/api/BlockUser/${action.data}/`, {headers});
}

export const connectionsService = {
  usersServiceRequest,
  followUserServiceRequest,
  userIdServiceRequest,
  getFollowingUsersServiceRequest,
  deletefollowUserServiceRequest,
  getFollowerUsersServiceRequest,
  apiBlockUserRequest,
  apiGetBlockUserRequest,
  apiDeleteBlockUserRequest,
  getFollowUsersServiceRequest,
};
