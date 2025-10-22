import { Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ProductCardOfCategory from '../components/product/ProductCardOfCategory';
import { useParams } from 'react-router-dom';
// import { useProductsByCategory } from '../context/ProductByCategoryContext';
import ProductCardHome from '../components/product/ProductCardHome';

function CategoryPage() {
  const { categoryName } = useParams();

  const products = [];
  // const { products } = useProductsByCategory();
  // const { productsByCategory, findCategoryId } = useProductsByCategory()

  // useEffect(() => {
  //   if (categoryName) {
  //     findCategoryId(categoryName); // triggers filtering in context
  //   }
  // }, [categoryName, findCategoryId]);

  // const filteredProducts = category
  //                             ? products.filter((product) => 
  //                               product.categoryId === "11")
  //                               : [];

  // const productsByCategoryId = () => {
  //    category ? 
  //    products.filter((product) => 
  //                                   product.categoryId === "11")
  //                                   : [];
  // }

  return (
    <>
      <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ textTransform: 'capitalize' }}>
        {/* {categoryName} */}
      </Typography>

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