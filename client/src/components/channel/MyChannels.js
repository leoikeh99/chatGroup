import React, { useContext, Fragment } from "react";
import channelContext from "../../context/channelContext/channelContext";
import ChannelItem from "./ChannelItem";
import Spinner from "../layout/Spinner";
import moment from "moment";

const MyChannels = ({ text, match }) => {
  const ChannelContext = useContext(channelContext);
  const {
    loading,
    joinChannel,
    userChannels,
    filteredChannels,
  } = ChannelContext;

  return (
    <Fragment>
      {!loading ? (
        <ul className="channelList">
          {!filteredChannels && text === "" ? (
            <Fragment>
              {userChannels.channels
                .sort((a, b) =>
                  moment(a.lastMessage) > moment(b.lastMessage) ? -1 : 1
                )
                .map((channel) => (
                  <ChannelItem
                    key={channel._id}
                    channel={channel}
                    joinChannel={joinChannel}
                    userChannels={userChannels}
                    match={match}
                  />
                ))}
            </Fragment>
          ) : filteredChannels ? (
            <Fragment>
              {filteredChannels.map((channel) => (
                <ChannelItem
                  key={channel._id}
                  channel={channel}
                  joinChannel={joinChannel}
                  userChannels={userChannels}
                  match={match}
                />
              ))}
            </Fragment>
          ) : null}
        </ul>
      ) : (
        <div className="center mt-1">
          <Spinner />
        </div>
      )}
    </Fragment>
  );
};

export default MyChannels;
