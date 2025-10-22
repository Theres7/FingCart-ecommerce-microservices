import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { createTheme, CssBaseline, ThemeProvider, Typography } from '@mui/material';
import Navbar from './components/navbar/Navbar';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Admin from './components/admin/Admin';
import AdminDashboard from './components/admin/AdminDashboard';
import ProductTable from './components/admin/ProductTable';
import LoginForm from './components/user/LoginForm';
import RegisterForm from './components/user/RegisterForm';
import ProductDetails from './pages/ProductDetails';
import { ProductProvider } from './context/ProductContext';
import CategoryPage from './pages/CategoryPage';
import CartPage from './pages/CartPage';
import Footer from './components/Footer';

function App() {
  const theme = createTheme({
    palette: {
      mode: "light", 
      // mode: "dark", 
      primary: { main: '#1976d2' },
      secondary: { main: '#9c27b0' },
      success: { main: '#2e7d32' },
      error: { main: '#d32f2f' },
    },
  });


  return (
    <>
      <div>
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Header/>
        <Navbar/>
        <Routes>
          <Route path="/admin" element={<Admin/>} />
          <Route path="/" element={
            <ProductProvider>
               <Home />
           </ProductProvider>} />
          <Route path="/admin/dashboard" element={
            <ProductProvider>
              <AdminDashboard />
            </ProductProvider>} />
            
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/admin/dashboard/all-products" element={
            <ProductProvider>
              <ProductTable />
           </ProductProvider>} />

          <Route 
          path="/category/:categoryName" 
          element={
            <ProductProvider>
              <CategoryPage />
           </ProductProvider>
          } 
        />
        
          <Route path="/cart" element={<CartPage />} />
          
          <Route path="/login" element={<LoginForm/>} />
          <Route path="/register" element={<RegisterForm/>} />

        </Routes>

        <Footer/>
      
    </ThemeProvider>

      </div>
    </>
  )
}

export default App
