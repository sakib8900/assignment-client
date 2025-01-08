import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo/logo.jpeg";
import profileImage from "../../assets/logo/profile.jpeg";
import { IoMoon, IoSunny } from "react-icons/io5";
import AuthContext from "../../context/AuthContext/AuthContext";
import "./Navbar.css";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [dark, setDark] = useState(false);

    const darkModeHandler = () => {
        setDark(!dark);
        document.body.classList.toggle("dark");
    };
    // console.log(user);
    // console.log(user);
    const handleLogOut = () => {
        logOut()
            .then(() => {
                console.log('success logout');
            })
    };

    return (
        <div className="navbar bg-gray-100 shadow-md px-5 relative z-20">
            {/* Navbar Start */}
            <div className="navbar-start">
                <div className="dropdown lg:hidden">
                    <label tabIndex={0} className="btn btn-ghost">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </label>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-gray-100 rounded-box w-52"
                    >
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/availableCars">Available Cars</NavLink>
                        {user ? (
                            <>
                                <button onClick={handleLogOut} className="text-red-600 font-bold">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <NavLink to="/login">Login</NavLink>
                        )}
                    </ul>
                </div>
                <div className="flex items-center gap-4">
                    <img src={logo} alt="Logo" className="w-12 h-12 rounded-full" />
                    <NavLink to="/" className="text-sm md:text-2xl font-bold tracking-wide" style={{ color: "#e11d48" }}>
                        Rent A Car
                    </NavLink>
                </div>
            </div>

            {/* Navbar Center */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal gap-4">
                    <NavLink to="/">Home</NavLink>

                    <NavLink to="/availableCars">Available Cars</NavLink>
                    {user ? (
                        <>
                            <button onClick={logOut} className="text-red-600 font-bold">
                                Logout
                            </button>
                        </>
                    ) : (
                        <li>
                            <NavLink className="font-bold" to="/login">Login</NavLink>
                        </li>
                    )}
                </ul>
            </div>

            {/* Navbar End */}
            <div className="navbar-end flex items-center gap-4">
                {/* Dark/Light Toggle */}
                <button onClick={darkModeHandler} className="btn btn-ghost">
                    {dark ? <IoSunny /> : <IoMoon />}
                </button>

                {/* Profile & Dropdown */}
                {user && (
                    <div className="dropdown relative z-20">
                        <label tabIndex={0} className="btn btn-ghost">
                            <img
                                src={user?.photoURL || profileImage}
                                alt=""
                                className="w-10 h-10 rounded-full border border-gray-300"
                            />
                        </label>
                        <ul
                            tabIndex={0}
                            className="menu dropdown-content absolute right-0 mt-3 p-2 shadow bg-gray-100 rounded-box w-52"
                        >
                            <NavLink to="/addCar">Add Car</NavLink>
                            <NavLink to="/myCars">My Cars</NavLink>
                            <NavLink to="/myBookings">My Bookings</NavLink>
                            <button onClick={handleLogOut} className="text-red-600 font-bold">
                                Logout
                            </button>
                        </ul>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Navbar;
