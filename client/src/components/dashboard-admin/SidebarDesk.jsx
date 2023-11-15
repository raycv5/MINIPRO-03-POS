/* eslint-disable react/prop-types */
import {
   Flex,
   Stack,
   Menu,
   MenuButton,
   MenuList,
   MenuItem,
   Avatar,
   Text,
} from "@chakra-ui/react";

export const SidebarDesk = ({ sidebar, handleClick, main }) => {
   console.log(main);
   return (
      <Stack
         gap={"15px"}
         m={"10px 0"}
         h={"90%"}
         justifyContent={"space-between"}>
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
                  alignItems={"center"}>
                  {item.icon} {item.name}
               </Flex>
            ))}
         </Stack>
         <Menu isLazy>
            <MenuButton>
               <Flex flexDir={"column"} gap={"10px"} alignItems={"center"}>
                  <Avatar size={"sm"} name="Admin" />
                  {""}
                  <Text>Admin</Text>
               </Flex>
            </MenuButton>
            <MenuList m={"0 10px"}>
               <MenuItem>Profile</MenuItem>
               <MenuItem>Logout</MenuItem>
            </MenuList>
         </Menu>
      </Stack>
   );
};
