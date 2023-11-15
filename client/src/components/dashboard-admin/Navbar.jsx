/* eslint-disable react/prop-types */
import { Flex, useMediaQuery } from "@chakra-ui/react";
import { MobileNav } from "./MobileNav";
import { DesktopNav } from "./DesktopNav";
import { useEffect, useState } from "react";

export const Navbar = ({
   isOpen,
   onOpen,
   onClose,
   handleClick,
   sidebar,
   main,
}) => {
   const [isSmallerThan768] = useMediaQuery("(max-width: 768px)");
   const [currentTime, setCurrentTime] = useState(new Date());
   // console.log(main);

   useEffect(() => {
      const updateTime = () => {
         setCurrentTime(new Date());
      };
      const interValTime = setInterval(updateTime, 1000);
      return () => {
         clearInterval(interValTime);
      };
   }, []);

   return (
      <Flex
         alignItems={"center"}
         justifyContent={"space-between"}
         p={{ base: "0 2%" }}>
         <Flex
            w={{ base: "100%" }}
            flexDir={"column"}
            justifyContent={"space-between"}>
            {isSmallerThan768 ? (
               <MobileNav
                  main={main}
                  isOpen={isOpen}
                  onClose={onClose}
                  onOpen={onOpen}
                  handleClick={handleClick}
                  sidebar={sidebar}
                  currentTime={currentTime}
               />
            ) : (
               <DesktopNav
                  main={main}
                  handleClick={handleClick}
                  sidebar={sidebar}
                  currentTime={currentTime}
               />
            )}
         </Flex>
      </Flex>
   );
};
