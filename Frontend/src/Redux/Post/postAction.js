import { api } from "../../config/api";
import {
  CREATE_COMMENT_FAILURE,
  CREATE_COMMENT_REQUEST,
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
  GET_USERS_POST_FAILURE,
  GET_USERS_POST_REQUEST,
  GET_USERS_POST_SUCCESS,
  LIKE_POST_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
} from "./postType";

export const createPostAction = (postData) => async (dispatch) => {
  console.log("dang lam create post");
  dispatch({ type: CREATE_POST_REQUEST });
  try {
    const { data } = await api.post("/api/posts", postData);
    dispatch({ type: CREATE_POST_SUCCESS, payload: data });
    console.log("create post", data);
  } catch (error) {
    console.log("error", error);
    dispatch({ type: CREATE_POST_FAILURE, payload: error });
  }
};

export const getAllPostAction = () => async (dispatch) => {
  dispatch({ type: GET_ALL_POST_REQUEST });
  try {
    const { data } = await api.get("/api/posts");
    dispatch({ type: GET_ALL_POST_SUCCESS, payload: data });
    console.log("get all post", data);
  } catch (error) {
    console.log("error", error);
    dispatch({ type: GET_ALL_POST_FAILURE, payload: error });
  }
};

// export const getUserPostAction = (userId) => async (dispatch) => {
//   dispatch({ type: GET_USERS_POST_REQUEST });
//   try {
//     const { data } = await api.get(`/api/posts/user/${userId}`);
//     dispatch({ type: GET_USERS_POST_SUCCESS, payload: data });
//   } catch (error) {
//     console.log("error", error);
//     dispatch({ type: GET_USERS_POST_FAILURE, payload: error });
//   }
// };

export const getUserPostAction = () => async (dispatch) => {
  dispatch({ type: GET_USERS_POST_REQUEST });
  try {
    const { data } = await api.get("/api/posts/user");
    dispatch({ type: GET_USERS_POST_SUCCESS, payload: data });
  } catch (error) {
    console.log("error", error);
    dispatch({ type: GET_USERS_POST_FAILURE, payload: error });
  }
};

export const likePostAction = (postId) => async (dispatch) => {
  dispatch({ type: LIKE_POST_REQUEST });
  try {
    const { data } = await api.put(`/api/posts/like/${postId}`);
    dispatch({ type: LIKE_POST_SUCCESS, payload: data });
    console.log("like post", data);
  } catch (error) {
    console.log("error", error);
    dispatch({ type: LIKE_POST_FAILURE, payload: error });
  }
};

//CREATE COMMENT

export const createCommentAction = (reqData) => async (dispatch) => {
  console.log("dang lam create comment", reqData);
  dispatch({ type: CREATE_COMMENT_REQUEST });
  try {
    const { data } = await api.post(
      `api/comments/post/${reqData.postId}`,
      reqData.data
    );
    dispatch({ type: CREATE_COMMENT_SUCCESS, payload: data });
    console.log("create comment", data);
  } catch (error) {
    console.log("error", error);
    dispatch({ type: CREATE_COMMENT_FAILURE, payload: error });
  }
};

//DELETE POST

export const deletePostAction = (postId) => async (dispatch) => {
  dispatch({ type: DELETE_POST_REQUEST });
  try {
    const { data } = await api.delete(`/api/posts/${postId}`);
    dispatch({ type: DELETE_POST_SUCCESS });
    console.log("thuc hien xoa post", data);
  } catch (error) {
    console.log("error", error);
    dispatch({ type: DELETE_POST_FAILURE, payload: error });
  }
};

//GET_POST_CLICKED
export const getPostClickedAction = (postId) => async (dispatch) => {
  dispatch({ type: GET_POST_CLICKED_REQUEST });
  try {
    const { data } = await api.get(`/api/posts/${postId}`);
    dispatch({ type: GET_POST_CLICKED_SUCCESS, payload: data });
    console.log("thuc hien lay bai post", data);
  } catch (error) {
    console.log("error", error);
    dispatch({ type: GET_POST_CLICKED_FAILURE, payload: error });
  }
};
