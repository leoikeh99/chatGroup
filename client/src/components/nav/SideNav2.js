import React, { Fragment } from "react";
import av from "../../img/av.png";

const SideNav2 = ({ current, userChannels, user }) => {
  const back = () => {
    const sidenav2 = document.querySelector(".sideNav2");
    sidenav2.style.animation = "slideIn 0.1s ease-in forwards";
  };
  return (
    <div className="rel">
      <div className="top">
        <p onClick={back}>
          <i class="fas fa-angle-left"></i> All Channels
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
                      <div className="image">
                        <img src={av} alt="" />
                      </div>
                      <p>{members.username}</p>
                    </li>
                  ) : null
                )
              )}
            </ul>
          </Fragment>
        )}
      </div>
      <div className="bottom">
        <p>{user && user.username}</p> <i class="fas fa-angle-down"></i>
      </div>
    </div>
  );
};
export default SideNav2;
