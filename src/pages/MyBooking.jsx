// MyBooking.js
import React, { useState, useEffect } from 'react';

const MyBooking = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        // Fetch user bookings (this is just a placeholder API call)
        fetch('http://localhost:5000/bookings/userId')
            .then((res) => res.json())
            .then((data) => setBookings(data));
    }, []);

    return (
        <div className="container mx-auto p-5">
            <h2 className="text-2xl font-bold mb-5">My Bookings</h2>
            <table className="w-full table-auto border-collapse">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2">Car Model</th>
                        <th className="px-4 py-2">Start Date</th>
                        <th className="px-4 py-2">End Date</th>
                        <th className="px-4 py-2">Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.length > 0 ? (
                        bookings.map((booking) => (
                            <tr key={booking._id}>
                                <td className="px-4 py-2">{booking.carModel}</td>
                                <td className="px-4 py-2">{booking.startDate}</td>
                                <td className="px-4 py-2">{booking.endDate}</td>
                                <td className="px-4 py-2">${booking.totalPrice}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center py-2">No bookings found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default MyBooking;
