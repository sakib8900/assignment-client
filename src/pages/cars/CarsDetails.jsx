import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { FaCarSide, FaCalendarAlt } from "react-icons/fa";

const CarDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [car, setCar] = useState(null);
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://assignment-11-server-one-lemon.vercel.app/cars/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCar(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleBooking = () => {
    if (!user) {
      Swal.fire(
        "Please login",
        "You need to be logged in to book a car",
        "warning"
      );
      return;
    }

    if (!startDateTime || !endDateTime) {
      Swal.fire(
        "Missing Information",
        "Please select start and end dates for your booking.",
        "error"
      );
      return;
    }

    // Booking
    const bookingDetails = {
      userEmail: user.email,
      carId: car._id,
      carModel: car.model,
      carImage: car.car_image,
      startDateTime,
      endDateTime,
      dailyPrice: car.daily_price,
      totalPrice: calculateTotalPrice(),
    };

    fetch("https://assignment-11-server-one-lemon.vercel.app/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire(
            "Booking Successful",
            "Your booking has been confirmed!",
            "success"
          );
          navigate("/myBookings");
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "An error occurred while booking the car.", "error");
      });
  };

  const calculateTotalPrice = () => {
    const start = new Date(startDateTime);
    const end = new Date(endDateTime);
    const days = Math.ceil((end - start) / (1000 * 3600 * 24)); // Calculate the number of days
    return days * car.daily_price;
  };

  if (loading) {
    return <div className="text-center mt-20 text-lg">Loading...</div>;
  }

  if (!car) {
    return <div className="text-center mt-20 text-lg">Car not found!</div>;
  }

  return (
    <div className="container mx-auto p-5">
      <div className="mb-5 text-center">
        <h2 className="text-3xl font-bold">{car.model}</h2>
        <div className="text-xl font-semibold text-gray-600">
          ${car.daily_price} / day
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Car Image */}
        <img
          src={car.car_image}
          alt={car.model}
          className="w-full lg:w-1/3 h-64 object-cover rounded-lg shadow-lg"
        />

        {/* Car Details */}
        <div className="flex-1">
          <div className="mb-4">
            <h3 className="text-2xl font-semibold text-gray-800">Car Details</h3>
            <p className="text-lg text-gray-600 mt-2">{car.description}</p>
          </div>
          <div className="mb-4">
            <div className="flex items-center gap-2 text-gray-600">
              <FaCarSide size={20} />
              <span>{car.make} {car.model}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 mt-2">
              <FaCalendarAlt size={20} />
              <span>Available for rent: {car.available_date}</span>
            </div>
          </div>
          <div className="mb-4">
            <h4 className="text-xl font-semibold text-gray-800">Features</h4>
            <ul className="list-disc pl-5 mt-2 text-gray-600">
              {car.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          {/* Booking Info */}
          <div className="mb-4">
            <h4 className="text-xl font-semibold text-gray-800">Booking Information</h4>
            <div className="flex flex-col lg:flex-row gap-4 mt-2">
              <input
                type="datetime-local"
                value={startDateTime}
                onChange={(e) => setStartDateTime(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full lg:w-auto"
              />
              <input
                type="datetime-local"
                value={endDateTime}
                onChange={(e) => setEndDateTime(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full lg:w-auto"
              />
            </div>
          </div>

          {/* Total Price*/}
          <div className="mt-6 flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="text-xl font-semibold text-gray-600">
              Total Price: ${calculateTotalPrice()}
            </div>
            <button
              onClick={handleBooking}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 w-full lg:w-auto"
            >
              Book Now
            </button>
          </div>

          {/* User Info */}
          <div className="flex items-center mt-8">
            <img
              src={car.user.photoURL}
              alt="User Avatar"
              className="w-12 h-12 object-cover rounded-full"
            />
            <div className="ml-4">
              <p className="text-lg font-semibold">{car.user.displayName}</p>
              <p className="text-sm text-gray-600">{car.user.email}</p>
              <p className="text-sm text-gray-500">
                Posted on {new Date(car.post_date).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
