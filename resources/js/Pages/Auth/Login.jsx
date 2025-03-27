import React, { useState } from "react";
import { useForm, Link } from "@inertiajs/react";
import { FiEye, FiEyeOff, FiHome } from "react-icons/fi";

const Login = () => {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/login");
    };

    return (
        <div className="flex flex-col md:flex-row h-screen">
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
            <div className="w-full md:w-1/2 bg-blue-400 flex items-center justify-center p-8">
                <div className="bg-white p-6 md:p-10 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-2 text-gray-800 text-center">
                        Sign in to Travello
                    </h2>
                    <p className="text-md mb-3 text-gray-600 text-center">
                        Don't have an account?
                        <Link
                            href="/register"
                            className="text-blue-400 hover:underline ml-1"
                        >
                            Register
                        </Link>
                    </p>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label
                                className="block text-sm font-medium text-gray-700"
                                htmlFor="email"
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
                        <div className="mb-6">
                            <label
                                className="block text-sm font-medium text-gray-700"
                                htmlFor="password"
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
                        <button
                            type="submit"
                            className={`w-full bg-blue-500 text-white font-bold py-2 rounded-md transition duration-300 hover:bg-blue-600 ${
                                processing
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                            }`}
                            disabled={processing}
                        >
                            {processing ? "Logging in..." : "Login"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
