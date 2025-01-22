import React from "react";
import {
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaUser,
    FaSearch,
} from "react-icons/fa";

function SearchBar() {
    return (
        <div className="flex flex-col items-center mt-8">
            <div className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md p-2 space-x-4 w-3/4">
                <div className="flex items-center space-x-2 px-4 border-r border-gray-300 flex-1">
                    <FaMapMarkerAlt className="text-blue-500" />
                    <input
                        type="text"
                        placeholder="Lokasi"
                        className="outline-none text-gray-800 placeholder-gray-400 font-medium w-full"
                    />
                </div>
                <div className="flex items-center space-x-2 px-4 border-r border-gray-300 flex-1">
                    <FaCalendarAlt className="text-blue-500" />
                    <input
                        type="date"
                        placeholder="Tanggal"
                        className="outline-none text-gray-800 placeholder-gray-400 font-medium w-full"
                    />
                </div>

                <div className="flex items-center space-x-2 px-4 border-r border-gray-300 flex-1">
                    <FaUser className="text-blue-500" />
                    <input
                        type="number"
                        placeholder="Orang & Kamar"
                        className="outline-none text-gray-800 placeholder-gray-400 font-medium w-full"
                    />
                </div>
                <button className="flex items-center bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-400 transition">
                    <FaSearch className="mr-2" />
                    <span className="font-medium">Cari Hotel</span>
                </button>
            </div>
        </div>
    );
}

export default SearchBar;
