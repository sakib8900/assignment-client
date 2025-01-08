import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAuth from '../hooks/useAuth';
import { Helmet } from 'react-helmet';
import Loading from '../utilitis/Loading';

const MyBooking = () => {
    const [bookings, setBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [newStartDateTime, setNewStartDateTime] = useState('');
    const [newEndDateTime, setNewEndDateTime] = useState('');
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    useEffect(() => {
        if (user?.email) {
            setLoading(true);
            fetch(`https://assignment-11-server-one-lemon.vercel.app/bookings?userEmail=${user.email}`)
                .then((res) => res.json())
                .then((data) => {
                    const filteredBookings = data.filter(booking => booking.userEmail === user.email);
                    setBookings(filteredBookings);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setLoading(false);
                });
        } else {
            setBookings([]);
        }
    }, [user?.email]);

    const handleCancelBooking = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this booking!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, cancel it!',
            cancelButtonText: 'No, keep it',
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://assignment-11-server-one-lemon.vercel.app/bookings/${id}`, {
                    method: 'DELETE',
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.deletedCount > 0) {
                            Swal.fire('Canceled!', 'Your booking has been canceled.', 'success');
                            setBookings(bookings.filter((booking) => booking._id !== id));
                        }
                    });
            }
        });
    };

    const handleModifyBooking = (booking) => {
        setSelectedBooking(booking);
        setNewStartDateTime(booking.startDateTime);
        setNewEndDateTime(booking.endDateTime);
    };

    const handleDateUpdate = () => {
        fetch(`https://assignment-11-server-one-lemon.vercel.app/bookings/${selectedBooking._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ startDateTime: newStartDateTime, endDateTime: newEndDateTime }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    Swal.fire('Updated!', 'Booking dates updated successfully!', 'success');
                    setBookings(
                        bookings.map((booking) =>
                            booking._id === selectedBooking._id
                                ? { ...booking, startDateTime: newStartDateTime, endDateTime: newEndDateTime }
                                : booking
                        )
                    );
                }
            });
        setSelectedBooking(null);
    };
    if(loading){
        return <Loading></Loading>
    }

    return (
        <div className="container mx-auto p-5">
            <Helmet>
                <title>Rent A Car || My Bookings</title>
            </Helmet>
            <h2 className="text-3xl font-bold mb-5 text-center">My Bookings Cars</h2>
            <div className="overflow-x-auto">
                <table className="table w-full border-collapse border border-gray-200">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-6 py-3 border-b border-gray-300">Car Image</th>
                            <th className="px-6 py-3 border-b border-gray-300">Car Model</th>
                            <th className="px-6 py-3 border-b border-gray-300">Start Date</th>
                            <th className="px-6 py-3 border-b border-gray-300">End Date</th>
                            <th className="px-6 py-3 border-b border-gray-300">Total Price</th>
                            <th className="px-6 py-3 border-b border-gray-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.length > 0 ? (
                            bookings.map(({ _id, carImage, carModel, startDateTime, endDateTime, totalPrice }) => (
                                <tr key={_id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 border-b border-gray-300">
                                        <img
                                            src={carImage}
                                            alt=""
                                            className="w-16 h-16 object-cover rounded-md"
                                        />
                                    </td>
                                    <td className="px-6 py-4 border-b border-gray-300">{carModel}</td>
                                    <td className="px-6 py-4 border-b border-gray-300">{startDateTime}</td>
                                    <td className="px-6 py-4 border-b border-gray-300">{endDateTime}</td>
                                    <td className="px-6 py-4 border-b border-gray-300">${totalPrice}</td>
                                    <td className="px-6 py-4 border-b border-gray-300 flex items-center gap-2">
                                        <div className='flex flex-col gap-6'>
                                            <button
                                                onClick={() => handleCancelBooking(_id)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <FaTrash size={20} />
                                            </button>
                                            <button
                                                onClick={() => handleModifyBooking({ _id, startDateTime, endDateTime })}
                                                className="text-blue-500 hover:text-blue-700"
                                            >
                                                <FaEdit size={20} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-5 text-gray-500">
                                    No bookings found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/* update your Booking */}
            {selectedBooking && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h3 className="text-lg font-bold mb-4">Modify Booking</h3>
                        <input
                            type="datetime-local"
                            value={newStartDateTime}
                            onChange={(e) => setNewStartDateTime(e.target.value)}
                            className="border border-gray-300 p-2 mb-4 w-full"
                        />
                        <input
                            type="datetime-local"
                            value={newEndDateTime}
                            onChange={(e) => setNewEndDateTime(e.target.value)}
                            className="border border-gray-300 p-2 mb-4 w-full"
                        />
                        <div className="flex justify-end">
                            <button
                                onClick={() => setSelectedBooking(null)}
                                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDateUpdate}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyBooking;
