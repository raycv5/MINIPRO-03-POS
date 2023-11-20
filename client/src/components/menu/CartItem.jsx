/* eslint-disable react/prop-types */
import { Box, Flex, Image, Stack, Text } from "@chakra-ui/react";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { BiSolidTrashAlt } from "react-icons/bi";

function CartItem({ cart, handleDecrement, handleIncrement, handleDelete }) {
  return (
    <>
      <Box
        overflowY="auto"
        height="60vh"
        sx={{
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            borderRadius: "10px",
            bg: "#f1f1f1",
          },
          "&::-webkit-scrollbar-thumb": {
            borderRadius: "10px",
            bg: "#bfbfbf",
          },
        }}
      >
        {cart?.items?.map((item) => {
          return (
            <Flex
              key={item.id}
              justifyContent="space-between"
              bgColor="blackAlpha.200"
              border="1px"
              borderColor="white"
              padding="2%"
              rounded="xl"
              marginTop="10px"
              _hover={{
                bgColor: "orange.100",
                borderColor: "orange",
              }}
            >
              <Stack direction="row">
                <Image
                  src={`http://localhost:2000/${item.Product.image}`}
                  boxSize="80px"
                  objectFit="cover"
                  rounded="xl"
                />
                <Flex flexDirection="column">
                  <Text fontWeight="bold">{item.Product.name}</Text>
                  <Text fontWeight="semibold">
                    {item?.Product?.price.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </Text>
                  <Text>
                    x{" "}
                    <Text as={"span"} fontWeight={"bold"}>
                      {item.quantity}
                    </Text>
                  </Text>
                </Flex>
              </Stack>
              <Flex
                flexDirection="column"
                justifyContent="space-between"
                alignItems="end"
              >
                <Stack direction="row" alignItems="center">
                  {/* ----- DECREMENT ----- */}
                  <Text
                    _hover={{ color: "orange" }}
                    cursor="pointer"
                    onClick={() => handleDecrement(item.id)}
                  >
                    <AiFillMinusCircle size="20" />
                  </Text>
                  <Text>{item.quantity}</Text>
                  {/* ----- INCREMENT ----- */}
                  <Text
                    _hover={{ color: "orange" }}
                    cursor="pointer"
                    onClick={() => handleIncrement(item.id)}
                  >
                    <AiFillPlusCircle size="20" />
                  </Text>
                </Stack>
                {/* ----- DELETE ----- */}
                <Text
                  cursor="pointer"
                  _hover={{ color: "red.600" }}
                  onClick={() => handleDelete(item.id)}
                >
                  <BiSolidTrashAlt size="20" />
                </Text>
              </Flex>
            </Flex>
          );
        })}
      </Box>
    </>
  );
}

export default CartItem;
