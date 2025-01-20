import React, { useState } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import AdminHeader from "./../../../Layouts/AdminHeader";
import AdminSidebar from "./../../../Layouts/AdminSidebar";
import { FaSearch, FaTrash, FaBed } from "react-icons/fa";
import Swal from "sweetalert2";

export default function RoomList() {
    const { rooms = [] } = usePage().props;

    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedRooms, setSelectedRooms] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSelectRoom = (roomId) => {
        setSelectedRooms((prev) =>
            prev.includes(roomId)
                ? prev.filter((id) => id !== roomId)
                : [...prev, roomId]
        );
    };

    const handleSelectAll = () => {
        if (selectedRooms.length === rooms.length) {
            setSelectedRooms([]);
        } else {
            setSelectedRooms(rooms.map((room) => room.id));
        }
    };

    const filteredRooms = rooms.filter((room) =>
        room.jenis_kamar.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalRooms = filteredRooms.length;
    const totalPages = Math.ceil(totalRooms / perPage);
    const start = (currentPage - 1) * perPage;
    const end = Math.min(currentPage * perPage, totalRooms);

    const handlePageChange = (newPage) => setCurrentPage(newPage);

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
                        // Optionally, you can refresh the page or update the state to reflect the deletion
                        window.location.reload();
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

    const handleDeleteSelectedRooms = () => {
        if (selectedRooms.length === 0) return;

        Swal.fire({
            title: "Delete Selected Rooms?",
            text: `You are about to delete ${selectedRooms.length} room(s)`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete them!",
        }).then((result) => {
            if (result.isConfirmed) {
                // Call your delete API here
                setSelectedRooms([]);
                Swal.fire(
                    "Deleted!",
                    `${selectedRooms.length} room(s) have been deleted.`,
                    "success"
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
                                <FaBed className="mr-3" /> Room List
                            </h1>
                            <Link
                                href={"/admin/rooms/create"}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            >
                                Add New Room
                            </Link>
                        </div>
                        <div className="bg-white shadow-md rounded-lg overflow-hidden">
                            <div className="p-4 border-b">
                                <div className="flex items-center">
                                    <input
                                        type="text"
                                        placeholder="Search rooms by type"
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                        className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button className="bg-green-500 text-white px-4 py-3 rounded-r-md">
                                        <FaSearch />
                                    </button>
                                </div>
                            </div>
                            <div className="p-4 bg-gray-50 border-b">
                                {selectedRooms.length > 0 && (
                                    <div className="flex items-center animate-fade-in">
                                        <button
                                            onClick={handleDeleteSelectedRooms}
                                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center transition-all duration-200"
                                        >
                                            <FaTrash className="mr-2" />
                                            Delete Selected (
                                            {selectedRooms.length})
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
                                                    selectedRooms.length ===
                                                    filteredRooms.length
                                                }
                                                onChange={handleSelectAll}
                                            />
                                        </th>
                                        <th className="p-3">ID</th>
                                        <th className="p-3">Room Type</th>
                                        <th className="p-3">Price</th>
                                        <th className="p-3">Status</th>
                                        <th className="p-3">Image</th>
                                        <th className="p-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredRooms
                                        .slice(start, end)
                                        .map((room) => (
                                            <tr
                                                key={room.id}
                                                className="border-b"
                                            >
                                                <td className="p-3">
                                                    <input
                                                        type="checkbox"
                                                        className="w-4 h-4 rounded border-gray-300 cursor-pointer"
                                                        checked={selectedRooms.includes(
                                                            room.id
                                                        )}
                                                        onChange={() =>
                                                            handleSelectRoom(
                                                                room.id
                                                            )
                                                        }
                                                    />
                                                </td>
                                                <td className="p-3">
                                                    {room.id}
                                                </td>
                                                <td className="p-3">
                                                    {room.jenis_kamar}
                                                </td>
                                                <td className="p-3">
                                                    Rp {room.harga}
                                                </td>
                                                <td className="p-3">
                                                    {room.status}
                                                </td>
                                                <td className="p-3">
                                                    <img
                                                        src={room.gambar_kamar}
                                                        alt={room.jenis_kamar}
                                                        className="w-20 h-20 object-cover rounded-md"
                                                    />
                                                </td>
                                                <td className="p-3 space-x-2">
                                                    <div className="flex items-center space-x-2">
                                                        <Link
                                                            href={`/admin/rooms/${room.id}/edit`}
                                                            className="text-blue-500 hover:text-blue-700 font-bold"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <button
                                                            onClick={() =>
                                                                handleDeleteRoom(
                                                                    room.id
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
                                    Showing {start + 1} to {end} of {totalRooms}{" "}
                                    results
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
