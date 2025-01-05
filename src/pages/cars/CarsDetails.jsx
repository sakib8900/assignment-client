import React from 'react';
import { useLoaderData } from 'react-router-dom';

const CarsDetails = () => {
    const { car_image, model, daily_price, location, features, description, date_posted } = useLoaderData();

    // console.log({ car_image, model, daily_price, location, features, description, date_posted }); // Log the fetched data

    return (
        <div className="container mx-auto p-5">
            <div className="bg-white p-5 rounded shadow-lg flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-8">
                {/* Car Image */}
                <div className="md:w-1/2 flex items-center">
                    <img
                        src={car_image}
                        alt={model}
                        className="w-full h-auto max-h-96 object-contain rounded"
                    />
                </div>

                {/* Car Information */}
                <div className="md:w-1/2">
                    <h2 className="text-2xl font-bold mb-2">{model}</h2>
                    <p className="text-lg text-gray-600 mb-1">
                        <span className="font-semibold">Price Per Day:</span> ${daily_price}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                        <span className="font-semibold">Location:</span> {location}
                    </p>
                    <p className="text-sm text-gray-400 mb-4">
                        <span className="font-semibold">Posted on:</span>{' '}
                        {new Date(date_posted).toDateString()}
                    </p>

                    {/* Features */}
                    <h3 className="text-lg font-semibold mt-3">Features:</h3>
                    <ul className="list-disc ml-5 text-sm text-gray-600 space-y-1">
                        {features?.map((feature, idx) => (
                            <li key={idx}>{feature}</li>
                        ))}
                    </ul>

                    {/* Description */}
                    <h3 className="text-lg font-semibold mt-3">Description:</h3>
                    <p className="text-sm text-gray-600">{description}</p>
                </div>
            </div>
        </div>


    );
};


export default CarsDetails;