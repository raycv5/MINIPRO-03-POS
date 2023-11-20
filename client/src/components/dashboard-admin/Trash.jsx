/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import { TabsTrash } from "./Tabs";

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
   const getProduct = async () => {
      try {
         const product = await axios.get(`http://localhost:2000/product?name=`);
         const deletedproduct = product.data.filter(
            (product) => product.isDeleted === true
         );
         console.log(product)
         setFilteredProduct(deletedproduct);
      } catch (error) {
         console.log(error);
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
