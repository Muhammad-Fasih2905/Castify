import {put, call, all, spawn, takeEvery} from 'redux-saga/effects';

import {searchServices} from '../../Redux/service/search';
import * as types from './../constant/search';
import * as actions from './../action/search';

// Get Users SEARCH RESULT
function* apiGetUsersSearchRequestWorker(action) {
  try {
    const result = yield call(searchServices.apiGetUsersSearchRequest, action);

    yield put(actions.apiGetUserSearchSuccess(result, action));
  } catch (error) {
    yield put(actions.apiGetUserSearchFailed(error, action));
  }
}
function* apiGetUsersSearchRequestWatcher() {
  yield takeEvery(
    types.API_GET_USER_SEARCH_REQUEST,
    apiGetUsersSearchRequestWorker,
  );
}

export default function* searchRootSaga() {
  const sagas = [apiGetUsersSearchRequestWatcher];

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
