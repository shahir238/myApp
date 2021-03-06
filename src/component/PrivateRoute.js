import React, { useState,useContext, useEffect } from "react";
import { Route, Redirect,Switch } from "react-router-dom";
import { AuthContext } from "./Auth";
// import SignIn from "../container/SignIn";
// import SignIn from "../container/SignIn";
import firebase from "../component/firebase";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { currentUser,user} = useContext(AuthContext);
  useEffect(() => {
   
   console.log({currentUser})
   
   
  }, [{RouteComponent}])
  return (
    <Switch>
    <Route
      {...rest}
      render={Props =>
        user===true ? (
          <RouteComponent {...Props} />
        ) : (
         
          <Redirect to="/SignIn" />
          
        )
      }
    />
    </Switch>
  );
};

export default PrivateRoute;
