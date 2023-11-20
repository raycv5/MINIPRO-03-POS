import { AiOutlineLogin } from "react-icons/ai";
import { RegisterCashier } from "../components/landingpage/registerCashier";
import {  Flex, VStack, Text } from "@chakra-ui/react";


export const RegisterPage = () => {
   return (
      <VStack
      h={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={"5%"}>
      <VStack
         justifyContent={"center"}
         w={{ base: "60%", sm: "50%", md: "80%", lg: "70%", xl: "50%" }}
         alignItems={"center"}
         p={{ base: "15px 0", lg: "none" }}>
         <Flex
            justifyContent={"center"}
            alignItems={"center"}
            gap={"20px"}
            flexDir={"column"}>
            <Flex
               w={"100%"}
               alignItems={"center"}
               gap={"20px"}
               justifyContent={"center"}>
               <AiOutlineLogin size={"20px"} />
               <Text
                  fontSize={{ base: "14px", md: "16px", lg: "20px" }}
                  fontWeight={"bold"}
                  fontFamily={"sans-serif"}>
                  Register Account
               </Text>
            </Flex>
            <RegisterCashier />
         </Flex>
        
      </VStack>
   </VStack>
   );
};
