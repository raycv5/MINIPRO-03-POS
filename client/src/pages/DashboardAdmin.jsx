/* eslint-disable react/prop-types */
import { Box, Grid, GridItem, useDisclosure } from "@chakra-ui/react";
import { Navbar } from "../components/dashboard-admin/Navbar";
import { useMediaQuery } from "@chakra-ui/react";
import { GoHome } from "react-icons/go";
import { AiOutlineStock, AiOutlinePlusCircle } from "react-icons/ai";
import { PiUsersThree, PiCallBellLight } from "react-icons/pi";
import { useState } from "react";
import { SidebarDesk } from "../components/dashboard-admin/SidebarDesk";
import { MobileGrid } from "../components/dashboard-admin/MobileGrid";
import { ProductMenuAdmin } from "../components/dashboard-admin/ProductMenuAdmin";
import { AddCategory } from "../components/dashboard-admin/addCategory";
import { HiOutlineSquaresPlus } from "react-icons/hi2";
import { LuListPlus } from "react-icons/lu";
import { AddSubCategory } from "../components/dashboard-admin/addSubcategory";
import { AddProduct } from "../components/dashboard-admin/addProduct";

export const DasboardAdminPages = () => {
   const [isSmallerThan768] = useMediaQuery("(max-width: 768px)");
   const { isOpen, onOpen, onClose } = useDisclosure();
   const sidebar = [
      { name: "Home", icon: <GoHome /> },
      { name: "Reports", icon: <AiOutlineStock /> },
      { name: "Cashier", icon: <PiUsersThree /> },
      { name: "Product", icon: <PiCallBellLight /> },
      { name: "Category", icon: <HiOutlineSquaresPlus /> },
      { name: "Subcategory", icon: <LuListPlus size={"25px"} /> },
      { name: "Product", icon: <AiOutlinePlusCircle size={"25px"} /> },
   ];
   const [main, setMain] = useState(0);
   const handleClick = (sidebarId) => {
      setMain(sidebarId);
      onClose();
   };

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
                  {main == 1 ? (
                     main
                  ) : main == 2 ? (
                     main
                  ) : main == 3 ? (
                     <ProductMenuAdmin />
                  ) : main == 4 ? (
                     <AddCategory />
                  ) : main == 5 ? (
                     <AddSubCategory />
                  ) : main == 6 ? (
                     <AddProduct />
                  ) : (
                     main
                  )}
               </GridItem>
            </Grid>
         )}
      </>
   );
};
