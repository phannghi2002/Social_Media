import axios from "axios";
import { API_BASE_URL } from "../../config/api";
import {
  SEND_TO_EMAIL_FAILURE,
  SEND_TO_EMAIL_REQUEST,
  SEND_TO_EMAIL_SUCCESS,
} from "./forgotPasswordType";

export const sendEmailAction = (email) => async (dispatch) => {
  dispatch({ type: SEND_TO_EMAIL_REQUEST });
  try {
    const response = await axios.post(
      `${API_BASE_URL}/forgotPassword/verifyMail/${email}`
    );
    dispatch({ type: SEND_TO_EMAIL_SUCCESS, payload: email });
    return response.data; // Return the API response data on success
  } catch (error) {
    dispatch({ type: SEND_TO_EMAIL_FAILURE, payload: error });
    console.log("ERR", error);
    return error;
  }
};
