import { Link } from "@inertiajs/react";
import React from "react";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";

function HotelCard({ id, name, description, location, rating, image }) {
    return (
        <div className="flex bg-white shadow-md rounded-lg overflow-hidden border border-gray-300">
            <div className="w-1/4">
                <img
                    src={image}
                    alt={name}
                    className="h-full w-full object-cover"
                />
            </div>
            <div className="flex-1 p-4">
                <h2 className="text-xl font-bold text-gray-800">{name}</h2>
                <div className="flex items-center space-x-2 my-1">
                    <FaStar className="text-blue-500" />
                    <span className="text-blue-500 font-semibold">
                        {rating}
                    </span>
                </div>
                <div className="flex items-center space-x-2 my-2">
                    <FaMapMarkerAlt className="text-gray-500" />
                    <span className="text-gray-700">{location}</span>
                </div>
                <div className="flex space-x-2 my-2">
                    <span className="px-2 py-1 bg-gray-200 rounded-md text-gray-600">
                        {description}
                    </span>
                </div>
                <div className="space-x-2 mt-4 mb-4">
                    <Link
                        href={`/pilihkamar/${id}`}
                        method="get"
                        className="bg-orange-500 text-white font-semibold py-3 px-6 text-lg rounded-md hover:bg-orange-400 transition"
                    >
                        Pilih Kamar
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default HotelCard;
