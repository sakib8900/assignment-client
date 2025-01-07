import React from "react";
import { motion } from "framer-motion";

const offers = [
  {
    id: 1,
    title: "Get 15% Off for Weekend Rentals!",
    description: "Book your car now and enjoy 15% off this weekend.",
    buttonText: "Book Now",
  },
  {
    id: 2,
    title: "Luxury Cars at $99/day This Holiday Season!",
    description: "Experience premium comfort at an unbeatable price.",
    buttonText: "Learn More",
  },
  {
    id: 3,
    title: "Get 20% Off on Your First Rental!",
    description: "Sign up and save big on your first booking.",
    buttonText: "Start Now",
  },
];

const SpecialOffers = () => {
  return (
    <div className="py-12 px-6">
      <h2 className="text-3xl font-bold text-center mb-12">Special Offers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {offers.map((offer) => (
          <motion.div
            key={offer.id}
            className="relative bg-gray-200 rounded-lg shadow-lg overflow-hidden p-6"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: offer.id * 0.2 }}
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {offer.title}
            </h3>
            <p className="text-gray-600 mb-4">{offer.description}</p>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
              {offer.buttonText}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SpecialOffers;
