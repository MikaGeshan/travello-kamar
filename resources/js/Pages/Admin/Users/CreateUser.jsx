import React from "react";
import { useForm, usePage } from "@inertiajs/react";
import AdminHeader from "./../../../Layouts/AdminHeader";
import AdminSidebar from "./../../../Layouts/AdminSidebar";
import Swal from "sweetalert2";

export default function CreateUser({ roles }) {
    const { auth } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: "",
    });

    const isAdmin = () => {
        return auth.user && auth.user.role === "Admin";
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/admin/users", {
            onSuccess: () => {
                Swal.fire({
                    icon: "success",
                    title: "User Created!",
                    text: "The user has been created successfully.",
                    confirmButtonText: "OK",
                });
            },
            onError: () => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong! Please check the form.",
                    confirmButtonText: "OK",
                });
            },
        });
    };

    return (
        isAdmin() && (
            <div className="min-h-screen bg-gray-100 flex flex-col">
                <AdminHeader />
                <div className="flex flex-1">
                    <AdminSidebar />
                    <main className="flex-1 p-8 ml-50">
                        <div className="container mx-auto">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-bold text-gray-800">
                                    Create User
                                </h1>
                            </div>
                            <div className="rounded px-8 pt-6 pb-8 mb-4">
                                <form onSubmit={handleSubmit}>
                                    <div className="flex space-x-4 mb-4">
                                        <div className="w-1/2">
                                            <label
                                                className="block text-gray-700 text-sm font-bold mb-2"
                                                htmlFor="name"
                                            >
                                                Name
                                            </label>
                                            <input
                                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                                                    errors.name
                                                        ? "border-red-500"
                                                        : ""
                                                }`}
                                                id="name"
                                                type="text"
                                                placeholder="Enter name"
                                                value={data.name}
                                                onChange={(e) =>
                                                    setData(
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.name && (
                                                <div className="text-red-500 text-xs mt-1">
                                                    {errors.name}
                                                </div>
                                            )}
                                        </div>
                                        <div className="w-1/2">
                                            <label
                                                className="block text-gray-700 text-sm font-bold mb-2"
                                                htmlFor="email"
                                            >
                                                Email
                                            </label>
                                            <input
                                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                                                    errors.email
                                                        ? "border-red-500"
                                                        : ""
                                                }`}
                                                id="email"
                                                type="email"
                                                placeholder="Enter email"
                                                value={data.email}
                                                onChange={(e) =>
                                                    setData(
                                                        "email",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.email && (
                                                <div className="text-red-500 text-xs mt-1">
                                                    {errors.email}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex space-x-4 mb-4">
                                        <div className="w-1/2">
                                            <label
                                                className="block text-gray-700 text-sm font-bold mb-2"
                                                htmlFor="password"
                                            >
                                                Password
                                            </label>
                                            <input
                                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                                                    errors.password
                                                        ? "border-red-500"
                                                        : ""
                                                }`}
                                                id="password"
                                                type="password"
                                                placeholder="Enter password"
                                                value={data.password}
                                                onChange={(e) =>
                                                    setData(
                                                        "password",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.password && (
                                                <div className="text-red-500 text-xs mt-1">
                                                    {errors.password}
                                                </div>
                                            )}
                                        </div>
                                        <div className="w-1/2">
                                            <label
                                                className="block text-gray-700 text-sm font-bold mb-2"
                                                htmlFor="password_confirmation"
                                            >
                                                Confirm Password
                                            </label>
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="password_confirmation"
                                                type="password"
                                                placeholder="Confirm password"
                                                value={
                                                    data.password_confirmation
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "password_confirmation",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                            htmlFor="role"
                                        >
                                            Role
                                        </label>
                                        <select
                                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                                                errors.role
                                                    ? "border-red-500"
                                                    : ""
                                            }`}
                                            id="role"
                                            value={data.role}
                                            onChange={(e) =>
                                                setData("role", e.target.value)
                                            }
                                        >
                                            <option value="">
                                                Select Role
                                            </option>
                                            {roles.map((role) => (
                                                <option
                                                    key={role.id}
                                                    value={role.name}
                                                >
                                                    {role.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.role && (
                                            <div className="text-red-500 text-xs mt-1">
                                                {errors.role}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-center justify-between mt-4">
                                        <button
                                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
                                            type="submit"
                                            disabled={processing}
                                        >
                                            {processing
                                                ? "Creating..."
                                                : "Create User"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        )
    );
}
