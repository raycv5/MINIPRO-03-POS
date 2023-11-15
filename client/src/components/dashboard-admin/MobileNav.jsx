/* eslint-disable react/prop-types */
import {
   Flex,
   Input,
   InputGroup,
   InputRightElement,
   Stack,
   Text,
   HStack,
} from "@chakra-ui/react";
import { CiSearch } from "react-icons/ci";
import { HamburgerMenu } from "./HamburgerMenu";

export const MobileNav = ({
   isOpen,
   onClose,
   onOpen,
   handleClick,
   sidebar,
   currentTime,
   main,
}) => {
   return (
      <HStack
         alignItems={"center"}
         justifyContent={"space-between"}
         p={"5px 0"}>
         <HamburgerMenu
            sidebar={sidebar}
            isOpen={isOpen}
            onClose={onClose}
            onOpen={onOpen}
            handleClick={handleClick}
         />
         {main == 3 ? (
            <Stack w={{ base: "50%" }} alignItems={"center"}>
               <InputGroup>
                  <Input
                     type="text"
                     fontSize={{ base: "10px", sm: "12px", md: "14px" }}
                     rounded={"15px"}
                     focusBorderColor="orange.300"
                     placeholder="Search category, menu, or etc"
                     bg={"white"}
                  />
                  <InputRightElement>
                     <CiSearch />
                  </InputRightElement>
               </InputGroup>
            </Stack>
         ) : null}
         <Flex
            gap={{ base: "0", md: "5px" }}
            fontSize={{ base: "9px", sm: "12px" }}
            flexDir={{ base: "column" }}>
            <Text fontWeight={"bold"}>Nama resto</Text>
            <Text as={"span"}>
               {currentTime.toLocaleString("id-ID", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
               })}
            </Text>
         </Flex>
      </HStack>
   );
};
