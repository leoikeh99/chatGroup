import React, { Fragment, useEffect } from "react";
import av from "../../img/av.png";
import { tint, truncate } from "../../functions/helperFunctions";
import Chip from "@material-ui/core/Chip";
import SimpleBar from "simplebar-react";
import Button from "@material-ui/core/Button";

const SideNav2 = ({
  current,
  userChannels,
  user,
  leaveChannel,
  status2,
  logout,
}) => {
  useEffect(() => {
    const bottom = document.querySelectorAll(".bottom")[1];
    const options = document.querySelectorAll(".options")[1];
    var count = 0;

    bottom.addEventListener("click", () => {
      count++;
      if (count % 2 !== 0) {
        options.style.display = "block";
      } else {
        options.style.display = "none";
      }
    }); // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (status2 && status2.type === "leaveChannel") {
      const sidenav2 = document.querySelector(".sideNav2");
      sidenav2.style.animation = "slideIn 0.1s ease-in forwards";
    } // eslint-disable-next-line
  }, [status2]);

  const showProfile = () => {
    const profile = document.querySelector(".profile");
    profile.style.display = "block";
    tint();
  };

  const back = () => {
    const sidenav2 = document.querySelector(".sideNav2");
    sidenav2.style.animation = "slideIn 0.1s ease-in forwards";
  };
  return (
    <div className="rel">
      <div className="top">
        <p onClick={back}>
          <i className="fas fa-angle-left"></i> All Channels
        </p>
      </div>
      <SimpleBar style={{ maxHeight: "80%" }}>
        <div className="container2">
          {current && (
            <Fragment>
              <p className="title">{current.channel.name}</p>
              <p style={{ margin: "10px 0px" }}>Description:</p>
              <p className="desc">
                {current.channel.desc === "" ? "None" : current.channel.desc}
              </p>
              {current.joined && (
                <Button
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  onClick={() => leaveChannel(current.channel._id)}
                >
                  Leave Channel
                </Button>
              )}
              {current.joined && <p className="members">Members</p>}
              <ul>
                {userChannels.members.map((arr) =>
                  arr.map((members) =>
                    members.channel === current.channel._id ? (
                      <li key={members._id}>
                        {userChannels.channels.some(
                          (val) =>
                            members.channel === val._id &&
                            members.memberId === val.creator
                        ) ? (
                          <span className="admin">
                            <Chip
                              variant="outlined"
                              size="small"
                              label="Admin"
                              color="primary"
                            />
                          </span>
                        ) : null}
                        <div className="image">
                          <img
                            src={
                              members.avatar
                                ? `/api/user/avatar/${members.memberId}`
                                : av
                            }
                            alt=""
                          />
                        </div>
                        <p>{truncate(members.username)}</p>
                      </li>
                    ) : null
                  )
                )}
              </ul>
            </Fragment>
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
export default SideNav2;
