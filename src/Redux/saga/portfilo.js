import {put, call, all, spawn, takeEvery} from 'redux-saga/effects';

import * as types from '../constant/portfilo';
import * as actions from '../action/portfilo';

import {postServices} from '../service/portfilo';

// POst portfilo
function* apiportfiloRequestWorker(action) {
  try {
    const result = yield call(postServices.apiportfiloService, action);
    yield put(actions.api_portfilo_success(result, action));
  } catch (err) {
    yield put(actions.api_portfilo_failed(err, action));
  }
}

function* apiportfiloRequestWatcher() {
  yield takeEvery(types.API_PORTFILO_REQUEST, apiportfiloRequestWorker);
}

// Get portfilo
function* apigetportfiloRequestWorker(action) {
  try {
    const result = yield call(postServices.apigetportfiloService, action);
    yield put(actions.api_get_portfilo_success(result, action));
  } catch (err) {
    yield put(actions.api_get_portfilo_failed(err, action));
  }
}

function* apigetportfiloRequestWatcher() {
  yield takeEvery(types.API_GET_PORTFILO_REQUEST, apigetportfiloRequestWorker);
}

// Patch portfilo
function* apipatchportfiloRequestWorker(action) {
  try {
    const result = yield call(postServices.apipatchportfiloService, action);
    yield put(actions.api_patch_portfilo_success(result, action));
  } catch (err) {
    yield put(actions.api_patch_portfilo_failed(err, action));
  }
}

function* apipatchportfiloRequestWatcher() {
  yield takeEvery(
    types.API_PATCH_PORTFILO_REQUEST,
    apipatchportfiloRequestWorker,
  );
}

// Like portfilo
function* apilikeportfiloRequestWorker(action) {
  try {
    const result = yield call(postServices.apiportfiloLikeService, action);
    yield put(actions.api_portfilo_Like_success(result, action));
  } catch (err) {
    yield put(actions.api_portfilo_Like_failed(err, action));
  }
}

function* apilikeportfiloRequestWatcher() {
  yield takeEvery(
    types.API_LIKE_PORTFILO_REQUEST,
    apilikeportfiloRequestWorker,
  );
}

//Delete Like portfilo
function* apiDeletelikeportfiloRequestWorker(action) {
  try {
    const result = yield call(
      postServices.apiportfiloDeleteLikeService,
      action,
    );
    yield put(actions.api_portfilo_Delete_Like_success(result, action));
  } catch (err) {
    yield put(actions.api_portfilo_Delete_Like_failed(err, action));
  }
}

function* apiDeletelikeportfiloRequestWatcher() {
  yield takeEvery(
    types.API_DELETE_LIKE_PORTFILO_REQUEST,
    apiDeletelikeportfiloRequestWorker,
  );
}

//Rating portfilo
function* apiRatingPortfiloRequestWorker(action) {
  try {
    const result = yield call(postServices.apiratingPortfiloService, action);
    yield put(actions.api_rating_portfilo_success(result, action));
  } catch (err) {
    yield put(actions.api_rating_portfilo_failed(err, action));
  }
}

function* apiRatingPortfiloRequestWatcher() {
  yield takeEvery(
    types.API_RATING_PORTFILO_REQUEST,
    apiRatingPortfiloRequestWorker,
  );
}

export default function* loginRootSaga() {
  const sagas = [
    apiportfiloRequestWatcher,
    apigetportfiloRequestWatcher,
    apipatchportfiloRequestWatcher,
    apilikeportfiloRequestWatcher,
    apiDeletelikeportfiloRequestWatcher,
    apiRatingPortfiloRequestWatcher,
  ];

  yield all(
    sagas.map(saga =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {}
        }
      }),
    ),
  );
}
