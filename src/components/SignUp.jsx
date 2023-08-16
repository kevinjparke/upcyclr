import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseAuth";
import './SignUp.css'; // Import custom CSS file for styling

const SignUp = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const displayNameRef = useRef()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()

  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential)
        navigate('/SignIn')
        return ("Sign Up Success!!")
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div style={{ background: 'linear-gradient(to bottom, #f0f0f0, #d3ffd3)', minHeight: '100vh', padding: '16px' }}>
    <div className="signup-container"> {/* Add a class for container styling */}
      <Card className="signup-card"> {/* Add a class for card styling */}
        <Card.Body>
          <h2 className="text-center signup-title">Sign Up</h2> {/* Add a class for title styling */}
          <Form onSubmit={signUp}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control className="form-input" type="email" ref={emailRef} onChange={(e) => setEmail(e.target.value)} required />
            </Form.Group>

            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control className="form-input" type="password" ref={passwordRef} onChange={(e) => setPassword(e.target.value)} required />
            </Form.Group>

            <div className="text-center"> {/* Add a class to center the button */}
              <Button className="signup-button" type="submit">Sign Up</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
      </div>
   
  );
};

export default SignUp;
