import { useEffect, useState } from "react";
import axios from "axios";
import MainContent from "../menu/MainContent";

export const ProductMenuAdmin = () => {
   const [product, setProduct] = useState([]);

   const getProducts = async () => {
      try {
         const response = await axios.get("http://localhost:2000/product?name=");
         setProduct(response?.data);
      } catch (err) {
         console.error("Error fetching products:", err);
      }
   };

   console.log(product);

   useEffect(() => {
      getProducts();
   }, []);
   return (
      <>
         <MainContent product={product} />
      </>
   );
};
