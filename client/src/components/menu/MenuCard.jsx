/* eslint-disable react/prop-types */
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Image,
  Select,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function MenuCard({
  product,
  getProducts,
  getCarts,
  handlePageChange,
  currentPage,
}) {
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryId = queryParams.get("category");
  const name = queryParams.get("name");

  const filteredProducts = product.filter((item) => item.isDisabled === false);

  const handleClick = async (id) => {
    const data = { ProductId: id, CashierId: 1 };
    try {
      await axios.post("http://localhost:2000/carts/", data);
      getProducts();
      getCarts();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSort = (value) => {
    const queryParams = [];

    if (categoryId) {
      queryParams.push(`category=${categoryId}`);
    }
    if (name) {
      queryParams.push(`name=${name}`);
    }
    const queryString =
      queryParams.length > 0 ? `?${queryParams.join("&")}` : "";

    const sort = queryParams.length > 0 ? `&sort=${value}` : `?sort=${value}`;

    navigate(`/home${queryString}${sort}`);
    window.location.reload();
  };

  return (
    <>
      <Box padding="1% 3%">
        <Flex justifyContent="space-between">
          <Text fontWeight="bold" fontSize="2xl">
            Menu
          </Text>
          <Select
            placeholder="Sort by"
            width="15%"
            bgColor="white"
            onChange={(e) => handleSort(e.target.value)}
          >
            <option value="nameAZ">Name A-Z</option>
            <option value="nameZA">Name Z-A</option>
            <option value="priceAsc">Cheapest - Expensive</option>
            <option value="priceDesc">Expensive - Cheapest</option>
          </Select>
        </Flex>
      </Box>
      <Box padding="1% 3%">
        <Grid
          templateColumns={{
            base: "repeat(2, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            xl: "repeat(4, 1fr)",
            "2xl": "repeat(5, 1fr)",
          }}
          gap={5}
        >
          {filteredProducts?.map((item) => {
            return (
              <GridItem key={item.id}>
                <Flex
                  flexDirection="column"
                  bgColor="white"
                  width="200px"
                  alignItems="center"
                  padding="5%"
                  rounded="xl"
                  border="1px"
                  borderColor="blackAlpha.200"
                  cursor="pointer"
                  transition="transform .2s"
                  _hover={{
                    bgColor: "orange.100",
                    borderColor: "orange",
                    transform: "scale(1.01)",
                  }}
                  onClick={() => handleClick(item.id)}
                >
                  <Image
                    boxSize="200px"
                    height="200px"
                    objectFit="cover"
                    rounded="xl"
                    src={`http://localhost:2000/${item.image}`}
                  />

                  <Text fontWeight="bold">{item.name}</Text>
                  <Text fontWeight="bold">
                    {item.price.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </Text>
                  <Text>
                    {" "}
                    <Text as={"span"} fontWeight="bold">
                      {item.stock_quantity}
                    </Text>{" "}
                    in stock
                  </Text>
                </Flex>
              </GridItem>
            );
          })}
        </Grid>
        <Flex gap="5" marginTop="10px">
          <Text
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Text>
          <Text>{currentPage}</Text>
          <Text onClick={() => handlePageChange(currentPage + 1)}>Next</Text>
        </Flex>
      </Box>
    </>
  );
}

export default MenuCard;
