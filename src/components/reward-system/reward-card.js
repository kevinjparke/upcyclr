import { Card, CardContent, Typography } from '@mui/material';

export const RewardCard = ( { reward }) => {
    return (
        <Card sx={{ minWidth: 250, height: 280, marginRight: 2 }}>
            <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                    {reward.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {reward.description}
                </Typography>
            </CardContent>
        </Card>
    )
    
}