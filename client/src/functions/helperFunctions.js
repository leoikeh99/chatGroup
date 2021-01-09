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

const getUnread = (id, unread) => {
  if (unread.length !== 0) {
    const check = unread.find((un) => id === un.channelId);

    if (check) {
      return check.unread;
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
