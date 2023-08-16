import React, { useState, useEffect } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';
import Navbar from '../NavBar';
import Footer from '../Footer';
import { UserAuth } from '../../context/AuthContext';


const PickupRequests = () => {
  const [pickupRequests, setPickupRequests] = useState([]);
  const user = UserAuth();
  const userId = user.user.uid;

  useEffect(() => {
    // Fetch the pickup requests data from the API
    const fetchData = async () => {
        try {

            var url = 'https://324q8p7pd4.execute-api.us-east-1.amazonaws.com/dev/pickup-request/' + userId;
            
            // Make the fetch request
            const response = await fetch(url);
            
            // Check if the response was successful (status code 200-299)
            if (!response.ok) {
              throw new Error(`API Error: ${response.status} ${response.statusText}`);
            }

            // Parse the response JSON
            const data = await response.json();
            console.log(data);
            
            // Assuming 'data' contains the 'Items' array from the response
            setPickupRequests(data.data);
            console.log(pickupRequests)
            console.log(user);
            console.log(user.user.id);
            console.log(user.user);
          } catch (error) {
            console.error('API Error:', error);
          }
    };
    fetchData();
  }, [userId]);

  
  return (
    <div style={{ background: 'linear-gradient(to bottom, #f0f0f0, #d3ffd3)', minHeight: '100vh', padding: '16px' }}>
    {/* <Navbar></Navbar> */}
      <Typography variant="h4" align="center" gutterBottom>
        Pickup history
      </Typography>
      {pickupRequests.length === 0 ? (
        <Typography variant="body1" align="center">
          No pickup requests found.
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User Name</TableCell>
                <TableCell>City</TableCell>
                <TableCell>Street</TableCell>
                <TableCell>Unit</TableCell>
                <TableCell>Postal Code</TableCell>
                <TableCell>Items in Bag</TableCell>
                <TableCell>Pickup Start Time</TableCell>
                <TableCell>Pickup End Time</TableCell>
                <TableCell>Reward</TableCell>
                <TableCell>Request Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pickupRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.user.name}</TableCell>
                  <TableCell>{request.pickup_address.city}</TableCell>
                  <TableCell>{request.pickup_address.street}</TableCell>
                  <TableCell>{request.pickup_address.unit}</TableCell>
                  <TableCell>{request.pickup_address.postal}</TableCell>
                  <TableCell>
                    {request.items_in_bag.length > 0 ? (
                      <ul>
                        {request.items_in_bag.map((item, index) => (
                          <li key={index}>{`${item.weight} ${item.unit} of ${item.type}`}</li>
                        ))}
                      </ul>
                    ) : "None"}
                  </TableCell>
                  <TableCell>{request.pickup_start_ts}</TableCell>
                  <TableCell>{request.pickup_end_ts}</TableCell>
                  <TableCell>{request.reward}</TableCell>
                  <TableCell>{request.request_status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default PickupRequests;

