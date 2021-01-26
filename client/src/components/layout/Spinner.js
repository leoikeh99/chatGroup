import React, { Fragment } from "react";

const Spinner = ({ type }) => {
  return (
    <Fragment>
      {!type || type === 1 ? (
        <div className="sk-wave">
          <div className="sk-wave-rect"></div>
          <div className="sk-wave-rect"></div>
          <div className="sk-wave-rect"></div>
          <div className="sk-wave-rect"></div>
          <div className="sk-wave-rect"></div>
        </div>
      ) : type === 2 ? (
        <div className="sk-circle-fade">
          <div className="sk-circle-fade-dot"></div>
          <div className="sk-circle-fade-dot"></div>
          <div className="sk-circle-fade-dot"></div>
          <div className="sk-circle-fade-dot"></div>
          <div className="sk-circle-fade-dot"></div>
          <div className="sk-circle-fade-dot"></div>
          <div className="sk-circle-fade-dot"></div>
          <div className="sk-circle-fade-dot"></div>
          <div className="sk-circle-fade-dot"></div>
          <div className="sk-circle-fade-dot"></div>
          <div className="sk-circle-fade-dot"></div>
          <div className="sk-circle-fade-dot"></div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default Spinner;
