import React from "react";
import { motion } from "framer-motion";
import { useSpring, animated } from "@react-spring/web";

const reviews = [
  {
    id: 1,
    name: "John Doe",
    location: "New York, USA",
    review: "Great service! The car was clean and the rental process was seamless. Highly recommend!",
    image: "https://i.pinimg.com/736x/d5/3c/19/d53c193fc356d1ea4b1859d433d60bec.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    location: "London, UK",
    review: "Excellent customer service and affordable rates. The car was in perfect condition.",
    image: "https://i.pinimg.com/736x/8d/95/03/8d9503a77e4c21ebf0ced6c252819a0e.jpg",
  },
  {
    id: 3,
    name: "Ahmed Khan",
    location: "Dubai, UAE",
    review: "I had a fantastic experience. The booking process was quick, and the car exceeded my expectations.",
    image: "https://i.pinimg.com/736x/21/85/32/2185324ba5c9010a3de682fcc5f9d4dc.jpg",
  },
];

const ClientReview = () => {
  const springProps = useSpring({
    from: { opacity: 0, transform: "translateY(30px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { tension: 150, friction: 20 },
    delay: 300,
  });

  return (
    <animated.div style={springProps} className="py-12 px-6">
      <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {reviews.map((review) => (
          <motion.div
            key={review.id}
            className="bg-gray-200 p-6 rounded-xl shadow-lg flex flex-col items-center transform transition-transform hover:scale-105"
            whileHover={{ scale: 1.1, rotate: 2 }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.1, delay: review.id * 0.1 }}
          >
            <motion.img
              src={review.image}
              alt={review.name}
              className="w-20 h-20 rounded-full mb-4 shadow-lg"
              whileHover={{ scale: 1.2, rotate: 10 }}
              transition={{ duration: 0.1 }}
            />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{review.name}</h3>
            <p className="text-sm text-gray-500 mb-4">{review.location}</p>
            <p className="text-center text-gray-700 italic">"{review.review}"</p>
          </motion.div>
        ))}

      </div>
    </animated.div>
  );
};

export default ClientReview;
