/* eslint-disable react/prop-types */
import {
   Flex,
   Stack,
   Menu,
   MenuButton,
   MenuList,
   MenuItem,
   Text,
} from "@chakra-ui/react";
import { FaUserCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const SidebarDesk = ({ sidebar, handleClick, main }) => {
   const navigate = useNavigate();
   const [adminData, setAdminData] = useState(null);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const tokenAdmin = localStorage.getItem("tokenAdmin");
            if (!tokenAdmin) {
               throw new Error("Token Admin tidak ditemukan.");
            }

            const response = await axios.get("http://localhost:2000/admin/keep-login", {
               headers: {
                  Authorization: `Bearer ${tokenAdmin}`,
               },
            });

            setAdminData(response.data);
         } catch (error) {
            console.log("Error fetching admin data:", error.message);
         }
      };

      fetchData();
   }, []);

   const handleLogout = () => {
      localStorage.removeItem("tokenAdmin");
      navigate("/");
   };

   const handleProfileClick = () => {
      navigate("/profile-admin");
   };

   return (
      <Stack
         gap={"15px"}
         m={"10px 0"}
         h={"90%"}
         justifyContent={"space-between"}
      >
         <Stack gap={"15px"}>
            {sidebar?.map((item, index) => (
               <Flex
                  _hover={{
                     bg: "orange",
                  }}
                  bg={main == index ? "orange" : "transparent"}
                  p={"5%"}
                  flexDir={"column"}
                  cursor={"pointer"}
                  m={"0 10px"}
                  rounded={"5px"}
                  key={item}
                  onClick={() => handleClick(index)}
                  alignItems={"center"}
               >
                  {item.icon} {item.name}
               </Flex>
            ))}
         </Stack>
         <Menu isLazy>
            <MenuButton>
               <Flex flexDir={"column"} gap={"10px"} alignItems={"center"}>
               <FaUserCircle size={35} color={"gray"} />
                  <Text>{adminData?.fullname}</Text>
               </Flex>
            </MenuButton>
            <MenuList m={"0 10px"}>
               <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
               <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
         </Menu>
      </Stack>
   );
};
