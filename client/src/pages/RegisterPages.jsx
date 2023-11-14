import { HStack } from "@chakra-ui/react";
import { Forms } from "../components/landingpage/Form";

export const RegisterPage = () => {
   return (
      <HStack
         alignItems={"center"}
         justifyContent={"center"}
         w={"full"}
         h={"full"}>
         <Forms />
      </HStack>
   );
};
