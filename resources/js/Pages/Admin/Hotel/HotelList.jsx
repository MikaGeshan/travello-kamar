import React, { useState } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import AdminHeader from "./../../../Layouts/AdminHeader";
import AdminSidebar from "./../../../Layouts/AdminSidebar";
import { FaSearch, FaTrash, FaHotel } from "react-icons/fa";
import Swal from "sweetalert2";

export default function HotelList() {
    const { hotels = [] } = usePage().props;
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedHotels, setSelectedHotels] = useState([]);

    const handleSelectHotel = (hotelId) => {
        setSelectedHotels((prev) =>
            prev.includes(hotelId)
                ? prev.filter((id) => id !== hotelId)
                : [...prev, hotelId]
        );
    };

    const handleSelectAll = () => {
        if (selectedHotels.length === hotels.length) {
            setSelectedHotels([]);
        } else {
            setSelectedHotels(hotels.map((hotel) => hotel.id));
        }
    };

    const totalHotels = hotels.length;
    const totalPages = Math.ceil(totalHotels / perPage);
    const start = (currentPage - 1) * perPage;
    const end = Math.min(currentPage * perPage, totalHotels);

    const handlePageChange = (newPage) => setCurrentPage(newPage);

    const handlePerPageChange = (event) => {
        setPerPage(parseInt(event.target.value));
        setCurrentPage(1);
    };

    const handleDeleteHotel = (hotelId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/admin/hotels/${hotelId}`, {
                    onSuccess: () => {
                        Swal.fire(
                            "Deleted!",
                            "Hotel has been deleted.",
                            "success"
                        );
                    },
                    onError: () => {
                        Swal.fire(
                            "Error!",
                            "There was a problem deleting the hotel.",
                            "error"
                        );
                    },
                });
            }
        });
    };

    const handleDeleteSelectedHotels = () => {
        if (selectedHotels.length === 0) return;

        Swal.fire({
            title: "Delete Selected Hotels?",
            text: `You are about to delete ${selectedHotels.length} hotel(s)`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete them!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.post(
                    "/admin/hotels/bulk-delete",
                    {
                        hotels: selectedHotels,
                    },
                    {
                        onSuccess: () => {
                            Swal.fire(
                                "Deleted!",
                                `${selectedHotels.length} hotel(s) have been deleted.`,
                                "success"
                            );
                            setSelectedHotels([]);
                        },
                        onError: () => {
                            Swal.fire(
                                "Error!",
                                "There was a problem deleting the hotels.",
                                "error"
                            );
                        },
                    }
                );
            }
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
                            <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                                <FaHotel className="mr-3" /> Hotel List
                            </h1>
                            <Link
                                href={"/admin/hotels/create"}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
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
                                    <button className="bg-blue-500 text-white px-4 py-3 rounded-r-md">
                                        <FaSearch />
                                    </button>
                                </div>
                            </div>
                            <div className="p-4 bg-gray-50 border-b">
                                {selectedHotels.length > 0 && (
                                    <div className="flex items-center animate-fade-in">
                                        <button
                                            onClick={handleDeleteSelectedHotels}
                                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center transition-all duration-200"
                                        >
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
                                                checked={
                                                    selectedHotels.length ===
                                                    hotels.length
                                                }
                                                onChange={handleSelectAll}
                                            />
                                        </th>
                                        <th className="p-3">ID</th>
                                        <th className="p-3">Hotel Name</th>
                                        <th className="p-3">Image</th>
                                        <th className="p-3">Description</th>
                                        <th className="p-3">Location</th>
                                        <th className="p-3">Rating</th>
                                        <th className="p-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {hotels.slice(start, end).map((hotel) => (
                                        <tr key={hotel.id} className="border-b">
                                            <td className="p-3">
                                                <input
                                                    type="checkbox"
                                                    className="w-4 h-4 rounded border-gray-300 cursor-pointer"
                                                    checked={selectedHotels.includes(
                                                        hotel.id
                                                    )}
                                                    onChange={() =>
                                                        handleSelectHotel(
                                                            hotel.id
                                                        )
                                                    }
                                                />
                                            </td>
                                            <td className="p-3">{hotel.id}</td>
                                            <td className="p-3">
                                                {hotel.nama_hotel}
                                            </td>
                                            <td className="p-3">
                                                <img
                                                    src={`${window.location.origin}/${hotel.gambar_hotel}`}
                                                    alt={hotel.nama_hotel}
                                                    className="w-20 h-20 object-cover rounded-md"
                                                />
                                            </td>
                                            <td className="p-3">
                                                {hotel.deskripsi_hotel}
                                            </td>
                                            <td className="p-3">
                                                {hotel.lokasi_hotel}
                                            </td>
                                            <td className="p-3">
                                                {hotel.rating_hotel}
                                            </td>
                                            <td className="p-3 space-x-2">
                                                <div className="flex items-center space-x-2">
                                                    <Link
                                                        href={`/admin/hotels/${hotel.id}/edit`}
                                                        className="text-blue-500 hover:text-blue-700 font-bold"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() =>
                                                            handleDeleteHotel(
                                                                hotel.id
                                                            )
                                                        }
                                                        className="text-red-500 hover:text-red-700 font-bold"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="flex items-center justify-between p-4">
                                <span>
                                    Showing {start + 1} to {end} of{" "}
                                    {totalHotels} results
                                </span>
                                <div className="flex items-center space-x-2">
                                    <select
                                        value={perPage}
                                        onChange={handlePerPageChange}
                                        className="border p-2 rounded"
                                    >
                                        <option value="5">5</option>
                                        <option value="10">10</option>
                                        <option value="15">15</option>
                                    </select>
                                    <div className="flex items-center space-x-1">
                                        <button
                                            disabled={currentPage === 1}
                                            onClick={() =>
                                                handlePageChange(
                                                    currentPage - 1
                                                )
                                            }
                                            className="px-2 py-1 border rounded-l-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                                        >
                                            {"<"}
                                        </button>
                                        {[...Array(totalPages)].map(
                                            (_, index) => (
                                                <button
                                                    key={index + 1}
                                                    onClick={() =>
                                                        handlePageChange(
                                                            index + 1
                                                        )
                                                    }
                                                    className={`px-3 py-1 border ${
                                                        currentPage ===
                                                        index + 1
                                                            ? "bg-green-500 text-white"
                                                            : "bg-gray-200 hover:bg-gray-300"
                                                    }`}
                                                >
                                                    {index + 1}
                                                </button>
                                            )
                                        )}
                                        <button
                                            disabled={
                                                currentPage === totalPages
                                            }
                                            onClick={() =>
                                                handlePageChange(
                                                    currentPage + 1
                                                )
                                            }
                                            className="px-2 py-1 border rounded-r-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                                        >
                                            {">"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
