import * as types from '../../Redux/constant/search';

const INITIAL_STATE = {
  isLoading: false,
  isSuccess: false,
  error: null,

  users: [],
};


export default function searchReducer(state = INITIAL_STATE, action) {
    switch (action.type) {  
      // Get User SEARCH RESULT
      case types.API_GET_USER_SEARCH_REQUEST:
        return {
          ...state,
          isLoading: true
        }
      case types.API_GET_USER_SEARCH_SUCCESS:
        let users = action.response.data.results
        let usersResult = users.filter(e => e.myProfile.id !== action.userId)
  
        return {
          ...state,
          isLoading: false,
          isSuccess: true,
          users: [...usersResult]
        }
      case types.API_GET_USER_SEARCH_FAILED:
        return {
          ...state,
          isLoading: false
        }

         // Clear Search Result
    case types.CLEAR_SEARCH_RESULT:
        return {
          ...state,
          isLoading: false,
          isSuccess: false,
          error: null,
          users: [],
        }
        
    default:
        return state
    }
  }