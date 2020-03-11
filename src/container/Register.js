import React from 'react';
import './Register.css';
import { Jumbotron, Container, Nav, NavLink } from "reactstrap";
import { Link} from "react-router-dom";
const Register = () => {
    return (
        <div>
            <div className="atApp">
        <Jumbotron className="atjumbotron" fluid>
          <Container className="atcontainer"  fluid>
            <Nav className="atnav">
            <NavLink className="atnavI"><Link className="atlink" to="/">Home</Link> </NavLink>
              
            <NavLink className="atnavIt"><Link className="atlink"  to="/SignUp">Sign Up</Link></NavLink>
             
            </Nav>
          </Container>
        </Jumbotron>
      </div>
        </div>
    )
}
export default Register;
