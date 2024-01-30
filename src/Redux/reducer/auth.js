import AsyncStorage from '@react-native-async-storage/async-storage';
import * as types from '../constant/auth';
import Toast from 'react-native-toast-message';
// import {mapErrorMessage} from '../../utils/mapErrorMessage';

const INITIAL_STATE = {
  signupLoad: false,
  signup_success: false,

  loginLoad: false,
  login_success: false,
  error: false,
  token: '',
  users: [],
  user: null,
  loginErr: '',

  confirm_pass: false,
  user_information: null,
  organisation_data: null,
  profile_update: false,
  personal_profile: null,
  profileUsernameUpdateError: '',

  // Profile Images

  profileImages: [],

  //Login Loader
  loginLoader: false,
  signupLoader: false,

  // feedback
  feedback: '',
  //Signup Success Show Toast
  signupToast: false,
};

export default function loginApiReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.API_SIGNUP_REQUEST:
      Toast.show({
        type: 'info',
        text1: 'Signup Request',
        text2: 'Sending Signup request...',
      });
      return {
        ...state,
        signupLoad: true,
        signup_success: false,
        signupLoader: true,
        signupToast: false,
      };
    case types.API_SIGNUP_SUCCESS:
      AsyncStorage.setItem('token', action.response?.data?.access_token);
      Toast.show({
        type: 'success',
        text1: 'Signup Successful',
        text2: 'You have successfully Signup.',
      });

      return {
        ...state,
        signupLoad: false,
        signup_success: true,
        login_success: true,
        signupLoader: false,
        signupToast: true,
        token: action.response?.data?.access_token,
        user: action.response.data?.user,
      };
    case types.API_SIGNUP_FAILED:
      Toast.show({
        type: 'error',
        text1: `${
          action?.response?.response?.data?.email || 'Something Went Wrong'
        }`,
      });
      return {
        ...state,
        signupLoad: false,
        signup_success: false,
        signupLoader: false,
        signupToast: false,
      };

    case types.API_LOGIN_REQUEST:
      console.log('API_LOGIN_REQUEST ===>', action);
      Toast.show({
        type: 'info',
        text1: 'Login Request',
        text2: 'Sending login request...',
      });
      return {
        ...state,
        login_success: false,
        isLoading: true,
        loginLoader: true,
      };
    case types.API_LOGIN_SUCCESS:
      AsyncStorage.setItem('token', action.response?.data?.access_token);
      // localStorage.setItem("user", JSON.stringify(action.response?.data?.user));
      Toast.show({
        type: 'success',
        text1: 'Login Successful',
        text2: 'You have successfully logged in.',
      });
      return {
        ...state,
        error: false,
        isLoading: false,
        success: true,
        login_success: true,
        loginLoader: false,
        loginErr: '',
        token: action.response?.data?.access_token,
        user: action.response.data?.user,
      };
    case types.API_LOGIN_FAILED:
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: 'Invalid credentials.',
      });
      return {
        ...state,
        isLoading: false,
        success: false,
        // loginErr: action.response.response.data.non_field_errors[0],
        error: true,
        loginLoader: false,
      };

    case 'CLEAR_SIGNUP':
      return {
        ...state,
        signupLoad: false,
      };
    case 'CLEAR_LOGIN':
      return {
        ...state,
        loginLoad: false,
      };
    // logoutClearToken
    case types.CLEAR_TOKEN:
      return {
        isLoading: false,
        success: false,
        error: null,
        token: null,
        user: null,
        user_information: null,
        organisation_data: null,
      };

    //Signup Toast
    case types.CLEAR_TOAST_TIMEOUT:
      return {
        ...state,
        signupToast: false,
      };
    case types.LOGIN_CALLBACK:
      return {
        ...state,
        loginCallback: action.payload,
      };
    // Request Password Reset Confirm
    case types.API_PASSWORD_RESET_CONFIRM_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: false,
        error: null,
      };
    case types.API_PASSWORD_RESET_CONFIRM_SUCCESS:
      // const resetConfirmSuccessToast = () => {
      //   ToastAndroid.show(
      //     "Password has been changed successfully!",
      //     ToastAndroid.SHORT
      //   )
      // }
      // if (action.response.status === 200) {
      //   resetConfirmSuccessToast()
      // }
      return {
        ...state,
        isLoading: false,
        confirm_pass: true,
        error: null,
        reset: true,
      };
    case types.API_PASSWORD_RESET_CONFIRM_FAILED:
      return {
        ...state,
        isLoading: false,
        success: false,
        // error: mapErrorMessage(action),
      };
    case types.API_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: false,
        error: null,
      };
    case types.API_PASSWORD_SUCCESS:
      // const resetConfirmSuccessToast = () => {
      //   ToastAndroid.show(
      //     "Password has been changed successfully!",
      //     ToastAndroid.SHORT
      //   )
      // }
      // if (action.response.status === 200) {
      //   resetConfirmSuccessToast()
      // }
      return {
        ...state,
        isLoading: false,
        confirm_pass: true,
        error: null,
        reset: true,
      };
    case types.API_PASSWORD_FAILED:
      return {
        ...state,
        isLoading: false,
        success: false,
      };
    case types.SET_USER_INFORMATION:
      return {
        ...state,
        user_information: action.data,
      };

    // Request password reset
    case types.API_PASSWORD_RESET_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: false,
        error: null,
      };
    case types.API_PASSWORD_RESET_SUCCESS:
      // const resetSuccessToast = () => {
      //   ToastAndroid.show(
      //     "Please check your email for token..",
      //     ToastAndroid.SHORT
      //   )
      // }
      // if (action.response.status === 200) {
      //   resetSuccessToast()
      // }
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };
    case types.API_PASSWORD_RESET_FAILED:
      // const resetToast = () => {
      //   ToastAndroid.show("Something went wrong..", ToastAndroid.SHORT)
      // }
      // resetToast()
      return {
        ...state,
        isLoading: false,
        success: false,
        // error: mapErrorMessage(action),
      };

    // Get Profile
    case types.API_GET_PROFILE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case types.API_GET_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
        personal_profile: action.response.data,
      };
    case types.API_GET_PROFILE_FAILED:
      return {
        ...state,
        isLoading: false,
        // error: mapErrorMessage(action),
      };

    // Patch Profile
    case types.API_PATCH_PROFILE_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: false,
        profile_update: false,
        error: null,
      };
    case types.API_PATCH_PROFILE_SUCCESS:
      Toast.show({
        type: 'success',
        text1: 'Changes Saved.',
      });
      return {
        ...state,
        isLoading: false,
        success: true,
        profile_update: true,
        error: null,
        personal_profile: action.response.data,
      };
    case types.API_PATCH_PROFILE_FAILED:
      const errorMessage =
        action.response && action.response.data
          ? action.response.data.username.join(', ') // Assuming the error message is an array
          : 'User with this username already exists.';
      return {
        ...state,
        isLoading: false,
        success: false,
        profileUsernameUpdateError: errorMessage,
        // error: mapErrorMessage(action),
      };

    // Images Profile
    case types.API_IMAGES_PROFILE_REQUEST:
      console.log('API_IMAGES_PROFILE_REQUEST ==>', action);
      return {
        ...state,
        isLoading: true,
        success: false,
      };
    case types.API_IMAGES_PROFILE_SUCCESS:
      console.log('API_IMAGES_PROFILE_SUCCESS ===>', action);
      // let Images = action.response.data;
      Toast.show({
        type: 'success',
        text1: 'Changes Saved.',
        // profileImages: [...state.profileImages, Images],
      });
      return {
        ...state,
        isLoading: false,
        success: true,
      };
    case types.API_IMAGES_PROFILE_FAILED:
      console.log('API_IMAGES_PROFILE_FAILED ==>', action);
      return {
        ...state,
        isLoading: false,
        success: false,
      };
    // FeedBack
    case types.API_FEED_BACK_REQUEST:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
      };
    case types.API_FEED_BACK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        feedback: action.response.data,
      };
    case types.API_FEED_BACK_FAILED:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };

    // Verify TOKEN
    case types.API_Verify_TOKEN_REQUEST:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
      };
    case types.API_Verify_TOKEN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
      };
    case types.API_Verify_TOKEN_FAILED:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };

    case 'CLEAR_ERROR':
      return {
        ...state,
        profileUsernameUpdateError: '',
      };

    default:
      return state;
  }
}
