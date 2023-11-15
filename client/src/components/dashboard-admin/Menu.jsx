import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { RxHamburgerMenu } from "react-icons/rx";

export const MenuAdmin = () => {
    
   return (
      <Menu>
         {({ isOpen }) => (
            <>
               <MenuButton
                  isActive={isOpen}
                  as={Button}
                  bg={"transparent"}
                  _focus={{ bg: "transparent" }}
                  _active={{ bg: "transparent" }}
                  _hover={{ bg: "orange" }}>
                  <RxHamburgerMenu />
               </MenuButton>
               <MenuList>
                  <MenuItem>Profile</MenuItem>
                  <MenuItem>Logout</MenuItem>
               </MenuList>
            </>
         )}
      </Menu>
   );
};
