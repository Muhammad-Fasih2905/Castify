import {put, call, all, spawn, takeEvery} from 'redux-saga/effects';

import {connectionsService} from '../service/followUser';
import * as types from '../constant/followUser';
import * as actions from '../action/followUser';
// import * as searchAction from "./../../actions/search"

// ============= GET ALL USERS =============
function* usersRequestWorker(action) {
  try {
    const result = yield call(connectionsService.usersServiceRequest, action);

    yield put(actions.getAllUsersSuccess(result, action));
  } catch (error) {
    yield put(actions.getAllUsersFailed(error, action));
  }
}
function* usersRequestWatcher() {
  yield takeEvery(types.API_GET_ALL_USERS_REQUEST, usersRequestWorker);
}

// ============= GET USER ID =============
function* userIdRequestWorker(action) {
  try {
    const result = yield call(connectionsService.userIdServiceRequest, action);

    yield put(actions.getUserIDSuccess(result, action));
  } catch (error) {
    yield put(actions.getUserIDFailed(error, action));
  }
}
function* userIdRequestWatcher() {
  yield takeEvery(types.API_GET_USER_ID_REQUEST, userIdRequestWorker);
}

// ============= GET ALL Follow Login USERS =============
function* getFollowUsersRequestWorker(action) {
  try {
    const result = yield call(
      connectionsService.getFollowUsersServiceRequest,
      action,
    );

    yield put(actions.getAllUserFollowersSuccess(result, action));
  } catch (error) {
    yield put(actions.getAllUserFollowersFailed(error, action));
  }
}
function* getFollowUsersRequestWatcher() {
  yield takeEvery(
    types.API_GET_ALL_USERS_FOLLOWER_REQUEST,
    getFollowUsersRequestWorker,
  );
}

// ============= GET ALL Following USERS =============
function* getFollowingUsersRequestWorker(action) {
  try {
    const result = yield call(
      connectionsService.getFollowingUsersServiceRequest,
      action,
    );

    yield put(actions.getAllFollowingSuccess(result, action));
  } catch (error) {
    yield put(actions.getAllFollowingFailed(error, action));
  }
}
function* getFollowingUsersRequestWatcher() {
  yield takeEvery(
    types.API_GET_ALL_FOLLOWING_REQUEST,
    getFollowingUsersRequestWorker,
  );
}

// ============= GET ALL Followers With USERS ID =============
function* getFollowerUsersRequestWorker(action) {
  try {
    const result = yield call(
      connectionsService.getFollowerUsersServiceRequest,
      action,
    );

    yield put(actions.getAllFollowersSuccess(result, action));
  } catch (error) {
    yield put(actions.getAllFollowersFailed(error, action));
  }
}
function* getFollowerUsersRequestWatcher() {
  yield takeEvery(
    types.API_GET_ALL_FOLLOWERS_REQUEST,
    getFollowerUsersRequestWorker,
  );
}

// Follow User
function* followUserRequestWorker(action) {
  try {
    const result = yield call(
      connectionsService.followUserServiceRequest,
      action,
    );
    // yield put(actions.updateUsersFollowState(result, action))
    yield put(actions.apiPostSendFollowSuccess(result, action));
  } catch (error) {
    yield put(actions.apiPostSendFollowFailed(error, action));
  }
}
function* followUserRequestWatcher() {
  yield takeEvery(types.API_POST_FOLLOW_REQUEST, followUserRequestWorker);
}

// DELETE Follow User
function* deletefollowUserRequestWorker(action) {
  try {
    const result = yield call(
      connectionsService.deletefollowUserServiceRequest,
      action,
    );
    yield put(actions.apiDeleteFollowSuccess(result, action));
  } catch (error) {
    yield put(actions.apiDeleteFollowFailed(error, action));
  }
}
function* deletefollowUserRequestWatcher() {
  yield takeEvery(
    types.API_DELETE_FOLLOW_REQUEST,
    deletefollowUserRequestWorker,
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
export default function* connectionsRootSaga() {
  const sagas = [
    usersRequestWatcher,
    userIdRequestWatcher,
    followUserRequestWatcher,
    getFollowingUsersRequestWatcher,
    getFollowerUsersRequestWatcher,
    deletefollowUserRequestWatcher,
    apiBlockUserWatcher,
    apiGetBlockUserWatcher,
    apiDeleteBlockUserWatcher,
    getFollowUsersRequestWatcher,
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
