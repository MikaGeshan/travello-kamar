import React, { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import AdminHeader from "./../../../Layouts/AdminHeader";
import AdminSidebar from "./../../../Layouts/AdminSidebar";
import { FaHotel } from "react-icons/fa";
import Swal from "sweetalert2";

export default function UpdateRoom({ room }) {
    const { data, setData, put, errors } = useForm({
        jenis_kamar: room.jenis_kamar || "",
        harga: room.harga || "",
        fasilitas: room.fasilitas || "",
        status: room.status || "Available",
    });

    useEffect(() => {
        setData({
            jenis_kamar: room.jenis_kamar || "",
            harga: room.harga || "",
            fasilitas: room.fasilitas || "",
            status: room.status || "Available",
        });
    }, [room]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setData(id, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/admin/rooms/${room.id}`, {
            onSuccess: () => {
                Swal.fire(
                    "Success!",
                    "Room data has been updated successfully.",
                    "success"
                ).then(() => {
                    window.location.href = "/admin/rooms/list";
                });
            },
            onError: () => {
                Swal.fire(
                    "Error!",
                    "An error occurred while updating the room data.",
                    "error"
                );
            },
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
                            <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                                <FaHotel className="mr-3" /> Update Room
                            </h1>
                        </div>
                        <div className="bg-white shadow-md rounded-lg p-8">
                            <form onSubmit={handleSubmit}>
                                {errors.jenis_kamar && (
                                    <div className="text-red-500 mb-2">
                                        {errors.jenis_kamar}
                                    </div>
                                )}
                                {errors.harga && (
                                    <div className="text-red-500 mb-2">
                                        {errors.harga}
                                    </div>
                                )}
                                {errors.fasilitas && (
                                    <div className="text-red-500 mb-2">
                                        {errors.fasilitas}
                                    </div>
                                )}

                                {/* ROOM TYPE */}
                                <div className="mb-4">
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="jenis_kamar"
                                    >
                                        Room Type
                                    </label>
                                    <select
                                        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="jenis_kamar"
                                        value={data.jenis_kamar}
                                        onChange={handleChange}
                                    >
                                        <option value="">
                                            Select Room Type
                                        </option>
                                        <option value="Standard Room">
                                            Standard Room
                                        </option>
                                        <option value="Deluxe Room">
                                            Deluxe Room
                                        </option>
                                        <option value="Suite Room">
                                            Suite Room
                                        </option>
                                    </select>
                                </div>

                                {/* PRICE */}
                                <div className="mb-4">
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="harga"
                                    >
                                        Price
                                    </label>
                                    <input
                                        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="harga"
                                        type="number"
                                        placeholder="Enter room price"
                                        value={data.harga}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* FACILITIES */}
                                <div className="mb-4">
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="fasilitas"
                                    >
                                        Facilities
                                    </label>
                                    <textarea
                                        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-28 resize-none"
                                        id="fasilitas"
                                        placeholder="Enter room facilities"
                                        value={data.fasilitas}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>

                                {/* STATUS */}
                                <div className="mb-4">
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="status"
                                    >
                                        Status
                                    </label>
                                    <select
                                        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="status"
                                        value={data.status}
                                        onChange={handleChange}
                                    >
                                        <option value="Available">
                                            Available
                                        </option>
                                        <option value="Booked">Booked</option>
                                        <option value="Not Available">
                                            Not Available
                                        </option>
                                    </select>
                                </div>

                                {/* SUBMIT BUTTON */}
                                <div className="flex items-center justify-between mt-4">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
                                        type="submit"
                                    >
                                        Update Room
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
