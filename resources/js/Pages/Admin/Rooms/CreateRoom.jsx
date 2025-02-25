import React from "react";
import { useForm } from "@inertiajs/react";
import AdminHeader from "./../../../Layouts/AdminHeader";
import AdminSidebar from "./../../../Layouts/AdminSidebar";
import { FaHotel } from "react-icons/fa";
import Swal from "sweetalert2";

export default function CreateRoom() {
    const { data, setData, post, processing, errors } = useForm({
        jenis_kamar: "",
        harga: "",
        fasilitas: [],
        status: "Available",
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        if (id === "fasilitas") {
            setData(
                id,
                value ? value.split(",").map((item) => item.trim()) : []
            );
        } else {
            setData(id, value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/admin/rooms", {
            data,
            onSuccess: () => {
                Swal.fire({
                    title: "Success!",
                    text: `Room has been created successfully.`,
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => {
                    setData({
                        jenis_kamar: "",
                        harga: "",
                        fasilitas: [],
                        status: "Available",
                    });
                });
            },
            onError: (errors) => {
                Swal.fire({
                    title: "Error!",
                    text: "Failed to create room. Please check your input.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
                console.error("Error creating room:", errors);
            },
            preserveState: true,
            preserveScroll: true,
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
                                <FaHotel className="mr-3" /> Create Room
                            </h1>
                        </div>
                        <div className="bg-white shadow-md rounded-lg p-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Room Type */}
                                <div>
                                    <label
                                        className="block text-gray-700 font-bold mb-2"
                                        htmlFor="jenis_kamar"
                                    >
                                        Room Type
                                    </label>
                                    <select
                                        id="jenis_kamar"
                                        value={data.jenis_kamar}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-4 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
                                    {errors.jenis_kamar && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.jenis_kamar}
                                        </p>
                                    )}
                                </div>

                                {/* Price */}
                                <div>
                                    <label
                                        className="block text-gray-700 font-bold mb-2"
                                        htmlFor="harga"
                                    >
                                        Price
                                    </label>
                                    <input
                                        id="harga"
                                        type="number"
                                        placeholder="Enter room price"
                                        value={data.harga}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-4 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    {errors.harga && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.harga}
                                        </p>
                                    )}
                                </div>

                                {/* Facilities */}
                                <div>
                                    <label
                                        className="block text-gray-700 font-bold mb-2"
                                        htmlFor="fasilitas"
                                    >
                                        Facilities (separate by comma)
                                    </label>
                                    <textarea
                                        id="fasilitas"
                                        placeholder="Enter facilities, separated by commas (e.g., WiFi, AC, TV)"
                                        value={data.fasilitas.join(", ")}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-4 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 h-24"
                                    />
                                    {errors.fasilitas && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.fasilitas}
                                        </p>
                                    )}
                                </div>

                                {/* Status */}
                                <div>
                                    <label
                                        className="block text-gray-700 font-bold mb-2"
                                        htmlFor="status"
                                    >
                                        Status
                                    </label>
                                    <select
                                        id="status"
                                        value={data.status}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-4 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="Available">
                                            Available
                                        </option>
                                        <option value="Booked">Booked</option>
                                        <option value="Not Available">
                                            Not Available
                                        </option>
                                    </select>
                                    {errors.status && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.status}
                                        </p>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition"
                                    >
                                        {processing
                                            ? "Creating..."
                                            : "Create Room"}
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
