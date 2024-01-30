import {put, call, all, spawn, takeEvery} from 'redux-saga/effects';

import {postServices} from '../service/post';
import * as types from '../constant/post';
import * as actions from '../action/post';

// Get Posts
function* apiGetPostRequestWorker(action) {
  try {
    const result = yield call(postServices.apiGetPostRequest, action);

    yield put(actions.apiGetPostsSuccess(result, action));
  } catch (error) {
    yield put(actions.apiGetPostsFailed(error, action));
  }
}
function* apiGetPostRequestWatcher() {
  yield takeEvery(types.API_GET_POSTS_REQUEST, apiGetPostRequestWorker);
}

// Create Post
function* apiCreatePostRequestWorker(action) {
  try {
    const result = yield call(postServices.apiCreatePostRequest, action);
    yield put(actions.apiPostCreatePostSuccess(result, action));
    // yield put(actions.apiGetPostsRequest(action.token));
  } catch (error) {
    yield put(actions.apiPostCreatePostFail(error, action));
  }
}
function* apiCreatePostRequestWatcher() {
  yield takeEvery(
    types.API_POST_CREATE_POST_REQUEST,
    apiCreatePostRequestWorker,
  );
}

// Delete Post
function* apiDeletePostRequestWorker(action) {
  try {
    const result = yield call(postServices.apiDeletePostRequest, action);
    yield put(actions.apiPostDeletePostSuccess(result, action));
  } catch (error) {
    yield put(actions.apiPostDeletePosttFail(error, action));
  }
}
function* apiDeletePostRequestWatcher() {
  yield takeEvery(types.API_DELETE_POST_REQUEST, apiDeletePostRequestWorker);
}

// Images Post
function* apiImagesPostRequestWorker(action) {
  try {
    const result = yield call(postServices.apiImagesPostRequest, action);
    yield put(actions.apiPostImagesSuccess(result, action));
  } catch (error) {
    yield put(actions.apiPostImagesFail(error, action));
  }
}
function* apiImagesPostRequestWatcher() {
  yield takeEvery(types.API_POST_IMAGES_REQUEST, apiImagesPostRequestWorker);
}

// Get User Post
function* apiGetUserPostRequestWorker(action) {
  try {
    const result = yield call(postServices.apiGetUserPostRequest, action);

    yield put(actions.apiGetUserPostSuccess(result, action));
  } catch (error) {
    yield put(actions.apiGetUserPostFailed(error, action));
  }
}
function* apiGetUserPostRequestWatcher() {
  yield takeEvery(types.API_GET_POST_USER_REQUEST, apiGetUserPostRequestWorker);
}

// Get User Post
function* apiGetFollowerUserPostRequestWorker(action) {
  try {
    const result = yield call(
      postServices.apiGetFollowerUserPostRequest,
      action,
    );

    yield put(actions.apiGetFollowerGetUserPostSuccess(result, action));
  } catch (error) {
    yield put(actions.apiGetFollowerGetUserPostFailed(error, action));
  }
}
function* apiGeFollowertUserPostRequestWatcher() {
  yield takeEvery(
    types.API_GET_FOLLOWER_USER_POST_USER_REQUEST,
    apiGetFollowerUserPostRequestWorker,
  );
}

// ----------Post Likes ----------
// Get
function* apiGetLikesPostRequestWorker(action) {
  try {
    const result = yield call(postServices.apiGetLikesPostRequest, action);

    yield put(actions.apiGetLikesPostSuccess(result, action));
  } catch (error) {
    yield put(actions.apiGetLikesPostFailed(error, action));
  }
}
function* apiGetLikesPostRequestWatcher() {
  yield takeEvery(
    types.API_GET_POST_LIKES_REQUEST,
    apiGetLikesPostRequestWorker,
  );
}

// Post
function* apiPostLikePostRequestWorker(action) {
  try {
    const result = yield call(postServices.apiPostLikePostRequest, action);

    yield put(actions.apiPostLikePostSuccess(result, action));
  } catch (error) {
    yield put(actions.apiPostLikePostFailed(error, action));
  }
}
function* apiPostLikePostRequestWatcher() {
  yield takeEvery(
    types.API_POST_LIKE_POST_REQUEST,
    apiPostLikePostRequestWorker,
  );
}

