import React, { useReducer } from "react";
import axios from "axios";
import messagesContext from "./messagesContext";
import messagesReducer from "./messagesReducer";
import setAuthToken from "../../functions/setAuthToken";
import { GET_MESSAGES, ADD_MESSAGE } from "../types";

export const MessagesState = (props) => {
  const initialState = {
    messages: [],
    loader: null,
  };

  const [state, dispatch] = useReducer(messagesReducer, initialState);

  const getMessages = async () => {
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    }

    try {
      const res = await axios.get("/api/messages");
      dispatch({ type: GET_MESSAGES, payload: res.data });
    } catch (err) {
      console.error(err);
    }
  };

  const addMessage = (message) =>
    dispatch({ type: ADD_MESSAGE, payload: message });
  return (
    <messagesContext.Provider
      value={{ messages: state.messages, getMessages, addMessage }}
    >
      {props.children}
    </messagesContext.Provider>
  );
};

export default MessagesState;
