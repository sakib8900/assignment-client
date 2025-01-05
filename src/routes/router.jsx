import {
  createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Error from "../components/error/Error";
import Register from "../pages/Register";
import Login from "../pages/login";
import AvailableCars from "../pages/cars/AvailableCars";
import CarsDetails from "../pages/cars/CarsDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/register",
        element: <Register></Register>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/availableCars",
        element: <AvailableCars></AvailableCars>
      },
      {
        path: "/cars/:id",
        element: <CarsDetails></CarsDetails>,
        loader: ({ params }) => fetch(`http://localhost:5000/cars/${params.id}`)
      },
      {
        path: "*",
        element: <Error></Error>
      },
    ]
  },
]);

export default router;
