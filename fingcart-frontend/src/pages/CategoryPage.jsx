import { Container, Grid, Typography } from '@mui/material';
import ProductCardOfCategory from '../components/product/ProductCardOfCategory';
import { useParams } from 'react-router-dom';


function CategoryPage() {
  const {products} = useParams;

  return (
    <>
      <Container sx={{ py: 4 }}>

      <Grid container spacing={3} justifyContent="center">
        {products && products.length > 0 ? (
          products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCardOfCategory product={product} />
            </Grid>
          ))
        ) : (
          <Typography variant="body1" align="center" sx={{ mt: 4 }}>
            No products found in this category.
          </Typography>
        )}
      </Grid>
    </Container>
  {/* ); */}
    </>
  )
}

export default CategoryPage