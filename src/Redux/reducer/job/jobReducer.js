import Toast from 'react-native-toast-message';
import * as types from '../../constant/job/index';
const INITIAL_STATE = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  Error: '',
  jobs: [],
  approved_jobs: [],
  appliedJobs: [],
};
export default function jobReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    //GET JOB
    case types.API_GET_JOB_REQUEST:
      console.log('API_GET_JOB_REQUEST ===>', action);
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isError: false,
      };
    case types.API_GET_JOB_SUCCESS:
      console.log('API_GET_JOB_SUCCESS ===>', action);
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        isError: false,
        jobs: action.response.data?.results,
      };
    case types.API_GET_JOB_FAILED:
      console.log('API_GET_JOB_FAILED ===>', action);
      return {
        ...state,
        isError: true,
        isSuccess: false,
        isLoading: false,
      };

    //GET JOB BY ID
    case types.API_GET_JOB_BYID_REQUEST:
      console.log('API_GET_JOB_BYID_REQUEST ===>', action);
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isError: false,
      };
    case types.API_GET_JOB_BYID_SUCCESS:
      console.log('API_GET_JOB_BYID_SUCCESS ===>', action);
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        isError: false,
        jobs: action.response.data?.results,
      };
    case types.API_GET_JOB_BYID_FAILED:
      console.log('API_GET_JOB_BYID_FAILED ===>', action);
      return {
        ...state,
        isError: true,
        isSuccess: false,
        isLoading: false,
      };

    //APPLIED FOR JOB
    case types.API_GET_APPLIED_JOB_REQUEST:
      console.log('API_GET_APPLIED_JOB_REQUEST ===>', action);

      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isError: false,
      };
    case types.API_GET_APPLIED_JOB_SUCCESS:
      console.log('API_GET_APPLIED_JOB_SUCCESS ===>', action);

      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        isError: false,
        appliedJobs: action.response.data.results,
      };
    case types.API_GET_APPLIED_JOB_FAILED:
      console.log('API_GET_APPLIED_JOB_FAILED ===>', action);

      return {
        ...state,
        isError: true,
        isSuccess: false,
        isLoading: false,
      };

    //CREATE APPLIED FOR JOB
    case types.API_POST_APPLIED_JOB_REQUEST:
      console.log('API_GET_APPLIED_JOB_REQUEST===>', action);
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isError: false,
      };
    case types.API_POST_APPLIED_JOB_SUCCESS:
      console.log('API_GET_APPLIED_JOB_SUCCESS ===>', action);
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        isError: false,
        appliedJobs: action.response.data.results,
      };
    case types.API_POST_APPLIED_JOB_FAILED:
      console.log('API_GET_APPLIED_JOB_FAILED ===>', action);
      return {
        ...state,
        isError: true,
        isSuccess: false,
        isLoading: false,
      };

    //CREATE JOB
    case types.API_CREATE_JOB_REQUEST:
      console.log('API_CREATE_JOB_REQUEST===>', action);
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isError: false,
      };
    case types.API_CREATE_JOB_SUCCESS:
      console.log('API_CREATE_JOB_SUCCESS ===>', action);
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        isError: false,
        jobs: action.response.data?.results,
      };
    case types.API_CREATE_JOB_FAILED:
      console.log('API_CREATE_JOB_FAILED ===>', action);
      return {
        ...state,
        isError: true,
        isSuccess: false,
        isLoading: false,
      };
    //APPROVED JOB
    case types.API_APPROVED_JOB_REQUEST:
      console.log('API_APPVOROVED_JOB_REQUEST===>', action);
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isError: false,
      };
    case types.API_APPROVED_JOB_SUCCESS:
      console.log('API_APPVOROVED_JOB_SUCCESS ===>', action);
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        isError: false,
        approved_jobs: action.response.data?.results,
      };
    case types.API_APPROVED_JOB_FAILED:
      console.log('API_APPVOROVED_JOB_FAILED ===>', action);
      return {
        ...state,
        isError: true,
        isSuccess: false,
        isLoading: false,
      };
    default:
      return state;
  }
}
