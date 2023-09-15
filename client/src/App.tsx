import "./App.scss";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import UsersPage from "./pages/UsersPage";
import NotImplementedYet from "./components/NotImplementedYet";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/users",
    element: <UsersPage />,
  },
  {
    path: "*",
    element: <NotImplementedYet />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
