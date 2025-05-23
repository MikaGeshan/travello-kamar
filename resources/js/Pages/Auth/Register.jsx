import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import { FiEye, FiEyeOff, FiHome } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const [agreed, setAgreed] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!agreed) {
            toast.error("You need to agree to the terms and conditions", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            return;
        }
        post("/register");
    };

    return (
        <div className="flex flex-col md:flex-row h-screen">
            <ToastContainer />

            {/* Bagian Kiri (Branding) */}
            <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-8">
                <div className="text-center">
                    <div className="flex items-center justify-center gap-2">
                        <FiHome className="text-4xl text-blue-500" />
                        <h1 className="text-4xl font-bold text-blue-500">
                            Travello
                        </h1>
                    </div>
                    <p className="text-gray-600 text-lg mt-2">
                        Kenyamanan Tanpa Batas, Pengalaman Tak Terbatas
                    </p>
                </div>
            </div>

            {/* Bagian Kanan (Form Register) */}
            <div className="w-full md:w-1/2 bg-blue-400 flex items-center justify-center p-8">
                <div className="bg-white p-6 md:p-10 rounded-lg shadow-lg w-full max-w-md">
                    <form onSubmit={handleSubmit}>
                        <h2 className="text-2xl font-bold mb-2 text-gray-800 text-center">
                            Register to Travello
                        </h2>
                        <p className="text-md mb-3 text-gray-600 text-center">
                            Already have an account?
                            <Link
                                href="/login"
                                className="text-blue-400 hover:underline ml-1"
                            >
                                Sign in now!
                            </Link>
                        </p>

                        {/* Input Name */}
                        <div className="mb-4">
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-400 focus:border-blue-400"
                                required
                            />
                            {errors.name && (
                                <span className="text-red-500 text-sm">
                                    {errors.name}
                                </span>
                            )}
                        </div>

                        {/* Input Email */}
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-400 focus:border-blue-400"
                                required
                            />
                            {errors.email && (
                                <span className="text-red-500 text-sm">
                                    {errors.email}
                                </span>
                            )}
                        </div>

                        {/* Input Password */}
                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 pr-10 focus:ring-blue-400 focus:border-blue-400"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? <FiEye /> : <FiEyeOff />}
                                </button>
                            </div>
                            {errors.password && (
                                <span className="text-red-500 text-sm">
                                    {errors.password}
                                </span>
                            )}
                        </div>

                        {/* Input Confirm Password */}
                        <div className="mb-4">
                            <label
                                htmlFor="password_confirmation"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    id="password_confirmation"
                                    value={data.password_confirmation}
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value
                                        )
                                    }
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 pr-10 focus:ring-blue-400 focus:border-blue-400"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }
                                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                                >
                                    {showConfirmPassword ? (
                                        <FiEye />
                                    ) : (
                                        <FiEyeOff />
                                    )}
                                </button>
                            </div>
                            {errors.password_confirmation && (
                                <span className="text-red-500 text-sm">
                                    {errors.password_confirmation}
                                </span>
                            )}
                        </div>

                        {/* Checkbox Agreement */}
                        <div className="mb-4 flex items-center">
                            <input
                                type="checkbox"
                                id="agreement"
                                checked={agreed}
                                onChange={(e) => setAgreed(e.target.checked)}
                                className="mr-2"
                            />
                            <label
                                htmlFor="agreement"
                                className="text-sm font-medium text-gray-700"
                            >
                                I agree to the terms and conditions
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white font-bold py-2 rounded-md transition duration-300 hover:bg-blue-600"
                            disabled={processing}
                        >
                            {processing ? "Registering..." : "Register"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
