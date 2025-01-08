import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

const AddCar = () => {
  const { user } = useAuth();
  const [carDetails, setCarDetails] = useState({
    model: '',
    daily_price: '',
    availability: true,
    registration_number: '',
    features: [],
    description: '',
    booking_count: 0,
    car_image: '',
    location: '',
    available_date: new Date(),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCarDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleFeaturesChange = (e) => {
    const { value } = e.target;
    const featuresArray = value.split(',').map((feature) => feature.trim());
    setCarDetails((prevDetails) => ({
      ...prevDetails,
      features: featuresArray,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedAvailableDate = format(carDetails.available_date, 'yyyy-MM-dd');
    const formattedPostDate = format(new Date(), 'yyyy-MM-dd');

    const carData = {
      ...carDetails,
      available_date: formattedAvailableDate,
      post_date: formattedPostDate,
      user: {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      },
    };

    try {
      const response = await fetch('http://localhost:5000/cars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(carData),
      });

      const result = await response.json();
      console.log('Car added:', result);
    } catch (error) {
      console.error('Error adding car:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Add a New Car</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label htmlFor="model" className="text-lg font-medium text-gray-700 mb-2">Car Model</label>
            <input
              type="text"
              id="model"
              name="model"
              value={carDetails.model}
              onChange={handleInputChange}
              className="p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="daily_price" className="text-lg font-medium text-gray-700 mb-2">Daily Rental Price</label>
            <input
              type="number"
              id="daily_price"
              name="daily_price"
              value={carDetails.daily_price}
              onChange={handleInputChange}
              className="p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="flex flex-col mt-6">
          <label className="text-lg font-medium text-gray-700 mb-2">Availability</label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="availability"
                checked={carDetails.availability}
                onChange={(e) => setCarDetails({ ...carDetails, availability: e.target.checked })}
                className="mr-2"
              />
              Available
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="flex flex-col">
            <label htmlFor="registration_number" className="text-lg font-medium text-gray-700 mb-2">Vehicle Registration Number</label>
            <input
              type="text"
              id="registration_number"
              name="registration_number"
              value={carDetails.registration_number}
              onChange={handleInputChange}
              className="p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="features" className="text-lg font-medium text-gray-700 mb-2">Features</label>
            <input
              type="text"
              id="features"
              name="features"
              value={carDetails.features.join(', ')}
              onChange={handleFeaturesChange}
              className="p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., GPS, AC"
            />
          </div>
        </div>

        <div className="flex flex-col mt-6">
          <label htmlFor="description" className="text-lg font-medium text-gray-700 mb-2">Description</label>
          <textarea
            id="description"
            name="description"
            value={carDetails.description}
            onChange={handleInputChange}
            className="p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter a brief description"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="flex flex-col">
            <label htmlFor="booking_count" className="text-lg font-medium text-gray-700 mb-2">Booking Count</label>
            <input
              type="number"
              id="booking_count"
              name="booking_count"
              value={carDetails.booking_count}
              onChange={handleInputChange}
              className="p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="car_image" className="text-lg font-medium text-gray-700 mb-2">Image URL</label>
            <input
              type="text"
              id="car_image"
              name="car_image"
              value={carDetails.car_image}
              onChange={handleInputChange}
              className="p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex flex-col mt-6">
          <label htmlFor="location" className="text-lg font-medium text-gray-700 mb-2">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={carDetails.location}
            onChange={handleInputChange}
            className="p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mt-6">
          <label className="text-lg font-medium text-gray-700 mb-2">Availability Date</label>
          <DatePicker
            selected={carDetails.available_date}
            onChange={(date) => setCarDetails({ ...carDetails, available_date: date })}
            className="p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            dateFormat="MMMM d, yyyy"
          />
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Add Car
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCar;
