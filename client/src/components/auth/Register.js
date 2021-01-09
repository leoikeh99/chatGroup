import React, { useContext, useState, useEffect } from "react";
import authContext from "../../context/auth/authContext";

const Register = (props) => {
  const AuthContext = useContext(authContext);
  const { auth, isAuthenticated } = AuthContext;

  const [data, setData] = useState({ username: "", password: "", email: "" });

  const change = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const submit = () => {
    auth("register", data);
  };

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }
  }, [isAuthenticated, props.history]);

  return (
    <div className="auth">
      <div className="container">
        <h1>Chat Group</h1>
        <form action="">
          <label htmlFor="">Username:</label>
          <input
            type="text"
            name="username"
            value={data.username}
            onChange={change}
          />
          <label htmlFor="">Email:</label>
          <input
            type="text"
            name="email"
            value={data.email}
            onChange={change}
          />
          <label htmlFor="">Password:</label>
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={change}
          />
          <label htmlFor="">Confirm Password:</label>
          <input type="text" />
          <input type="button" value="SignUp" onClick={submit} />
        </form>
      </div>
    </div>
  );
};
export default Register;
