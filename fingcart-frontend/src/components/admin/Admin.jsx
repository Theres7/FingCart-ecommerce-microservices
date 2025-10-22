import React, { useEffect, useState } from 'react'
import AdminDashboard from './AdminDashboard';
import { Box, Button, Container, List, ListItem, ListItemText, Paper, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Admin() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = () => {
      if (username === 'tuset6' && password === 'pass12') {
        setIsLoggedIn(true);
      } else {
        alert('Invalid credentials');
      }

      
    };
  
    // useEffect( () => {
    //   const storeLocal = localStorage.getItem("adminToken");
    //   console.log("Get adminToken: ", storeLocal);
    // }, [])
  
  
  
    const addCategory = () => {
  
      axios.post('http://localhost:9000/api/categories', {
       name: 'Watches',
        description: 'Smartwatches, digital watches and analog watches with metal strapes'
  
      })
      .then(response => console.log('Adding User data', response.data))
      .catch(error => console.log('Error while adding User', error));
   
      if (category) {
        setCategories([...categories, category]);
        setCategory('');
      }
    };
  
  
  
    const addProduct = () => {
  
      axios.post('http://localhost:9000/api/products', {
        name: 'Watches',
         description: 'Smartwatches, digital watches and analog watches with metal strapes'
   
       })
       .then(response => console.log('Adding User data', response.data))
       .catch(error => console.log('Error while adding User', error));
    
      if (product) {
        setProducts([...products, product]);
        setProduct('');
      }
    };
  
  
    return (
      <>
  
      { !isLoggedIn &&
        <Container maxWidth="sm">
          
          <Box mt={10} p={4} boxShadow={3}>
            <Typography variant="h4" align="center" mb={3}>Admin Login</Typography>
            <TextField
              label="Username"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

           <Link to="/admin/dashboard">
            <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleLogin}>
              Login
            </Button>
           </Link>

          </Box>
        </Container>
      
    }
    </> 
    ) 
}

export default Admin;