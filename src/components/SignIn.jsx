import React, { useRef, useState, useEffect } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { Container, Box, Typography, Grid, TextField, Alert } from '@mui/material';
import { GoogleButton } from 'react-google-button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { UserAuth } from '../context/AuthContext';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseAuth";
import './SignIn.css'


const SignInForm = () => {
  const navigate = useNavigate();

  // UserAuth() functionality from the first file
  const { googleSignIn, user } = UserAuth();

  const emailRef = useRef();
  const passwordRef = useRef();
  const displayNameRef = useRef();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleNew = () => {
    navigate('/SignUp');
  };

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        
        navigate('/Account');
      })
      .catch((error) => {
        console.log(error);
        window.alert(error)
      });
  };



  let uid;
  let Name;
  const isUidInItems = (data) => {
    return data.Items.some((item) => item.id === uid);
  };

  const makePostRequest = () => {
    const postData = {
      id: uid,
      email: user.email,
      username: Name,
      rewards: 0,
    };
    axios
      .post('https://ebava5cw1m.execute-api.us-east-1.amazonaws.com/default/UserDBService', postData)
      .then((response) => {
        // Handle the response if needed
        console.log('POST request successful:', response.data);
      })
      .catch((error) => {
        // Handle errors if needed
        console.error('Error making POST request:', error);
      });
  };

  const initialUser = () => {
    // Fetch the JSON data from the GET request
    axios
      .get('https://ebava5cw1m.execute-api.us-east-1.amazonaws.com/default/UserDBService')
      .then((response) => {
        const data = response.data;
        // Check if the ID exists in the "Items" array
        if (!isUidInItems(data)) {
          // If the ID does not exist, make the POST request
          makePostRequest();
        }
      })
      .catch((error) => {
        // Handle errors if needed
        console.error('Error fetching data:', error);
      });
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user!=undefined) {
      uid = user.uid;
      if (user.displayName == null) {
        Name = user.email;
      } else {
        Name = user.displayName;
      }
      initialUser();
      navigate('/Account');
    }

    console.log(user);
  }, [user]);

  return (
<div style={{ background: 'linear-gradient(to bottom, #f0f0f0, #d3ffd3)', minHeight: '100vh', padding: '16px' }}>
      <Container maxWidth="sm">
        <Box component="div" p={2} textAlign="center">
          {submissionStatus === 'success' && (
            <Alert variant="filled" severity="success">
              The form was submitted successfully.
            </Alert>
          )}
          {submissionStatus === 'error' && (
            <Alert variant="filled" severity="warning">
              An error occurred while submitting the form.
            </Alert>
          )}
          <form onSubmit={signIn}>
            <Grid container rowSpacing={2} className="form-background">
              <Grid item xs={12}>
                <Typography style={{ marginTop: '-32px' }} variant="h6">
                  Sign In
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  variant="outlined"
                  name="email"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  variant="outlined"
                  name="Password"
                  fullWidth
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={4} sx={{ my: 3 }}>
                <Button variant="outlined" type="button" fullWidth onClick={() => {}}>
                  Cancel
                </Button>
              </Grid>
              <Grid item xs={4} sx={{ mx: 2, my: 3 }}>
                <Button variant="contained" type="submit" fullWidth>
                  Sign In
                </Button>
              </Grid>
              <Grid item xs={12} sx={{ mx: 2, mt: 6 }} align="center">
                <GoogleButton onClick={handleGoogleSignIn} />
              </Grid>
            </Grid>
          </form>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4" onClick={handleNew}>
                Don't have an account?
              </h2>
            </Card.Body>
          </Card>
        </Box>
      </Container>
    </div>
  );
};

export default SignInForm;
