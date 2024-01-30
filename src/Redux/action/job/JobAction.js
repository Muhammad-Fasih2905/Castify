import Toast from 'react-native-toast-message';
import * as types from '../../constant/job';
// Get All Jobs
export const getAllJobs = token => ({
  type: types.API_GET_JOB_REQUEST,
  token,
});
export const getAllJobsSuccess = response => ({
  type: types.API_GET_JOB_SUCCESS,
  response,
});
export const getAllJobsFailed = response => ({
  type: types.API_GET_JOB_FAILED,
  response,
});

// Get All Jobs BY ID
export const getJobByIdRequest = (token, id) => {
  console.log('getJobById', token, id);
  return {
    type: types.API_GET_JOB_BYID_REQUEST,
    token,
    id,
  };
};
export const getJobByIdSuccess = response => {
  console.log('getJobByIdSuccess', response);
  return {
    type: types.API_GET_JOB_BYID_SUCCESS,
    response,
  };
};
export const getJobByIdFailed = response => {
  console.log('getJobByIdSuccess', response);
  return {
    type: types.API_GET_JOB_BYID_FAILED,
    response,
  };
};

// Get APPLIED JOBS
export const getAppliedJobRequest = token => ({
  type: types.API_GET_APPLIED_JOB_REQUEST,
  token,
});
export const getAppliedJobSuccess = response => ({
  type: types.API_GET_APPLIED_JOB_SUCCESS,
  response,
});
export const getAppliedJobFailed = response => ({
  type: types.API_GET_APPLIED_JOB_FAILED,
  response,
});

// POST APPLIED JOBS
export const createAppliedJobRequest = (token, data) => {
  console.log(token, data, 'createAppliedJobRequest=========>');
  return {
    type: types.API_POST_APPLIED_JOB_REQUEST,
    token,
    data,
  };
};
export const createAppliedJobSuccess = response => {
  console.log(response, 'createAppliedJobSuccess=========>');
  Toast.show({
    type: 'success',
    text1: 'Job',
    text2: 'Applied for job successfully',
  });
  return {
    type: types.API_POST_APPLIED_JOB_SUCCESS,
    response,
  };
};
export const createAppliedJobFailed = response => {
  console.log(response, 'createAppliedJobFailed=========>');
  return {
    type: types.API_POST_APPLIED_JOB_FAILED,
    response,
  };
};

// CREATE JOB
export const createJobRequest = (token, data) => {
  return {
    type: types.API_CREATE_JOB_REQUEST,
    token,
    data,
  };
};
export const createJobSuccess = response => {
  Toast.show({
    type: 'success',
    text1: 'Job',
    text2: 'Job has been created',
  });
  return {
    type: types.API_CREATE_JOB_SUCCESS,
    response,
  };
};
export const createJobFailed = response => {
  return {
    type: types.API_CREATE_JOB_FAILED,
    response,
  };
};
// APPROVED JOB
export const approvedJobRequest = (token, data) => {
  return {
    type: types.API_APPROVED_JOB_REQUEST,
    token,
    data,
  };
};
export const approvedJobSuccess = response => {
  Toast.show({
    type: 'success',
    text1: 'Job',
    text2: 'Job has been created',
  });
  return {
    type: types.API_APPROVED_JOB_SUCCESS,
    response,
  };
};
export const approvedJobFailed = response => {
  return {
    type: types.API_APPROVED_JOB_FAILED,
    response,
  };
};
