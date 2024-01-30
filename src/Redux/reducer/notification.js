import * as types from '../constant/notification';

const INITIAL_STATE = {
  isLoading: false,
  isSuccess: false,

  notifications: [],

  //notificationCount
  notificationCount: 0,
};

export default function notificationsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    // ------------------ *** NOTIFICATION FIreabase Hook*** ------------------
    case types.UPDATE_COUNT_NOTIFICATION:
      return {
        ...state,
        notificationCount: action.payload,
      };
    // ------------------ *** Backend NOTIFICATION *** ------------------
    // Get Notifications
    case types.API_GET_NOTIFICATIONS_REQUEST:
      // console.log('Notifications REQUEST ===>', action);
      return {
        ...state,
        isSuccess: false,
        notifications: [],
      };
    case types.API_GET_NOTIFICATIONS_SUCCESS:
      // console.log('Notifications SUCCESS ===>', action);
      // let count = action.response.data.results.filter(f => f.is_read == false).length
      return {
        ...state,
        isSuccess: true,
        notifications: action.response.data.results,
      };
    case types.API_GET_NOTIFICATIONS_FAILED:
      // console.log('Notifications FAILED ===>', action);
      return {
        ...state,
        isSuccess: false,
      };

    default:
      return state;
  }
}
