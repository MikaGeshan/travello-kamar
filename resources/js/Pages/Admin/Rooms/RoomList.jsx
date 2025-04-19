import React, { useState } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import AdminHeader from "../../../Layouts/AdminHeader";
import AdminSidebar from "../../../Layouts/AdminSidebar";
import { FaSearch, FaBed } from "react-icons/fa";
import Swal from "sweetalert2";

export default function RoomList() {
    const { rooms = [] } = usePage().props;
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredRooms = rooms.filter((room) =>
        room.jenis_kamar.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalRooms = filteredRooms.length;
    const totalPages = Math.ceil(totalRooms / perPage);
    const start = (currentPage - 1) * perPage;
    const end = Math.min(currentPage * perPage, totalRooms);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handlePerPageChange = (event) => {
        setPerPage(parseInt(event.target.value));
        setCurrentPage(1);
    };

    const handleDeleteRoom = (roomId) => {
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
                router.delete(`/admin/rooms/${roomId}`, {
                    onSuccess: () => {
                        Swal.fire(
                            "Deleted!",
                            "Room has been deleted.",
                            "success"
                        );
                    },
                    onError: () => {
                        Swal.fire(
                            "Error!",
                            "There was a problem deleting the room.",
                            "error"
                        );
                    },
                });
            }
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <AdminHeader />
            <div className="flex flex-1">
                <AdminSidebar />
                <main className="flex-1 p-8">
                    <div className="container mx-auto">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-2">
                                <FaBed className="w-6 h-6 text-gray-700" />
                                <h1 className="text-2xl font-bold text-gray-800">
                                    Room List
                                </h1>
                            </div>
                            <Link
                                href="/admin/rooms/create"
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 shadow"
                            >
                                Add New Room
                            </Link>
                        </div>

                        <div className="bg-white rounded-lg shadow p-4 flex justify-between items-center mb-4">
                            <div className="flex items-center w-full">
                                <input
                                    type="text"
                                    placeholder="Search rooms by type"
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="w-full px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button className="bg-blue-500 text-white px-4 py-2 rounded-r-lg">
                                    <FaSearch />
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6">
                            <table className="w-full border rounded-lg overflow-hidden">
                                <thead>
                                    <tr className="text-left bg-gray-50 border-b">
                                        <th className="p-3">Room Number</th>
                                        <th className="p-3">Room Type</th>
                                        <th className="p-3">Price</th>
                                        <th className="p-3">Facilities</th>
                                        <th className="p-3">Status</th>
                                        <th className="p-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredRooms
                                        .slice(start, end)
                                        .map((room) => (
                                            <tr
                                                key={room.id}
                                                className="border-b hover:bg-gray-50 transition"
                                            >
                                                <td className="p-3">
                                                    {room.nomor_kamar}
                                                </td>
                                                <td className="p-3">
                                                    {room.jenis_kamar}
                                                </td>
                                                <td className="p-3">
                                                    Rp{" "}
                                                    {room.harga.toLocaleString()}
                                                </td>
                                                <td className="p-3">
                                                    <ul className="list-disc list-inside">
                                                        {JSON.parse(
                                                            room.fasilitas
                                                        ).map((item, index) => (
                                                            <li key={index}>
                                                                {item}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </td>

                                                <td className="p-3">
                                                    <span
                                                        className={`px-2 py-1 rounded-full text-sm ${
                                                            room.status ===
                                                            "Available"
                                                                ? "bg-green-100 text-green-800"
                                                                : room.status ===
                                                                  "Booked"
                                                                ? "bg-yellow-100 text-yellow-800"
                                                                : "bg-red-100 text-red-800"
                                                        }`}
                                                    >
                                                        {room.status}
                                                    </span>
                                                </td>
                                                <td className="p-3 flex gap-2 text-sm">
                                                    <Link
                                                        href={`/admin/rooms/${room.id}/edit`}
                                                        className="text-blue-500 hover:underline"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() =>
                                                            handleDeleteRoom(
                                                                room.id
                                                            )
                                                        }
                                                        className="text-red-500 hover:underline"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                            <div className="flex items-center justify-between mt-4">
                                <div className="text-sm text-gray-600">
                                    Showing 1 to {filteredRooms.length} of{" "}
                                    {filteredRooms.length} results
                                </div>
                                <div className="flex items-center gap-2">
                                    <select
                                        value={perPage}
                                        onChange={handlePerPageChange}
                                        className="border p-2 rounded mr-2"
                                    >
                                        <option value="5">5</option>
                                        <option value="10">10</option>
                                        <option value="15">15</option>
                                        <option value="20">20</option>
                                    </select>
                                    <span>per page</span>
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
                                                            ? "bg-blue-500 text-white"
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
