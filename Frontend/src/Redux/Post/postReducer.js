import {
  CREATE_COMMENT_SUCCESS,
  CREATE_POST_FAILURE,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  DELETE_POST_FAILURE,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  GET_ALL_POST_FAILURE,
  GET_ALL_POST_REQUEST,
  GET_ALL_POST_SUCCESS,
  GET_POST_CLICKED_FAILURE,
  GET_POST_CLICKED_REQUEST,
  GET_POST_CLICKED_SUCCESS,
  GET_USERS_POST_REQUEST,
  GET_USERS_POST_SUCCESS,
  LIKE_POST_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  SAVE_POST_FAILURE,
  SAVE_POST_REQUEST,
  SAVE_POST_SUCCESS,
} from "./postType";

const initialState = {
  post: null,
  loading: false,
  error: null,
  posts: [],
  deletePostStatus: false,
  save: null,
  like: null,
  postsMine: [],
  newComment: null,
  // postClicked: null,
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_POST_REQUEST:
    case GET_ALL_POST_REQUEST:
    case LIKE_POST_REQUEST:
    case GET_USERS_POST_REQUEST:
    case SAVE_POST_REQUEST:
    case GET_POST_CLICKED_REQUEST:
      return { ...state, error: null, loading: true };

    //thay doi trang thai ve false boi neu ban dau xoa 1 cai bai post neu thanh cong thi no chuyen tu false thanh true
    //va neu xoa them bai post nua thi luc nay chua cap nhat lai trang thai post moi thi no van la true, khi xoa thanh
    //cong thi no lai request va lai thuc hien thanh cong thi luc nay van la trang thai true => post.deletePostStatus
    //khong thay doi trang thai, do do no se khong thuc hien lai render bai post o MiddlePart
    case DELETE_POST_REQUEST:
      return { ...state, error: null, loading: true, deletePostStatus: false };

    case CREATE_POST_SUCCESS:
      return {
        ...state,
        post: action.payload,
        posts: [action.payload, ...state.posts],
        loading: false,
        error: null,
      };

    case GET_POST_CLICKED_SUCCESS:
      return {
        ...state,
        // postClicked: action.payload,
        post: action.payload,
        loading: false,
        error: null,
      };

    case DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
        deletePostStatus: true,
        loading: false,
        error: null,
      };

    case GET_USERS_POST_SUCCESS:
      return {
        ...state,
        postsMine: action.payload,
        loading: false,
        error: null,
      };
    case GET_ALL_POST_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        // comments: action.payload.comments,
        loading: false,
        error: null,
      };

    case LIKE_POST_SUCCESS:
      return {
        ...state,
        like: action.payload,
        posts: state.posts.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
        loading: false,
        error: null,
      };

    case SAVE_POST_SUCCESS:
      return {
        ...state,
        save: action.payload,
        posts: state.posts.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
        loading: false,
        error: null,
      };

    case CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        newComment: action.payload,

        loading: false,
        error: null,
      };

    case DELETE_POST_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
        deletePostStatus: false,
      };

    case CREATE_POST_FAILURE:
    case GET_ALL_POST_FAILURE:
    case LIKE_POST_FAILURE:
    case SAVE_POST_FAILURE:
    case GET_POST_CLICKED_FAILURE:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};
