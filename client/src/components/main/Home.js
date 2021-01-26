import React, { useEffect, useContext, useState, Fragment } from "react";
import authContext from "../../context/auth/authContext";
import channelContext from "../../context/channelContext/channelContext";
import Chat from "../chat/Chat";
import SideNav from "../nav/SideNav";
import SideNav2 from "../nav/SideNav2";
import io from "socket.io-client";
import Spinner from "../layout/Spinner";
import Alert from "@material-ui/lab/Alert";
const ENDPOINT = "/";
var socket;

const Home = ({ match }) => {
  const [current, setCurrent] = useState(null);
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [mainStatus, setMainStatus] = useState(null);

  const AuthContext = useContext(authContext);
  const { getUser, user, updateProfile, loading2, status } = AuthContext;

  const ChannelContext = useContext(channelContext);
  const {
    getChannels,
    createChannel,
    getUserChannels,
    userChannels,
    getMessages,
    addMessage,
    getLastMessages,
    status2,
  } = ChannelContext;

  useEffect(() => {
    getUser();
    socket = io.connect(ENDPOINT);

    const file = document.getElementById("file");
  }, []);

  useEffect(() => {
    if (user) {
      getChannels();
      getUserChannels();
      getMessages();
      getLastMessages();
      setUsername(user.username);
    }
  }, [user]);

  useEffect(() => {
    const sidenav2 = document.querySelector(".sideNav2");
    const menu = document.querySelector(".menu");
    if (current) {
      if (current.joined) {
        sidenav2.style.animation = "slideOut 0.1s ease-in forwards";
        menu.className = "fas fa-times menu";
      }
    }
  }, [current]);

  const clear = (e) => {
    const overlay = document.querySelector(".overlay");
    const addChannel = document.querySelector(".addChannel");
    overlay.style.display = "none";
    addChannel.style.display = "none";
  };

  const clear2 = (e) => {
    const overlay = document.querySelector(".overlay");
    const profile = document.querySelector(".profile");
    overlay.style.display = "none";
    profile.style.display = "none";
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

  const selectAv = () => {
    const file = document.getElementById("file");
    file.click();
  };

  const save = (e) => {
    e.preventDefault();
    let formData = new FormData();
    if (avatar) {
      formData.append("avatar", avatar);
    }
    if (username && username.trim() !== "") {
      formData.append("data", JSON.stringify({ username }));
    }

    updateProfile(formData);
    console.log(formData);
  };

  useEffect(() => {
    const statusView = document.querySelector(".status");
    if (status) {
      setMainStatus(status);
      statusView.style.animation = "alertIn 0.2s ease-in forwards";
      setTimeout(() => {
        statusView.style.animation = "alertOut 0.2s ease-in forwards";
      }, 2000);
    }
  }, [status]);

  useEffect(() => {
    const statusView = document.querySelector(".status");
    if (status2) {
      setMainStatus(status2);
      statusView.style.animation = "alertIn 0.2s ease-in forwards";
      setTimeout(() => {
        statusView.style.animation = "alertOut 0.2s ease-in forwards";
      }, 2000);
    }
  }, [status2]);

  return (
    <div className="Home">
      <div className="status">
        {mainStatus && (
          <Alert severity={mainStatus.type}>{mainStatus.msg}</Alert>
        )}
      </div>
      <div className="overlay"></div>
      <div className="addChannel centralize">
        <h4>New Channel</h4>
        <form id="makeChannel" action="" onSubmit={makeChannel}>
          <i className="fas fa-times" onClick={clear}></i>
          <input id="name" type="text" placeholder="Channel name" />
          <textarea name="" placeholder="Channel description"></textarea>
          <input type="submit" value="Save" />
        </form>
      </div>

      <div className="profile centralize">
        {!loading2 ? (
          <Fragment>
            <h4>Profile</h4>
            <form action="">
              <i className="fas fa-times" onClick={clear2}></i>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="file"
                id="file"
                name="avatar"
                onChange={(e) => setAvatar(e.target.files[0])}
              />
              {avatar && (
                <p style={{ margin: "0px", marginBottom: "8px" }}>
                  Avatar: {avatar.name}
                </p>
              )}
              <input type="button" value="Upload avatar" onClick={selectAv} />
              <input type="submit" value="Save" onClick={save} />
            </form>
          </Fragment>
        ) : (
          <div className="center" style={{ height: "100%" }}>
            <Spinner type={2} />
          </div>
        )}
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
