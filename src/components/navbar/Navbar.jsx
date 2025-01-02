import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo/logo.jpeg"; // Logo import
import profileImage from "../../assets/logo/profile.jpeg"; // Profile image import
import { IoMoon, IoSunny } from "react-icons/io5";
import "./Navbar.css";

const Navbar = () => {
    // Link all navbar
    const links = (
        <>
            <NavLink to="/" className="">
                Home
            </NavLink>
            <NavLink to="/services" className="">
                Available Cars
            </NavLink>
            <NavLink to="/login" className="">
                Login
            </NavLink>
        </>
    );
    // Dark Mode toggle
    const [dark, setDark] = React.useState(false);
    const darkModeHandler = () => {
        setDark(!dark);
        document.body.classList.toggle("dark");
    };

    return (
        <div className="navbar bg-gray-100 shadow-md px-5">
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
                        {links}
                    </ul>
                </div>
                <div className="flex items-center gap-4">
                    <img
                        src={logo}
                        alt="Logo"
                        className="w-12 h-12 rounded-full"
                    />
                    <NavLink
                        to="/"
                        className="text-xl md:text-2xl font-bold tracking-wide"
                        style={{ color: "#e11d48" }}
                    >
                        Rent A Car
                    </NavLink>

                </div>
            </div>

            {/* Navbar Center */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal gap-4">
                    {links}
                </ul>
            </div>

            {/* Navbar End */}
            <div className="navbar-end flex items-center gap-4">
                {/* Dark/Light Toggle */}
                <button onClick={darkModeHandler} className="btn btn-ghost">
                    {dark ? <IoSunny /> : <IoMoon />}
                </button>

                {/* Profile & Logout */}
                <div className="flex items-center gap-3">
                    <img
                        src={profileImage}
                        alt="Profile"
                        className="w-10 h-10 rounded-full border border-gray-300"
                    />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
