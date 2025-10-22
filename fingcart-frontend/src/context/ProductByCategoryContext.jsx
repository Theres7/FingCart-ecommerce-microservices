// import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

// const ProductByCategoryContext = createContext();

// export function ProductByCategoryProvider({ children }) {
//   // const [products, setProducts] = useState([]);
//   const [categoryId, setCategoryId] = useState("");
//   const [productsByCategory, setProductsByCategory] = useState([]);

//   const categories = [
//     { categoryId: "11", name: "Laptop" },
//     { categoryId: "68", name: "Smartphone" },
//   ];

//   // useEffect(() => {
//     const products = [
//       { id: 3, name: "Mac Air M4", categoryId: "11" },
//       { id: 4, name: "Dell Laptop", categoryId: "11" },
//       { id: 5, name: "iPhone", categoryId: "68" },
//     ];
//     // setProducts(products);
//   // }, [products]);

//   // 🧠 Make this stable so it doesn’t recreate on every render
//   const findCategoryId = useCallback(
//     (categoryName) => {
//       const category = categories.find(
//         (c) => c.name.toLowerCase() === categoryName.toLowerCase()
//       );
//       if (category) {
//         setCategoryId(category.categoryId);
//       } else {
//         setCategoryId("");
//         setProductsByCategory([]);
//       }
//     },
//     // [categories] // categories is static here, so it’s fine
//   );

//   useEffect(() => {
//     if (categoryId && products.length > 0) {
//       setProductsByCategory(products.filter((p) => p.categoryId === categoryId));
//     } else {
//       setProductsByCategory([]);
//     }
//   }, [categoryId, products]);

//   return (
//     <ProductByCategoryContext.Provider
//       value={{
//         products,
//         // setProducts,
//         categoryId,
//         setCategoryId,
//         productsByCategory,
//         findCategoryId,
//       }}
//     >
//       {children}
//     </ProductByCategoryContext.Provider>
//   );
// }

// export function useProductsByCategory() {
//   const context = useContext(ProductByCategoryContext);
//   if (!context)
//     throw new Error("useProductsByCategory must be used within the provider");
//   return context;
// }
