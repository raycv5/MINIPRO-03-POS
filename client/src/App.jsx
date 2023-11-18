import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { Menu } from "./pages/Menu";
import { Linechart } from "./components/charts/Barchart";
import { DasboardAdminPages } from "./pages/DashboardAdmin";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAdminData } from "./Redux/AdminSlice";
import { categoryData } from "./redux/categorySlice";
import { subCategoryData } from "./redux/subCategorySlice";
import { setCashierData } from "./Redux/CashierSlice";
import SuccessTransaction from "./pages/SuccessTransaction";
import axios from "axios";


const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/linechart", element: <Linechart /> },
  { path: "/dashboard-admin", element: <DasboardAdminPages /> },
  { path: "/home", element: <Menu /> },
  { path: "/home/category/:categoryId", element: <Menu /> },
  { path: "/transaction/:id", element: <SuccessTransaction /> },
]);

function App() {
  const tokenAdmin = localStorage.getItem("tokenAdmin");
  const tokenCashier = localStorage.getItem("tokenCashier");
  const dispatch = useDispatch();

const getAllCategories = async () => {
      try {
         const categories = await axios.get(
            `http://localhost:2000/categories?name=`
         );
         dispatch(categoryData(categories.data));
      } catch (error) {
         console.log(error);
      }
   };

   const getAllSubCategories = async () => {
      try {
         const subCategories = await axios.get(
            `http://localhost:2000/subcategories?name=`
         );
         dispatch(subCategoryData(subCategories.data));
         console.log(subCategories)
      } catch (error) {
         console.log(error);
      }
   };

  const keepLogin = async () => {
    try {
      const response = await axios.get(
        `http://localhost:2000/admin/keep-login`,
        {
          headers: {
            Authorization: `Bearer ${tokenAdmin}`,
          },
        }
      );
      dispatch(setAdminData(response.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  const keepLoginCashier = async () => {
    try {
      const response = await axios.get(
        `http://localhost:2000/cashier/keep-login`,
        {
          headers: {
            Authorization: `Bearer ${tokenCashier}`,
          },
        }
      );
      dispatch(setCashierData(response.data));
    } catch (err) {
      console.log(err.message);
    }
  };

   useEffect(() => {
          getAllCategories();
      getAllSubCategories();
   }, [getAllCategories]);

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
