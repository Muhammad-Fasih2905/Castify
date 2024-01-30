import * as types from '../constant/post';
import Toast from 'react-native-toast-message';

const INITIAL_STATE = {
  isLoading: false,
  isSuccess: false,
  postSend: false,
  error: null,
  isLoadmore: false,
  allPosts: null,
  userGetPosts: null,
  followerUserPost: [],
  progressLoading: false,

  // BLockUser
  blockUser: [],

  // Image Array
  imageArray: [],
  homeLoaderpost: false,

  // Likes
  reaction: {isActive: false},
  loadLikes: false,
  loadMoreLikes: false,
  likesNext: null,
  likes: [],

  // Comments
  loadComments: false,
  loadMoreComments: false,
  comments: [],
};

export default function postReducer(state = INITIAL_STATE, action) {
  // Get Posts
  switch (action.type) {
    case types.API_GET_POSTS_REQUEST:
      return {
        ...state,
        isLoading: true,
        homeLoaderpost: true,
      };
    case types.API_GET_POSTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        allPosts: action.response.data,
        homeLoaderpost: false,
      };
    case types.API_GET_POSTS_FAILED:
      return {
        ...state,
        isLoading: false,
        allPosts: null,
        homeLoaderpost: false,
      };

    // Create Post
    case types.API_POST_CREATE_POST_REQUEST:
      console.log('API_POST_CREATE_POST_REQUEST ==>', action);
      // Toast.show({
      //   type: 'info',
      //   text1: 'Post Create Request',
      //   text2: 'Sending Post Create request...',
      // });
      return {
        ...state,
        progressLoading: true,
        isLoading: true,
        isSuccess: false,
      };
    case types.API_POST_CREATE_POST_SUCCESS:
      console.log('API_POST_CREATE_POST_SUCCESS ==>', action.response);
      Toast.show({
        type: 'success',
        text1: 'Post Create',
        text2: 'Your Post Create has been successfully loaded.',
      });

      // action.action.navigation.goBack();

      return {
        ...state,
        isLoading: true,
        progressLoading: false,
        postSend: true,
        isSuccess: true,
        userGetPosts: {
          ...state.userGetPosts,
          results: [action.response.data, ...state.userGetPosts?.results],
        },
        allPosts: {
          ...state.allPosts,
          results: [action.response.data, ...state.allPosts?.results],
        },
      };
    case types.API_POST_CREATE_POST_FAIL:
      console.log('API_POST_CREATE_POST_FAIL ==>', action);
      Toast.show({
        type: 'error',
        text1: 'Post Create Failed',
        text2: 'Invaild data sending.',
      });
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        postSend: false,
      };

    // DELETE Post
    case types.API_DELETE_POST_REQUEST:
      // Toast.show({
      //   type: 'info',
      //   text1: 'Post Delete Request',
      //   text2: 'Sending Post Delete request...',
      // });
      return {
        ...state,
      };
    case types.API_DELETE_POST_SUCCESS:
      Toast.show({
        type: 'success',
        text1: 'Post Delete',
        text2: 'Your Post Delete has been successfully.',
      });
      return {
        ...state,
        isLoading: false,
        postSend: true,
        isSuccess: true,
        allPosts: {
          ...state.allPosts,
          results: state.allPosts?.results?.filter(
            e => e.id !== action.action.postId,
          ),
        },
        userGetPosts: {
          ...state.userGetPosts,
          results: state.userGetPosts?.results?.filter(
            e => e.id !== action.action.postId,
          ),
        },
      };
    case types.API_DELETE_POST_FAIL:
      Toast.show({
        type: 'error',
        text1: 'Post Delete Failed',
        text2: 'Failed !!.',
      });
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        postSend: false,
      };
    //  Post Images
    case types.API_POST_IMAGES_REQUEST:
      console.log('API_POST_IMAGES_REQUEST ==>', action);
      let imageID = action.response.data.id;
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        imageArray: [...state.imageArray, imageID],
      };
    case types.API_POST_IMAGES_SUCCESS:
      console.log('API_POST_IMAGES_SUCCESS ===>', action);
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
      };
    case types.API_POST_IMAGES_FAIL:
      console.log('API_POST_IMAGES_FAIL ==>', action);
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };

    // =====================Post Likes ===============================
    // GET
    case types.API_GET_POST_LIKES_REQUEST:
      return {
        ...state,
        loadLikes: true,
      };
    case types.API_GET_POST_LIKES_SUCCESS:
      return {
        ...state,
        likes: [...state.likes, ...action.response.data.results],
        likesNext: action.response.data,
        loadLikes: false,
        loadMoreLikes: false,
      };
    case types.API_GET_POST_LIKES_FAILED:
      return {
        ...state,
        likes: [],
        loadLikes: false,
        loadMoreLikes: false,
      };

    // Post
    case types.API_POST_LIKE_POST_REQUEST:
      return {...state};
    case types.API_POST_LIKE_POST_SUCCESS:
      let addLikeAllPost = {
        ...state.allPosts,
        results: state.allPosts?.results?.map(e =>
          e.id === action.response.data.post
            ? {
                ...e,
                my_like: action.response.data.id,
                likeEmoji: action.response.data.likeEmoji,
                likes_count: e.likes_count + 1,
                hahaha_likes: action.response.data?.hahaha_likes,
                heart_likes: action.response.data?.heart_likes,
                thumbUp_likes: action.response.data?.thumbUp_likes,
              }
            : e,
        ),
      };

      let addLikeUserPosts = {
        ...state.userGetPosts,
        results: state.userGetPosts?.results?.map(e =>
          e.id == action.response.data.post
            ? {
                ...e,
                my_like: action.response.data.id,
                likeEmoji: action.response.data.likeEmoji,
                likes_count: e.likes_count + 1,
                hahaha_likes: action.response.data?.hahaha_likes,
                heart_likes: action.response.data?.heart_likes,
                thumbUp_likes: action.response.data?.thumbUp_likes,
              }
            : e,
        ),
      };

      return {
        ...state,
        allPosts: addLikeAllPost,
        userGetPosts: addLikeUserPosts,
      };
    case types.API_POST_LIKE_POST_FAILED:
      Toast.show({
        type: 'error',
        text1: 'Like Post Failed',
        text2: 'Failed !!.',
      });

      return {...state};

    // USER GET Post
    case types.API_GET_POST_USER_REQUEST:
      return {...state, isLoading: true, isSuccess: false};
    case types.API_GET_POST_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        userGetPosts: action.response.data,
      };
    case types.API_GET_POST_USER_FAILED:
      return {...state, isLoading: false, isSuccess: false};

    //Follower USER GET Post
    case types.API_GET_FOLLOWER_USER_POST_USER_REQUEST:
      return {...state, isLoading: true, isSuccess: false};
    case types.API_GET_FOLLOWER_USER_POST_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        followerUserPost: action.response.data.results,
      };
    case types.API_GET_FOLLOWER_USER_POST_USER_FAILED:
      return {...state, isLoading: false, isSuccess: false};

    // DISLIKE API
    case types.API_DELETE_LIKE_POST_REQUEST:
      return {
        ...state,
      };
    case types.API_DELETE_LIKE_POST_SUCCESS:
      let removeLikeAllPost = state.allPosts?.results?.map(e =>
        e.my_like == action.action.data.my_like
          ? {...e, likeEmoji: '', my_like: ''}
          : e,
      );
      let removeLikeUserPosts = state.userGetPosts?.results?.map(e =>
        e.my_like == action.action.data.my_like
          ? {...e, likeEmoji: '', my_like: ''}
          : e,
      );

      return {
        ...state,
        // allPosts: removeLikeAllPost,
        // userGetPosts: removeLikeUserPosts,
      };
    case types.API_DELETE_LIKE_POST_FAILED:
      return {
        ...state,
      };

    // ===================== Comments ===============================
    // GET
    case types.API_GET_COMMENTS_POST_REQUEST:
      return {
        ...state,
        loadComments: true,
      };
    case types.API_GET_COMMENTS_POST_SUCCESS:
      return {
        ...state,
        comments: action.response.data.results,
        loadComments: false,
      };
    case types.API_GET_COMMENTS_POST_FAILED:
      return {
        ...state,
        loadComments: false,
        loadMoreComments: false,
      };

    // POST
    case types.API_POST_COMMENTS_POST_REQUEST:
      return {...state};
    case types.API_POST_COMMENTS_POST_SUCCESS:
      const newComment = action.response.data;
      // Update the comments count in allPosts array
      // const updateCommentAllPost = {
      //   ...state.allPosts,
      //   results: state.allPosts.map(post => {
      //     if (post.id === newComment.post) {
      //       return {
      //         ...post,
      //         comments_count: (post.comments_count || 0) + 1,
      //       };
      //     }
      //     return post;
      //   }),
      // };
      // const updatedAllPosts = {
      //   ...state.userGetPosts,
      //   results: state.allPosts.map(post => {
      //     if (post.id === newComment.post) {
      //       return {
      //         ...post,
      //         comments_count: (post.comments_count || 0) + 1,
      //       };
      //     }
      //     return post;
      //   }),
      // };
      return {
        ...state,
        // comments: [...state.comments, action.response.data],
        comments: [...state.comments, newComment],
        // allPosts: updateCommentAllPost,
        // userGetPosts: updatedAllPosts,
      };
    case types.API_POST_COMMENTS_POST_FAILED:
      return {...state};

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
