import {
  AUTH,
  AUTH_FAIL,
  GET_USER,
  SET_LOADER,
  SET_LOADER3,
  GET_USER_FAIL,
  UPDATE_PROFILE,
  UPDATE_PROFILE_FAIL,
  SET_LOADER2,
  CLEAR_ERROR,
  LOGOUT,
} from "../types";

const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        error: null,
        isAuthenticated: true,
        loading: null,
      };
    case AUTH_FAIL:
      return {
        ...state,
        token: null,
        error:
          action.payload !== "server error" &&
          action.payload !== "Unauthorized, token needed for authorization"
            ? action.payload
            : null,
        isAuthenticated: null,
        loading: null,
        loading3: null,
      };

    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        loading: null,
        isAuthenticated: null,
        token: null,
        loading3: null,
      };

    case GET_USER:
      return {
        ...state,
        user: action.payload,
        loading: null,
        isAuthenticated: true,
        error: null,
      };

    case GET_USER_FAIL:
      return {
        ...state,
        user: null,
        loading: null,
        isAuthenticated: null,
        error:
          action.payload !== "server error" &&
          action.payload !== "Unauthorized, token needed for authorization"
            ? action.payload
            : null,
        loading3: null,
      };

    case UPDATE_PROFILE:
      return {
        ...state,
        status: { type: "success", msg: action.payload.msg },
        user: { ...state.user, ...action.payload.user2 },
        loading2: null,
      };

    case UPDATE_PROFILE_FAIL:
      return {
        ...state,
        status: { type: "info", msg: action.payload },
        loading2: null,
      };

    case SET_LOADER:
      return {
        ...state,
        loading: true,
      };

    case SET_LOADER2:
      return {
        ...state,
        loading2: true,
      };

    case SET_LOADER3:
      return {
        ...state,
        loading3: true,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;
