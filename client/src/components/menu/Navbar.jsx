import {
   Box,
   Flex,
   HStack,
   Input,
   InputGroup,
   InputRightElement,
   Text,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { useSelector } from "react-redux";


function Navbar() {
   const categories = useSelector((state) => state.categories.value);
   return (
      <>
         <Box>
            <Flex
               alignItems="center"
               justifyContent="space-between"
               padding="1% 3%">
               <Text fontWeight="bold" fontSize="2xl">
                  Choose Category
               </Text>
               <InputGroup width="30%">
                  <InputRightElement>
                     <FiSearch />
                  </InputRightElement>
                  <Input bgColor="white" placeholder="Search item..." />
               </InputGroup>
            </Flex>
            <HStack padding="1% 3%" spacing="5" alignItems="center">
               {categories?.map((item, idx) => {
                  return (
                     <Flex
                        key={idx}
                        bgColor="white"
                        rounded="xl"
                        padding="2%"
                        cursor={"pointer"}
                        flexDirection="column"
                        alignItems="center"
                        border="1px"
                        borderColor="gray.200"
                        _hover={{
                           bgColor: "orange.100",
                           borderColor: "orange",
                        }}>
                        <Text>{item.name}</Text>
                        <Text fontWeight="semibold">{item.text}</Text>
                     </Flex>
                  );
               })}
            </HStack>
         </Box>
      </>
   );
}

export default Navbar;
