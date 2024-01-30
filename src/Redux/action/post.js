import * as types from '../constant/post';

// Get ALl Over User Posts
export const apiGetPostsRequest = token => ({
  type: types.API_GET_POSTS_REQUEST,
  token,
});
export const apiGetPostsSuccess = (response, action) => ({
  type: types.API_GET_POSTS_SUCCESS,
  response,
  action,
});
export const apiGetPostsFailed = response => ({
  type: types.API_GET_POSTS_FAILED,
  response,
});

// Create Post
export const apiPostCreatePostRequest = (token, data) => ({
  type: types.API_POST_CREATE_POST_REQUEST,
  token,
  data,
});
export const apiPostCreatePostSuccess = (response, action) => ({
  type: types.API_POST_CREATE_POST_SUCCESS,
  response,
  action,
});
export const apiPostCreatePostFail = response => ({
  type: types.API_POST_CREATE_POST_FAIL,
  response,
});

// Delete Post
export const apiPostDeletePostRequest = (token, postId) => ({
  type: types.API_DELETE_POST_REQUEST,
  token,
  postId,
});
export const apiPostDeletePostSuccess = (response, action) => ({
  type: types.API_DELETE_POST_SUCCESS,
  response,
  action,
});
export const apiPostDeletePosttFail = response => ({
  type: types.API_DELETE_POST_FAIL,
  response,
});

//   -------------------POST Images --------------------
export const apiPostImagesRequest = (token, data) => ({
  type: types.API_POST_IMAGES_REQUEST,
  token,
  data,
});
export const apiPostImagesSuccess = response => ({
  type: types.API_POST_IMAGES_SUCCESS,
  response,
});
export const apiPostImagesFail = response => ({
  type: types.API_POST_IMAGES_FAIL,
  response,
});

// ---------- Likes Post ----------
// GET
export const apiGetLikesPostRequest = token => {
  return {
    type: types.API_GET_POST_LIKES_REQUEST,
    token,
  };
};
export const apiGetLikesPostSuccess = response => ({
  type: types.API_GET_POST_LIKES_SUCCESS,
  response,
});
export const apiGetLikesPostFailed = response => ({
  type: types.API_GET_POST_LIKES_FAILED,
  response,
});

// Post
export const apiPostLikePostRequest = (token, data) => ({
  type: types.API_POST_LIKE_POST_REQUEST,
  token,
  data,
});
export const apiPostLikePostSuccess = response => ({
  type: types.API_POST_LIKE_POST_SUCCESS,
  response,
});
export const apiPostLikePostFailed = response => ({
  type: types.API_POST_LIKE_POST_FAILED,
  response,
});

// Delete Like
export const apiDeleteLikePostRequest = (data, token) => ({
  type: types.API_DELETE_LIKE_POST_REQUEST,
  data,
  token,
});
export const apiDeleteLikePostSuccess = (response, action) => {
  return {
    type: types.API_DELETE_LIKE_POST_SUCCESS,
    response,
    action,
  };
};
export const apiDeleteLikePostFailed = response => ({
  type: types.API_DELETE_LIKE_POST_FAILED,
  response,
});

// ---------- Comment Post ----------
// GET
export const apiGetCommentsPostRequest = (token, postId) => {
  return {
    type: types.API_GET_COMMENTS_POST_REQUEST,
    token,
    postId,
  };
};
export const apiGetCommentsPostSuccess = response => ({
  type: types.API_GET_COMMENTS_POST_SUCCESS,
  response,
});
export const apiGetCommentsPostFailed = response => ({
  type: types.API_GET_COMMENTS_POST_FAILED,
  response,
});

// // GET ID Comments
// export const apiGetPostIdCommentsPostRequest = (token, postId) => {
//   return {
//     type: types.API_GET_COMMENTS_POST_REQUEST,
//     token,
//     postId,
//   };
// };
// export const apiGetPostIdCommentsPostSuccess = response => ({
//   type: types.API_GET_COMMENTS_POST_SUCCESS,
//   response,
// });
// export const apiGetPostIdCommentsPostFailed = response => ({
//   type: types.API_GET_COMMENTS_POST_FAILED,
//   response,
// });

// POST
export const apiPostCommentsPostRequest = (token, data) => ({
  type: types.API_POST_COMMENTS_POST_REQUEST,
  token,
  data,
});
export const apiPostCommentsPostSuccess = response => ({
  type: types.API_POST_COMMENTS_POST_SUCCESS,
  response,
});
export const apiPostCommentsPostFailed = response => ({
  type: types.API_POST_COMMENTS_POST_FAILED,
  response,
});

// USER GET POST
export const apiGetUserPostRequest = (token, userID) => ({
  type: types.API_GET_POST_USER_REQUEST,
  token,
  userID,
});
export const apiGetUserPostSuccess = response => ({
  type: types.API_GET_POST_USER_SUCCESS,
  response,
});
export const apiGetUserPostFailed = response => ({
  type: types.API_GET_POST_USER_FAILED,
  response,
});

// USER Follower User GET POST
export const apiGetFollowerGetUserPostRequest = token => ({
  type: types.API_GET_FOLLOWER_USER_POST_USER_REQUEST,
  token,
});
export const apiGetFollowerGetUserPostSuccess = response => ({
  type: types.API_GET_FOLLOWER_USER_POST_USER_SUCCESS,
  response,
});
export const apiGetFollowerGetUserPostFailed = response => ({
  type: types.API_GET_FOLLOWER_USER_POST_USER_FAILED,
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
