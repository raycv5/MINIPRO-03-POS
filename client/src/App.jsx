import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { Menu } from "./pages/Menu";
import { Linechart } from "./components/charts/Barchart";
import { DasboardAdminPages } from "./pages/DashboardAdmin";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAdminData } from "./Redux/AdminSlice";
import { setCashierData } from "./Redux/CashierSlice";
import axios from "axios";
import SuccessTransaction from "./pages/SuccessTransaction";

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
