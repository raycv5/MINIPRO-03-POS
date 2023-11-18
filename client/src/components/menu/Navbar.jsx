/* eslint-disable react/prop-types */
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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar({ setCategory, categoryId }) {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const handleCategory = (id) => {
    setCategory(id);
    navigate(`/home/category/${id}`);
    window.location.reload();
  };

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:2000/categories");
      setCategories(response?.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Box>
        <Flex
          alignItems="center"
          justifyContent="space-between"
          padding="1% 3%"
        >
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
          {categories?.map((item) => {
            return (
              <Flex
                key={item.id}
                alignItems="center"
                bgColor={categoryId == item.id ? "orange" : "white"}
                border="1px"
                borderColor="gray.200"
                cursor="pointer"
                flexDirection="column"
                rounded="xl"
                padding="2%"
                _hover={{
                  bgColor: "orange.100",
                  borderColor: "orange",
                }}
                onClick={() => handleCategory(item.id)}
              >
                <Text>{item.icons}</Text>
                <Text fontWeight="semibold">{item.name}</Text>
              </Flex>
            );
          })}
        </HStack>
      </Box>
    </>
  );
}

export default Navbar;
