import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);


   useEffect(() => {
      axios.get("http://localhost:9000/api/products")
        .then(res => {
          // console.log("Product List");
          setProducts(res.data.content);
          setLoading(false); 
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
       })
    }, []);
  
  return (
    <ProductContext.Provider 
      value={{ products, 
               setProducts, 
               loading,
               setLoading            
     }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
}
