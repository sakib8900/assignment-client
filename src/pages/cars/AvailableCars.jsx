import React, { useEffect, useState } from "react";
import { MdViewModule, MdViewList } from "react-icons/md"; // Importing icons
import AvailableCar from "./AvailableCar";

const AvailableCars = () => {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState("grid");
  const [sortOption, setSortOption] = useState("newest");

  useEffect(() => {
    fetch("http://localhost:5000/cars") // Replace with your API URL
      .then((res) => res.json())
      .then((data) => setCars(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // search
  const filteredCars = cars.filter((car) => {
    return (
      car.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.location?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Sort cars
  const sortedCars = filteredCars.sort((a, b) => {
    if (sortOption === "newest")
      return new Date(b.date_posted) - new Date(a.date_posted);
    if (sortOption === "oldest")
      return new Date(a.date_posted) - new Date(b.date_posted);
    if (sortOption === "lowest") return a.daily_price - b.daily_price;
    if (sortOption === "highest") return b.daily_price - a.daily_price;
    return 0;
  });

  return (
    <div className="min-h-screen p-5">
      {/* Search and Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-5">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by model, brand, or location..."
          className="border p-2 rounded w-full max-w-xs bg-gray-800 text-white mb-3 md:mb-0"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Updates search term
        />

        {/* View & Sort */}
        <div className="flex items-center space-x-3">
          {/* View Toggle */}
          <button
            className={`p-2 rounded ${
              view === "grid" ? "bg-red-500 text-white" : "bg-gray-800 text-gray-400"
            }`}
            onClick={() => setView("grid")}
          >
            <MdViewModule size={24} />
          </button>
          <button
            className={`p-2 rounded ${
              view === "list" ? "bg-red-500 text-white" : "bg-gray-800 text-gray-400"
            }`}
            onClick={() => setView("list")}
          >
            <MdViewList size={24} />
          </button>

          {/* Sorting Options */}
          <select
            className="border p-2 rounded bg-gray-800 text-white"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="newest">Date Added: Newest First</option>
            <option value="oldest">Date Added: Oldest First</option>
            <option value="lowest">Price: Lowest First</option>
            <option value="highest">Price: Highest First</option>
          </select>
        </div>
      </div>

      {/* Cars Display */}
      <div
        className={`grid gap-5 ${
          view === "grid"
            ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            : "grid-cols-1"
        }`}
      >
        {sortedCars.map((car) => (
          <AvailableCar key={car._id} car={car} view={view} />
        ))}
      </div>
    </div>
  );
};

export default AvailableCars;
