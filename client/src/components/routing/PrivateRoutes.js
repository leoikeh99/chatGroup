import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import authContext from "../../context/auth/authContext";

const PrivateRoutes = ({ component: Component, ...rest }) => {
  const AuthContext = useContext(authContext);
  const { isAuthenticated, loading } = AuthContext;

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !loading ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoutes;
