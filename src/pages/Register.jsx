import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import registerLottie from "../assets/lootie/register.json";
import Lottie from 'lottie-react';
import Swal from 'sweetalert2'; // SweetAlert2 ইম্পোর্ট

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        photoUrl: '',
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = "Name is required.";
        if (!formData.email) newErrors.email = "Email is required.";
        if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid.";
        if (!formData.password) newErrors.password = "Password is required.";
        if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters.";
        if (!formData.photoUrl) newErrors.photoUrl = "Photo URL is required.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            // SweetAlert2 success message
            Swal.fire({
                title: 'Registration Successful!',
                text: 'You can now login with your credentials.',
                icon: 'success',
                confirmButtonText: 'Go to Login',
            }).then(() => {
                navigate('/login');
            });
        }
    };

    return (
        <div className="hero bg-gradient-to-r from-red-500 to-pink-500 min-h-screen flex items-center justify-center">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <Lottie animationData={registerLottie} style={{ height: "300px", width: "300px" }} />
                </div>
                <div className="card bg-white shadow-2xl rounded-xl p-8 w-full max-w-md">
                    <h1 className="text-3xl font-semibold text-center text-red-600 mb-6">Register Now!</h1>
                    <form className="card-body" onSubmit={handleSubmit}>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text text-red-600">Name</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                className="input input-bordered input-primary w-full px-4 py-3 rounded-md border-2 border-red-500 focus:ring-2 focus:ring-red-500"
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                        </div>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text text-red-600">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className="input input-bordered input-primary w-full px-4 py-3 rounded-md border-2 border-red-500 focus:ring-2 focus:ring-red-500"
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text text-red-600">Password</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className="input input-bordered input-primary w-full px-4 py-3 rounded-md border-2 border-red-500 focus:ring-2 focus:ring-red-500"
                            />
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                        </div>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text text-red-600">Photo URL</span>
                            </label>
                            <input
                                type="url"
                                name="photoUrl"
                                value={formData.photoUrl}
                                onChange={handleChange}
                                placeholder="Enter your photo URL"
                                className="input input-bordered input-primary w-full px-4 py-3 rounded-md border-2 border-red-500 focus:ring-2 focus:ring-red-500"
                            />
                            {errors.photoUrl && <p className="text-red-500 text-xs mt-1">{errors.photoUrl}</p>}
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-danger w-full py-3 text-lg rounded-md bg-red-600 text-white hover:bg-red-700">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
