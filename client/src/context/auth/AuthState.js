import React, { useReducer } from "react";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";
import {
  AUTH,
  AUTH_FAIL,
  GET_USER,
  SET_LOADER,
  SET_LOADER2,
  SET_LOADER3,
  GET_USER_FAIL,
  UPDATE_PROFILE,
  UPDATE_PROFILE_FAIL,
  CLEAR_ERROR,
  LOGOUT,
} from "../types";
import axios from "axios";
import setAuthToken from "../../functions/setAuthToken";

const AuthState = (props) => {
  const initialState = {
    loading: true,
    loading2: null,
    loading3: null,
    error: null,
    user: null,
    isAuthenticated: null,
    status: null,
    token: localStorage.getItem("token"),
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const setLoader = () => dispatch({ type: SET_LOADER });
  const setLoader2 = () => dispatch({ type: SET_LOADER2 });
  const setLoader3 = () => dispatch({ type: SET_LOADER3 });
  const clearError = () => dispatch({ type: CLEAR_ERROR });
  const logout = () => dispatch({ type: LOGOUT });

  const auth = async (type, data) => {
    const config = {
      header: {
        " Content-Type": "application/json",
      },
    };
    setLoader();
    setLoader3();
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
    setLoader3();
    try {
      const res = await axios.get("/api/auth");
      dispatch({ type: GET_USER, payload: res.data });
    } catch (err) {
      dispatch({ type: GET_USER_FAIL, payload: err.response.data.msg });
    }
  };

  const updateProfile = async (formData) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    const config = {
      header: {
        "Content-Type": "multipart/form-data",
      },
    };
    setLoader2();
    try {
      const res = await axios.put("/api/user", formData, config);
      dispatch({ type: UPDATE_PROFILE, payload: res.data });
    } catch (err) {
      dispatch({ type: UPDATE_PROFILE_FAIL, payload: err.response.data.msg });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loading: state.loading,
        loading2: state.loading2,
        loading3: state.loading3,
        error: state.error,
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        status: state.status,
        auth,
        getUser,
        updateProfile,
        clearError,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
