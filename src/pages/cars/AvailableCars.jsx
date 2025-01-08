import React, { useEffect, useState } from "react";
import { MdViewModule, MdViewList } from "react-icons/md";
import AvailableCar from "./AvailableCar";
import { Helmet } from "react-helmet";
import Loading from "../../utilitis/Loading";

const AvailableCars = () => {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState("grid");
  const [sortOption, setSortOption] = useState("newest");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://assignment-11-server-one-lemon.vercel.app/cars")
      .then((res) => res.json())
      .then((data) => {
        setCars(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  // Search
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
      return new Date(b.post_date) - new Date(a.post_date);
    if (sortOption === "oldest")
      return new Date(a.post_date) - new Date(b.post_date);
    if (sortOption === "lowest") return a.daily_price - b.daily_price;
    if (sortOption === "highest") return b.daily_price - a.daily_price;
    return 0;
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen p-5">
      <Helmet>
        <title>Rent A Car || Available Cars</title>
      </Helmet>
      {/* Search */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-5">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by model, brand, or location..."
          className="border p-2 rounded w-full max-w-xs bg-gray-800 text-white mb-3 md:mb-0"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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

          {/* Sorting */}
          <select
            className="border p-2 rounded bg-gray-800 text-white"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="newest">Date Added: Newest</option>
            <option value="oldest">Date Added: Oldest</option>
            <option value="lowest">Price: Lowest</option>
            <option value="highest">Price: Highest</option>
          </select>
        </div>
      </div>

      {/* Cars */}
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
