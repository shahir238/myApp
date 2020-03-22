import React from "react";
import App from "../container/App";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import SignUp from "../container/SignUp";
import SignIn from "../container/SignIn";
import Item from "../container/addItem/Item";
import Detail from "../container/detailPage/Detail";
import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "./Auth";

const Pages = () => {
  return (
    <AuthProvider>
      <Router>
        <PrivateRoute exact path="/" component={App} />
        <PrivateRoute exact path="/Item" component={Item} />
        <Route exact path="/SignUp" component={SignUp} />
        <Route exact path="/SignIn" component={SignIn} />
        <PrivateRoute exact path="/:id" component={Detail} />
      </Router>
    </AuthProvider>
  );
};

export default Pages;
