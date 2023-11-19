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
import { useLocation } from "react-router-dom";
import axios from "axios";

function Navbar({ setCategory, categoryId, route, getProducts }) {
  const [categories, setCategories] = useState([]);
  const [keywords, setKeywords] = useState("");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");

  const navigate = useNavigate();

  const handleKeywordChange = (e) => {
    setKeywords(e.target.value);
  };

  const handleCategory = (id) => {
    setCategory(id);
    navigate(`/${route}?category=${id}`);
    getProducts();
  };

  const handleSubmit = () => {
    const queryParams = [];

    if (category) {
      queryParams.push(`category=${category}`);
    }

    if (keywords) {
      queryParams.push(`name=${keywords}`);
    }

    const queryString =
      queryParams.length > 0 ? `?${queryParams.join("&")}` : "";

    navigate(`/${route}${queryString}`);
    getProducts();
  };

  const getData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:2000/categories?name="
      );
      setCategories(response?.data);
      console.log(response);
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
            <InputRightElement cursor="pointer" onClick={handleSubmit}>
              <FiSearch />
            </InputRightElement>
            <Input
              bgColor="white"
              placeholder="Search item..."
              onChange={handleKeywordChange}
            />
          </InputGroup>
        </Flex>
        <HStack padding="1% 3%" spacing="5" alignItems="center">
          <Flex
            alignItems="center"
            bgColor={!categoryId ? "orange" : "white"}
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
            onClick={() => {
              navigate(`/${route}`);
              getProducts();
            }}
          >
            <Text fontWeight="semibold">All Category</Text>
          </Flex>
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
