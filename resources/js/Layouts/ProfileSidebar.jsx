import { Link } from "@inertiajs/react";
import { FiArrowLeft, FiUser, FiLogOut } from "react-icons/fi";
import React from "react";

export default function Sidebar() {
    return (
        <aside className="w-64 bg-white p-6">
            <div className="flex items-center justify-center mb-6">
                <Link href="/" className="text-black mr-4">
                    <FiArrowLeft />
                </Link>
                <h3 className="text-lg font-medium">Profile</h3>
            </div>
            <nav className="space-y-2">
                <Link
                    href="/profile"
                    className="flex items-center py-2 px-3 text-gray-700 hover:bg-gray-200 rounded"
                >
                    <FiUser className="mr-2" />
                    My Profile
                </Link>
                <Link
                    href="/logout"
                    className="flex items-center py-2 px-3 text-gray-700 hover:bg-gray-200 rounded"
                >
                    <FiLogOut className="mr-2" />
                    Log Out
                </Link>
            </nav>
        </aside>
    );
}
