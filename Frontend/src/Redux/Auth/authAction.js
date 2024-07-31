import axios from "axios";
import { API_BASE_URL, api } from "../../config/api";
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

export const loginUserAction = (loginData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/auth/signin`,
      loginData.data
    );
    console.log("chi ro data nay", data);
    dispatch({ type: LOGIN_SUCCESS, payload: data.token });

    if (data.token) {
      localStorage.setItem("jwt", data.token);
    }
    console.log("login success", data);
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error });
    return error;
  }
};

export const registerUserAction = (loginData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/auth/signup`,
      loginData.data
    );
    if (data.token) {
      localStorage.setItem("jwt", data.token);
    }
    console.log("register", data);
    dispatch({ type: REGISTER_SUCCESS, payload: data.token });
  } catch (error) {
    console.log("-----", error);
    dispatch({ type: REGISTER_FAILURE, payload: error });
    return error;
  }
};

export const getProfileAction = (jwt) => async (dispatch) => {
  dispatch({ type: GET_PROFILE_REQUEST });
  console.log("ma jwt", jwt);
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    console.log("profile ----", data);
    dispatch({ type: GET_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    console.log("-----", error);
    dispatch({ type: GET_PROFILE_FAILURE, payload: error });
  }
};

export const updateProfileAction = (reqData) => async (dispatch) => {
  dispatch({ type: UPDATE_PROFILE_REQUEST });

  try {
    const { data } = await api.put(`${API_BASE_URL}/api/users`, reqData);

    console.log("update profile ----", data);
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    console.log("-----", error);
    dispatch({ type: UPDATE_PROFILE_FAILURE, payload: error });
  }
};

export const searchUser = (query) => async (dispatch) => {
  dispatch({ type: SEARCH_USER_REQUEST });

  try {
    const { data } = await api.get(`/api/users/search?query9=${query}`);

    console.log("search user", data);
    dispatch({ type: SEARCH_USER_SUCCESS, payload: data });
  } catch (error) {
    console.log("-----", error);
    dispatch({ type: SEARCH_USER_FAILURE, payload: error });
  }
};

export const getAllUser = () => async (dispatch) => {
  dispatch({ type: GET_ALL_USER_REQUEST });

  try {
    const { data } = await api.get("api/users");
    dispatch({ type: GET_ALL_USER_SUCCESS, payload: data });
  } catch (error) {
    console.log("error", error);
    dispatch({ type: GET_ALL_USER_FAILURE, payload: error });
  }
};

export const followUnfollowUser = (userId) => async (dispatch) => {
  dispatch({ type: FOLLOW_UNFOLLOW_USER_REQUEST });

  try {
    const { data } = await api.put(`/api/users/follow/${userId}`);
    dispatch({ type: FOLLOW_UNFOLLOW_USER_SUCCESS, payload: data });
  } catch (error) {
    console.log("error", error);
    dispatch({ type: FOLLOW_UNFOLLOW_USER_FAILURE, payload: error });
  }
};
