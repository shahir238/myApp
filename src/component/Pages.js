import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "../container/Register";
import SignUp from "../container/SignUp";
import SignIn from "../container/SignIn";
import Authentication from '../component/Authentication'
import Item from "../container/addItem/Item"
import Detail from "../container/detailPage/Detail";
const Pages = () => {
  return (
    
      <Router>
          <Switch>
        <Route exact  path="/" component={Authentication} />
        {/* <Route  path="/:id" children={<Authentication />} /> */}
        
        {/* <Route exact path="/route/:name" component={props=>{console.log({id:props}); return <div/>}} /> */}
        
        {/* <Route exact path="/route/:name" component={props=>{console.log({id:props}); return <div/>}}/>  */}
        <Route exact path="/Register" component={Register} />
        <Route exact path="/SignUp"  component={SignUp} />
        <Route exact path="/SignIn"  component={SignIn} />
        <Route exact path="/Item" component={Item} />
            {/* <Route exact path="/"  component={App}></Route> */}
            </Switch>
      </Router>
    
  );
};

export default Pages;
