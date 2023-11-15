import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
 import { useEffect } from "react";
 import { useDispatch } from "react-redux";
 import axios from "axios";
 import { setAdminData } from "./Redux/AdminSlice";
 import { setCashierData } from "./Redux/CashierSlice";

const router = createBrowserRouter([{ path: "/", element: <LandingPage /> }]);

function App() {
   const tokenAdmin = localStorage.getItem('tokenAdmin');
   const tokenCashier = localStorage.getItem('tokenCashier')
   const dispatch = useDispatch();
 
   const keepLogin = async () => {
     try {
       const response = await axios.get(`http://localhost:2000/admin/keep-login`, {
         headers: {
            Authorization: `Bearer ${tokenAdmin}`
         }
       });
       dispatch(setAdminData(response.data)); 
     } catch (err) {
       console.log(err.message);
     }
   };

   const keepLoginCashier = async () => {
      try {
        const response = await axios.get(`http://localhost:2000/cashier/keep-login`, {
          headers: {
             Authorization: `Bearer ${tokenCashier}`
          }
        });
        dispatch(setCashierData(response.data));
      } catch (err) {
        console.log(err.message);
      }
    };
 
   useEffect(() => {
     keepLogin();
     keepLoginCashier();
   }, []);
   return (
      <>
         <RouterProvider router={router} />
      </>
   );
}

export default App;
