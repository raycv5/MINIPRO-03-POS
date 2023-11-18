import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { Menu } from "./pages/Menu";
import { Linechart } from "./components/charts/Barchart";
import { DasboardAdminPages } from "./pages/DashboardAdmin";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { categoryData } from "./redux/categorySlice";
import { subCategoryData } from "./redux/subCategorySlice";

const router = createBrowserRouter([
   { path: "/", element: <LandingPage /> },
   { path: "/linechart", element: <Linechart /> },
   { path: "/dashboard-admin", element: <DasboardAdminPages /> },
   { path: "/home", element: <Menu /> },
]);

function App() {
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
   useEffect(() => {
      getAllCategories();
      getAllSubCategories();
   }, [getAllCategories]);

   return (
      <>
         <RouterProvider router={router} />
      </>
   );
}

export default App;
