
import { Jumbotron, Container, Nav, Row, Col, Card, CardBody, CardImg, CardTitle, CardText,CardSubtitle, Button, NavItem } from "reactstrap";
import { Link} from "react-router-dom";
import "./App.css";
import firebase from "../component/firebase";
import {db} from '../component/firebase';
import React, { Component } from 'react'


export class App extends Component {
  state ={
    item:[]
  }
   
   logOut = () => {
    // this.setState({isSignedIn:this.props.signout});
    firebase.auth().signOut();
    console.log("sign in")
  }
  componentDidMount() {
    // let { id } = useParams();
    //         this.fetchData(id);
    //         console.log("params id",id);
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
        console.log("Movie data", this.state.movies);
      })
      .catch(error => console.log(error));
      
  }
linkItem=(id)=>{
  
  const link = this.state.item.filter(items => items.id === id);
   console.log("link item ",link)
 
}

  render() {
    return (
      <div className="App">
      <Jumbotron className="jumbotron" fluid>
      
        <Container className="container" fluid>
          
          <Nav className="nav">
            <Link className="navItem1" to="/">Home</Link> 
            <Link className="navItem1" to="/Item">Add item</Link>
            <Link className="navItem1" to="/Register">Register</Link>
            <NavItem className="navitem"><Button className="div" onClick={this.logOut} >Sign Out</Button></NavItem>
          </Nav>
        </Container>
      </Jumbotron>
      <Container>
        
      <Row>
        {this.state.item && this.state.item.map(e=>

        
      <Col xs="12" sm="6" lg="4"  md="6">
        
      <Card className="appcard" key={e.id}>
      <Link  onClick={() => this.linkItem(e.id)} to={e.title}>
      <CardImg className="appimg" width="318" alt={e.title} height="180" src={e.url} />
      </Link>
        <CardTitle className="apptitle">{e.title}</CardTitle>
        
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

  
 
