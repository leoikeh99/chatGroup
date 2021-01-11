import {
  CREATE_CHANNEL,
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
} from "../types";
export default (state, action) => {
  switch (action.type) {
    case SET_LOADER:
      return {
        ...state,
        loading: true,
      };

    case CREATE_CHANNEL:
      console.log(action.payload);
      return {
        ...state,
        loading: null,
        channels: [...state.channels, action.payload.channel],
        userChannels: {
          ...state.userChannels,
          channels: [...state.userChannels.channels, action.payload.channel],
          members: [...state.userChannels.members, [action.payload.member]],
        },
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

    case JOIN_CHANNEL:
      console.log(action.payload);
      return {
        ...state,
        userChannels: {
          ...state.userChannels,
          channels: [...state.userChannels.channels, action.payload.channel],
          members: [...state.userChannels.members, action.payload.members],
        },
        messages: [...state.messages, action.payload.messages],
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
