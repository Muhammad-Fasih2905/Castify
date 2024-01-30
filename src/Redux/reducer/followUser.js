import * as types from '../constant/followUser';

const INITIAL_STATE = {
  isLoading: false,
  isSuccess: false,
  isLoadMore: false,
  next: null,

  // ALl Users
  allUsers: [],

  // GET User ID
  IdUser: [],

  // Follow
  isRequestFollow: false,

  // All Login User Follower
  allFollowUsers: [],

  // All Following Users
  allFollowing: [],

  // All Followers With User ID
  allFollowers: [],

  // BLockUser
  blockUser: [],
};

export default function followReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    // ============= GET ALL USERS =============
    case types.API_GET_ALL_USERS_REQUEST:
      console.log('API_GET_ALL_USERS_REQUEST =>', action);
      return {
        ...state,
        isLoading: true,
      };
    case types.API_GET_ALL_USERS_SUCCESS:
      console.log('API_GET_ALL_USERS_SUCCESS =>', action);

      return {
        ...state,
        isLoading: false,
        allUsers: action.response.data.results,
      };
    case types.API_GET_ALL_USERS_FAILED:
      console.log('API_GET_ALL_USERS_FAILED =>', action);

      return {
        ...state,
        isLoading: false,
      };
    // ============= GET USERS With ID =============
    case types.API_GET_USER_ID_REQUEST:
      console.log('API_GET_USER_ID_REQUEST =>', action);

      return {
        ...state,
        isLoading: true,
      };
    case types.API_GET_USER_ID_SUCCESS:
      console.log('API_GET_USER_ID_SUCCESS =>', action);

      return {
        ...state,
        isLoading: false,
        IdUser: action.response.data,
      };
    case types.API_GET_USER_ID_FAILED:
      console.log('API_GET_USER_ID_FAILED =>', action);

      return {
        ...state,
        isLoading: false,
      };

    // ============= GET ALL Follow USERS Login =============
    case types.API_GET_ALL_USERS_FOLLOWER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.API_GET_ALL_USERS_FOLLOWER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allFollowUsers: action.response.data,
      };
    case types.API_GET_ALL_USERS_FOLLOWER_FAILED:
      return {
        ...state,
        isLoading: false,
      };

    // ============= GET ALL Following USERS =============
    case types.API_GET_ALL_FOLLOWING_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.API_GET_ALL_FOLLOWING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allFollowing: action.response.data,
      };
    case types.API_GET_ALL_FOLLOWING_FAILED:
      return {
        ...state,
        isLoading: false,
      };

    // ============= GET ALL Followers With USER ID =============
    case types.API_GET_ALL_FOLLOWERS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.API_GET_ALL_FOLLOWERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allFollowers: action.response.data,
      };
    case types.API_GET_ALL_FOLLOWERS_FAILED:
      return {
        ...state,
        isLoading: false,
      };

    // Follow
    case types.API_POST_FOLLOW_REQUEST:
      console.log('API_POST_FOLLOW_REQUEST ===>', action);
      return {
        ...state,
        isRequestFollow: true,
      };
    case types.API_POST_FOLLOW_SUCCESS:
      console.log('API_POST_FOLLOW_SUCCESS ===>', action);

      return {
        ...state,
        isRequestFollow: false,
      };
    case types.API_POST_FOLLOW_FAILED:
      console.log('API_POST_FOLLOW_FAILED ===>', action);

      return {
        ...state,
        isRequestFollow: false,
      };

    //Delete Follow
    case types.API_DELETE_FOLLOW_REQUEST:
      return {
        ...state,
        isRequestFollow: true,
      };
    case types.API_DELETE_FOLLOW_SUCCESS:
      return {
        ...state,
        allUsers: state.allUsers.map(e =>
          e.id == action.action.useruserId
            ? {
                ...e,
                is_follower: false,
              }
            : e,
        ),
      };
    case types.API_DELETE_FOLLOW_FAILED:
      return {
        ...state,
        isRequestFollow: false,
      };

    // BLOCK USER
    case types.API_BLOCK_USER_REQUEST:
      return {...state};
    case types.API_BLOCK_USER_SUCCESS:
      return {
        ...state,
      };
    case types.API_BLOCK_USER_FAILED:
      return {...state};

    //GET BLOCK USER
    case types.API_GET_BLOCK_USER_REQUEST:
      return {...state};
    case types.API_GET_BLOCK_USER_SUCCESS:
      return {
        ...state,
        blockUser: action.response.data,
      };
    case types.API_GET_BLOCK_USER_FAILED:
      return {...state};

    //DELETE BLOCK USER
    case types.API_DELETE_BLOCK_USER_REQUEST:
      return {...state};
    case types.API_DELETE_BLOCK_USER_SUCCESS:
      return {
        ...state,
        blockUser: state.blockUser.filter(f => f.id !== action.action.data),
      };
    case types.API_DELETE_BLOCK_USER_FAILED:
      return {...state};
    default:
      return state;
  }
}
