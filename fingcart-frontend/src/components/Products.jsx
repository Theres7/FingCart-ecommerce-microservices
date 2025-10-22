// import React, { useState } from 'react';

// function Products() {
//   // const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);

//   const products = [
//     {
//       "id": 3,
//       "name": "Safari Bags",
//       "description": "Popular, Best quality",
//       "price": 3000.00,
//       "quantity": 20,
//       "imageUrl": "https://placehold.co/600x400",
//       "categoryId": "68ca4d2b17556094354be368",
//       "createdAt": "2025-09-17T10:53:31.535446",
//       "updatedAt": "2025-09-17T11:25:28.687886"
//   },
  
//   {
//     "id": 4,
//     "name": "Dell Bags",
//     "description": "Popular, Best quality",
//     "price": 3000.00,
//     "quantity": 20,
//     "imageUrl": "https://placehold.co/600x400",
//     "categoryId": "68ca4d2b17556094354be368",
//     "createdAt": "2025-09-17T10:53:31.535446",
//     "updatedAt": "2025-09-17T12:25:28.687886"
// }
//   ]



// //   useEffect(() => {
// //     axios.get('http://localhost:9000/api/products')
// //       .then(res => {
// //         setData(res.data);
// //       })
// //       .catch(err => {
// //         console.error('Error fetching data:', err);
// //       });
// //   }, []);
// // };

// // const handleAddProduct = () => {
// //   axios.post('http://localhost:9000/api/products',{
// //     name: 'SkyBags',
// //     description: 'Padded Backpack',
// //     price: '3100',
// //     quantity: '15',
// //     imageUrl: 'https://placehold.co/600x400',
// //     categoryId: '68c3f30c2811723b43484525'
// //   })
// //   .then(response => console.log(response.data))
// //   .catch(error => console.log('Recipe Add Error', error));

//   return (
//     <div>
//       <div className="product-grid">
//         <div className="card-600x400">
//         {products && products.map( (product, index) => (
//           <p key={index}>{product.name}</p>
//         // <ProductCard key={index}{...product} />
//       )
//     )}
//         </div>

//       </div>
      
      

//     </div>
//   )
// }

// export default Products;