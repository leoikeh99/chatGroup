import React, { useState, useEffect, useContext } from "react";
import authContext from "../../context/auth/authContext";

const Login = (props) => {
  const AuthContext = useContext(authContext);
  const { auth, isAuthenticated } = AuthContext;

  const [data, setData] = useState({ password: "", email: "" });

  const change = (e) => setData({ ...data, [e.target.name]: e.target.value });

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }
  }, [isAuthenticated, props.history]);

  const login = () => auth("login", data);
  return (
    <div className="auth">
      <div className="container">
        <h1>Chat Group</h1>
        <form action="">
          <label htmlFor="">Username or Email:</label>
          <input
            type="text"
            name="email"
            value={data.email}
            onChange={change}
          />
          <label htmlFor="">Password:</label>
          <input
            type="text"
            name="password"
            value={data.password}
            onChange={change}
          />
          <input type="button" value="Login" onClick={login} />
        </form>
      </div>
    </div>
  );
};
export default Login;
