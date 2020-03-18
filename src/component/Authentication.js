import React, { Component } from "react";
import firebase from "../component/firebase";
import App from "../container/App";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Register from "../container/Register";
import SignUp from "../container/SignUp";
import SignIn from "../container/SignIn";
import Item from "../container/addItem/Item";
import Detail from "../container/detailPage/Detail";

export default class Authentication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      uid: ""
    };
  }
  componentDidMount() {
    this.authListener();
  }

  authListener() {
    firebase.auth().onAuthStateChanged(user => {
      console.log({ user });

      if (user) {
        this.setState({ user, uid: user.uid });
      } else {
        this.setState({ user: null });
      }
      console.log("user UID ...", this.state.uid);
    });
  }
  render() {
    // console.log(this.props)
    return (
      <>
        {/* { this.state.user ? <App uid={this.state.uid} />:<SignIn />} */}
        <Router>
          <Switch>
            {this.state.user
              ? [
                  <>
                    <Redirect to="/" />
                    <Route exact path="/" component={App} />
                    <Route exact path="/Register" component={Register} />
                    <Route exact path="/SignUp" component={SignUp} />
                    <Route exact path="/Item" component={Item} />
                    <Route exact path="/:id" component={Detail} />
                  </>
                ]
              : [
                  <>
                    <Redirect to="/SignIn" />
                    <Route exact path="/SignIn" component={SignIn} />
                    <Route exact path="/SignUp" component={SignUp} />
                  </>
                ]}
            {/* <Route exact path="/"  component={App}></Route> */}
          </Switch>
        </Router>
      </>
    );
  }
}
