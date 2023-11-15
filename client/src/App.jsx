import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { Menu } from "./pages/Menu";
import { Linechart } from "./components/charts/Barchart";
import { DasboardAdminPages } from "./pages/DashboardAdmin";

const router = createBrowserRouter([
   { path: "/", element: <LandingPage /> },
   { path: "/linechart", element: <Linechart /> },
   { path: "/dashboard-admin", element: <DasboardAdminPages /> },
   { path: "/home", element: <Menu /> },
]);

function App() {
   return (
      <>
         <RouterProvider router={router} />
      </>
   );

}

export default App;
