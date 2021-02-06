import React, { useState, useEffect, useContext, Fragment } from "react";
import channelContext from "../../context/channelContext/channelContext";
import setAuthToken from "../../functions/setAuthToken";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import { isObjId } from "../../functions/helperFunctions";
import av from "../../img/av.png";
import joinImg from "../../img/join.svg";
import Button from "@material-ui/core/Button";
const moment = require("moment");

const Chat = ({ match, setHome, socket, user }) => {
  const [id, setId] = useState(match.params.id);
  const [current, setCurrent] = useState(null);
  const [text, setText] = useState("");
  const [messages2, setMessages2] = useState([]);
  const [unread, setUnread] = useState(null);
  const [count, setCount] = useState(0);

  const ChannelContext = useContext(channelContext);
  const {
    userChannels,
    messages,
    addMessage,
    setLastMessages,
    lastMessages,
    channels,
    joinChannel,
  } = ChannelContext;

  useEffect(() => {
    if (match.params.id !== undefined) {
      setCount(0);
      setUnread(null);
      setMessages2([]);
    }
    // eslint-disable-next-line
  }, [match.params.id]);

  useEffect(() => {
    if (match.params.id !== undefined) {
      const lastMessage = lastMessages.find(
        (lm) => lm.channelId === match.params.id
      );
      if (messages2.length !== 0 && lastMessage) {
        if (
          lastMessage.lastMessage !== messages2[messages2.length - 1]._id &&
          count === 0
        ) {
          setUnread(lastMessage.lastMessage);
          setCount(count + 1);

          const lm = document.getElementById(lastMessage.lastMessage);
          if (lm) {
            const scrollTo = lm.offsetTop;
            document.querySelector(
              "#sm .simplebar-content-wrapper"
            ).scrollTop = scrollTo;
          }
        } else if (
          lastMessage.lastMessage === messages2[messages2.length - 1]._id
        ) {
          setCount(count + 1);

          const lm = document.getElementById(lastMessage.lastMessage);
          if (lm) {
            const scrollTo = lm.offsetTop;
            document.querySelector(
              "#sm .simplebar-content-wrapper"
            ).scrollTop = scrollTo;
          }
        }
      }
    } // eslint-disable-next-line
  }, [match.params.id, messages2, lastMessages]);

  useEffect(() => {
    if (match.params.id && messages2.length !== 0) {
      if (localStorage.getItem("token")) {
        setAuthToken(localStorage.getItem("token"));
      }
      const config = {
        header: {
          "Content-Type": "application/json",
        },
      };
      const data = {
        channelId: messages2[messages2.length - 1].channelId,
        lastMessage: messages2[messages2.length - 1]._id,
      };

      setLastMessages({
        channelId: data.channelId,
        lastMessage: data.lastMessage,
      });

      if (isObjId(messages2[messages2.length - 1]._id)) {
        axios
          .post("/api/messages/lastMessages", data, config)
          .then((res) => console.log(""))
          .catch((err) => console.log(""));
      }
    } // eslint-disable-next-line
  }, [match.params.id, messages2]);

  useEffect(() => {
    if (userChannels && userChannels.length !== 0) {
      const channel = userChannels.channels.find((val) => val._id === id);
      if (id && channel) {
        setCurrent({ channel, joined: true });
      } else if (id && !channel) {
        if (channels.find((val) => val._id === id)) {
          setCurrent({
            channel: channels.find((val) => val._id === id),
            joined: false,
          });
        } else {
          setCurrent(null);
          const sidenav2 = document.querySelector(".sideNav2");
          sidenav2.style.animation = "slideIn 0.1s ease-in forwards";
        }
      }
    } // eslint-disable-next-line
  }, [id, userChannels]);

  useEffect(() => {
    setHome(current);
    if (current) {
      if (messages.length !== 0) {
        if (messages.find((val) => val.channelId === current.channel._id))
          setMessages2(
            messages.find((val) => val.channelId === current.channel._id)
              .messages
          );
      }
    } // eslint-disable-next-line
  }, [current, messages]);

  useEffect(() => {
    setId(match.params.id);
  }, [match.params.id]);

  const submit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (text.trim() !== "") {
      const data = {
        text,
        channelId: id,
        senderName: user.username,
        createdAt: Date.now(),
        _id: uuidv4(),
        avatar: user.avatar,
        senderId: user._id,
      };
      addMessage(data);
      socket.emit("sendMessage", { id, text, token, avatar: user.avatar });
      setCount(null);
      setUnread(null);
      setText("");
    }
  };

  useEffect(() => {
    var count = 0;
    const sidenav = document.querySelector(".sideNav");
    const sidenav2 = document.querySelector(".sideNav2");
    const menu = document.querySelector(".menu");
    if (menu) {
      menu.addEventListener("click", () => {
        count++;
        if (count % 2 !== 0) {
          sidenav.style.animation = "slideIn 0.1s ease-in forwards";
          sidenav2.style.animation = "slideIn 0.1s ease-in forwards";
          menu.className = "fas fa-bars menu";
        } else {
          sidenav.style.animation = "slideOut 0.1s ease-in forwards";
          menu.className = "fas fa-times menu";
        }
      });
    }
  }, [current]);

  return (
    <section className="chat">
      <div className="top">
        <div className="container2">
          <div className="space">
            <p className="title">{current && current.channel.name}</p>
            {current && <i className="fas fa-bars menu"></i>}
          </div>
        </div>
      </div>
      {current && current.joined && (
        <Fragment>
          <SimpleBar className="simpleBar" id="sm">
            <div className="container2">
              <div className="messages" id="ms">
                {messages2.map((message) => (
                  <Fragment key={message._id}>
                    <div key={message._id} id={message._id} className="message">
                      <div className="image">
                        <img
                          src={
                            message.avatar
                              ? `/api/user/avatar/${message.senderId}`
                              : av
                          }
                          alt=""
                        />
                      </div>
                      <div className="other">
                        <p>
                          {message.senderName}
                          <small style={{ marginLeft: "15px" }}>
                            {moment(message.createdAt).calendar()}
                          </small>
                        </p>
                        <p>{message.text}</p>
                      </div>
                    </div>
                    {message._id === unread ? (
                      <div id="um">
                        <span> UNREAD MESSAGES</span>
                      </div>
                    ) : null}
                  </Fragment>
                ))}
              </div>
            </div>
          </SimpleBar>

          <form action="" onSubmit={submit}>
            <div className="cover2">
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type message here"
              />
              <button>
                <i className="far fa-paper-plane"></i>
              </button>
            </div>
          </form>
        </Fragment>
      )}
      {current && !current.joined && (
        <div className="join">
          <img src={joinImg} alt="" />
          <Button
            variant="outlined"
            color="primary"
            onClick={() => joinChannel(current.channel._id)}
          >
            join Channel
          </Button>
        </div>
      )}
    </section>
  );
};
export default Chat;
