import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";
// import SignIn from "../container/SignIn";
// import SignIn from "../container/SignIn";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { currentUser } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={Props =>
        currentUser ? (
          <RouteComponent {...Props} />
        ) : (
          <Redirect to="/SignIn" />
        )
      }
    />
  );
};

export default PrivateRoute;
