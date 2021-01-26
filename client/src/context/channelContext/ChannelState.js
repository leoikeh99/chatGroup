import React, { useReducer } from "react";
import channelContext from "./channelContext";
import channelReducer from "./channelReducer";
import {
  CREATE_CHANNEL,
  GET_CHANNELS,
  CREATE_CHANNEL_FAIL,
  SET_LOADER,
  SEARCH_CHANNELS,
  JOIN_CHANNEL,
  GET_MY_CHANNELS,
  FILTER_USER_CHANNELS,
  GET_MESSAGES,
  ADD_MESSAGE,
  GET_LAST_MESSAGES,
  SET_LAST_MESSAGES,
} from "../types";
import setAuthToken from "../../functions/setAuthToken";
import axios from "axios";

const ChannelState = (props) => {
  const initialState = {
    loading: null,
    error: null,
    channels: [],
    searchedChannels: [],
    filteredChannels: null,
    userChannels: [],
    messages: [],
    lastMessages: [],
    status2: null,
  };

  const [state, dispatch] = useReducer(channelReducer, initialState);
  const setLoader = () => dispatch({ type: SET_LOADER });
  const filterUserChannels = (name) =>
    dispatch({ type: FILTER_USER_CHANNELS, payload: name });

  const getChannels = async () => {
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    }
    setLoader();
    try {
      const res = await axios.get("/api/channel");
      dispatch({ type: GET_CHANNELS, payload: res.data });
    } catch (err) {
      console.error(err);
    }
  };

  const getUserChannels = async () => {
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    }
    setLoader();
    try {
      const res = await axios.get("/api/channel/myChannels");
      dispatch({ type: GET_MY_CHANNELS, payload: res.data });
    } catch (err) {
      console.error(err);
    }
  };

  const searchChannels = async (key) => {
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    }

    setLoader();
    if (key === "") {
      dispatch({ type: SEARCH_CHANNELS, payload: [] });
    } else {
      try {
        const res = await axios.get(`/api/channel/search/${key}`);
        console.log(res.data);
        dispatch({ type: SEARCH_CHANNELS, payload: res.data });
      } catch (err) {
        console.error(err);
      }
    }
  };

  const createChannel = async (data) => {
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    }
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/channel", data, config);
      dispatch({ type: CREATE_CHANNEL, payload: res.data });
    } catch (err) {
      dispatch({ type: CREATE_CHANNEL_FAIL, payload: err.response.data.msg });
      console.error(err);
    }
  };

  const joinChannel = async (id) => {
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    }

    try {
      const res = await axios.post(`/api/channel/join/${id}`);
      dispatch({ type: JOIN_CHANNEL, payload: res.data });
    } catch (err) {
      console.error(err);
    }
  };

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

  const getLastMessages = async () => {
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    }
    try {
      const res = await axios.get("/api/messages/lastMessages");
      dispatch({ type: GET_LAST_MESSAGES, payload: res.data });
    } catch (err) {}
  };

  const setLastMessages = (data) =>
    dispatch({ type: SET_LAST_MESSAGES, payload: data });

  return (
    <channelContext.Provider
      value={{
        loading: state.loading,
        error: state.error,
        channels: state.channels,
        searchedChannels: state.searchedChannels,
        userChannels: state.userChannels,
        filteredChannels: state.filteredChannels,
        messages: state.messages,
        lastMessages: state.lastMessages,
        status2: state.status2,
        getMessages,
        addMessage,
        createChannel,
        getChannels,
        searchChannels,
        joinChannel,
        getUserChannels,
        filterUserChannels,
        getLastMessages,
        setLastMessages,
      }}
    >
      {props.children}
    </channelContext.Provider>
  );
};

export default ChannelState;
