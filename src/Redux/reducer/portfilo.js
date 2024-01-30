import * as types from '../constant/portfilo';
import Toast from 'react-native-toast-message';

const INITIAL_STATE = {
  get_portfilo: null,
  portfilo_update: null,
  portfilo_created: null,
  isPortfilo: false,
  portfilo_loading: false,
  portfilo_error: null,
};

export default function loginApiReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    // ============================ Create Post Portfilo=============================
    case types.API_PORTFILO_REQUEST:
      console.log('API_PORTFILO_REQUEST ==>', action);
      Toast.show({
        type: 'info',
        text1: 'Portfilo Request',
      });
      return {
        ...state,
        portfilo_loading: true,
        isPortfilo: true,
      };
    case types.API_PORTFILO_SUCCESS:
      console.log('API_PORTFILO_SUCCESS ==>', action);
      Toast.show({
        type: 'success',
        text1: 'Portfilo Successful',
      });

      return {
        ...state,
        isPortfilo: true,
        portfilo_loading: false,
        get_portfilo: action.response?.data,
      };
    case types.API_PORTFILO_FAILED:
      console.log('API_PORTFILO_FAILED ==>', action);
      Toast.show({
        type: 'error',
        text1: `You donot created again portfilo`,
      });
      return {
        ...state,
        isPortfilo: false,
        portfilo_loading: false,
        portfilo_error: action.response?.data?.detail,
      };
    // ==============================Get Portfilo========================
    case types.API_GET_PORTFILO_REQUEST:
      return {
        ...state,
      };
    case types.API_GET_PORTFILO_SUCCESS:
      return {
        ...state,
        get_portfilo: action?.response?.data?.results[0],
      };
    case types.API_GET_PORTFILO_FAILED:
      return {
        ...state,
      };

    // ==============================Patch Portfilo========================
    case types.API_PATCH_PORTFILO_REQUEST:
      console.log('API_PATCH_PORTFILO_REQUEST ==>', action);
      Toast.show({
        type: 'info',
        text1: 'Portfilo Edit Request',
      });
      return {
        ...state,
        portfilo_loading: true,
        isPortfilo: false,
      };
    case types.API_PATCH_PORTFILO_SUCCESS:
      console.log('API_PATCH_PORTFILO_SUCCESS ==>', action);
      Toast.show({
        type: 'success',
        text1: 'Portfilo Edit Successful',
      });
      return {
        ...state,
        portfilo_loading: false,
        isPortfilo: true,
        get_portfilo: action?.response?.data,
      };
    case types.API_PATCH_PORTFILO_FAILED:
      console.log('API_PATCH_PORTFILO_FAILED ==>', action);
      return {
        ...state,
        isPortfilo: false,
        portfilo_loading: false,
      };
    // ==============================Like Portfilo========================
    case types.API_LIKE_PORTFILO_REQUEST:
      return {
        ...state,
      };
    case types.API_LIKE_PORTFILO_SUCCESS:
      let addLikePortfilo = {
        ...state?.get_portfilo,
        my_like: true,
        likes_count: state?.get_portfilo?.likes_count + 1,
      };

      return {
        ...state,
        get_portfilo: addLikePortfilo,
      };
    case types.API_LIKE_PORTFILO_FAILED:
      console.log('API_LIKE_PORTFILO_FAILED ==>', action);
      return {
        ...state,
      };
    // ============================== Delete Like Portfilo========================
    case types.API_DELETE_LIKE_PORTFILO_REQUEST:
      return {
        ...state,
      };
    case types.API_DELETE_LIKE_PORTFILO_SUCCESS:
      let disLikePortfilo = {
        ...state?.get_portfilo,
        my_like: false,
        likes_count: state?.get_portfilo?.likes_count - 1,
      };
      return {
        ...state,
        get_portfilo: disLikePortfilo,
      };
    case types.API_DELETE_LIKE_PORTFILO_FAILED:
      console.log('API_DELETE_LIKE_PORTFILO_FAILED ==>', action);
      return {
        ...state,
      };
    // ============================== rating Portfilo Post========================
    case types.API_RATING_PORTFILO_REQUEST:
      console.log('API_RATING_PORTFILO_REQUEST ==>', action);

      return {
        ...state,
      };
    case types.API_RATING_PORTFILO_SUCCESS:
      console.log('API_RATING_PORTFILO_SUCCESS ==>', action);

      return {
        ...state,
        // get_portfilo: disLikePortfilo,
      };
    case types.API_RATING_PORTFILO_FAILED:
      console.log('API_RATING_PORTFILO_FAILED ==>', action);
      return {
        ...state,
      };

    case 'UPDATE_PORTFOLIO':
      return {
        ...state,
        get_portfilo: action.payload,
      };
    default:
      return state;
  }
}
