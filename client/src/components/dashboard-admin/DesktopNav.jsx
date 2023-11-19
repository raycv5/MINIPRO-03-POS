/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
   Flex,
   Input,
   InputGroup,
   InputRightElement,
   Stack,
   Text,
} from "@chakra-ui/react";
import { CiSearch } from "react-icons/ci";

export const DesktopNav = ({ currentTime, main }) => {
   return (
      <Flex alignItems={"center"} justifyContent={"space-between"} p={" 5px"}>
         <Text
            fontWeight="bold"
            fontSize="2xl"
            letterSpacing="tighter"
            color="orange">
            كا
            <Text as={"span"} color="black">
               شير
            </Text>
         </Text>
         {main == 3 ? (
            <Stack w={{ base: "50%" }} alignItems={"center"}>
               {/* <InputGroup>
                     <Input
                        rounded={"10px"}
                        focusBorderColor="orange.300"
                        placeholder="Search category, menu, or etc"
                        bg={"white"}
                     />
                     <InputRightElement>
                        <CiSearch />
                     </InputRightElement>
                  </InputGroup> */}
            </Stack>
         ) : null}
         <Stack>
            <Text as={"span"} fontWeight={"bold"}>
               {" "}
               Date:{" "}
               {currentTime.toLocaleString("id-ID", {
                  weekday: "long",
                  day: "numeric",
                  month: "short",
                  year: "numeric",
               })}
            </Text>
            <Text as={"span"}>
               {" "}
               Time:{" "}
               {currentTime.toLocaleString("id-ID", {
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
               })}
            </Text>
         </Stack>
      </Flex>
   );
};
