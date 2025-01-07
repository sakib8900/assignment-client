import React from "react";

const RecentCar = ({ car }) => {
  const { car_image, model, daily_price, availability, date_posted, booking_count } = car;

  return (
    <div className="bg-black text-white p-3 rounded-lg shadow-lg max-w-sm transform hover:scale-105 hover:shadow-2xl transition-transform duration-300">
      {/* Car Image */}
      <div className="mb-4">
        <img
          src={car_image}
          alt={model}
          className="w-full h-40 object-cover rounded-lg"
        />
      </div>
      {/* Car Details */}
      <h2 className="text-lg font-semibold">{model}</h2>
      <p className="text-sm text-gray-400">${daily_price}/day</p>
      <p className="text-xs text-gray-500">Added: {date_posted}</p>
      <p className="text-xs text-gray-500">Count: {booking_count}</p>
      {/* Availability Badge */}
      <button
        className={`inline-block px-3 py-1 mt-2 text-sm font-medium rounded-full ${
          availability === true
            ? "bg-green-500 text-white"
            : "bg-red-500 text-white"
        }`}
      >
        {availability === true ? "Available" : "Unavailable"}
      </button>
    </div>
  );
};

export default RecentCar;
