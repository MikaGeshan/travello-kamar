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
                        fasilitas: "",
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

                                {/* Room Type */}
                                <div className="mb-4">
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="jenis_kamar"
                                    >
                                        Room Type
                                    </label>
                                    <select
                                        className="shadow border rounded w-full py-2 px-3 text-gray-700"
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

                                {/* Price */}
                                <div className="mb-4">
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="harga"
                                    >
                                        Price
                                    </label>
                                    <input
                                        className="shadow border rounded w-full py-2 px-3 text-gray-700"
                                        id="harga"
                                        type="number"
                                        placeholder="Enter room price"
                                        value={data.harga}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Facilities */}
                                <div className="mb-4">
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="fasilitas"
                                    >
                                        Facilities (separate by comma)
                                    </label>
                                    <textarea
                                        className="shadow border rounded w-full py-2 px-3 text-gray-700"
                                        id="fasilitas"
                                        placeholder="Enter facilities, separated by commas (e.g., WiFi, AC, TV)"
                                        value={data.fasilitas.join(", ")}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Status */}
                                <div className="mb-4">
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="status"
                                    >
                                        Status
                                    </label>
                                    <select
                                        className="shadow border rounded w-full py-2 px-3 text-gray-700"
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

                                {/* Submit Button */}
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                                    type="submit"
                                    disabled={processing}
                                >
                                    {processing ? "Creating..." : "Create Room"}
                                </button>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
