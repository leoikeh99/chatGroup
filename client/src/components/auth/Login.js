import React from "react";

const Login = () => {
  return (
    <div className="auth">
      <div className="container">
        <h1>Chat Group</h1>
        <form action="">
          <label htmlFor="">Username or Email:</label>
          <input type="text" />
          <label htmlFor="">Password:</label>
          <input type="text" />
          <input type="button" value="Login" />
        </form>
      </div>
    </div>
  );
};
export default Login;
