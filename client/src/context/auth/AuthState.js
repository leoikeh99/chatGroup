import React, { useReducer } from "react";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";
import { AUTH, AUTH_FAIL, GET_USER, SET_LOADER, GET_USER_FAIL } from "../types";
import axios from "axios";
import setAuthToken from "../../functions/setAuthToken";

const AuthState = (props) => {
  const initialState = {
    loading: true,
    error: null,
    user: null,
    isAuthenticated: null,
    token: localStorage.getItem("token"),
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const setLoader = () => dispatch({ type: SET_LOADER });

  const auth = async (type, data) => {
    const config = {
      header: {
        " Content-Type": "application/json",
      },
    };
    setLoader();
    try {
      const res = await axios.post(`/api/auth/${type}`, data, config);
      dispatch({ type: AUTH, payload: res.data });
    } catch (err) {
      dispatch({ type: AUTH_FAIL, payload: err.response.data.msg });
    }
  };

  const getUser = async () => {
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    }
    setLoader();
    try {
      const res = await axios.get("/api/auth");
      dispatch({ type: GET_USER, payload: res.data });
    } catch (err) {
      dispatch({ type: GET_USER_FAIL, payload: err.response.data.msg });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loading: state.loading,
        error: state.error,
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        auth,
        getUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
