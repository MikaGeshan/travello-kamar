import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import AdminHeader from "./../../../Layouts/AdminHeader";
import AdminSidebar from "./../../../Layouts/AdminSidebar";
import { FaSearch, FaTrash, FaHotel } from "react-icons/fa";

export default function HotelList() {
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedHotels, setSelectedHotels] = useState([]);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <AdminHeader />
            <div className="flex flex-1">
                <AdminSidebar />
                <main className="flex-1 p-8 ml-50">
                    <div className="container mx-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                                <FaHotel className="mr-3" /> Hotel List
                            </h1>
                            <Link
                                href="/admin/hotels/create"
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            >
                                Add New Hotel
                            </Link>
                        </div>
                        <div className="bg-white shadow-md rounded-lg overflow-hidden">
                            <div className="p-4 border-b">
                                <div className="flex items-center">
                                    <input
                                        type="text"
                                        placeholder="Search hotels"
                                        className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button className="bg-green-500 text-white px-4 py-3 rounded-r-md">
                                        <FaSearch />
                                    </button>
                                </div>
                            </div>
                            <div className="p-4 bg-gray-50 border-b">
                                {selectedHotels.length > 0 && (
                                    <div className="flex items-center animate-fade-in">
                                        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center transition-all duration-200">
                                            <FaTrash className="mr-2" />
                                            Delete Selected (
                                            {selectedHotels.length})
                                        </button>
                                    </div>
                                )}
                            </div>
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-white border-b text-left">
                                        <th className="p-3 w-12">
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4 rounded border-gray-300 cursor-pointer"
                                            />
                                        </th>
                                        <th className="p-3">ID</th>
                                        <th className="p-3">Hotel Name</th>
                                        <th className="p-3">Location</th>
                                        <th className="p-3">Total Rooms</th>
                                        <th className="p-3">Rating</th>
                                        <th className="p-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[...Array(5)].map((_, index) => (
                                        <tr key={index} className="border-b">
                                            <td className="p-3">
                                                <input
                                                    type="checkbox"
                                                    className="w-4 h-4 rounded border-gray-300 cursor-pointer"
                                                />
                                            </td>
                                            <td className="p-3">{index + 1}</td>
                                            <td className="p-3">Grand Hyatt</td>
                                            <td className="p-3">Jakarta</td>
                                            <td className="p-3">100</td>
                                            <td className="p-3">4.5</td>
                                            <td className="p-3 flex space-x-2">
                                                <button className="text-blue-500 hover:text-blue-700 font-bold">
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
                            <div className="flex items-center justify-between p-4">
                                <span>Showing 1 to 5 of 5 results</span>

                                <div className="flex items-center">
                                    <select
                                        value={perPage}
                                        className="border p-2 rounded mr-2"
                                    >
                                        <option value="5">5</option>
                                        <option value="10">10</option>
                                        <option value="15">15</option>
                                        <option value="20">20</option>
                                    </select>
                                    <span>per page</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <button
                                        disabled
                                        className="px-2 py-1 border rounded-l-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                                    >
                                        {"<"}
                                    </button>
                                    <button className="px-3 py-1 border bg-green-500 text-white">
                                        1
                                    </button>
                                    <button
                                        disabled
                                        className="px-2 py-1 border rounded-r-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                                    >
                                        {">"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