// DELETE
function* apiDeleteLikePostRequestWatcher(action) {
  try {
    const result = yield call(postServices.apiDeleteLikePostRequest, action);

    yield put(actions.apiDeleteLikePostSuccess(result, action));
    yield put(actions.apiGetPostsRequest(action.token));
  } catch (error) {
    yield put(actions.apiDeleteLikePostFailed(error, action));
  }
}
function* apiDeleteLikePostRequestWorker() {
  yield takeEvery(
    types.API_DELETE_LIKE_POST_REQUEST,
    apiDeleteLikePostRequestWatcher,
  );
}

// ---------- Comments ----------
// GET
function* apiGetCommentsPostRequestWorker(action) {
  try {
    const result = yield call(postServices.apiGetCommentsPostRequest, action);

    yield put(actions.apiGetCommentsPostSuccess(result, action));
  } catch (error) {
    yield put(actions.apiGetCommentsPostFailed(error, action));
  }
}
function* apiGetCommentsPostRequestWatcher() {
  yield takeEvery(
    types.API_GET_COMMENTS_POST_REQUEST,
    apiGetCommentsPostRequestWorker,
  );
}

// POST
function* apiPostCommentsPostRequestWorker(action) {
  try {
    const result = yield call(postServices.apiPostCommentsPostRequest, action);

    yield put(actions.apiPostCommentsPostSuccess(result, action));
  } catch (error) {
    yield put(actions.apiPostCommentsPostFailed(error, action));
  }
}
function* apiPostCommentsPostRequestWatcher() {
  yield takeEvery(
    types.API_POST_COMMENTS_POST_REQUEST,
    apiPostCommentsPostRequestWorker,
  );
}

// BLOCK USER POST API
function* apiBlockUserWorker(action) {
  try {
    const result = yield call(postServices.apiBlockUserRequest, action);

    yield put(actions.apiBlockUserSuccess(result, action));
  } catch (error) {
    yield put(actions.apiBlockUserFailed(error, action));
  }
}
function* apiBlockUserWatcher() {
  yield takeEvery(types.API_BLOCK_USER_REQUEST, apiBlockUserWorker);
}

//GET API BLOCK USER
function* apiGetBlockUserWorker(action) {
  try {
    const result = yield call(postServices.apiGetBlockUserRequest, action);

    yield put(actions.apiGetBlockUserSuccess(result, action));
  } catch (error) {
    yield put(actions.apiGetBlockUserFailed(error, action));
  }
}
function* apiGetBlockUserWatcher() {
  yield takeEvery(types.API_GET_BLOCK_USER_REQUEST, apiGetBlockUserWorker);
}

//DELETE API BLOCK USER
function* apiDeleteBlockUserWorker(action) {
  try {
    const result = yield call(postServices.apiDeleteBlockUserRequest, action);

    yield put(actions.apiDeteleBlockUserSuccess(result, action));
  } catch (error) {
    yield put(actions.apiDeteleBlockUserFailed(error, action));
  }
}
function* apiDeleteBlockUserWatcher() {
  yield takeEvery(
    types.API_DELETE_BLOCK_USER_REQUEST,
    apiDeleteBlockUserWorker,
  );
}

export default function* postRootSaga() {
  const sagas = [
    apiGetPostRequestWatcher,
    apiImagesPostRequestWatcher,
    apiCreatePostRequestWatcher,
    apiDeletePostRequestWatcher,
    apiGetLikesPostRequestWatcher,
    apiPostLikePostRequestWatcher,
    apiDeleteLikePostRequestWorker,
    apiPostCommentsPostRequestWatcher,
    apiGetCommentsPostRequestWatcher,
    apiGetUserPostRequestWatcher,
    apiBlockUserWatcher,
    apiGetBlockUserWatcher,
    apiDeleteBlockUserWatcher,
    apiGeFollowertUserPostRequestWatcher,
  ];

  yield all(
    sagas.map(saga =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (error) {}
        }
      }),
    ),
  );
}
