import axios from 'axios';
import {appConfig} from '../config';

const API = axios.create({
  baseURL: appConfig.BASE_URL,
});

// ------------------ *** Get CHAT MESSAGE LIST *** ------------------
// Get CHAT MESSAGES LIST
function getChatMessageListServiceRequest(action) {
  const headers = {Authorization: `Bearer ${action.token}`};

  return API.get(`/chatsApi/`, {headers});
}

export const chatMessagesService = {
  getChatMessageListServiceRequest,
};
