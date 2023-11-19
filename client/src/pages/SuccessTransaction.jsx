import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import axios from "axios";

function SuccessTransaction() {
  const [transaction, setTransaction] = useState(null);

  const transactionDate = new Date(transaction?.createdAt);

  let { id } = useParams();

  const navigate = useNavigate();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "bills",
    onAfterPrint: () => navigate("/home"),
  });

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
        <Flex
          ref={componentRef}
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
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
              <Text fontSize="lg">
                {transactionDate.toLocaleString("id-ID", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </Text>
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
                onClick={handlePrint}
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
