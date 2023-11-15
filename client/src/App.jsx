import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { Menu } from "./pages/Menu";

const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
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
