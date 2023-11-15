/* eslint-disable react/prop-types */
import {
   Drawer,
   DrawerOverlay,
   DrawerBody,
   DrawerContent,
   DrawerHeader,
   Flex,
   Stack,
   HStack,
   Text,
} from "@chakra-ui/react";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaUserTie } from "react-icons/fa";
import { MenuAdmin } from "./Menu";
import { IoCloseOutline } from "react-icons/io5";
export const HamburgerMenu = ({
   onOpen,
   onClose,
   sidebar,
   handleClick,
   isOpen,
}) => {
   return (
      <>
         <RxHamburgerMenu onClick={onOpen} size={"30px"} />
         <Drawer placement={"left"} onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent>
               <DrawerHeader borderBottomWidth="1px">
                  <Flex justifyContent={"space-between"} alignItems={"center"}>
                     <Text>Menu</Text>
                     <Text onClick={onClose}>
                        <IoCloseOutline />
                     </Text>
                  </Flex>
               </DrawerHeader>
               <DrawerBody>
                  <Stack gap={"15px"} m={"10px 0"}>
                     {sidebar?.map((sidebar, index) => (
                        <Flex
                           _hover={{
                              bg: "orange",
                           }}
                           p={"5%"}
                           rounded={"15px"}
                           key={sidebar}
                           onClick={() => handleClick(index)}
                           alignItems={"center"}
                           gap={"20px"}>
                           {sidebar.icon}
                           {sidebar.name}
                        </Flex>
                     ))}
                  </Stack>
               </DrawerBody>
               <HStack
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  m={"5%"}
                  p={"5% 10%"}
                  border={"1px solid"}
                  borderColor={"gray.400"}
                  rounded={"15px"}>
                  <HStack>
                     <FaUserTie />
                     <Text>Admin</Text>
                  </HStack>
                  <MenuAdmin />
               </HStack>
            </DrawerContent>
         </Drawer>
      </>
   );
};
