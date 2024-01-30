import {put, call, all, spawn, takeEvery} from 'redux-saga/effects';

import {jobServices} from '../../service/job';
import * as types from '../../constant/job';
import * as actions from '../../action/job/JobAction';
//GET JOB
function* getJobListRequestWorker(action) {
  try {
    const result = yield call(jobServices.getAllJobs, action);
    yield put(actions.getAllJobsSuccess(result, action));
  } catch (error) {
    yield put(actions.getAllJobsFailed(error, action));
  }
}
function* getJobListRequestWatcher() {
  yield takeEvery(types.API_GET_JOB_REQUEST, getJobListRequestWorker);
}
//GET JOB BY ID
function* getJobByIdRequestWorker(action) {
  console.log(action, 'SAGA==============');
  try {
    const result = yield call(jobServices.getJobById, action);
    yield put(actions.getJobByIdSuccess(result, action));
  } catch (error) {
    yield put(actions.getJobByIdFailed(error, action));
  }
}
function* getJobByIdListRequestWatcher() {
  yield takeEvery(types.API_GET_JOB_BYID_REQUEST, getJobByIdRequestWorker);
}
//CREATE JOB
function* createJobRequestWorker(action) {
  try {
    const result = yield call(jobServices.createJob, action);
    yield put(actions.createJobSuccess(result, action));
  } catch (error) {
    yield put(actions.createJobFailed(error, action));
  }
}
function* createJobRequestWatcher() {
  yield takeEvery(types.API_CREATE_JOB_REQUEST, createJobRequestWorker);
}
//GET APPLIED JOB
function* getAppliedJobRequestWorker(action) {
  try {
    const result = yield call(jobServices.getAppliedJob, action);
    yield put(actions.getAppliedJobSuccess(result, action));
  } catch (error) {
    yield put(actions.getAppliedJobFailed(error, action));
  }
}
function* getAppliedJobRequestWatcher() {
  yield takeEvery(
    types.API_GET_APPLIED_JOB_REQUEST,
    getAppliedJobRequestWorker,
  );
}
//POST APPLIED JOB
function* postAppliedJobRequestWorker(action) {
  try {
    const result = yield call(jobServices.postAppliedJob, action);
    yield put(actions.createAppliedJobSuccess(result, action));
  } catch (error) {
    yield put(actions.createAppliedJobFailed(error, action));
  }
}
function* postAppliedJobRequestWatcher() {
  yield takeEvery(
    types.API_POST_APPLIED_JOB_REQUEST,
    postAppliedJobRequestWorker,
  );
}
//APPROVED JOB
function* approvedJobRequestWorker(action) {
  try {
    const result = yield call(jobServices.approvedJob, action);
    yield put(actions.approvedJobSuccess(result, action));
  } catch (error) {
    yield put(actions.approvedJobFailed(error, action));
  }
}
function* approvedJobRequestWatcher() {
  yield takeEvery(types.API_APPROVED_JOB_REQUEST, approvedJobRequestWorker);
}
export default function* jobRootSaga() {
  const sagas = [
    getJobListRequestWatcher,
    getJobByIdListRequestWatcher,
    createJobRequestWatcher,
    getAppliedJobRequestWatcher,
    postAppliedJobRequestWatcher,
    approvedJobRequestWatcher,
  ];
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
