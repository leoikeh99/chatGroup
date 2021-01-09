import { AUTH, AUTH_FAIL, GET_USER, SET_LOADER, GET_USER_FAIL } from "../types";

export default (state, action) => {
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
        error: action.payload,
        isAuthenticated: null,
        loading: null,
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
        error: action.payload,
      };

    case SET_LOADER:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
