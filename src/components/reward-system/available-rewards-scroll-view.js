import { RewardCard } from "./reward-card";
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../App.js';
import { UserAuth } from '../../context/AuthContext'; // Make sure to import UserAuth

export const AvailableRewardsScrollView = () => {
    const { rewards } = useContext(AppContext);
    const { user } = UserAuth(); // Retrieve the current user
    
    // Filter the rewards to only include those that haven't been redeemed by the current user
    const unredeemedRewards = rewards.filter((reward) => {
        return !reward.redeemedBy || !reward.redeemedBy.includes(user.uid);
    });

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Available Rewards
            </Typography>
            <Box sx={{ display: 'flex', overflowX: 'auto', padding: 2 }}>
                {unredeemedRewards.map((reward) => (
                // Add a conditional check to ensure the reward is valid
                reward && reward.title ? (
                <Link key={reward.id} to={`/rewards/${reward.id}`} style={{ textDecoration: 'none' }}>
                    <RewardCard reward={reward} />
                </Link>
                ) : null
                ))}
            </Box>
        </div>
    );
}
