const getInitials = (text) => {
  const arr = text.split(" ");
  if (arr.length > 1) {
    return `${arr[0].split("")[0].toUpperCase()}${arr[arr.length - 1]
      .split("")[0]
      .toUpperCase()}`;
  } else {
    return `${arr[0].split("")[0].toUpperCase()}`;
  }
};

const tint = () => {
  const overlay = document.querySelector(".overlay");
  overlay.style.display = "block";
  overlay.style.animation = "fadeIn ease-in 0.1s forwards";
};

const truncate = (text) => {
  const arr = text.split("");
  var output = "";
  for (let i = 0; i <= 11; i++) {
    if (arr[i]) {
      output += arr[i];
    }
  }
  if (arr.length > 10) {
    return output + "...";
  } else {
    return text;
  }
};

const getUnread = (id, lastMessages, messages) => {
  if (lastMessages.length !== 0) {
    const lm = lastMessages.find((lm) => lm.channelId === id);

    if (lm) {
      const messageArr = messages.find((m) => m.channelId === id);
      if (messageArr) {
        if (
          lm.lastMessage ===
          messageArr.messages[messageArr.messages.length - 1]._id
        ) {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
};

const isObjId = (id) => {
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    return true;
  } else {
    return false;
  }
};

export { getInitials, tint, truncate, getUnread, isObjId };
