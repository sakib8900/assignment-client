import Lottie from "lottie-react";
import loginLottie from "../assets/lootie/login.json";
import { useContext } from "react";
import AuthContext from "../context/AuthContext/AuthContext";
import SocialLogin from "./SocialLogin";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2

const Login = () => {
    const { loginInUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        const { email, password } = data;
        loginInUser(email, password)
            .then((result) => {
                console.log("Sign in successful:", result.user);

                // Show SweetAlert confirmation
                Swal.fire({
                    title: "Login Successful!",
                    text: `Welcome back, ${result.user.name}!`,
                    icon: "success",
                    confirmButtonText: "Continue",
                    confirmButtonColor: "#e11d48",
                }).then(() => {
                    navigate("/"); // Navigate to the home page after confirmation
                });
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: error.message,
                });
            });                        
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-4xl px-4">
                <div className="w-full md:w-1/2 mb-8 md:mb-0">
                    <Lottie animationData={loginLottie} loop={true} style={{ height: "300px", width: "300px" }} />
                </div>
                <div className="p-8 bg-white shadow-md rounded-md w-full max-w-sm">
                    <h2 className="text-2xl font-bold text-center mb-6 text-red-600">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-red-600 mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-red-200 border-red-400"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-red-600 mb-1">Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-red-200 border-red-400"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700"
                        >
                            Login
                        </button>
                    </form>
                    <SocialLogin />
                    <p className="mt-4 text-sm text-center text-gray-600">
                        Don't have an account?{" "}
                        <a href="/register" className="text-red-600 hover:underline">
                            Register
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
