
import { Form, Button, Card } from 'react-bootstrap'
import { UserAuth } from "../context/AuthContext";
import {useNavigate} from 'react-router-dom';
import './Account.css'
import axios from 'axios';
import { Typography, Grid, TextField, Box, CardContent } from '@mui/material';
import React, { useEffect, useRef, useState } from "react";


const SignoutGoogle = () => {
    const { loggingOut, user} = UserAuth();
    const navigate = useNavigate()
    const [reward, setReward] = useState(0);

    // Use user.displayname to get the user name adn store it into data base

    const handleLogout = async () =>{
        try{
            await loggingOut()
            navigate('/')
        }catch (error){
         console.log(error)
        }
    }

    let username

    if(!user.displayName)
    username = user.email
    else
    username = user.displayName


    //get user rewards
    useEffect(() => {
        axios
          .get('https://ebava5cw1m.execute-api.us-east-1.amazonaws.com/default/UserDBService')
          .then((response) => {
            const data = response.data.Items; // we're interested in the Items array
            const user = data.find(item => item.username === username); // find the user with the given username
            if (user) {
              setReward(user.rewards);  // Save the user's reward to state
            }
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      }, []);
    
   
return(
<div className="account-background">

<Card>
<Grid item xs={2} sx={{ p: 1 }}>
      <Card variant="outlined" sx={{ width: 300 }}>
        <CardContent>
          <Typography variant="h2" sx={{ m: 10 }}>
            Welcome {username}
          </Typography>
          <Typography variant="h3" sx={{ m: 10 }}>
           Your Collected Reward is {reward}
          </Typography>
        </CardContent>
      </Card>
</Grid>
</Card>

<Box sx={{ pl: 5 }}>
        <Button className="w-100" onClick={handleLogout}>Log Out</Button>
</Box>


</div>



)
}

export default SignoutGoogle;