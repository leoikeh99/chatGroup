import React, { useContext, useState, useEffect } from "react";
import AllChannels from "../channel/AllChannels";
import MyChannels from "../channel/MyChannels";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import channelContext from "../../context/channelContext/channelContext";
import { tint } from "../../functions/helperFunctions";

const SideNav = ({ user, match }) => {
  const [tabs, setTabs] = useState(0);
  const [text, setText] = useState("");

  const ChannelContext = useContext(channelContext);
  const { searchChannels, filterUserChannels } = ChannelContext;

  useEffect(() => {
    const selectTab = document.getElementById("selectTab");
    const tabs = document.querySelector(".tabs");
    const icon = document.querySelector("#selectTab i");
    var count = 0;
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
  }, []);

  useEffect(() => {
    tabs === 0 ? searchChannels(text) : filterUserChannels(text);
  }, [text]);
  const showAdd = () => {
    const addChannel = document.querySelector(".addChannel");
    tint();
    addChannel.style.display = "block";
  };
  return (
    <div className="rel">
      <div className="top">
        <ul className="tabs">
          <li onClick={() => setTabs(0)}>All Channels</li>
          <li onClick={() => setTabs(1)}>My Channels</li>
        </ul>
        <p id="selectTab">
          <i class="fas fa-angle-down"></i>{" "}
          {tabs === 0 ? "All Channels" : "My Channels"}
        </p>
        <i className="fas fa-plus iconBtn" onClick={showAdd}></i>
      </div>
      <SimpleBar style={{ maxHeight: "83%" }}>
        <div className="body">
          <div className="pad">
            <div className="cover">
              <i class="fas fa-search"></i>
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
        <p>{user && user.username}</p> <i class="fas fa-angle-down"></i>
      </div>
    </div>
  );
};

export default SideNav;
