/* eslint-disable react/prop-types */
import { Box, Button, Flex, Radio, RadioGroup, Text } from "@chakra-ui/react";

function CartBottom({ cart, handlePayment, handleSubmit }) {
  return (
    <>
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
                {cart?.items?.length}
              </Text>
              )
            </Text>
            <Text fontWeight="semibold">
              {cart?.total_price?.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </Text>
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
            <Text>
              {cart?.total_price?.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </Text>
          </Flex>
        </Box>
        <Box>
          <Text fontWeight="bold">Payment Method</Text>
          <RadioGroup onChange={handlePayment}>
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
            onClick={handleSubmit}
          >
            Checkout
          </Button>
        </Box>
      </Flex>
    </>
  );
}

export default CartBottom;
