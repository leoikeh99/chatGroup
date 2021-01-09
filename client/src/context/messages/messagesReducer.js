import { GET_MESSAGES, ADD_MESSAGE } from "../types";

export default (state, action) => {
  switch (action.type) {
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

    default:
      return {
        ...state,
      };
  }
};
