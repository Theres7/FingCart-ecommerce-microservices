import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Button, CardActions, Rating, CardActionArea } from "@mui/material";

import { Link } from 'react-router-dom';

function ProductCardOfCategory({product}) {
  const [value, setValue] = useState(0);
  
  return (
    <> 
    <Card sx={{ maxWidth: 300, m: 2 }}>
      <CardActionArea component={Link} to={`/products/${product.id}`}>
      <CardMedia
        component="img"
        height="200"
        image={product.imageUrl}
        alt={product.name}
      />
      <CardContent 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // centers horizontally
          justifyContent: 'center', // centers vertically (if needed)
          textAlign: 'center', // ensures text is centered
        }} >
        <Typography variant="h6">{product.name}</Typography>
        <Rating name="read-only" value={value} readOnly />
        <Typography color="text.secondary">
        Price: {'\u20B9'}{product.price}</Typography>
      </CardContent>
      </CardActionArea>

    </Card>
    </>
  )
}

export default ProductCardOfCategory;