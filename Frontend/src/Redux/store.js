import {
  applyMiddleware,
  combineReducers,
  legacy_createStore,
  compose,
} from "redux";
import { thunk } from "redux-thunk";
import { authReducer } from "./Auth/authReducer";
import { postReducer } from "./Post/postReducer";
import { messageReducer } from "./Message/messageReducer";
import { forgotPasswordReducer } from "./ForgotPassword/forgotPasswordReducer";

// Compose middleware and DevTools extension together
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducers = combineReducers({
  auth: authReducer,
  post: postReducer,
  message: messageReducer,
  forgotPassword: forgotPasswordReducer,
});

export const store = legacy_createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(thunk))
);
