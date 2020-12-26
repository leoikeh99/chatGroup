import React from "react";

const Register = () => {
  return (
    <div className="auth">
      <div className="container">
        <h1>Chat Group</h1>
        <form action="">
          <label htmlFor="">Username:</label>
          <input type="text" />
          <label htmlFor="">Email:</label>
          <input type="text" />
          <label htmlFor="">Password:</label>
          <input type="text" />
          <label htmlFor="">Confirm Password:</label>
          <input type="text" />
          <input type="button" value="SignUp" />
        </form>
      </div>
    </div>
  );
};
export default Register;
