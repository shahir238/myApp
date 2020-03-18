import React from 'react';
import './Register.css';
import { Jumbotron, Container, Nav, NavLink, Button } from "reactstrap";
import { withRouter} from "react-router-dom";
const Register = (props) => {
  const home=()=>{
    props.history.push("/");
  }
  const signup=()=>{
    props.history.push("/SignUp");
  }
    return (
        <div>
            <div className="atApp">
        <Jumbotron className="atjumbotron" fluid>
          <Container className="atcontainer"  fluid>
            <Nav className="atnav">
            <NavLink className="atnavI"><Button onClick={home} className="atlinked" to="/">Home</Button> </NavLink>
              
            <NavLink style={{float:'right'}} className="atnavIt"><Button style={{float:'right'}} onClick={signup} className="atlink"  to="/SignUp">Sign Up</Button></NavLink>
             
            </Nav>
          </Container>
        </Jumbotron>
      </div>
        </div>
    )
}
export default withRouter(Register);
