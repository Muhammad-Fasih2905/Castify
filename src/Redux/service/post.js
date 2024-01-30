import axios from 'axios';
import {appConfig} from '../config';

const API = axios.create({
  baseURL: appConfig.BASE_URL,
  headers: {Accept: 'application/json', 'Content-Type': 'multipart/form-data'},
});

// const dataToFormData = data => {
//   const formData = new FormData();
//   for (const key in data) {
//     if (Object.hasOwnProperty.call(data, key)) {
//       const element = data[key];
//       formData.append(key, element);
//     }
//   }

//   return formData;
// };

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

// Get Posts
function apiGetPostRequest(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${action.token}`,
  };

  return API.get(`/post/allPost/`, {headers});
}

// Create Post
function apiCreatePostRequest(action) {
  const headers = {
    'Content-Type': 'multipart/form-data',
    // Accept: 'application/json',
    Authorization: `Bearer ${action.token}`,
  };

  let formData = dataToFormData(action.data);
  return API.post('/post/post/', formData, {headers});
}

// Delete Post
function apiDeletePostRequest(action) {
  const headers = {
    Authorization: `Bearer ${action.token}`,
  };

  return API.delete(`/post/post/${action.postId}/`, {headers});
}

// Images Post
function apiImagesPostRequest(action) {
  const headers = {
    'Content-Type': 'multipart/form-data',
    Accept: 'application/json',
    Authorization: `Bearer ${action.token}`,
  };

  let formData = dataToFormData(action.data);
  return API.post('/post/Picture/', formData, {headers});
}

// Get User Posts
function apiGetUserPostRequest(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${action.token}`,
  };

  return API.get(`/post/post/user-posts/?id=${action.userID}`, {headers});
}

// Get Folower User Posts
function apiGetFollowerUserPostRequest(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${action.token}`,
  };

  return API.get(`/post/post/`, {headers});
}

// ----------Post Likes ----------
// GET Likes
function apiGetLikesPostRequest(action) {
  const headers = {
    Authorization: `Bearer ${action.token}`,
  };

  return API.get(`/Post/api/likePost/`, {headers});
}

// Post Like
function apiPostLikePostRequest(action) {
  const headers = {
    Authorization: `Bearer ${action.token}`,
  };

  return API.post(`/post/likePost/`, action.data, {headers});
}

// DELETE Like
function apiDeleteLikePostRequest(action) {
  const headers = {
    Authorization: `Bearer ${action.token}`,
  };

  return API.delete(`/post/likePost/${action.data.my_like}/`, {headers});
}

// function apiDeleteLikePostRequest(action) {
//   const headers = {
//     Authorization: `Bearer ${action.token}`,
//   };

//   return API.delete(`/Post/api/likePost/${action.data}/`, {headers});
// }

// ---------- Comments ----------
// GET
function apiGetCommentsPostRequest(action) {
  const headers = {
    Authorization: `Bearer ${action.token}`,
  };

  return API.get(`/post/commentPost/${action.postId}`, {headers});
  // return API.get(`/post/commentPost/`, {headers});
}

// POST
function apiPostCommentsPostRequest(action) {
  const headers = {
    Authorization: `Bearer ${action.token}`,
  };

  return API.post(`/post/commentPost/`, action.data, {headers});
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
export const postServices = {
  apiGetPostRequest,
  apiCreatePostRequest,
  apiDeletePostRequest,
  apiImagesPostRequest,
  apiGetLikesPostRequest,
  apiPostLikePostRequest,
  apiDeleteLikePostRequest,
  apiGetCommentsPostRequest,
  apiPostCommentsPostRequest,
  apiGetUserPostRequest,
  apiBlockUserRequest,
  apiGetBlockUserRequest,
  apiDeleteBlockUserRequest,
  apiGetFollowerUserPostRequest,
};
