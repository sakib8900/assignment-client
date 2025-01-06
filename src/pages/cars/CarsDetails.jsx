// CarsDetails.js
import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";

const CarsDetails = () => {
  const { car_image, model, daily_price, location, features, description, date_posted, _id } =
    useLoaderData();

  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleModalToggle = () => setShowModal(!showModal);

  const handleBooking = async () => {
    const booking = {
      carId: _id,
      userId: "user_id_placeholder", // Replace with actual user ID
      startDate,
      endDate,
      totalPrice: daily_price * (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24),
    };

    await fetch("http://localhost:5000/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(booking),
    });

    setShowModal(false);
  };

  return (
    <div className="container mx-auto p-5">
      <div className="bg-white p-5 rounded shadow-lg flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-8">
        <div className="md:w-1/2 flex items-center">
          <img src={car_image} alt={model} className="w-full h-auto max-h-96 object-contain rounded" />
        </div>

        <div className="md:w-1/2">
          <h2 className="text-2xl font-bold mb-2">{model}</h2>
          <p className="text-lg text-gray-600 mb-1">
            <span className="font-semibold">Price Per Day:</span> ${daily_price}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-semibold">Location:</span> {location}
          </p>
          <p className="text-sm text-gray-400 mb-4">
            <span className="font-semibold">Posted on:</span> {new Date(date_posted).toDateString()}
          </p>

          <h3 className="text-lg font-semibold mt-3">Features:</h3>
          <ul className="list-disc ml-5 text-sm text-gray-600 space-y-1">
            {features?.map((feature, idx) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>

          <h3 className="text-lg font-semibold mt-3">Description:</h3>
          <p className="text-sm text-gray-600">{description}</p>
          <button
            className="mt-3 px-3 py-1 bg-red-500 text-white rounded hover:bg-blue-600"
            onClick={handleModalToggle}
          >
            Book Now
          </button>

          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-5 rounded shadow-lg w-96">
                <h3 className="text-xl font-semibold mb-3">Confirm Your Booking</h3>

                <div className="mb-3">
                  <label className="block text-sm font-semibold">Start Date:</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                  />
                </div>

                <div className="mb-3">
                  <label className="block text-sm font-semibold">End Date:</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                  />
                </div>

                <div className="flex justify-between">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={handleBooking}
                  >
                    Confirm Booking
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    onClick={handleModalToggle}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarsDetails;
