import React, { useState, useEffect, useContext, Fragment } from "react";
import channelContext from "../../context/channelContext/channelContext";
import setAuthToken from "../../functions/setAuthToken";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import { isObjId } from "../../functions/helperFunctions";
import av from "../../img/av.png";
const moment = require("moment");

const Chat = ({ match, setHome, socket, user }) => {
  const [id, setId] = useState(match.params.id);
  const [current, setCurrent] = useState(null);
  const [loading, setLoading] = useState(null);
  const [text, setText] = useState("");
  const [messages2, setMessages2] = useState([]);

  const ChannelContext = useContext(channelContext);
  const { userChannels, messages, addMessage } = ChannelContext;

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

      //onrecievemessage
    }
  }, [match.params.id, messages2]);

  useEffect(() => {
    if (userChannels && userChannels.length !== 0) {
      const channel = userChannels.channels.find((val) => val._id === id);
      if (id && channel) {
        setCurrent({ channel, joined: true });
      } else if (id && !channel) {
        setLoading(true);
        axios
          .get(`/api/channel/single/${id}`)
          .then((res) => {
            setLoading(null);
            setCurrent({ channel: res.data, joined: false });
          })
          .catch((err) => {
            setLoading(null);
            setCurrent(null);
          });
      }
    }
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
    }
  }, [current, messages]);

  useEffect(() => {
    setId(match.params.id);
  }, [match.params.id]);

  const submit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (text.trim() !== "") {
      addMessage({
        text,
        channelId: id,
        senderName: user.username,
        createdAt: Date.now(),
        _id: uuidv4(),
      });
      socket.emit("sendMessage", { id, text, token });
    }
  };

  return (
    <section className="chat">
      <div className="top">
        <div className="container2">
          <p className="title">{current && current.channel.name}</p>
        </div>
      </div>
      {current && current.joined && (
        <Fragment>
          <SimpleBar className="simpleBar">
            <div className="container2">
              <div className="messages">
                {messages2.map((message) => (
                  <div key={message._id} className="message">
                    <div className="image">
                      <img src={av} alt="" />
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
                <i class="far fa-paper-plane"></i>
              </button>
            </div>
          </form>
        </Fragment>
      )}
    </section>
  );
};
export default Chat;
