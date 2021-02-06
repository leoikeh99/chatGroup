import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./css/main.css";
import "./css/spinkit.min.css";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import AuthState from "./context/auth/AuthState";
import ChannelState from "./context/channelContext/ChannelState";
import Home from "./components/main/Home";
import PrivateRoutes from "./components/routing/PrivateRoutes";

function App() {
  return (
    <AuthState>
      <ChannelState>
        <Router>
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <PrivateRoutes exact path="/" component={Home} />
            <PrivateRoutes exact path="/:id" component={Home} />
          </Switch>
        </Router>
      </ChannelState>
    </AuthState>
  );
}

export default App;
