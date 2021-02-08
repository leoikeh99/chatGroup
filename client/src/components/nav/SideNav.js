import React, { useContext, useState, useEffect } from "react";
import AllChannels from "../channel/AllChannels";
import MyChannels from "../channel/MyChannels";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import channelContext from "../../context/channelContext/channelContext";
import { tint, truncate } from "../../functions/helperFunctions";
import av from "../../img/av.png";

const SideNav = ({ user, match, logout }) => {
  const [tabs, setTabs] = useState(0);
  const [text, setText] = useState("");

  const ChannelContext = useContext(channelContext);
  const { searchChannels, filterUserChannels } = ChannelContext;

  useEffect(() => {
    const selectTab = document.getElementById("selectTab");
    const tabs = document.querySelector(".tabs");
    const icon = document.querySelector("#selectTab i");
    const bottom = document.querySelector(".bottom");
    const options = document.querySelector(".options");
    var count = 0;
    var count2 = 0;
    selectTab.addEventListener("click", () => {
      count++;
      if (count % 2 !== 0) {
        tabs.style.display = "block";
        icon.style.transform = "rotate(180deg)";
      } else {
        tabs.style.display = "none";
        icon.style.transform = "rotate(360deg)";
      }
    });
    tabs.addEventListener("click", () => {
      count++;
      icon.style.transform = "rotate(360deg)";
      tabs.style.display = "none";
    });

    bottom.addEventListener("click", () => {
      count2++;
      if (count2 % 2 !== 0) {
        options.style.display = "block";
      } else {
        options.style.display = "none";
      }
    }); // eslint-disable-next-line
  }, []);

  useEffect(() => {
    tabs === 0 ? searchChannels(text) : filterUserChannels(text);
    // eslint-disable-next-line
  }, [text]);
  const showAdd = () => {
    const addChannel = document.querySelector(".addChannel");
    tint();
    addChannel.style.display = "block";
  };

  const showProfile = () => {
    const profile = document.querySelector(".profile");
    profile.style.display = "block";
    tint();
  };

  return (
    <div className="rel">
      <div className="top">
        <ul className="tabs">
          <li onClick={() => setTabs(0)}>All Channels</li>
          <li onClick={() => setTabs(1)}>My Channels</li>
        </ul>
        <p id="selectTab">
          <i className="fas fa-angle-down"></i>{" "}
          {tabs === 0 ? "All Channels" : "My Channels"}
        </p>
        <i className="fas fa-plus iconBtn" onClick={showAdd}></i>
      </div>
      <SimpleBar style={{ maxHeight: "83%" }}>
        <div className="body">
          <div className="pad">
            <div className="cover">
              <i className="fas fa-search"></i>
              <input
                type="text"
                placeholder="Search"
                onChange={(e) => setText(e.target.value.trim())}
              />
            </div>
          </div>
          {tabs === 0 ? (
            <AllChannels match={match} text={text} />
          ) : (
            <MyChannels match={match} text={text} />
          )}
        </div>
      </SimpleBar>
      <div className="bottom">
        <div className="cover">
          <ul className="options">
            <li onClick={showProfile}>
              <i className="fas fa-user"></i> My Profile
            </li>
            <li onClick={() => logout()}>
              <i className="fas fa-sign-out-alt"></i> Logout
            </li>
          </ul>
          <div className="first">
            <div className="image">
              <img
                src={user && user.avatar ? `/api/user/avatar/${user._id}` : av}
                alt=""
              />
            </div>
            <p>{user && truncate(user.username)}</p>
          </div>
          <i className="fas fa-angle-down"></i>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
