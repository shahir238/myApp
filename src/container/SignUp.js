import React from 'react';
import {Form,Row,Col,FormGroup,Label,Input, Card,Button,CardTitle} from 'reactstrap';
import './SignUp.css';
import firebase from "../component/firebase";
import { useFormik } from "formik";
import { useState } from "react";
import { Link } from 'react-router-dom';
import App from './App';

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = "Alert! Required";
  } else if (values.name.length > 15) {
    errors.name = "Must be 15 characters or less";
  }

  if (!values.father) {
    errors.father = "Alert! Required";
  } else if (values.father.length > 20) {
    errors.father = "Must be 20 characters or less";
  }

  if (!values.email) {
    errors.email = "Alert! Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Alert! passward is required";
  } else if (values.password.length < 6) {
    errors.password = "passward must be greater than or equal to 6 values";
  }
  if (!values.rePassward) {
    errors.rePassward = "Alert! Re_passward is required";
  } else if (values.rePassward !== values.password) {
    errors.rePassward = "Passward not match! ";
  }
  if (!values.address) {
    errors.address = "Alert! Required";
  } else if (values.address.length > 40) {
    errors.address = "Must be 40 characters or less";
  }
  if (!values.city) {
    errors.city = "Alert! Required";
  } else if (values.city.length > 15) {
    errors.city = "Must be 15 characters or less";
  }
  if (!values.state) {
    errors.state = "Alert! Required";
  } else if (values.state.length > 15) {
    errors.state = "Must be 15 characters or less";
  }

  return errors;
};

const SignUp=()=> {
  const[error,setError]=useState({
    id:'',
    firstName:'',
    lastName:'',
    email:'',
    password: "",
    rePassward: "",
    address:"",
    state:"",
    city:""
 });
  const formik = useFormik({
    initialValues: {
      name: "",
      father: "",
      email: "",
      password: "",
      rePassward: "",
      address:"",
      state:"",
      city:""
    },
    validate,
    onSubmit:values  => {
      console.log({values})
     
      // alert(JSON.stringify(values, null, 2));
    }
  });
console.log("values of formik",formik.initialValues)
  const signup = () => {
        
    firebase
      .auth()
      .createUserWithEmailAndPassword(
        formik.values.email,
        formik.values.password
      )
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("Error code",errorCode);
        console.log("Error message",errorMessage)
        // ...
      });
  
      const ID=(Math.random()+1);
      setError({
        id:ID,
        name:formik.errors.name,
        father:formik.errors.father,
        email:formik.errors.email,
        password: formik.errors.password,
        rePassward: formik.errors.rePassward,
        address: formik.errors.address,
        state: formik.errors.state,
        city: formik.errors.city
      })
     
  };
  
    
    

    return (
        <Card className="signupcard">
           <CardTitle className="title">Sign Up...</CardTitle>
        
           <Form onSubmit={formik.handleSubmit} className="signupform">
               <Row form>
               <Col md={6}>
          <FormGroup>
            <Label className="signuplabel" for="Name">Your Name</Label>
            <Input onChange={formik.handleChange} value={formik.values.name} className="signupinput" type="text" name="name" id="Name" placeholder="name" />
            <span style={{color:'red'}}>
              {error.name}
              </span>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label className="signuplabel" for="Father">Father Name</Label>
            <Input onChange={formik.handleChange} value={formik.values.father} className="signupinput" type="text" name="father" id="Father" placeholder="father name" />
            <span style={{color:'red'}}>
              {error.lastName}
              </span>
          </FormGroup>
        </Col>
               </Row>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label className="signuplabel" for="Email">Email</Label>
            <Input  onChange={formik.handleChange} value={formik.values.email} className="signupinput" type="email" name="email" id="Email" placeholder="email" />
            <span style={{color:'red'}}>
              {error.email}
              </span>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label className="signuplabel" for="Password">Password</Label>
            <Input onChange={formik.handleChange} value={formik.values.password} className="signupinput" type="password" name="password" id="Password" placeholder="password" />
            <span style={{color:'red'}}>
             {error.passward}</span>
          </FormGroup>
        </Col>
      </Row>
      <Row form>
        <Col md={6}>
      <FormGroup>
        <Label className="signuplabel" for="rePassword">Re-Password</Label>
        <Input  onChange={formik.handleChange} value={formik.values.rePassward} className="signupinput" type="password" name="rePassward" id="rePassword" placeholder="re-password"/>
        <span style={{color:'red'}}>
            {error.rePassward}
            </span>
      </FormGroup>
      </Col>
      <Col  md={6}>
      <FormGroup>
        <Label className="signuplabel" for="Address">Address</Label>
        <Input onChange={formik.handleChange} value={formik.values.address} className="signupinput" type="text" name="address" id="Address" placeholder="Complete address"/>
        <span style={{color:'red'}}>
            {error.address}
            </span>
      </FormGroup>
      </Col>
      </Row>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label className="signuplabel" for="City">City</Label>
            <Input onChange={formik.handleChange} value={formik.values.city} className="signupinput" type="text" name="city" id="City" placeholder="city"/>
            <span style={{color:'red'}}>
            {error.city}
            </span>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label className="signuplabel" for="State">State</Label>
            <Input onChange={formik.handleChange} value={formik.values.state} className="signupinput" type="text" name="state" id="State" placeholder="state"/>
            <span style={{color:'red'}}>
            {error.state}
            </span>
          </FormGroup>
        </Col>
       
      </Row>
      {(!error.email&&!error.password) ?
      [<Link to="/"> <Button onClick={signup} type="submit" className="signupbtn">Sign Up</Button></Link>]:[
        <Button onClick={signup} type="submit" className="signupbtn">Sign Up</Button>
      ]}
      <Link to="/SignIn" > <Button  type="button" className="signinbtn">Sign In</Button></Link>
    </Form> 
 
        </Card>
    )
}

export default SignUp;
