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
import PrivateRoute from "../utilitis/PrivateRoute";
import AddCar from "../form/AddCar";
import Booking from "../form/Booking";
import MyBooking from "../pages/MyBooking";

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
        path: "/myBookings",
        element: <MyBooking></MyBooking>
      },
      {
        path: "/addCar",
        element: <AddCar></AddCar>
      },
      {
        path: "/cars/:id",
        element: <PrivateRoute>
          <CarsDetails></CarsDetails>
        </PrivateRoute>,
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
