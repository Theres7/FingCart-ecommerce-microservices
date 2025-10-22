import { Box, Card, CardMedia, Chip, Rating, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './ProductDetails.css';

function ProductDetails() {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const products = [
      {
        "id": 3,
        "name": "Safari Bags",
        "description": "Popular, Best quality",
        "price": 3000.00,
        "quantity": 20,
        "imageUrl": "https://placehold.co/600x400",
        "categoryId": "68ca4d2b17556094354be368",
        "createdAt": "2025-09-17T10:53:31.535446",
        "updatedAt": "2025-09-17T11:25:28.687886"
    },
    {
      "id": 4,
      "name": "Dell Bags",
      "description": "Popular, Best quality",
      "price": 3000.00,
      "quantity": 20,
      "imageUrl": "https://placehold.co/600x400",
      "categoryId": "68ca4d2b17556094354be368",
      "createdAt": "2025-09-17T10:53:31.535446",
      "updatedAt": "2025-09-17T12:25:28.687886"
  }
 ]

    const findProductById = products.find((p) => p.id === Number(id));
    setProduct(findProductById || null);
    console.log(product);
  }, [id]);

  if (!product) {
    return <Typography>Loading product details...</Typography>;
  }

  return (
    <>
     <Card
        variant="outlined"
        sx={{ 
          p: 2, 
          pt: 4,
          display: 'flex', 
          flexWrap: 'wrap', 
          zIndex: 1 
          }}>
      {/* <CardMedia
        component="img"
        width="600"
        height="600"
        alt="123 Main St, Phoenix, AZ cover"
        src="https://placehold.co/600x400"
        sx={{
          borderRadius: '6px',
          width: { xs: '100%', sm: 100 },
        }}
      /> */}
       <CardMedia
        component="img"
        width="600"
        height="600"
        alt="123 Main St, Phoenix, AZ cover"
        src="https://placehold.co/600x400"
        sx={{
          borderRadius: '6px',
          width: { xs: '100%', sm: 600 },
          height: { xs: 'auto', sm: 600 },
          objectFit: 'cover',
        }}
      />
    <Box sx={{ alignSelf: 'flex-start', ml: 2 }}>
    <Typography variant="body2" color="text.primary" fontWeight="bold" fontSize="2rem">
      {product.name}
    </Typography>
    <Typography variant="body2" color="text.secondary"  fontSize="1.25rem">
      {product.description}
    </Typography>

    <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
    <Typography fontWeight="bold" noWrap gutterBottom>
      {/* {product.price} */}
      {'\u20B9'}{product.price}
    </Typography>
    {/* <Chip
      size="small"
      variant="outlined"
      // icon={<InfoRounded />}
      label="Confidence score: 85%"
      sx={(theme) => ({
        '.MuiChip-icon': { fontSize: 16, ml: '4px', color: 'success.500' },
        bgcolor: 'success.50',
        borderColor: 'success.100',
        color: 'success.900',
        // ...theme.applyDarkStyles({
        //   bgcolor: 'primaryDark.700',
        //   color: 'success.200',
        //   borderColor: 'success.900',
        // }),
      })}
    /> */}

    <div className="actions">
      <button className="addToCart btn-action">Add to Cart</button>
      <button className="wishlist btn-action"> {'\u{1F90D}'} Wishlist</button>

     

    </div>
  </Box>
</Card>

    </>

  )
}

export default ProductDetails