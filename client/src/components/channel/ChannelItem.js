import React, { useContext } from "react";
import {
  getInitials,
  truncate,
  getUnread,
} from "../../functions/helperFunctions";
import channelContext from "../../context/channelContext/channelContext";
import { Link } from "react-router-dom";

const ChannelItem = ({ channel }) => {
  const ChannelContext = useContext(channelContext);
  const { joinChannel, userChannels, lastMessages, messages } = ChannelContext;

  const join = (id) => {
    joinChannel(id);
  };

  const open = () => {
    const sidenav2 = document.querySelector(".sideNav2");
    if (userChannels && userChannels.length !== 0) {
      if (userChannels.channels.some((val) => val._id === channel._id)) {
        sidenav2.style.animation = "slideOut 0.1s ease-in forwards";
      }
    }
  };

  return (
    <Link to={`/${channel._id}`}>
      {userChannels && userChannels.length !== 0 ? (
        <li onClick={open} className="channelItem">
          {getUnread(channel._id, lastMessages, messages) && (
            <i className="fas fa-circle unread"></i>
          )}
          <span>{getInitials(channel.name)}</span>
          <p>{truncate(channel.name)}</p>
          {!userChannels.channels.some((val) => val._id === channel._id) ? (
            <i
              className="fas fa-plus iconBtn"
              onClick={() => join(channel._id)}
            ></i>
          ) : (
            <i className="fas fa-check"></i>
          )}
        </li>
      ) : null}
    </Link>
  );
};

export default ChannelItem;
