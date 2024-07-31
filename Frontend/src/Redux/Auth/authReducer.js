import {
  FOLLOW_UNFOLLOW_USER_FAILURE,
  FOLLOW_UNFOLLOW_USER_REQUEST,
  FOLLOW_UNFOLLOW_USER_SUCCESS,
  GET_ALL_USER_FAILURE,
  GET_ALL_USER_REQUEST,
  GET_ALL_USER_SUCCESS,
  GET_PROFILE_FAILURE,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  SEARCH_USER_FAILURE,
  SEARCH_USER_REQUEST,
  SEARCH_USER_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
} from "./authType";

const initialState = {
  jwt: null,
  error: null,
  loading: false,
  user: null,
  searchUser: [],
  allUser: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case GET_PROFILE_REQUEST:
    case GET_ALL_USER_REQUEST:
    case SEARCH_USER_REQUEST:
    case UPDATE_PROFILE_REQUEST:
    case FOLLOW_UNFOLLOW_USER_REQUEST:
      return { ...state, loading: true, error: null };

    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return { ...state, loading: false, jwt: action.payload, error: null };

    case GET_ALL_USER_SUCCESS:
      return { ...state, loading: false, allUser: action.payload, error: null };

    case SEARCH_USER_SUCCESS:
      return {
        ...state,
        searchUser: action.payload,
        loading: false,
        error: null,
      };

    case GET_PROFILE_SUCCESS:
    case UPDATE_PROFILE_SUCCESS:
    case FOLLOW_UNFOLLOW_USER_SUCCESS:
      return { ...state, user: action.payload, error: null, loading: false };

    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
    case GET_PROFILE_FAILURE:
    case GET_ALL_USER_FAILURE:
    case SEARCH_USER_FAILURE:
    case UPDATE_PROFILE_FAILURE:
    case FOLLOW_UNFOLLOW_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
