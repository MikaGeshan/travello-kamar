import React from "react";
import AdminHeader from "./../../../Layouts/AdminHeader";
import AdminSidebar from "./../../../Layouts/AdminSidebar";
import { useForm } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function CreateAirline() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        code: "",
        logo: null,
    });

    const handleFileChange = (e) => {
        setData("logo", e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/admin/airlines", {
            onSuccess: () => {
                Swal.fire({
                    icon: "success",
                    title: "Airline Created!",
                    text: "The airline has been created successfully.",
                    confirmButtonText: "OK",
                });
            },
            onError: () => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    confirmButtonText: "OK",
                });
            },
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <AdminHeader />
            <div className="flex flex-1">
                <AdminSidebar />
                <main className="flex-1 p-8 ml-50">
                    <div className="container mx-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold text-gray-800">
                                Create Airline
                            </h1>
                        </div>
                        <div className="rounded px-8 pt-6 pb-8 mb-4 bg-white shadow-md">
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
                                            placeholder="Enter airline name"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
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
                                            htmlFor="code"
                                        >
                                            Code
                                        </label>
                                        <input
                                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                                                errors.code
                                                    ? "border-red-500"
                                                    : ""
                                            }`}
                                            id="code"
                                            type="text"
                                            placeholder="Enter airline code"
                                            value={data.code}
                                            onChange={(e) =>
                                                setData("code", e.target.value)
                                            }
                                        />
                                        {errors.code && (
                                            <div className="text-red-500 text-xs mt-1">
                                                {errors.code}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="logo"
                                    >
                                        Logo
                                    </label>
                                    <input
                                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                                            errors.logo ? "border-red-500" : ""
                                        }`}
                                        id="logo"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                    {errors.logo && (
                                        <div className="text-red-500 text-xs mt-1">
                                            {errors.logo}
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center justify-between mt-4">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
                                        type="submit"
                                        disabled={processing}
                                    >
                                        {processing
                                            ? "Creating..."
                                            : "Create Airline"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
