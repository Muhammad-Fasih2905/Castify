import {put, call, all, spawn, takeEvery} from 'redux-saga/effects';

import {chatMessagesService} from '../service/chat';
import * as types from '../constant/chat';
import * as actions from '../action/chat';

// ------------------ *** GET CHAT MESSAGES LIST *** ------------------

// Get CHAT MESSAGES LIST
function* getChatMessageListRequestWorker(action) {
  try {
    const result = yield call(
      chatMessagesService.getChatMessageListServiceRequest,
      action,
    );
    yield put(actions.getAllUserChatSuccess(result, action));
  } catch (error) {
    yield put(actions.getAllUserChatFailed(error, action));
  }
}
function* getChatMessageListRequestWatcher() {
  yield takeEvery(
    types.API_GET_ALL_USER_CHAT_REQUEST,
    getChatMessageListRequestWorker,
  );
}

export default function* notificationsRootSaga() {
  const sagas = [getChatMessageListRequestWatcher];

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
