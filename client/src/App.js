import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./css/main.css";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

function App() {
  return (
    <Fragment>
      <Router>
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
