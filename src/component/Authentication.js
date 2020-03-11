import React, { Component } from 'react';
import SignIn from "../container/SignIn";
import firebase from '../component/firebase';
import App from '../container/App';

export default class Authentication extends Component {
    constructor(props){
        super(props);
        this.state={
          user:{}
        }
      }
      componentDidMount() {
        this.authListener();

      }
    
      authListener() {
        firebase.auth().onAuthStateChanged(user => {
          console.log(user);
          if (user) {
            this.setState({ user });
          } else {
            this.setState({ user: null });
          }
        });
      }
    render() {
      console.log(this.props)
        return (
            
                this.state.user ? <App />:<SignIn />
            
        )
    }
}
