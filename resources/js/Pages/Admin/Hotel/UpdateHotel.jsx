import React, { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import AdminHeader from "./../../../Layouts/AdminHeader";
import AdminSidebar from "./../../../Layouts/AdminSidebar";
import { FaHotel, FaImage } from "react-icons/fa";

export default function UpdateHotel({ hotel }) {
    const [imagePreview, setImagePreview] = useState(
        hotel.gambar_hotel
            ? `${window.location.origin}/${hotel.gambar_hotel}`
            : null
    );

    const { data, setData, errors } = useForm({
        nama_hotel: hotel.nama_hotel || "",
        lokasi_hotel: hotel.lokasi_hotel || "",
        gambar_hotel: null,
        deskripsi_hotel: hotel.deskripsi_hotel || "",
        rating_hotel: hotel.rating_hotel || "",
    });

    useEffect(() => {
        setData({
            nama_hotel: hotel.nama_hotel,
            lokasi_hotel: hotel.lokasi_hotel,
            gambar_hotel: null,
            deskripsi_hotel: hotel.deskripsi_hotel,
            rating_hotel: hotel.rating_hotel,
        });
    }, [hotel]);

    const handleChange = (e) => {
        const { id, value, files } = e.target;

        if (id === "gambar_hotel") {
            const file = files[0];
            setData("gambar_hotel", file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            if (file) {
                reader.readAsDataURL(file);
            }
        } else {
            setData(id, value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Hotel data to be updated:", data);
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
                                <FaHotel className="mr-3" /> Edit Hotel
                            </h1>
                        </div>
                        <div className="bg-white shadow-md rounded-lg p-8">
                            <form onSubmit={handleSubmit}>
                                {Object.keys(errors).map((key) => (
                                    <div
                                        key={key}
                                        className="text-red-500 mb-2"
                                    >
                                        {errors[key]}
                                    </div>
                                ))}

                                <div className="flex space-x-4 mb-4">
                                    <div className="w-1/2">
                                        <label
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                            htmlFor="nama_hotel"
                                        >
                                            Hotel Name
                                        </label>
                                        <input
                                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                                                errors.nama_hotel
                                                    ? "border-red-500"
                                                    : ""
                                            }`}
                                            id="nama_hotel"
                                            type="text"
                                            placeholder="Enter hotel name"
                                            value={data.nama_hotel}
                                            onChange={handleChange}
                                        />
                                        {errors.nama_hotel && (
                                            <div className="text-red-500 text-xs mt-1">
                                                {errors.nama_hotel}
                                            </div>
                                        )}
                                    </div>
                                    <div className="w-1/2">
                                        <label
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                            htmlFor="lokasi_hotel"
                                        >
                                            Location
                                        </label>
                                        <input
                                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                                                errors.lokasi_hotel
                                                    ? "border-red-500"
                                                    : ""
                                            }`}
                                            id="lokasi_hotel"
                                            type="text"
                                            placeholder="Enter hotel location"
                                            value={data.lokasi_hotel}
                                            onChange={handleChange}
                                        />
                                        {errors.lokasi_hotel && (
                                            <div className="text-red-500 text-xs mt-1">
                                                {errors.lokasi_hotel}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex space-x-4 mb-4">
                                    <div className="w-1/2">
                                        <label
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                            htmlFor="gambar_hotel"
                                        >
                                            Hotel Image
                                        </label>
                                        <div className="flex items-center">
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="gambar_hotel"
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
                                                    alt="Hotel Preview"
                                                    className="w-32 h-32 object-cover rounded"
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div className="w-1/2">
                                        <label
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                            htmlFor="rating_hotel"
                                        >
                                            Rating
                                        </label>
                                        <select
                                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                                                errors.rating_hotel
                                                    ? "border-red-500"
                                                    : ""
                                            }`}
                                            id="rating_hotel"
                                            value={data.rating_hotel}
                                            onChange={handleChange}
                                        >
                                            <option value="">
                                                Select Rating
                                            </option>
                                            <option value="1">1 Star</option>
                                            <option value="2">2 Stars</option>
                                            <option value="3">3 Stars</option>
                                            <option value="4">4 Stars</option>
                                            <option value="5">5 Stars</option>
                                        </select>
                                        {errors.rating_hotel && (
                                            <div className="text-red-500 text-xs mt-1">
                                                {errors.rating_hotel}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="deskripsi_hotel"
                                    >
                                        Description
                                    </label>
                                    <textarea
                                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                                            errors.deskripsi_hotel
                                                ? "border-red-500"
                                                : ""
                                        }`}
                                        id="deskripsi_hotel"
                                        placeholder="Enter hotel description"
                                        rows="4"
                                        value={data.deskripsi_hotel}
                                        onChange={handleChange}
                                    ></textarea>
                                    {errors.deskripsi_hotel && (
                                        <div className="text-red-500 text-xs mt-1">
                                            {errors.deskripsi_hotel}
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center justify-between mt-4">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-md focus:outline-none focus:shadow-outline"
                                        type="submit"
                                    >
                                        Log Hotel Data
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
