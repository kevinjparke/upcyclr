import React, { useContext } from 'react';
import { AppContext } from '../../App';
import { UserAuth } from "../../context/AuthContext";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Link } from '@mui/material';


export const RedeemedRewards = () => {
    const { user } = UserAuth();
    const { rewards } = useContext(AppContext);

    if (!user || !rewards) {
      return (<div><h5> You have not redeemed any reward. Click on redeem from the available list to get started </h5></div>);
    }

    const redeemedRewards = rewards.filter((reward) => reward.redeemedBy && reward.redeemedBy.includes(user.uid));
    console.log(user.uid);
  
    return (
        <div>
        <Typography variant="h4" gutterBottom>
          Redeemed Rewards
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {redeemedRewards.map((reward) => (
                <TableRow key={reward.id} component={Link} to={`/rewards/${reward.id}`} style={{ textDecoration: 'none' }}>
                  <TableCell component="th" scope="row">
                    {reward.title}
                  </TableCell>
                  <TableCell>{reward.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  };

