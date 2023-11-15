import {
   Tabs,
   TabList,
   TabPanels,
   TabPanel,
   Tab,
   TabIndicator,
} from "@chakra-ui/react";
import { LoginAdmin } from "./Login";
import { LoginCashier } from "./loginCashier";


export const TabsLogin = () => {
   return (
      <Tabs isFitted variant="unstyled" w={"100%"} h={"100%"} >
         <TabList>
            <Tab>Admin</Tab>
            <Tab>Cashier</Tab>
         </TabList>
         <TabIndicator
            mt="-1.5px"
            height="1px"
            bg="orange.500"
            borderRadius="1px"
         />
         <TabPanels>
            <TabPanel>
               <LoginAdmin />
            </TabPanel>
            <TabPanel>
               <LoginCashier />
            </TabPanel>
         </TabPanels>
      </Tabs>
   );
};

