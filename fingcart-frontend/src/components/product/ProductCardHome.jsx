import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Button, CardActions, Rating } from "@mui/material";

import { Link } from 'react-router-dom';

function ProductCardHome({product}) {
  const [value, setValue] = useState(0);

  
  return (
    <> 
    <Card sx={{ maxWidth: 300, m: 2 }}>
      <CardMedia
        component="img"
        height="200"
        image={product.imageUrl}
        alt={product.name}
      />
      <CardContent>
        <Typography variant="h6">{product.name}</Typography>
        <Rating name="read-only" value={value} readOnly />
        <Typography color="text.secondary">
        Price: {'\u20B9'}{product.price}</Typography>
      </CardContent>
      <CardActions>
        {/* <Button variant="contained" color="primary" href="/products">
          View Details
        </Button> */}
        <Button variant="contained" 
                color="primary" 
                component={Link}
                to={`/products/${product.id}`} >
          View Details
        </Button>
      </CardActions>
    </Card>

    </>
  )
}

export default ProductCardHome