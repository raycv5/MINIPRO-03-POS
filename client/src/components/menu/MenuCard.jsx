/* eslint-disable react/prop-types */
import { Box, Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import axios from "axios";

function MenuCard({ product, getProducts, getCarts }) {
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

  return (
    <>
      <Box padding="1% 3%">
        <Flex justifyContent="space-between">
          <Text fontWeight="bold" fontSize="2xl">
            Menu
          </Text>
          <Text fontWeight="bold">Sort by</Text>
        </Flex>
      </Box>
      <Box padding="1% 3%">
        <Grid templateColumns="repeat(5, 1fr)" gap={5}>
          {product.map((item) => {
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
                    src="https://asset.kompas.com/crops/JFC1_i_OaGvcNEviEw4WKk-r3qQ=/12x51:892x637/750x500/data/photo/2022/03/05/622358ed771fb.jpg"
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
      </Box>
    </>
  );
}

export default MenuCard;
