import React, { useEffect, useState } from "react";
import AdminHeader from "./../../../Layouts/AdminHeader";
import AdminSidebar from "./../../../Layouts/AdminSidebar";
import { Link } from "@inertiajs/react";
import axios from "axios";

export default function AirlineList({ airlines }) {
    const [images, setImages] = useState({});

    useEffect(() => {
        // Mengambil gambar dari server
        airlines.forEach((airline) => {
            axios.get(`/storage/${airline.logo}`, { responseType: 'blob' })
                .then(response => {
                    const url = URL.createObjectURL(response.data);
                    setImages(prev => ({ ...prev, [airline.id]: url }));
                })
                .catch(error => {
                    console.error("Error fetching image:", error);
                });
        });
    }, [airlines]);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <AdminHeader />
            <div className="flex flex-1">
                <AdminSidebar />
                <main className="flex-1 p-8 ml-50">
                    <div className="container mx-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold text-gray-800">
                                Airline List
                            </h1>
                            <Link
                                href="/admin/airlines/create"
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md text-base"
                            >
                                Add New Airline
                            </Link>
                        </div>
                        <div className="bg-white shadow-md rounded-lg overflow-hidden">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-white border-b text-left">
                                        <th className="p-3">ID</th>
                                        <th className="p-3">Name</th>
                                        <th className="p-3">Code</th>
                                        <th className="p-3">Logo</th>
                                        <th className="p-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {airlines.map((airline) => (
                                        <tr key={airline.id} className="border-b">
                                            <td className="p-3">{airline.id}</td>
                                            <td className="p-3">{airline.name}</td>
                                            <td className="p-3">{airline.code}</td>
                                            <td className="p-3">
                                                {images[airline.id] ? (
                                                    <img
                                                        src={images[airline.id]}
                                                        alt={`${airline.name} logo`}
                                                        className="w-12 h-12 object-cover"
                                                    />
                                                ) : (
                                                    <span>Loading...</span>
                                                )}
                                            </td>
                                            <td className="p-3">
                                                <button className="text-blue-500 hover:text-blue-700 mr-2 font-bold">
                                                    Edit
                                                </button>
                                                <button className="text-red-500 hover:text-red-700 font-bold">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
