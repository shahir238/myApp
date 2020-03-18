import React,{useState} from 'react';
import {Form,Row,Col,FormGroup,Label,Input, Card,Button,CardTitle} from 'reactstrap';
import './SignIn.css';
import { useFormik } from "formik";
import firebase from "../component/firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Link } from 'react-router-dom';



const validate = values => {
  
    const errors = {};
  
    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = "!Invalid email address";
    }
    if (!values.password) {
      errors.passward = "Alert! password is required";
    } else if (values.password.length < 6) {
      errors.password = "!Invalid password";
    }
  
    return errors;
  };


const SignIn = () => {
  // const [isSignedIn,setIsSignedIn]= useState({user:false});
  const [uiConfig] = useState({ signInFlow: "popup",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccess: () => false
  }
})
    const [error, setError] = useState([]);
    const [mailError, setMailError] = useState([]);
    const [passError, setPassError] = useState([]);
    
  
    const formik = useFormik({
      initialValues: {
        password: "",
        email: ""
      },
      validate,
      onSubmit: values => {
        console.log("shahir", values);
  
        // alert(JSON.stringify(values, null, 2));
      }
    });
    const login = () => {
      
  
      firebase
        .auth()
        .signInWithEmailAndPassword(formik.values.email, formik.values.password)
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          console.log("Error code", errorCode);
          var errorMessage = error.message;
          console.log("message", errorMessage);
          // ...
          setError(errorMessage);
        });
      setMailError(formik.errors.email);
      setPassError(formik.errors.password);
      console.log("MailError", mailError);
      console.log("PassError", passError);
    };


    return (
 <Card  className="mainCard">
        <CardTitle className="mytitle">Sign In...</CardTitle>
        <Form onSubmit={formik.handleSubmit}>
        <Row form>
        <Col md={12}>
          <FormGroup className="formGroup-abc">
            <Label className="mylabel" for="Email">Email</Label>
            <Input  onChange={formik.handleChange} value={formik.values.email} className="myinput" type="email" name="email" id="Email" placeholder="email" />
            <span style={{color:'red'}}>
            {mailError}
              </span>
          </FormGroup>
        </Col>
        </Row>
        <Row form>
        <Col md={12}>
          <FormGroup>
            <Label className="mylabel" for="Password">Password</Label>
            <Input onChange={formik.handleChange} value={formik.values.password} className="myinput" type="password" name="password" id="Password" placeholder="password" />
            <span style={{color:'red'}}>
            {passError}</span>
          </FormGroup>
        </Col>
      </Row>
      <Button color="primary" className="login" onClick={login} type="submit">SignIn</Button>
     <Link to="/SignUp"> <Button color="primary" className="logout"  type="button">SignUp</Button></Link>
        </Form>
        <span style={{ color: "red", position: "relative" }}>{error}</span>
        <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </Card>
    )
}

export default SignIn

