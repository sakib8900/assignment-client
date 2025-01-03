import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import registerLottie from "../assets/lootie/register.json";
import Swal from 'sweetalert2';
import AuthContext from '../context/AuthContext/AuthContext';

const Register = () => {

    const { createUser } = useContext(AuthContext);

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validate = (formData) => {
        const newErrors = {};
        const passwordRegex = /^(?=.*[A-Z])(?=.*[@#$%^&+=]).{6,}$/;

        if (!formData.name) {
            newErrors.name = "Name is required.";
        }

        if (!formData.email) {
            newErrors.email = "Email is required.";
        }

        if (!formData.password || !passwordRegex.test(formData.password)) {
            newErrors.password =
                "Password must be at least 6 characters, include 1 uppercase letter, and 1 special character.";
        }

        if (!formData.photoUrl) {
            newErrors.photoUrl = "Photo URL is required.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        if (validate(data)) {
            createUser(data.email, data.password)
                .then((result) => {
                    console.log(result.user);
                    Swal.fire({
                        title: 'Registration Successful!',
                        text: 'You can now login with your credentials.',
                        icon: 'success',
                        confirmButtonText: 'Go to Login',
                    }).then(() => {
                        navigate('/');
                    });
                })
                .catch((error) => {
                    console.error(error.message);
                    Swal.fire({
                        title: 'Registration Failed!',
                        text: error.message,
                        icon: 'error',
                    });
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
                                placeholder="Enter your name"
                                className="input input-bordered input-primary w-full px-4 py-3 rounded-md border-2 border-red-500 focus:ring-0 focus:border-red-500 focus:outline-none"
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
                                placeholder="Enter your email"
                                className="input input-bordered input-primary w-full px-4 py-3 rounded-md border-2 border-red-500 focus:ring-0 focus:border-red-500 focus:outline-none"
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
                                placeholder="Enter your password"
                                className="input input-bordered input-primary w-full px-4 py-3 rounded-md border-2 border-red-500 focus:ring-0 focus:border-red-500 focus:outline-none"
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
                                placeholder="Enter your photo URL"
                                className="input input-bordered input-primary w-full px-4 py-3 rounded-md border-2 border-red-500 focus:ring-0 focus:border-red-500 focus:outline-none"
                            />
                            {errors.photoUrl && <p className="text-red-500 text-xs mt-1">{errors.photoUrl}</p>}
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-danger w-full py-3 text-lg rounded-md bg-red-600 text-white hover:bg-red-700">
                                Register
                            </button>
                        </div>
                    </form>
                    <p className="mt-4 text-sm text-center text-gray-600">
                        you have an account?{' '}
                        <Link href="/login" className="text-red-600 hover:underline">
                            login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
