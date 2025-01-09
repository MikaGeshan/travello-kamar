import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import { FaSearch } from "react-icons/fa";

function SearchField() {
    const [duration, setDuration] = useState("");

    return (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
            <div className="text-center">
                <label className="text-gray-500 text-xs font-medium uppercase">
                    nama hotel
                </label>
                <div className="mt-2 flex justify-center">
                    <input
                        className="font-semibold text-lg w-full max-w-md border border-gray-300 p-2 rounded-lg outline-none text-center"
                        placeholder="Kota, Hotel, atau Lokasi"
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                    <label className="text-gray-500 text-xs font-medium uppercase">
                        Check In
                    </label>
                    <input
                        type="date"
                        className="border border-gray-300 p-3 rounded-lg w-full mt-2"
                    />
                </div>
                <div>
                    <label className="text-gray-500 text-xs font-medium uppercase">
                        Duration
                    </label>
                    <select
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="border border-gray-300 p-3 rounded-lg w-full mt-2 text-gray-700"
                    >
                        <option value="" disabled>
                            Select Duration
                        </option>
                        <option value="1">1 Night</option>
                        <option value="2">2 Nights</option>
                        <option value="3">3 Nights</option>
                        <option value="4">4 Nights</option>
                        <option value="5">5 Nights</option>
                        <option value="6">6 Nights</option>
                        <option value="7">1 Week</option>
                        <option value="14">2 Weeks</option>
                        <option value="30">1 Month</option>
                    </select>
                </div>
            </div>
            <div className="flex justify-center mt-6">
                <Link
                    href="/home"
                    method="get"
                    className="bg-gradient-to-r from-green-700 to-green-900 text-white font-semibold text-lg px-5 py-3 rounded-lg w-64 flex items-center justify-center space-x-3 hover:from-green-800 hover:to-green-950 transition-all duration-300 group relative overflow-hidden h-14"
                >
                    <span className="flex items-center justify-center absolute left-1/2 transform -translate-x-1/2 group-hover:translate-x-[-70%] transition-all duration-300 w-full">
                        Search Hotel
                    </span>
                    <FaSearch className="transform translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 absolute right-4" />
                </Link>
            </div>
        </div>
    );
}

export default SearchField;
