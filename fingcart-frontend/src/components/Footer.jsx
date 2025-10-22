import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton, Divider } from '@mui/material';
import { Facebook, Twitter, Instagram, YouTube } from '@mui/icons-material';

function Footer() {
  return (
    <Box
      sx={{
        bgcolor: '#16476A',
        color: 'white',
        mt: 8,
        pt: 6,
        pb: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          {/* Brand Info */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              FingCart
            </Typography>
            <Typography variant="body2" color="#8CCDEB">
              Your one-stop shop for all your online shopping needs. 
              Discover top deals and new arrivals every day!
            </Typography>
          </Grid>

          {/* Customer Service */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Customer Service
            </Typography>
            <Box>
              <Link href="#" color="inherit" underline="hover" display="block">Help Center</Link>
              <Link href="#" color="inherit" underline="hover" display="block">Returns</Link>
              <Link href="#" color="inherit" underline="hover" display="block">Shipping Info</Link>
              <Link href="#" color="inherit" underline="hover" display="block">Track Order</Link>
            </Box>
          </Grid>

          {/* Company Info */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Company
            </Typography>
            <Box>
              <Link href="#" color="inherit" underline="hover" display="block">About Us</Link>
              <Link href="#" color="inherit" underline="hover" display="block">Careers</Link>
              <Link href="#" color="inherit" underline="hover" display="block">Press</Link>
              <Link href="#" color="inherit" underline="hover" display="block">Contact</Link>
            </Box>
          </Grid>

          {/* Social Media */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Follow Us
            </Typography>
            <Box>
              <IconButton color="inherit" href="#"><Facebook /></IconButton>
              <IconButton color="inherit" href="#"><Twitter /></IconButton>
              <IconButton color="inherit" href="#"><Instagram /></IconButton>
              <IconButton color="inherit" href="#"><YouTube /></IconButton>
            </Box>
            <Typography variant="body2" color="#8CCDEB" sx={{ mt: 2 }}>
              Stay updated with the latest deals and offers!
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: '#333' }} />

        {/* Footer Bottom */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexDirection={{ xs: 'column', sm: 'row' }}
        >
          <Typography variant="body2" color="#8CCDEB">
            © {new Date().getFullYear()} FingCart. All rights reserved.
          </Typography>
          <Box>
            <Link href="#" color="inherit" underline="hover" sx={{ mx: 1 }}>Privacy Policy</Link>
            <Link href="#" color="inherit" underline="hover" sx={{ mx: 1 }}>Terms of Use</Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
