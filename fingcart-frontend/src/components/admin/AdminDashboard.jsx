import { Box, Button, Container, List, ListItem, ListItemText, Paper, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { TableVirtuoso } from 'react-virtuoso';
import CategoryTable from './CategoryTable';
import ProductTable from './ProductTable';
import DashboardSideBar from './DashboardSideBar';
import DashboardHome from './DashboardHome';
// import { Button, Container } from 'react-bootstrap';

function AdminDashboard() {


  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState('');
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState('');

  return (
    <>
      <DashboardSideBar>
        <Container>
          <DashboardHome/>
          {/* <Typography variant="h4" my={4}>Admin Dashboard</Typography> */}
          <Typography variant="h5">Categories</Typography>
          <CategoryTable/>
          <Typography variant="h5">Products</Typography>
          <ProductTable/>
        </Container>

          {/* <Container>            
            <Box mb={4}>
              <Typography variant="h6">Categories</Typography>
              <TextField
                label="New Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                sx={{ mr: 2 }}
              />
              <Button variant="contained" onClick={addCategory}>Add</Button>
              <List>
                {categories.map((cat, index) => (
                  <ListItem key={index}><ListItemText primary={cat} /></ListItem>
                ))}
              </List>
            </Box>
      
            <Box mb={4}>
              <Typography variant="h6">Products</Typography>
              <TextField
                label="New Product"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                sx={{ mr: 2 }}
              />
              <Button variant="contained" onClick={addProduct}>Add</Button>
              <List>
                {products.map((prod, index) => (
                  <ListItem key={index}><ListItemText primary={prod} /></ListItem>
                ))}
              </List>
            </Box>
          </Container>  */}
      </DashboardSideBar>

    </>
  )
}

export default AdminDashboard