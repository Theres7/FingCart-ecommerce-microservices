import React, { useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Button,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const initialCart = [
  { id: 1, name: "Product A", price: 50, quantity: 2 },
  { id: 2, name: "Product B", price: 30, quantity: 1 },
  { id: 3, name: "Product C", price: 20, quantity: 3 },
];

const CartPage = () => {
  const [cartItems, setCartItems] = useState(initialCart);

  const handleQuantityChange = (id, value) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: Number(value) } : item
    );
    setCartItems(updatedCart);
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ marginY: 4 }}>
        My Shopping Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Typography>Your cart is empty.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name} {item.imageUrl}</TableCell>
                  <TableCell align="right">{'\u20B9'}{item.price}</TableCell>
                  <TableCell align="center">
                    <TextField
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                      inputProps={{ min: 1, style: { width: "60px", textAlign: "center" } }}
                    />
                  </TableCell>
                  <TableCell align="right">{'\u20B9'}{item.price * item.quantity}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="error"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={3} align="right">
                  <Typography variant="h6">Total:</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6">{'\u20B9'}{getTotalPrice()}</Typography>
                </TableCell>
                <TableCell />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Box sx={{ marginTop: 3, display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" color="primary" disabled={cartItems.length === 0}>
          Checkout
        </Button>
      </Box>
    </Container>
  );
};

export default CartPage;
