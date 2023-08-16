import React from 'react';
import { Typography, Link, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

const FooterWrapper = styled('footer')({
  backgroundColor: '#333',
  color: 'white',
  padding: '16px',
  //position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100%',
});

const Footer = () => {
  return (
    <FooterWrapper>
      <Container maxWidth="sm">
        <Typography variant="h6">Upcyclr</Typography>
        <Typography variant="body2" gutterBottom>
          Welcome to Upcyclr, your one-stop destination for upcycling ideas and inspiration!
        </Typography>
        <Typography variant="body2" gutterBottom>
          Follow us on social media:
        </Typography>
        <Link href="#" color="inherit" style={{ marginRight: 8 }}>
          Facebook
        </Link>
        <Link href="#" color="inherit" style={{ marginRight: 8 }}>
          Twitter
        </Link>
        <Link href="#" color="inherit">
          Instagram
        </Link>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;
