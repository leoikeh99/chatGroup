import {
  CREATE_CHANNEL,
  CREATE_CHANNEL_FAIL,
  GET_CHANNELS,
  SET_LOADER,
  SEARCH_CHANNELS,
  JOIN_CHANNEL,
  GET_MY_CHANNELS,
  FILTER_USER_CHANNELS,
  GET_MESSAGES,
  ADD_MESSAGE,
  GET_LAST_MESSAGES,
  SET_LAST_MESSAGES,
  LEAVE_CHANNEL,
  SORT_USER_CHANNELS,
} from "../types";
import moment from "moment";

const channelReducer = (state, action) => {
  switch (action.type) {
    case SET_LOADER:
      return {
        ...state,
        loading: true,
      };

    case CREATE_CHANNEL:
      return {
        ...state,
        loading: null,
        channels: [...state.channels, action.payload.channel],
        userChannels: {
          ...state.userChannels,
          channels: [...state.userChannels.channels, action.payload.channel],
          members: [...state.userChannels.members, [action.payload.member]],
        },
        messages: [...state.messages, action.payload.messages],
        status2: { type: "success", msg: "Channel created successfully" },
      };

    case CREATE_CHANNEL_FAIL:
      return {
        ...state,
        loading: null,
        status2: { type: "error", msg: action.payload },
      };

    case GET_CHANNELS:
      return {
        ...state,
        loading: null,
        channels: action.payload,
      };

    case GET_MY_CHANNELS:
      return {
        ...state,
        loading: null,
        userChannels: action.payload,
      };

    case SEARCH_CHANNELS:
      return {
        ...state,
        loading: null,
        searchedChannels: action.payload,
      };

    case FILTER_USER_CHANNELS:
      return {
        ...state,
        filteredChannels: state.userChannels.filter((channel) =>
          channel.name.toLowerCase().includes(action.payload.toLowerCase())
        ),
      };

    case SORT_USER_CHANNELS:
      return {
        ...state,
        userChannels: {
          channels: state.userChannels.channels.sort((a, b) =>
            moment(a.lastMessage) > moment(b.lastMessage) ? 1 : -1
          ),
          members: state.userChannels.members,
        },
      };

    case JOIN_CHANNEL:
      return {
        ...state,
        userChannels: {
          ...state.userChannels,
          channels: [...state.userChannels.channels, action.payload.channel],
          members: [...state.userChannels.members, action.payload.members],
        },
        messages: [...state.messages, action.payload.messages],
      };

    case LEAVE_CHANNEL:
      return {
        ...state,
        userChannels: {
          ...state.userChannels,
          channels: state.userChannels.channels.filter(
            (val) => val._id !== action.id
          ),
          members: state.userChannels.members.filter(
            (val) => !val.some((val2) => val2.channel === action.id)
          ),
        },
        status2: { type: "leaveChannel" },
      };

    case GET_MESSAGES:
      return {
        ...state,
        messages: action.payload,
      };

    case ADD_MESSAGE:
      return {
        ...state,
        messages: state.messages.map((message) =>
          message.channelId === action.payload.channelId
            ? { ...message, messages: [...message.messages, action.payload] }
            : message
        ),
        userChannels: {
          ...state.userChannels,
          channels: state.userChannels.channels.map((val) =>
            val._id === action.payload.channelId
              ? { ...val, lastMessage: action.payload.createdAt }
              : val
          ),
          members: state.userChannels.members,
        },
      };

    case GET_LAST_MESSAGES:
      return {
        ...state,
        lastMessages: action.payload,
      };

    case SET_LAST_MESSAGES:
      return {
        ...state,
        lastMessages: state.lastMessages.some((lm) => (lm) =>
          lm.channelId === action.payload.channelId
        )
          ? state.lastMessages.map((lm) =>
              lm.channelId === action.payload.channelId
                ? { ...lm, ...action.payload }
                : lm
            )
          : [...state.lastMessages, action.payload],
      };

    default:
      return {
        ...state,
      };
  }
};

export default channelReducer;
