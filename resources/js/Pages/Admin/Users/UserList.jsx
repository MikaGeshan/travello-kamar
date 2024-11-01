import React, { useState } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import AdminHeader from "./../../../Layouts/AdminHeader";
import AdminSidebar from "./../../../Layouts/AdminSidebar";
import { FaSearch, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

export default function UserList() {
    const { users, auth } = usePage().props;
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedUsers, setSelectedUsers] = useState([]);

    const isAdmin = () => {
        return auth.user && auth.user.role === "Admin";
    };
    const handleDelete = (userId) => {
        Swal.fire({
            title: "Apakah anda yakin?",
            text: "Data tidak dapat dikembalikan setelah dihapus!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, hapus!",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/admin/users/${userId}`, {
                    onSuccess: () => {
                        Swal.fire(
                            "Terhapus!",
                            "User berhasil dihapus.",
                            "success"
                        );
                    },
                });
            }
        });
    };

    const handleDeleteSelected = () => {
        if (selectedUsers.length === 0) {
            Swal.fire(
                "Error",
                "Pilih setidaknya satu user untuk dihapus",
                "error"
            );
            return;
        }

        Swal.fire({
            title: "Apakah anda yakin?",
            text: `Anda akan menghapus ${selectedUsers.length} user yang dipilih!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, hapus!",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/admin/users`, {
                    data: { ids: selectedUsers },
                    onSuccess: () => {
                        Swal.fire(
                            "Terhapus!",
                            `${selectedUsers.length} user berhasil dihapus.`,
                            "success"
                        );
                        setSelectedUsers([]);
                    },
                });
            }
        });
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const currentPageUseIds = users
                .slice(start - 1, end)
                .map((user) => user.id);
            setSelectedUsers(currentPageUseIds);
        } else {
            setSelectedUsers([]);
        }
    };

    const handleSelectOne = (userId) => {
        setSelectedUsers((prev) => {
            if (prev.includes(userId)) {
                return prev.filter((id) => id !== userId);
            } else {
                return [...prev, userId];
            }
        });
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handlePerPageChange = (event) => {
        setPerPage(parseInt(event.target.value));
        setCurrentPage(1);
    };

    const totalUsers = users.length;
    const totalPages = Math.ceil(totalUsers / perPage);
    const start = (currentPage - 1) * perPage + 1;
    const end = Math.min(currentPage * perPage, totalUsers);

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
                                    User List
                                </h1>
                                <Link
                                    href="/admin/users/create"
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md text-base"
                                >
                                    Add New User
                                </Link>
                            </div>
                            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                                <div className="p-4 border-b">
                                    <div className="flex items-center">
                                        <input
                                            type="text"
                                            placeholder="Search users"
                                            className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <button className="bg-blue-500 text-white px-4 py-3 rounded-r-md">
                                            <FaSearch />
                                        </button>
                                    </div>
                                </div>
                                <div className="p-4 bg-gray-50 border-b">
                                    {selectedUsers.length > 0 && (
                                        <div className="flex items-center animate-fade-in">
                                            <button
                                                onClick={handleDeleteSelected}
                                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center transition-all duration-200"
                                            >
                                                <FaTrash className="mr-2" />
                                                Delete Selected (
                                                {selectedUsers.length})
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
                                                    onChange={handleSelectAll}
                                                    checked={
                                                        selectedUsers.length ===
                                                            users.slice(
                                                                start - 1,
                                                                end
                                                            ).length &&
                                                        users.slice(
                                                            start - 1,
                                                            end
                                                        ).length > 0
                                                    }
                                                    className="w-4 h-4 rounded border-gray-300 cursor-pointer"
                                                />
                                            </th>
                                            <th className="p-3">ID</th>
                                            <th className="p-3">Name</th>
                                            <th className="p-3">Email</th>
                                            <th className="p-3">Role</th>
                                            <th className="p-3">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users
                                            .slice(start - 1, end)
                                            .map((user) => (
                                                <tr
                                                    key={user.id}
                                                    className="border-b"
                                                >
                                                    <td className="p-3">
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedUsers.includes(
                                                                user.id
                                                            )}
                                                            onChange={() =>
                                                                handleSelectOne(
                                                                    user.id
                                                                )
                                                            }
                                                            className="w-4 h-4 rounded border-gray-300 cursor-pointer"
                                                        />
                                                    </td>
                                                    <td className="p-3">
                                                        {user.id}
                                                    </td>
                                                    <td className="p-3">
                                                        {user.name}
                                                    </td>
                                                    <td className="p-3">
                                                        {user.email}
                                                    </td>
                                                    <td className="p-3">
                                                        {user.role
                                                            ? user.role
                                                            : "No Role"}{" "}
                                                    </td>
                                                    <td className="p-3">
                                                        <Link
                                                            href={`/admin/users/${user.id}/edit`}
                                                            className="text-blue-500 hover:text-blue-700 mr-2 font-bold"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <button
                                                            className="text-red-500 hover:text-red-700 font-bold"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    user.id
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                                <div className="flex items-center justify-between p-4">
                                    <span>
                                        Showing {start} to {end} of {totalUsers}{" "}
                                        results
                                    </span>

                                    <div className="flex items-center">
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
                                    </div>
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
                    </main>
                </div>
            </div>
        )
    );
}
