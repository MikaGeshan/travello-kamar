import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { FaUser, FaSignOutAlt } from "react-icons/fa";

export default function AdminHeader() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { auth } = usePage().props;

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <header className="bg-white border-b z-10">
            <div className="container mx-10 px-2">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <h1 className="text-xl font-semibold text-gray-800">
                            {auth.user.name} Dashboard
                        </h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <button
                                onClick={toggleDropdown}
                                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                            >
                                <FaUser className="w-5 h-5" />
                                <span>{auth.user.name}</span>
                            </button>
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-50 bg-white border rounded-md shadow-lg z-20">
                                    <Link
                                        href="/admin/logout"
                                        method="post"
                                        as="button"
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    >
                                        <div className="flex items-center">
                                            <FaSignOutAlt className="mr-2" />
                                            <span>Logout</span>
                                        </div>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
