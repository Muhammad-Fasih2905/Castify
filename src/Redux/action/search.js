import * as types from '../../Redux/constant/search';

// GET USER SEARCH RESULTS
export const apiGetUserSearchRequest = (token, data, userId) => ({
  type: types.API_GET_USER_SEARCH_REQUEST,
  token,
  data,
  userId,
});
export const apiGetUserSearchSuccess = (response, action) => ({
  type: types.API_GET_USER_SEARCH_SUCCESS,
  response,
  userId: action.userId,
});
export const apiGetUserSearchFailed = response => ({
  type: types.API_GET_USER_SEARCH_FAILED,
  response,
});


// Clear Search Result
export const clearSearchResult = () => ({
  type: types.CLEAR_SEARCH_RESULT
})

