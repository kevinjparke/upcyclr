import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Container, Grid, InputLabel } from '@mui/material';
import axios from 'axios';

import { UserAuth } from '../../context/AuthContext';
import Navbar from '../NavBar';
import Footer from '../Footer';

const PickupForm = () => {
  const initialFormData = {
    user: {
      id: '',
      name: '',
    },
    pickup_address: {
      street: '',
      unit: '',
      city: '',
      postal: '',
    },
    pickup_start_ts: '',
    pickup_end_ts: ''
  };

  const user = UserAuth()
  console.log(user.user.displayName)
  console.log(user.user.uid)

  const userId = user.user.uid;
  var userName = user.user.displayName;

  const [formData, setFormData] = useState(initialFormData);
  const [submissionStatus, setSubmissionStatus] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Do something with the formData, e.g., send it to the API
    try {
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          };    
      formData.user.id = userId;
      if(!userName){
        userName = user.user.email;
      }
      formData.user.name = userName;
      console.log(formData)
      const url = 'https://1ccnax507l.execute-api.us-east-1.amazonaws.com/dev/pickup-request';
      console.log(formData)
      const response = await axios.post(url, formData, config);
      console.log('API Response:', response.data);
      setSubmissionStatus('success'); // Set success status
    } catch (error) {
      console.error('API Error:', error);
      setSubmissionStatus('error'); // Set error status if there was an error
    }

    // Clear the form after submission
    setFormData(initialFormData);

    // Reset submission status after a few seconds
    setTimeout(() => {
      setSubmissionStatus('');
    }, 5000); // Adjust the delay as needed
  };


  return (
<div>
    <Container maxWidth="sm">

      <Box component="div" p={2} textAlign="center">
        {submissionStatus === 'success' && (
          <Typography variant="h6" color="success">
            The form was submitted successfully.
          </Typography>
        )}
        {submissionStatus === 'error' && (
          <Typography variant="h6" color="error">
            An error occurred while submitting the form.
          </Typography>
        )}
        <Typography variant="h4">Pickup Request Form</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* User Information */}
            {/* <Grid item xs={12}>
              <TextField
                label="User ID"
                variant="outlined"
                name="user.id"
                fullWidth
                value={user.user.id}
                onChange={(e) => setFormData({ ...formData, user: { ...formData.user, id: e.target.value } })}
                required
              />
            </Grid> */}
            {/* <Grid item xs={12}>
              <TextField
                label="User Name"
                variant="outlined"
                name="user.name"
                fullWidth
                value={user.user.displayName || "No name user"}
                onChange={(e) => setFormData({ ...formData, user: { ...formData.user, name: e.target.value } })}
                required
              />
            </Grid> */}

            {/* Pickup Address */}
            <Grid item xs={12}>
              <Typography variant="h6">Pickup Address</Typography>
              <TextField
                label="Street"
                variant="outlined"
                name="pickup_address.street"
                fullWidth
                value={formData.pickup_address.street}
                onChange={(e) =>
                  setFormData({ ...formData, pickup_address: { ...formData.pickup_address, street: e.target.value } })
                }
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Unit"
                variant="outlined"
                name="pickup_address.unit"
                fullWidth
                value={formData.pickup_address.unit}
                onChange={(e) =>
                  setFormData({ ...formData, pickup_address: { ...formData.pickup_address, unit: e.target.value } })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="City"
                variant="outlined"
                name="pickup_address.city"
                fullWidth
                value={formData.pickup_address.city}
                onChange={(e) =>
                  setFormData({ ...formData, pickup_address: { ...formData.pickup_address, city: e.target.value } })
                }
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Postal Code"
                variant="outlined"
                name="pickup_address.postal"
                fullWidth
                value={formData.pickup_address.postal}
                onChange={(e) =>
                  setFormData({ ...formData, pickup_address: { ...formData.pickup_address, postal: e.target.value } })
                }
                required
              />
            </Grid>

            {/* Pickup Time */}
            {/* <Grid item xs={12}>
              <Typography variant="h6">Pickup Time</Typography>
              <TextField
                label="Start Time"
                variant="outlined"
                type="datetime-local"
                name="pickup_start_ts"
                fullWidth
                value={formData.pickup_start_ts}
                onChange={(e) => setFormData({ ...formData, pickup_start_ts: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="End Time"
                variant="outlined"
                type="datetime-local"
                name="pickup_end_ts"
                fullWidth
                value={formData.pickup_end_ts}
                onChange={(e) => setFormData({ ...formData, pickup_end_ts: e.target.value })}
                required
              />
            </Grid> */}
            {/* Pickup Time */}
            <Grid item xs={12}>
              <Typography variant="h6">Pickup Time</Typography>
              <InputLabel shrink>Start Time</InputLabel>
              <TextField
                label=""
                variant="outlined"
                type="datetime-local"
                name="pickup_start_ts"
                fullWidth
                value={formData.pickup_start_ts}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // Step interval is set to 5 minutes (300 seconds)
                }}
                onChange={(e) => setFormData({ ...formData, pickup_start_ts: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel shrink>End Time</InputLabel>
              <TextField
                label=""
                variant="outlined"
                type="datetime-local"
                name="pickup_end_ts"
                fullWidth
                value={formData.pickup_end_ts}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // Step interval is set to 5 minutes (300 seconds)
                }}
                onChange={(e) => setFormData({ ...formData, pickup_end_ts: e.target.value })}
                required
              />
            </Grid>
          </Grid>

          <Button variant="contained" type="submit" fullWidth>
            Submit
          </Button>
        </form>
      </Box>
    </Container>
    </div>
  );
};

export default PickupForm;
