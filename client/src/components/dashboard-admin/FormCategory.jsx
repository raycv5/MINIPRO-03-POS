/* eslint-disable react/prop-types */
import {
   Flex,
   FormControl,
   FormLabel,
   FormHelperText,
   Input,
   Button,
   Stack,
} from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";

export const FormCategory = ({isLoading, handleChange,values}) =>{
    return (
       <Flex alignItems={"center"} gap={"20px"}>
          <FormControl>
             <FormLabel id="name">Category</FormLabel>
             <Input
                type="text"
                isRequired
                name="name"
                onChange={handleChange}
                value={values.name}
             />
             <FormHelperText>example : Food</FormHelperText>
          </FormControl>
          <Stack>
             {!isLoading ? (
                <Button
                   type="submit"
                   bg={"orange"}
                   _hover={{ bg: "orange.300" }}>
                   <AiOutlinePlus /> Add Category
                </Button>
             ) : (
                <Button
                   isLoading={isLoading}
                   deletedCategory
                   loadingText="Loading"
                   variant="solid">
                   Submiting
                </Button>
             )}
          </Stack>
       </Flex>
    );
}