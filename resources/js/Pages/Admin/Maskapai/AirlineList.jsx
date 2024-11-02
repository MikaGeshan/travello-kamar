import React, { useEffect, useState } from "react";
import AdminHeader from "./../../../Layouts/AdminHeader";
import AdminSidebar from "./../../../Layouts/AdminSidebar";
import { Link } from "@inertiajs/react";
import axios from "axios";
import Swal from "sweetalert2";

export default function AirlineList({ airlines }) {
    const [images, setImages] = useState({});
    const [airlineList, setAirlineList] = useState(airlines);

    useEffect(() => {
        airlineList.forEach((airline) => {
            axios
                .get(`/storage/${airline.logo}`, { responseType: "blob" })
                .then((response) => {
                    const url = URL.createObjectURL(response.data);
                    setImages((prev) => ({ ...prev, [airline.id]: url }));
                })
                .catch((error) => {
                    console.error("Error fetching image:", error);
                });
        });
    }, [airlineList]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Apakah Anda yakin?",
            text: "Data ini akan dihapus dan tidak dapat dikembalikan!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, hapus!",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`/admin/airlines/${id}`)
                    .then((response) => {
                        if (response.status === 200) {
                            setAirlineList((prev) =>
                                prev.filter((airline) => airline.id !== id)
                            );
                            Swal.fire(
                                "Terhapus!",
                                "Maskapai berhasil dihapus.",
                                "success"
                            );
                        }
                    })
                    .catch((error) => {
                        console.error("Error deleting airline:", error);
                        Swal.fire(
                            "Gagal!",
                            "Terjadi kesalahan saat menghapus maskapai.",
                            "error"
                        );
                    });
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
                                    {airlineList.map((airline) => (
                                        <tr
                                            key={airline.id}
                                            className="border-b"
                                        >
                                            <td className="p-3">
                                                {airline.id}
                                            </td>
                                            <td className="p-3">
                                                {airline.name}
                                            </td>
                                            <td className="p-3">
                                                {airline.code}
                                            </td>
                                            <td className="p-3">
                                                {images[airline.id] ? (
                                                    <img
                                                        src={images[airline.id]}
                                                        alt={`${airline.name} logo`}
                                                        className="w-24 h-24 object-contain"
                                                    />
                                                ) : (
                                                    <span>Loading...</span>
                                                )}
                                            </td>
                                            <td className="p-3">
                                                <Link
                                                    href={`/admin/airlines/${airline.id}/edit`}
                                                    className="text-blue-500 hover:text-blue-700 mr-2 font-bold"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    className="text-red-500 hover:text-red-700 font-bold"
                                                    onClick={() =>
                                                        handleDelete(airline.id)
                                                    }
                                                >
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
