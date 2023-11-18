import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "axios";

function SuccessTransaction() {
  const [transaction, setTransaction] = useState(null);
  let { id } = useParams();

  const getData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:2000/transactions/${id}`
      );
      setTransaction(response?.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (transaction) {
    return (
      <>
        <Flex justifyContent="center" alignItems="center" height="100vh">
          <Stack bgColor="gray.100" padding="3%" rounded="xl" spacing="5">
            <Box>
              <Flex alignItems="center" gap="10px">
                <Text color="green.500">
                  <FaCheckCircle size="30" />
                </Text>
                <Text color="green.500" fontSize="3xl" fontWeight="bold">
                  Transaction Success !
                </Text>
              </Flex>
              <Flex justifyContent="space-between" fontSize="lg">
                <Text>Cashier ID : 1</Text>
                <Text>Transaction ID : {id}</Text>
              </Flex>
            </Box>
            <Box>
              <Text fontSize="lg" fontWeight="semibold">
                Transaction Details
              </Text>
              <Box marginY="5px">
                {transaction?.Transaction_Products?.map((item, idx) => {
                  return (
                    <Flex key={idx} justifyContent="space-between">
                      <Text fontWeight="semibold">
                        {item.Product.name}{" "}
                        <Text as={"span"} fontWeight="normal">
                          x {item.quantity}
                        </Text>{" "}
                      </Text>
                      <Text>
                        {(item.Product.price * item.quantity).toLocaleString(
                          "id-ID",
                          {
                            style: "currency",
                            currency: "IDR",
                          }
                        )}
                      </Text>
                    </Flex>
                  );
                })}
              </Box>
              <Flex
                justifyContent="space-between"
                borderY="1px"
                fontWeight="bold"
                paddingY="3px"
              >
                <Text>Total : </Text>
                <Text>
                  {transaction?.total_price.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </Text>
              </Flex>

              <Button
                width="100%"
                bgColor="orange"
                _hover={{ bgColor: "orange.300" }}
                marginTop="25px"
              >
                Print Bills
              </Button>
            </Box>
          </Stack>
        </Flex>
      </>
    );
  }
  return (
    <Flex justifyContent="center" alignItems="center" height="100vh">
      <Text fontSize="5xl" fontWeight="bold">
        Invalid Transaction id
      </Text>
    </Flex>
  );
}

export default SuccessTransaction;
