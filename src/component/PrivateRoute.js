import React, { useState,useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";
// import SignIn from "../container/SignIn";
// import SignIn from "../container/SignIn";
import firebase from "../component/firebase";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
   
   console.log({currentUser})
   
   
  }, [{RouteComponent}])
  return (
    <Route
      {...rest}
      render={Props =>
        currentUser===true ? (
          <RouteComponent {...Props} />
        ) : (
         
          <Redirect to="/SignIn" />
          
        )
      }
    />
  );
};

export default PrivateRoute;
