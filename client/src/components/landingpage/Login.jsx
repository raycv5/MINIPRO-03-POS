import {
   FormControl,
   FormLabel,
   Input,
   VStack,
   Flex,
   Link,
} from "@chakra-ui/react";
export const Login = () => {
   return (
      <>
         <VStack w={"100%"}>
            <FormControl>
               <FormLabel>Email</FormLabel>
               <Input
                  id="email"
                  variant="flushed"
                  type="text"
                  focusBorderColor="orange.400"
               />
            </FormControl>
            <FormControl>
               <FormLabel>Password</FormLabel>
               <Input
                  id="password"
                  variant="flushed"
                  type="password"
                  focusBorderColor="orange.400"
               />
            </FormControl>
            <Flex
               flexDir={{ base: "column", md: "row", lg: "row" }}
               justifyContent={"space-between"}
               gap={{ base: "0", md: "40px", lg: "50px", xl: "70px" }}
               fontSize={{ base: "12px", md: "14px", lg: "16px" }}
               w={"300px"}>
               {/* <Text>
                  Don`t have an account?{" "}
                  <Text as={"span"}>
                     <Modals />
                  </Text>
               </Text> */}
               <Link>Forgot password?</Link>
            </Flex>
         </VStack>
      </>
   );
};
