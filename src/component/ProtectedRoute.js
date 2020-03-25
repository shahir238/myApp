import React, { useState,useContext, useEffect } from "react";
import { Route, Redirect,Switch } from "react-router-dom";
import { AuthContext } from "./Auth";
// import SignIn from "../container/SignIn";
// import SignIn from "../container/SignIn";
import firebase from "../component/firebase";

const ProtectedRoute = ({ component: RouteComponent, ...rest }) => {
  const { currentUser,user} = useContext(AuthContext);
  useEffect(() => {
   
   console.log({currentUser})
   
   
  }, [{RouteComponent}])
  return (
    <Switch>
    <Route
      {...rest}
      render={Props =>
        user===false ? (
          <RouteComponent {...Props} />
        ) : (
         
          <Redirect to="/" />
          
        )
      }
    />
    </Switch>
  );
};

export default ProtectedRoute;