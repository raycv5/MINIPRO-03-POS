/* eslint-disable react/prop-types */
import { Box, Grid, GridItem, useDisclosure } from "@chakra-ui/react";
import { Navbar } from "../components/dashboard-admin/Navbar";
import { useMediaQuery } from "@chakra-ui/react";
// import { GoHome } from "react-icons/go";
import { FaRegTrashAlt } from "react-icons/fa";
import { AiOutlineStock, AiOutlinePlusCircle } from "react-icons/ai";
import { PiUsersThree, PiCallBellLight } from "react-icons/pi";
import { useEffect, useState } from "react";
import { SidebarDesk } from "../components/dashboard-admin/SidebarDesk";
import { MobileGrid } from "../components/dashboard-admin/MobileGrid";
import { ProductMenuAdmin } from "../components/dashboard-admin/ProductMenuAdmin";
import { AddCategory } from "../components/dashboard-admin/addCategory";
import { HiOutlineSquaresPlus } from "react-icons/hi2";
import { LuListPlus } from "react-icons/lu";
import { AddSubCategory } from "../components/dashboard-admin/addSubcategory";
import { AddProduct } from "../components/dashboard-admin/addProduct";
import { Trash } from "../components/dashboard-admin/Trash";
import { Reports } from "../components/dashboard-admin/Reports";
import axios from "axios";
import { useParams } from "react-router-dom";

export const DasboardAdminPages = () => {
   const [isSmallerThan768] = useMediaQuery("(max-width: 768px)");
   const { isOpen, onOpen, onClose } = useDisclosure();
   const [valueId, setId] = useState();
   const [filterCategory, setFilteredCategories] = useState();
   const [filterSubCategory, setFilteredSubCategories] = useState();
   const [category, setCategory] = useState([]);
   const [product, setProduct] = useState([]);

   const { categoryId } = useParams();

   const getProducts = async () => {
      let url = "http://localhost:2000/product?name=";
      if (categoryId) {
         url = `http://localhost:2000/product/category/${categoryId}`;
      }
      try {
         const response = await axios.get(url);
         setProduct(response?.data);
         console.log(response);
      } catch (err) {
         console.error("Error fetching products:", err);
      }
   };

   const fetchCategory = async () => {
      try {
         const fetchCategory = await axios.get(
            `http://localhost:2000/categories?name=`
         );
         const filteredCategories = fetchCategory.data.filter(
            (category) => category.isDeleted === false
         );
         setFilteredCategories(filteredCategories);
      } catch (error) {
         console.log(error);
      }
   };
   const fetchSubCategory = async () => {
      try {
         const fetchSubCategory = await axios.get(
            `http://localhost:2000/subcategories?name=`
         );
         const filteredSubCategories = fetchSubCategory?.data.filter(
            (subCategory) => subCategory.isDeleted === false
         );
         setFilteredSubCategories(filteredSubCategories);
      } catch (error) {
         console.log(error);
      }
   };
   const handleEdit = (valuesId) => {
      setId(valuesId);
   };

   const sidebar = [
      { name: "Product", icon: <PiCallBellLight size={"25px"} /> },
      { name: "Reports", icon: <AiOutlineStock size={"25px"} /> },
      { name: "Cashier", icon: <PiUsersThree size={"25px"} /> },
      { name: "Category", icon: <HiOutlineSquaresPlus size={"25px"} /> },
      { name: "Subcategory", icon: <LuListPlus size={"25px"} /> },
      { name: "Product", icon: <AiOutlinePlusCircle size={"25px"} /> },
      { name: "Trash", icon: <FaRegTrashAlt size={"25px"} /> },
   ];
   const [main, setMain] = useState(0);
   const handleClick = (sidebarId) => {
      setMain(sidebarId);
      onClose();
   };
   useEffect(() => {
      getProducts()
      fetchCategory();
      fetchSubCategory();
   }, []);

   return (
      <>
         {isSmallerThan768 ? (
            <Box>
               <MobileGrid
                  isOpen={isOpen}
                  onClose={onClose}
                  onOpen={onOpen}
                  handleClick={handleClick}
                  sidebar={sidebar}
                  main={main}
                  fetchCategory={fetchCategory}
                  fetchSubCategory={fetchSubCategory}
                  setMain={setMain}
                  handleEdit={handleEdit}
                  valueId={valueId}
                  filterCategory={filterCategory}
                  filterSubCategory={filterSubCategory}
               />
            </Box>
         ) : (
            <Grid
               gap={"3%"}
               templateAreas={`"nav header header "
                  "nav main main "
                  "nav main main"`}
               gridTemplateRows={"70px 1fr 30px"}
               gridTemplateColumns={"100px 1fr 200px"}
               h="1000px"
               bg={"gray.100"}
               color="blackAlpha.700">
               <GridItem
                  area={"header"}
                  position={"sticky"}
                  top={"0"}
                  bg={"gray.100"}
                  zIndex={"1"}>
                  <Navbar main={main} />
               </GridItem>
               <GridItem
                  bg={"white"}
                  textAlign={"center"}
                  area={"nav"}
                  w={{ base: "12.5%", lg: "9.5%", xl: "8%" }}
                  h={"full"}
                  position={"fixed"}
                  top={"0"}>
                  <SidebarDesk
                     sidebar={sidebar}
                     handleClick={handleClick}
                     main={main}
                  />
               </GridItem>
               <GridItem area={"main"}>
                  {main == 0 ? (
                     <ProductMenuAdmin
                        product={product}
                        getProducts={getProducts}
                        category={category}
                        setCategory={setCategory}
                        categoryId={categoryId}
                     />
                  ) : main == 1 ? (
                     <Reports />
                  ) : main == 2 ? (
                     main
                  ) : main == 3 ? (
                     <AddCategory handleEdit={handleEdit} valueId={valueId} />
                  ) : main == 4 ? (
                     <AddSubCategory
                        fetchCategory={fetchCategory}
                        handleEdit={handleEdit}
                        valueId={valueId}
                        filterCategory={filterCategory}
                        filterSubCategory={filterSubCategory}
                     />
                  ) : main == 5 ? (
                     <AddProduct
                        fetchCategory={fetchCategory}
                        fetchSubCategory={fetchSubCategory}
                        setMain={setMain}
                        handleEdit={handleEdit}
                        valueId={valueId}
                        filterCategory={filterCategory}
                        filterSubCategory={filterSubCategory}
                     />
                  ) : (
                     <Trash />
                  )}
               </GridItem>
            </Grid>
         )}
      </>
   );
};
