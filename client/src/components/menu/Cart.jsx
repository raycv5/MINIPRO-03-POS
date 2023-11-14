import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { BiSolidTrashAlt } from "react-icons/bi";

const items = [
  {
    name: "Burger Kelinci",
    price: "50.000",
    image:
      "https://asset.kompas.com/crops/JFC1_i_OaGvcNEviEw4WKk-r3qQ=/12x51:892x637/750x500/data/photo/2022/03/05/622358ed771fb.jpg",
  },
];

function Cart() {
  return (
    <Grid
      bgColor="white"
      height="100vh"
      padding="10px 20px"
      templateAreas={"top bottom"}
      gridTemplateRows={"70% 30%"}
      borderLeft="1px"
      borderColor="gray.200"
    >
      <GridItem>
        <Box area={"top"} maxHeight="70%">
          <Text fontWeight="bold" fontSize="2xl" marginBottom="20px">
            Current Order
          </Text>
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
            {items.map((item, idx) => {
              return (
                <Flex
                  key={idx}
                  justifyContent="space-between"
                  bgColor="blackAlpha.200"
                  padding="2%"
                  rounded="xl"
                  marginTop="10px"
                >
                  <Stack direction="row">
                    <Image
                      src={item.image}
                      boxSize="80px"
                      objectFit="cover"
                      rounded="xl"
                    />
                    <Flex flexDirection="column">
                      <Text fontWeight="bold">{item.name}</Text>
                      <Text fontWeight="semibold">{item.price}</Text>
                      <Text>
                        x{" "}
                        <Text as={"span"} fontWeight={"bold"}>
                          1
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
                      <Text _hover={{ color: "orange" }} cursor="pointer">
                        <AiFillMinusCircle size="20" />
                      </Text>
                      <Text>1</Text>
                      <Text _hover={{ color: "orange" }} cursor="pointer">
                        <AiFillPlusCircle size="20" />
                      </Text>
                    </Stack>
                    <Text cursor="pointer" _hover={{ color: "red.600" }}>
                      <BiSolidTrashAlt size="20" />
                    </Text>
                  </Flex>
                </Flex>
              );
            })}
          </Box>
        </Box>
      </GridItem>
      <GridItem>
        <Flex
          area={"bottom"}
          bgColor="blackAlpha.200"
          rounded="xl"
          height="100%"
          padding="5%"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Box>
            <Flex justifyContent="space-between">
              <Text>
                Items (
                <Text as={"span"} fontWeight="semibold">
                  1
                </Text>
                )
              </Text>
              <Text fontWeight="semibold">50.000</Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text>Discount</Text>
              <Text fontWeight="semibold">0</Text>
            </Flex>
            <Flex
              fontWeight="bold"
              justifyContent="space-between"
              borderY="1px"
              paddingY="6px"
              marginY="6px"
            >
              <Text>Total</Text>
              <Text>50.000</Text>
            </Flex>
          </Box>
          <Box>
            <Text fontWeight="bold">Payment Method</Text>
            <RadioGroup>
              <Flex justifyContent="space-between" padding="2%">
                <Radio value="1">Cash</Radio>
                <Radio value="2">Debit</Radio>
                <Radio value="3">QRIS</Radio>
              </Flex>
            </RadioGroup>
          </Box>
          <Box textAlign="center">
            <Button
              width="100%"
              bgColor="orange"
              _hover={{ bgColor: "orange.200" }}
            >
              Print Bills
            </Button>
          </Box>
        </Flex>
      </GridItem>
    </Grid>
  );
}

export default Cart;
