import React from 'react';
import { FaCar, FaDollarSign, FaCheckCircle, FaHeadset } from 'react-icons/fa';

const Banner2 = () => {
    return (
        <div className="py-16">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Wide Variety of Cars */}
                    <div className="flex flex-col items-center text-center border-2 border-red-500 p-6 rounded-lg shadow-md">
                        <FaCar className="text-4xl text-red-500 mb-4" />
                        <h3 className="text-xl font-semibold">Wide Variety of Cars</h3>
                        <p className="text-gray-600">From budget-friendly options to luxury vehicles.</p>
                    </div>

                    {/* Affordable Prices */}
                    <div className="flex flex-col items-center text-center border-2 border-red-500 p-6 rounded-lg shadow-md">
                        <FaDollarSign className="text-4xl text-red-500 mb-4" />
                        <h3 className="text-xl font-semibold">Affordable Prices</h3>
                        <p className="text-gray-600">Competitive daily rates you can count on.</p>
                    </div>

                    {/* Easy Booking Process */}
                    <div className="flex flex-col items-center text-center border-2 border-red-500 p-6 rounded-lg shadow-md">
                        <FaCheckCircle className="text-4xl text-red-500 mb-4" />
                        <h3 className="text-xl font-semibold">Easy Booking Process</h3>
                        <p className="text-gray-600">Seamlessly book your ride in just a few clicks.</p>
                    </div>

                    {/* Customer Support */}
                    <div className="flex flex-col items-center text-center border-2 border-red-500 p-6 rounded-lg shadow-md">
                        <FaHeadset className="text-4xl text-red-500 mb-4" />
                        <h3 className="text-xl font-semibold">Customer Support</h3>
                        <p className="text-gray-600">24/7 assistance for all your queries.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner2;
