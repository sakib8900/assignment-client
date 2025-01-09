import React, { useEffect, useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import useAuth from "../../hooks/useAuth";
import Swal from 'sweetalert2';
import { Helmet } from "react-helmet";
import Loading from "../../utilitis/Loading";

const MyCars = () => {
    const [cars, setCars] = useState([]);
    const [sortOption, setSortOption] = useState("newest");
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);

    // Fetch user cars
    useEffect(() => {
        if (user?.email) {
            fetch(`https://assignment-11-server-one-lemon.vercel.app/cars?userEmail=${user.email}`)
                .then((res) => res.json())
                .then((data) => {
                    const filteredCars = data.filter((car) => car.user.email === user.email);
                    setCars(filteredCars);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setLoading(false);
                });
        } else {
            setCars([]);
        }
    }, [user]);

    // Sorting logic
    const sortedCars = [...cars].sort((a, b) => {
        if (sortOption === "newest") return new Date(b.post_date) - new Date(a.post_date);
        if (sortOption === "oldest") return new Date(a.post_date) - new Date(b.post_date);
        if (sortOption === "highest") return b.daily_price - a.daily_price;
        if (sortOption === "lowest") return a.daily_price - b.daily_price;
        return 0;
    });

    // Open Modal for Update
    const openModal = (car) => {
        setSelectedCar(car);
        setIsModalOpen(true);
    };

    // Close Modal
    const closeModal = () => {
        setSelectedCar(null);
        setIsModalOpen(false);
    };

    // Handle Update
    const handleUpdate = (e) => {
        e.preventDefault();
        const updatedCar = {
            model: e.target.model.value,
            daily_price: parseFloat(e.target.daily_price.value),
            availability: e.target.availability.checked,
            registration_number: e.target.registration_number.value,
            features: e.target.features.value.split(",").map((feature) => feature.trim()),
            description: e.target.description.value,
            car_image: e.target.image_url.value,
            location: e.target.location.value,
        };

        fetch(`https://assignment-11-server-one-lemon.vercel.app/cars/${selectedCar._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedCar),
        })
            .then((res) => res.json())
            .then(() => {
                setCars(
                    cars.map((car) =>
                        car._id === selectedCar._id ? { ...car, ...updatedCar } : car
                    )
                );
                closeModal();

                Swal.fire({
                    icon: 'success',
                    title: 'Car updated successfully!',
                    showConfirmButton: false,
                    timer: 1500,
                });
            })
            .catch((error) => {
                console.error("Error updating car:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong while updating the car!',
                });
            });
    };

    if (loading) {
        return <Loading />;
    }

    // Delete car
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://assignment-11-server-one-lemon.vercel.app/cars/${id}`, {
                    method: "DELETE",
                })
                    .then((res) => res.json())
                    .then(() => {
                        setCars(cars.filter((car) => car._id !== id));
                        Swal.fire(
                            'Deleted!',
                            'Your car has been deleted.',
                            'success'
                        );
                    })
                    .catch((error) => {
                        console.error("Error deleting car:", error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong while deleting the car!',
                        });
                    });
            }
        });
    };

    return (
        <div className="p-5">
            <Helmet>
                <title>Rent A Car || My Cars</title>
            </Helmet>
            <h1 className="text-2xl font-bold mb-5 text-center">My Cars</h1>
            {/* Sorting Options */}
            <select
                className="border p-2 mb-5 rounded w-full md:w-1/3"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
            >
                <option value="newest">Date Added: Newest</option>
                <option value="oldest">Date Added: Oldest</option>
                <option value="lowest">Price: Lowest</option>
                <option value="highest">Price: Highest</option>
            </select>

            {/* Cars Table */}
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">Image</th>
                            <th className="border p-2">Model</th>
                            <th className="border p-2">Price</th>
                            <th className="border p-2">Location</th>
                            <th className="border p-2">Date Added</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedCars.map((car) => (
                            <tr key={car._id} className="text-center">
                                <td className="border p-2">
                                    <img
                                        src={car.car_image}
                                        alt={car.model}
                                        className="w-16 h-16 object-cover mx-auto"
                                    />
                                </td>
                                <td className="border p-2">{car.model}</td>
                                <td className="border p-2">${car.daily_price}/day</td>
                                <td className="border p-2">{car.location}</td>
                                <td className="border p-2">
                                    {new Date(car.post_date).toLocaleDateString()}
                                </td>
                                <td className="border p-2 space-x-3">
                                    <button
                                        onClick={() => openModal(car)}
                                        className="text-blue-500"
                                    >
                                        <MdEdit size={24} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(car._id)}
                                        className="text-red-500"
                                    >
                                        <MdDelete size={24} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Update Modal */}
            {isModalOpen && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg mb-4">Update Car Details</h3>
                        <form onSubmit={handleUpdate}>
                            {/* Car Model */}
                            <input
                                type="text"
                                name="model"
                                defaultValue={selectedCar.model}
                                placeholder="Car Model"
                                className="input input-bordered w-full mb-4"
                            />
                            {/* Daily Rental Price */}
                            <input
                                type="number"
                                name="daily_price"
                                defaultValue={selectedCar.daily_price}
                                placeholder="Daily Rental Price"
                                className="input input-bordered w-full mb-4"
                            />
                            {/* Availability */}
                            <div className="mb-4 flex items-center">
                                <label className="mr-2">Available</label>
                                <input
                                    type="checkbox"
                                    name="availability"
                                    defaultChecked={selectedCar.availability}
                                    className="checkbox checkbox-primary"
                                />
                            </div>
                            {/*Registration Number */}
                            <input
                                type="text"
                                name="registration_number"
                                defaultValue={selectedCar.registration_number}
                                placeholder="Registration Number"
                                className="input input-bordered w-full mb-4"
                            />
                            {/* Features */}
                            <input
                                type="text"
                                name="features"
                                defaultValue={selectedCar.features?.join(", ")}
                                placeholder="Features (e.g., GPS, AC)"
                                className="input input-bordered w-full mb-4"
                            />
                            {/* Description */}
                            <textarea
                                name="description"
                                defaultValue={selectedCar.description}
                                placeholder="Description"
                                className="textarea textarea-bordered w-full mb-4"
                            ></textarea>
                            {/* Image URL */}
                            <input
                                type="url"
                                name="image_url"
                                defaultValue={selectedCar.car_image}
                                placeholder="Image URL"
                                className="input input-bordered w-full mb-4"
                            />
                            {/* Location */}
                            <input
                                type="text"
                                name="location"
                                defaultValue={selectedCar.location}
                                placeholder="Location"
                                className="input input-bordered w-full mb-4"
                            />
                            <div className="modal-action">
                                <button type="submit" className="btn btn-primary">
                                    Post
                                </button>
                                <button
                                    type="button"
                                    className="btn"
                                    onClick={closeModal}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyCars;
