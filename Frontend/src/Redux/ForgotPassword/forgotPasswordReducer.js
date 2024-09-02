import {
  AUTH_OTP_FAILURE,
  AUTH_OTP_REQUEST,
  CHANGE_PASSWORD_FAILURE,
  CHANGE_PASSWORD_REQUEST,
  SEND_TO_EMAIL_FAILURE,
  SEND_TO_EMAIL_REQUEST,
  SEND_TO_EMAIL_SUCCESS,
} from "./forgotPasswordType";

const initialState = {
  email: "",
  error: null,
  loading: false,
};

export const forgotPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_TO_EMAIL_REQUEST:
    case AUTH_OTP_REQUEST:
    case CHANGE_PASSWORD_REQUEST:
      return { ...state, loading: true, error: null };

    case SEND_TO_EMAIL_SUCCESS:
      console.log("Reducer: email exists", action.payload);
      return { ...state, email: action.payload, loading: false, error: null };
    // case AUTH_OTP_SUCCESS:
    //   return {};
    // case CHANGE_PASSWORD_SUCCESS:
    //   return {};

    case SEND_TO_EMAIL_FAILURE:
    case AUTH_OTP_FAILURE:
    case CHANGE_PASSWORD_FAILURE:
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
};
