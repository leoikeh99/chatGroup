import React, { useContext, Fragment, useEffect } from "react";
import channelContext from "../../context/channelContext/channelContext";
import ChannelItem from "./ChannelItem";
import Spinner from "../layout/Spinner";

const AllChannels = ({ text, match }) => {
  const ChannelContext = useContext(channelContext);
  const { channels, searchedChannels, loading } = ChannelContext;

  useEffect(() => {
    channels.reverse();
  }, [channels]);
  return (
    <Fragment>
      {!loading ? (
        <ul className="channelList">
          {searchedChannels.length === 0 && text === "" ? (
            <Fragment>
              {channels.map((channel) => (
                <ChannelItem
                  match={match}
                  key={channel._id}
                  channel={channel}
                />
              ))}
            </Fragment>
          ) : (
            <Fragment>
              {searchedChannels.map((channel) => (
                <ChannelItem
                  match={match}
                  key={channel._id}
                  channel={channel}
                />
              ))}
            </Fragment>
          )}
        </ul>
      ) : (
        <div className="center mt-1">
          <Spinner />
        </div>
      )}
    </Fragment>
  );
};

export default AllChannels;
