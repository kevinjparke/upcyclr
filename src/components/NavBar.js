import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomAppBar = styled(AppBar)({
  backgroundColor: 'green', // Customize the background color
});

const CustomTypography = styled(Typography)({
  flexGrow: 1,
  textDecoration: 'none', // Remove text decoration from the title
});

const CustomLink = styled(Link)({
  margin: '0 16px', // Customize link margin
  textDecoration: 'none', // Remove text decoration from the links
  color: 'white', // Customize link color
});

const Navbar = () => {
  return (
    <CustomAppBar position="static">
      <Toolbar>
        <CustomTypography variant="h6">
          <CustomLink to="/Account">Upcyclr</CustomLink>
        </CustomTypography>
        <CustomLink to="/pickup">
          <Button color="inherit">PickUp</Button>
        </CustomLink>
        <CustomLink to="/pickup-history">
          <Button color="inherit">History</Button>
        </CustomLink>
        <CustomLink to="/rewards">
          <Button color="inherit">Rewards</Button>
        </CustomLink>
      </Toolbar>
    </CustomAppBar>
  );
};

export default Navbar;
