import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, Grid, TextField, Card, IconButton, CardContent } from '@mui/material';
import './Home.css';

const HomePage2 = () => {
  const navigate = useNavigate()

  const handleSignInClick = () => {
    navigate('/SignIn')
  };

  const [item, setItem] = useState('');
  const [pin, setPin] = useState('');

  return (
    <div className='home-background-container'>
      <Typography variant="h2" sx={{ py: 2 }} align="center" className='heading'>
        Welcome to Recycle Rewards!!
      </Typography>
    
      <div className='banner-container'>
        <Grid container rowSpacing={2} align="center" className='banner'>
          <Grid item xs={12}>
            <Typography variant="h4" sx={{ py: 2 }} align="center">
              Help the word by Recycling
            </Typography>
          </Grid>
          <Grid container rowSpacing={2}>
        <Grid item xs={12} align="center" className='login-button'>
          <button onClick={() => handleSignInClick()}>Login</button>
        </Grid>
      </Grid>
          {/* <Grid item xs={12} className="banner-button">
            <TextField
              label="Search an item"
              variant="outlined"
              name="item"

              value={item}
              onChange={(e) =>
                setItem(e.target.value)
              }
              required
            />
            <TextField
              label="Enter zip code"
              variant="outlined"
              name="item"

              value={pin}
              onChange={(e) =>
                setPin(e.target.value)
              }
              required
            />
            <Button type="button" color="success" variant="contained" className='search-button'>
              Search
            </Button>
          </Grid> */}
        </Grid>

      </div>
      <Grid container rowSpacing={2} className='recycle-news'>
        <Grid item xs={12} align="center">
          <Typography variant="h4" sx={{ py: 2 }} align="center">
            The latest from Recycle Now
          </Typography>
        </Grid>
        <Grid item xs={4} sx={{ p: 4 }}>
          <Card variant="outlined" sx={{ width: 320 }}>
            <div>
              <Typography level="h2" fontSize="md" sx={{ m: 2 }}>
                Why is recycling important?
              </Typography>
              <IconButton
                aria-label="bookmark Bahamas Islands"
                variant="plain"
                color="neutral"
                size="sm"
                sx={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}
              >
              </IconButton>
            </div>
            <div className='card-image'>
              <img
                src="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286"
                srcSet="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286&dpr=2 2x"
                loading="lazy"
                width="200px"
                height="200px"
                alt=""
              />
            </div>
            <CardContent orientation="horizontal">
              <Button
                type="button" color="success" variant="contained"
                aria-label="Explore Bahamas Islands"
                sx={{ ml: 'auto', fontWeight: 600 }}
              >
                Explore
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4} sx={{ p: 4 }}>
          <Card variant="outlined" sx={{ width: 320 }}>
            <div>
              <Typography level="h2" fontSize="md" sx={{ m: 2 }}>
                Understanding the recycling
              </Typography>
              <IconButton
                aria-label="bookmark Bahamas Islands"
                variant="plain"
                color="neutral"
                size="sm"
                sx={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}
              >
              </IconButton>
            </div>
            <div className='card-image'>
              <img
                src="https://postertemplate.co.uk/wp-content/uploads/2018/07/File-1516201467-1.png"
                // loading="lazy"
                width="200px"
                height="200px"
                alt=""
              />
            </div>
            <CardContent orientation="horizontal">
              <Button
                type="button" color="success" variant="contained"
                aria-label="Explore Bahamas Islands"
                sx={{ ml: 'auto', fontWeight: 600 }}
              >
                Explore
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>


    </div>
  );
};

export default HomePage2;
