import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import AdminHeader from "./../../../Layouts/AdminHeader";
import AdminSidebar from "./../../../Layouts/AdminSidebar";
import { FaHotel, FaImage } from "react-icons/fa";
import Swal from "sweetalert2";

export default function CreateRoom() {
    const { data, setData, post, processing, errors } = useForm({
        jenis_kamar: "",
        harga: "",
        status: "Available",
        gambar_kamar: null,
    });

    const [imagePreview, setImagePreview] = useState(null);

    const handleChange = (e) => {
        const { id, value, files } = e.target;

        if (id === "gambar_kamar") {
            const file = files[0];
            setData("gambar_kamar", file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            if (file) {``
                reader.readAsDataURL(file);
            }
        } else {
            setData(id, value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("jenis_kamar", data.jenis_kamar);
        formData.append("harga", data.harga);
        formData.append("status", data.status);

        if (data.gambar_kamar) {
            formData.append("gambar_kamar", data.gambar_kamar);
        }

        post("/admin/rooms", {
            data: formData,
            forceFormData: true,
            onSuccess: () => {
                Swal.fire({
                    title: "Success!",
                    text: `Room ${data.jenis_kamar} has been created successfully.`,
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => {
                    setData({
                        jenis_kamar: "",
                        harga: "",
                        status: "Available",
                        gambar_kamar: null,
                    });
                    setImagePreview(null);
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
                <main className="flex-1 p-8 ml-50">
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
                                {errors.gambar_kamar && (
                                    <div className="text-red-500 mb-2">
                                        {errors.gambar_kamar}
                                    </div>
                                )}

                                <div className="flex space-x-4 mb-4">
                                    <div className="w-1/2">
                                        <label
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                            htmlFor="jenis_kamar"
                                        >
                                            Room Type
                                        </label>
                                        <select
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                                    <div className="w-1/2">
                                        <label
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                            htmlFor="harga"
                                        >
                                            Price
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="harga"
                                            type="number"
                                            placeholder="Enter room price"
                                            value={data.harga}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="flex space-x-4 mb-4">
                                    <div className="w-1/2">
                                        <label
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                            htmlFor="gambar_kamar"
                                        >
                                            Room Image
                                        </label>
                                        <div className="flex items-center">
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="gambar_kamar"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleChange}
                                            />
                                            <FaImage className="ml-2 text-gray-500" />
                                        </div>
                                        {imagePreview && (
                                            <div className="mt-2">
                                                <img
                                                    src={imagePreview}
                                                    alt="Room Preview"
                                                    className="w-32 h-32 object-cover rounded"
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div className="w-1/2">
                                        <label
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                            htmlFor="status"
                                        >
                                            Status
                                        </label>
                                        <select
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="status"
                                            value={data.status}
                                            onChange={handleChange}
                                        >
                                            <option value="Available">
                                                Available
                                            </option>
                                            <option value="Booked">
                                                Booked
                                            </option>
                                            <option value="Not Available">
                                                Not Available
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mt-4">
                                    <button
                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
                                        type="submit"
                                        disabled={processing}
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
