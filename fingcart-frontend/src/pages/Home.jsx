import React from 'react';
import { Card, CardMedia, CircularProgress, Container, Grid, Link, Rating, Stack, Switch, Typography } from '@mui/material';
import { useProducts } from '../context/ProductContext';
import ProductCardHome from '../components/product/ProductCardHome';
import homeBanner from '../assets/phone_banner.jpeg';
import banner1 from '../assets/bannerboy.jpeg';
import banner2 from '../assets/car_banner.jpeg';
import banner3 from '../assets/electronics_banner.jpeg';

import { Carousel } from 'react-bootstrap';
import ProductCardOfCategory from '../components/product/ProductCardOfCategory';
function Home() {

  const { products, loading } = useProducts();

  const srcList = [
    banner1,
    banner2,
    banner3
  ];

  const carouselProducts = [
    {
      "id": 3,
      "name": "Puma T-shirt",
      "description": "Best quality, Durable",
      "price": 1500,
      "quantity": 40,
      "imageUrl": "https://placehold.co/600x400",
      "categoryId": "68ca4d2b17556094354be368",
    },
    {
      "id": 6,
      "name": "Tomy Hilfiger Bag",
      "description": "Best quality, Durable",
      "price": 1200,
      "quantity": 40,
      "imageUrl": "https://placehold.co/600x400",
      "categoryId": "68ca4d2b17556094354be368",
    },

    {
      "id": 7,
      "name": "Samsung Galaxy S24",
      "description": "Best quality, Durable",
      "price": 1500,
      "quantity": 15,
      "imageUrl": "https://placehold.co/600x400",
      "categoryId": "68ca4d2b17556094354be368",
    }

     
  ];

  return (
    <>

    <Card sx={{maxHeight: 500}}>
      <CardMedia sx={{maxHeight: 500}}
        component="img"
        alt="Banner image"
        image={homeBanner}
      />
      <Stack direction="row" alignItems="center" spacing={3} p={2} useFlexGap>
        <Stack direction="column" spacing={0.5} useFlexGap>
          <Stack direction="row" spacing={1} useFlexGap>
          </Stack>
        </Stack>
      </Stack>
    </Card>


    {loading && 
    <Container sx={{ py: 4, textAlign: 'center' }}>
      <CircularProgress />
    </Container> }

      <Container sx={{ py: 4 }}>
      <Grid container spacing={3} justifyContent="center">
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCardHome product={product} /> 
          </Grid>
        ))}
      </Grid>

      <Container 
      maxWidth={false} 
      disableGutters 
      sx={{ mb: 1, p: 0 }}
    >
          <Carousel fade>
            {srcList.map((url, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={url}
                  alt={`Banner ${index + 1}`}
                  style={{  objectFit: 'cover', 
                    height: 500,
                  }}
                />
              </Carousel.Item>
            ))}
          </Carousel>

      </Container>

      <Container 
      maxWidth={false} 
      disableGutters 
      sx={{ mb: 1, p: 0 }}
    >
          <Carousel fade>
            {carouselProducts.map( (carouselProduct) => (
              <Carousel.Item key={carouselProduct.id}>
                <ProductCardOfCategory product={carouselProduct} />
              </Carousel.Item>

            ))}
          </Carousel>

      </Container>

    </Container>
    </>
  )
}

export default Home;