import React from 'react';
import { Link } from 'react-router-dom';

const AvailableCar = ({ car, view }) => {
    const { car_image, model, brand, daily_price, location, post_date, _id } = car;

    return (
        <div
            className={`bg-white p-3 rounded shadow ${view === 'list' ? 'flex items-center space-x-5' : ''
                }`}
        >
            {/* Car Image */}
            <img
                src={car_image}
                alt=""
                className={`rounded ${view === 'list' ? 'w-32 h-20' : 'w-full h-40 object-cover'}`}
            />
            {/* Car Details */}
            <div>
                <h2 className="text-lg font-bold">{model}</h2>
                <p className="text-sm text-gray-600">Brand: {brand}</p>
                <p className="text-sm text-gray-600">Price: ${daily_price}/day</p>
                <p className="text-sm text-gray-600">Location: {location}</p>
                <p className="text-sm text-gray-400">Added: {post_date}</p>
                <Link to={`/cars/${_id}`}>
                    <button className="mt-3 px-3 py-1 bg-red-500 text-white rounded hover:bg-blue-600">
                        Book Now
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default AvailableCar;
