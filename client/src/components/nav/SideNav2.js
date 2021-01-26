import React, { Fragment, useEffect } from "react";
import av from "../../img/av.png";
import { tint, truncate } from "../../functions/helperFunctions";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";

const SideNav2 = ({ current, userChannels, user }) => {
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
    });
  }, []);

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

      <div className="container2">
        {current && (
          <Fragment>
            <p className="title">{current.channel.name}</p>
            <p className="desc">{current.channel.desc}</p>
            <p className="members">Members</p>
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
      <div className="bottom">
        <div className="cover">
          <ul className="options">
            <li onClick={showProfile}>
              <i className="fas fa-user"></i> My Profile
            </li>
            <li>
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
