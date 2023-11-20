/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import { TabsTrash } from "./Tabs";
import { useLocation } from "react-router-dom";

export const Trash = () => {
   const [filteredCategories, setFilteredCategories] = useState();
   const [filteredSubCategories, setFilteredSubCategories] = useState();
   const [filteredProduct, setFilteredProduct] = useState();
   const getCategory = async () => {
      try {
         const category = await axios.get(
            `http://localhost:2000/categories?name=`
         );
         const deletedCategory = category.data.filter(
            (category) => category.isDeleted === true
         );
         setFilteredCategories(deletedCategory);
      } catch (error) {
         console.log(error);
      }
   };
   const getSubCategory = async () => {
      try {
         const subcategory = await axios.get(
            `http://localhost:2000/subcategories?name=`
         );
         const deletedsubcategory = subcategory.data.filter(
            (subcategory) => subcategory.isDeleted === true
         );
         setFilteredSubCategories(deletedsubcategory);
      } catch (error) {
         console.log(error);
      }
   };
   // const getProduct = async () => {
   //    try {
   //       const product = await axios.get(`http://localhost:2000/product?name=`);
   //       const deletedproduct = product.data.filter(
   //          (product) => product.isDeleted === true
   //       );
   //       console.log(product)
   //       setFilteredProduct(deletedproduct);
   //    } catch (error) {
   //       console.log(error);
   //    }
   // };

const location = useLocation();
const queryParams = new URLSearchParams(location.search);
const categoryId = queryParams.get("category");
const name = queryParams.get("name");
const sort = queryParams.get("sort");
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 10;

const getProduct = async () => {
   let url = `http://localhost:2000/product?page=${currentPage}&limit=${itemsPerPage}`;
   if (categoryId) {
      url += `${url.includes("?") ? "&" : "?"}category=${categoryId}`;
   }
   if (name) {
      url += `${url.includes("?") ? "&" : "?"}name=${name}`;
   }
   if (sort) {
      url += `${url.includes("?") ? "&" : "?"}sort=${sort}`;
   }

   try {
      const response = await axios.get(url);
      const deletedproduct = response?.data.filter(
         (product) => product.isDeleted === true
      );
      setFilteredProduct(deletedproduct);
   } catch (err) {
      console.error("Error fetching products:", err);
   }
};




   const restoreCategory = async (categoryId) => {
      console.log(categoryId);
      try {
         await axios.patch(
            `http://localhost:2000/categories/remove/${categoryId}`
         );
         getCategory();
      } catch (error) {
         console.log(error);
      }
   };
   const restoresubCategory = async (subCategoryId) => {
      try {
         await axios.patch(
            `http://localhost:2000/subcategories/remove/${subCategoryId}`,
         );
         getSubCategory();
      } catch (error) {
         console.log(error);
      }
   };
   const restoreproduct = async (productId) => {
      try {
         await axios.patch(
            `http://localhost:2000/product/remove/${productId}`
         );
         getProduct();
      } catch (error) {
         console.log(error);
      }
   };
   useEffect(() => {
      getCategory();
      getSubCategory();
      getProduct();
   }, []);
   console.log(filteredProduct)
   return (
      <>
         <TabsTrash
            filteredCategories={filteredCategories}
            filteredSubCategories={filteredSubCategories}
            filteredProduct={filteredProduct}
            restoreCategory={restoreCategory}
            restoresubCategory={restoresubCategory}
            restoreproduct={restoreproduct}
            getCategory={getCategory}
            getSubCategory={getSubCategory}
            getProduct={getProduct}
         />
      </>
   );
};
