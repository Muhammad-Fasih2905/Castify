import {put, call, all, spawn, takeEvery} from 'redux-saga/effects';

import * as types from '../constant/auth';
import * as actions from '../action/auth';

import {authService} from '../service/auth';

// // Signup
function* apiSignupRequestWorker(action) {
  try {
    const result = yield call(authService.apiSignupService, action);
    yield put(actions.api_signup_success(result, action));
  } catch (err) {
    yield put(actions.api_signup_failed(err, action));
  }
}

function* apiSignupRequestWatcher() {
  yield takeEvery(types.API_SIGNUP_REQUEST, apiSignupRequestWorker);
}

// Login
function* apiLoginRequestWorker(action) {
  try {
    const result = yield call(authService.apiLoginService, action);
    yield put(actions.api_login_success(result, action));
  } catch (err) {
    yield put(actions.api_login_failed(err, action));
  }
}

function* apiLoginRequestWatcher() {
  yield takeEvery(types.API_LOGIN_REQUEST, apiLoginRequestWorker);
}

// Password reset email
function* apiPasswordResetRequestWorker(action) {
  try {
    const result = yield call(authService.apiPasswordResetService, action);
    yield put(actions.apiPasswordResetSuccess(result, action));
  } catch (err) {
    yield put(actions.apiPasswordResetFailed(err, action));
  }
}

function* apiPasswordResetRequestWatcher() {
  yield takeEvery(
    types.API_PASSWORD_RESET_REQUEST,
    apiPasswordResetRequestWorker,
  );
}

// Password confirm
function* apiPasswordConfirmRequestWorker(action) {
  try {
    const result = yield call(authService.apiPasswordConfirmRequest, action);
    yield put(actions.apiPasswordConfirmSuccess(result, action));
  } catch (err) {
    yield put(actions.apiPasswordConfirmFailed(err, action));
  }
}

function* apiPasswordConfirmRequestWatcher() {
  yield takeEvery(types.API_PASSWORD_REQUEST, apiPasswordConfirmRequestWorker);
}

// Chnage Password
function* apiPasswordResetConfirmRequestWorker(action) {
  try {
    const result = yield call(
      authService.apiPasswordResetConfirmRequest,
      action,
    );
    yield put(actions.apiPasswordResetConfirmSuccess(result, action));
  } catch (err) {
    yield put(actions.apiPasswordResetConfirmFailed(err, action));
  }
}

function* apiPasswordResetConfirmRequestWatcher() {
  yield takeEvery(
    types.API_PASSWORD_RESET_CONFIRM_REQUEST,
    apiPasswordResetConfirmRequestWorker,
  );
}

// Patch Profile
function* apiPatchProfileRequestWorker(action) {
  try {
    const result = yield call(authService.apiPatchServiceRequest, action);
    yield put(actions.apiPatchProfileSuccess(result, action));
  } catch (error) {
    yield put(actions.apiPatchProfileFailed(error, action));
  }
}
function* apiPatchProfileRequestWatcher() {
  yield takeEvery(
    types.API_PATCH_PROFILE_REQUEST,
    apiPatchProfileRequestWorker,
  );
}

//Get PROFILE
function* apiGetProfileRequestWorker(action) {
  try {
    const result = yield call(authService.apiGetProfileServiceRequest, action);

    yield put(actions.apiGetProfileSuccess(result, action));
  } catch (err) {
    yield put(actions.apiGetProfileFailed(err, action));
  }
}
function* apiGetProfileRequestWatcher() {
  yield takeEvery(types.API_GET_PROFILE_REQUEST, apiGetProfileRequestWorker);
}

// Images Profile
function* apiImagesProfileRequestWorker(action) {
  try {
    const result = yield call(authService.apiImageServiceRequest, action);
    yield put(actions.apiImagesProfileSuccess(result, action));
  } catch (error) {
    yield put(actions.apiImagesProfileFailed(error, action));
  }
}
function* apiImagesProfileRequestWatcher() {
  yield takeEvery(
    types.API_IMAGES_PROFILE_REQUEST,
    apiImagesProfileRequestWorker,
  );
}

// feedback
function* apiFeedbackWorker(action) {
  try {
    const result = yield call(authService.apiFeedbackServicRequest, action);
    yield put(actions.apiFeedBackSucces(result, action));
  } catch (error) {
    yield put(actions.apiFeedBackFailed(error, action));
  }
}
function* apiFeedbackWatcher() {
  yield takeEvery(types.API_FEED_BACK_REQUEST, apiFeedbackWorker);
}

// TOKEN
function* apiVerfiyTokenWorker(action) {
  try {
    const result = yield call(authService.apiVerifyTokenServicRequest, action);
    yield put(actions.apiVerifyTokenSucces(result, action));
  } catch (error) {
    yield put(actions.apiVerifyTokenFailed(error, action));
  }
}
function* apiVerifyTokenWatcher() {
  yield takeEvery(types.API_Verify_TOKEN_REQUEST, apiVerfiyTokenWorker);
}
export default function* loginRootSaga() {
  const sagas = [
    apiSignupRequestWatcher,
    apiLoginRequestWatcher,
    apiImagesProfileRequestWatcher,
    apiPasswordResetRequestWatcher,
    apiPasswordResetConfirmRequestWatcher,
    apiPatchProfileRequestWatcher,
    apiGetProfileRequestWatcher,
    apiFeedbackWatcher,
    apiVerifyTokenWatcher,
    apiPasswordConfirmRequestWatcher,
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
