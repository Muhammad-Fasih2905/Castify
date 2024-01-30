import * as types from '../constant/chat';

// Get All Users
export const getAllUserChatRequest = token => ({
  type: types.API_GET_ALL_USER_CHAT_REQUEST,
  token,
});

export const getAllUserChatSuccess = response => ({
  type: types.API_GET_ALL_USER_CHAT_SUCCESS,
  response,
});

export const getAllUserChatFailed = response => ({
  type: types.API_GET_ALL_USER_CHAT_FAILED,
  response,
});
