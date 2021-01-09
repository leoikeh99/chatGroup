import React, { useEffect, useContext, useState } from "react";
import authContext from "../../context/auth/authContext";
import channelContext from "../../context/channelContext/channelContext";
import Chat from "../chat/Chat";
import SideNav from "../nav/SideNav";
import SideNav2 from "../nav/SideNav2";
import io from "socket.io-client";
import setAuthToken from "../../functions/setAuthToken";
import axios from "axios";
const ENDPOINT = "/";
var socket;

const Home = ({ match }) => {
  const [current, setCurrent] = useState(null);
  const AuthContext = useContext(authContext);
  const { getUser, user } = AuthContext;

  const ChannelContext = useContext(channelContext);
  const {
    getChannels,
    createChannel,
    getUserChannels,
    userChannels,
    getMessages,
    addMessage,
  } = ChannelContext;

  useEffect(() => {
    getUser();
    socket = io.connect(ENDPOINT);
  }, []);

  useEffect(() => {
    if (user) {
      getChannels();
      getUserChannels();
      getMessages();
    }
  }, [user]);

  useEffect(() => {
    const sidenav2 = document.querySelector(".sideNav2");
    if (current) {
      if (current.joined) {
        sidenav2.style.animation = "slideOut 0.1s ease-in forwards";
      }
    }
  }, [current]);

  useEffect(() => {
    socket.on("recieveMessage", (message) => {
      if (localStorage.getItem("token")) {
        setAuthToken(localStorage.getItem("token"));
      }
      const config = {
        header: {
          "Content-Type": "application/json",
        },
      };

      if (
        match.params.id === undefined ||
        (match.params.id && message.channelId !== match.params.id)
      ) {
      }
      if (
        match.params.id !== undefined &&
        message.channelId === match.params.id
      ) {
      }
    });
  }, [match.params.id]);

  const clear = (e) => {
    const overlay = document.querySelector(".overlay");
    const addChannel = document.querySelector(".addChannel");
    overlay.style.display = "none";
    addChannel.style.display = "none";
  };

  const makeChannel = (e) => {
    e.preventDefault();
    const name = document.querySelector("#makeChannel #name").value;
    const desc = document.querySelector("#makeChannel textarea").value;
    if (name.trim() !== "") {
      createChannel({ name, desc });
    }
  };

  useEffect(() => {
    if (userChannels && userChannels.length !== 0) {
      const rooms = userChannels.channels.map((channel) => channel._id);

      socket.emit("join", rooms);

      socket.on("recieveMessage", (message) => {
        addMessage(message);
      });
    }
  }, [userChannels]);

  return (
    <div className="Home">
      <div className="overlay"></div>
      <div className="addChannel centralize">
        <h4>New Channel</h4>
        <form id="makeChannel" action="" onSubmit={makeChannel}>
          <i class="fas fa-times" onClick={clear}></i>
          <input id="name" type="text" placeholder="Channel name" />
          <textarea name="" placeholder="Channel description"></textarea>
          <input type="submit" value="Save" />
        </form>
      </div>

      <div className="sideNav">
        <SideNav match={match} user={user} />
      </div>
      <div className="sideNav2">
        <SideNav2
          match={match}
          user={user}
          userChannels={userChannels}
          current={current}
        />
      </div>
      <div className="main">
        <Chat user={user} socket={socket} match={match} setHome={setCurrent} />
      </div>
    </div>
  );
};

export default Home;
