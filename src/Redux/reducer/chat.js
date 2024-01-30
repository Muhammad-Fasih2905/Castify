import * as types from '../constant/chat';

const INITIAL_STATE = {
  isLoading: false,
  isSuccess: false,

  userChatList: [],
};

export default function notificationsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    // ------------------ *** GET Chat Message List*** ------------------
    case types.API_GET_ALL_USER_CHAT_REQUEST:
      console.log('API_GET_ALL_USER_CHAT_REQUEST===>', action);

      return {
        ...state,
        isSuccess: true,
      };
    case types.API_GET_ALL_USER_CHAT_SUCCESS:
      console.log('API_GET_ALL_USER_CHAT_SUCCESS ===>', action);
      return {
        ...state,
        isSuccess: false,
        userChatList: action.response.data?.results,
      };
    case types.API_GET_ALL_USER_CHAT_FAILED:
      console.log('API_GET_ALL_USER_CHAT_FAILED ===>', action);
      return {
        ...state,
        isSuccess: false,
      };

    default:
      return state;
  }
}
