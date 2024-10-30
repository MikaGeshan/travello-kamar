import React from "react";
import { Link } from "@inertiajs/react";
import { FaUser, FaSignOutAlt } from "react-icons/fa";

export default function AdminHeader() {
    return (
        <header className="bg-white border-b z-10">
            <div className="container mx-10 px-2">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <h1 className="text-xl font-semibold text-gray-800">
                            Admin Dashboard
                        </h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 focus:outline-none">
                                <FaUser className="w-5 h-5" />
                                <span>Admin</span>
                            </button>
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden">
                                <Link
                                    href="/admin/profile"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Profile
                                </Link>
                                <Link
                                    href="/admin/settings"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Settings
                                </Link>
                                <Link
                                    href="/logout"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    <div className="flex items-center">
                                        <FaSignOutAlt className="mr-2" />
                                        <span>Logout</span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
