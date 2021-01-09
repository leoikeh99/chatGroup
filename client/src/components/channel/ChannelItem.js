import React, { useContext } from "react";
import {
  getInitials,
  truncate,
  getUnread,
} from "../../functions/helperFunctions";
import authContext from "../../context/auth/authContext";
import channelContext from "../../context/channelContext/channelContext";
import { Link } from "react-router-dom";

const ChannelItem = ({ channel, match }) => {
  const AuthContext = useContext(authContext);
  const { user } = AuthContext;

  const ChannelContext = useContext(channelContext);
  const { joinChannel, userChannels, unread, messages } = ChannelContext;

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
          <span>{getInitials(channel.name)}</span>
          <p>{truncate(channel.name)}</p>
          {!userChannels.channels.some((val) => val._id === channel._id) ? (
            <i
              className="fas fa-plus iconBtn"
              onClick={() => join(channel._id)}
            ></i>
          ) : (
            <i class="fas fa-check"></i>
          )}
        </li>
      ) : null}
    </Link>
  );
};

export default ChannelItem;