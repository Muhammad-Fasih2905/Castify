import {put, call, all, spawn, takeEvery} from 'redux-saga/effects';

import {notificationsServices} from '../service/notification';
import * as types from '../constant/notification';
import * as actions from '../action/notification';

// ------------------ *** NOTIFICATION *** ------------------

// Get Notifications
function* getNotificationsRequestWorker(action) {
  try {
    const result = yield call(
      notificationsServices.getNotificationsServiceRequest,
      action,
    );
    yield put(actions.getNotificationsSuccess(result, action));
  } catch (error) {
    yield put(actions.getNotificationsFailed(error, action));
  }
}
function* getNotificationsRequestWatcher() {
  yield takeEvery(
    types.API_GET_NOTIFICATIONS_REQUEST,
    getNotificationsRequestWorker,
  );
}

export default function* notificationsRootSaga() {
  const sagas = [getNotificationsRequestWatcher];

  yield all(
    sagas.map(saga =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (error) {
            console.log('Error', error);
          }
        }
      }),
    ),
  );
}
