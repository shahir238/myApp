
import { Jumbotron, Container, Nav, Row, Col, Card, CardImg, CardTitle, CardText, Button, NavItem } from "reactstrap";
import { Link,NavLink} from "react-router-dom";
import "./App.css";
import firebase from "../component/firebase";
import {db} from '../component/firebase';
import React, { Component } from 'react'


export class App extends Component {
  state ={
    item:[]
  }
   
   logOut = () => {

    if(firebase.auth().signOut()){
    this.props.history.push("/SignIn");
    console.log("props of log out",this.props)
    }
  }
  componentDidMount() {
    
    db.collection("items")
      .get()
      .then(snapshot => {
        console.log("snapshot", snapshot);
        let item = []; 
        snapshot.forEach(doc => {
          const data = doc.data();
          item.push(data);
        });

        this.setState({
          item
        });
        // console.log("checking iiiiiiiiiii",this.state.item);
        
      })
      .catch(error => console.log(error));
      
      
  }

  render() {
    return (
      <div className="App">
      <Jumbotron style={{backgroundColor:'#1387bd'}} className="jumbotron" fluid>
      
        <Container className="container" fluid>
          
          <Nav className="nav">
            <NavLink exact className="navItem1" to="/">Home</NavLink> 
            <NavLink exact className="navItem1" to="/Item">Add item</NavLink>
            <NavLink exact className="navItem1" to="/Register">Register</NavLink>
            <NavItem className="navitem"><Button color='success' className="div" onClick={this.logOut} >Sign Out</Button></NavItem>
          </Nav>
        </Container>
      </Jumbotron>
      <Container>
        
      <Row>
        {this.state.item && this.state.item.map((e,i)=>
        
      <Col key={i} xs="12" sm="6" lg="4"  md="6" className="appCol">
        
      <Card className="appcard" key={e.id}>
      <Link  to={`/${e.id}`}>
      <CardImg className="appimg" width="318" alt={e.title} height="180" src={e.url} />
      </Link>
        <CardTitle className="apptitle">{e.title}<br></br>
        <h6>Price: ${e.price}</h6>
        <h6>Contact: {e.contact}</h6>
        </CardTitle>
        {/* <CardTitle className="apptitle">${e.price}</CardTitle>
        <CardTitle className="apptitle">{e.contact}</CardTitle> */}
        
        <CardText className="appP">{e.description}</CardText>
        
    </Card>
    
    </Col> 
    )}
    </Row>
      </Container>
      

    </div>
    )
  }
}

export default App;

  
 
