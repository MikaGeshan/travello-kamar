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
        <div className="flex h-screen">
            <div className="w-1/2 bg-white flex items-center justify-center">
                <div className="text-center flex flex-col items-center">
                    <FiHome className="mb-2 text-3xl" />
                    <h1 className="text-4xl font-bold text-green-800 mb-2">
                        Holiday Inn
                    </h1>
                    <p className="text-gray-600">
                        Kenyamanan Tanpa Batas, Pengalaman Tak Terbatas
                    </p>
                </div>
            </div>
            <div className="w-1/2 bg-green-800 flex items-center justify-center">
                <div className="bg-white p-10 rounded-lg shadow-lg w-96">
                    <h2 className="text-2xl font-bold mb-2 text-gray-800">
                        Sign in to Fly High
                    </h2>
                    <p className="text-md mb-3 text-gray-600">
                        Don't have an account?
                        <Link
                            href="/register"
                            className="text-gray-400 hover:underline ml-1"
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
                                className="mt-1 block w-full border rounded-md p-2"
                                required
                            />
                            {errors.email && (
                                <span className="text-red-500">
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
                                    className="mt-1 block w-full border rounded-md p-2"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                                >
                                    {showPassword ? <FiEye /> : <FiEyeOff />}
                                </button>
                            </div>
                            {errors.password && (
                                <span className="text-red-500">
                                    {errors.password}
                                </span>
                            )}
                        </div>

                        <button
                            type="submit"
                            className={`w-full bg-green-800 text-white font-bold py-2 rounded-md ${
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
