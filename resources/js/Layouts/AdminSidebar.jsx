import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    FaHome,
    FaUsers,
    FaCog,
    FaAngleDown,
    FaUserTag,
    FaHotel,
} from "react-icons/fa";

export default function AdminSidebar() {
    const [isUsersOpen, setIsUsersOpen] = useState(false);
    const [isRolesOpen, setIsRolesOpen] = useState(false);
    const [isHotelRoomsOpen, setIsHotelRoomsOpen] = useState(false);

    const { auth } = usePage().props;

    const toggleUsersMenu = () => {
        setIsUsersOpen(!isUsersOpen);
    };

    const toggleRolesMenu = () => {
        setIsRolesOpen(!isRolesOpen);
    };

    const toggleHotelRoomsMenu = () => {
        setIsHotelRoomsOpen(!isHotelRoomsOpen);
    };

    const isAdmin = () => {
        return auth.user && auth.user.role === "Admin";
    };

    return (
        <div className="bg-white text-gray-700 h-screen w-64 flex flex-shrink-0 shadow-lg z-5">
            <nav className="flex-grow h-full overflow-y-auto">
                <ul className="space-y-2 p-4">
                    <li>
                        <Link
                            href="/admin/dashboard"
                            className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                        >
                            <span className="text-xl text-gray-600">
                                <FaHome />
                            </span>
                            <span className="font-medium">Dashboard</span>
                        </Link>
                    </li>
                    {isAdmin() && (
                        <>
                            <li>
                                <div
                                    className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg transition-colors duration-200 cursor-pointer"
                                    onClick={toggleUsersMenu}
                                >
                                    <span className="text-xl text-gray-600">
                                        <FaUsers />
                                    </span>
                                    <span className="font-medium">
                                        Manage Users
                                    </span>
                                    <span
                                        className={`text-xl text-gray-600 ml-auto transition-transform duration-300 ${
                                            isUsersOpen ? "rotate-180" : ""
                                        }`}
                                    >
                                        <FaAngleDown />
                                    </span>
                                </div>
                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                        isUsersOpen ? "max-h-96" : "max-h-0"
                                    }`}
                                >
                                    <ul className="pl-4 space-y-2 py-2">
                                        <li>
                                            <Link
                                                href="/admin/users/list"
                                                className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                                            >
                                                <span className="font-medium">
                                                    User List
                                                </span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/admin/customers/list"
                                                className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                                            >
                                                <span className="font-medium">
                                                    Customer List
                                                </span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li>
                                <div
                                    className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg transition-colors duration-200 cursor-pointer"
                                    onClick={toggleRolesMenu}
                                >
                                    <span className="text-xl text-gray-600">
                                        <FaUserTag />
                                    </span>
                                    <span className="font-medium">
                                        Manage Roles
                                    </span>
                                    <span
                                        className={`text-xl text-gray-600 ml-auto transition-transform duration-300 ${
                                            isRolesOpen ? "rotate-180" : ""
                                        }`}
                                    >
                                        <FaAngleDown />
                                    </span>
                                </div>
                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                        isRolesOpen ? "max-h-96" : "max-h-0"
                                    }`}
                                >
                                    <ul className="pl-4 space-y-2 py-2">
                                        <li>
                                            <Link
                                                href="/admin/roles/list"
                                                className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                                            >
                                                <span className="font-medium">
                                                    Role List
                                                </span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li>
                                <div
                                    className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg transition-colors duration-200 cursor-pointer"
                                    onClick={toggleHotelRoomsMenu}
                                >
                                    <span className="text-xl text-gray-600">
                                        <FaHotel />
                                    </span>
                                    <span className="font-medium">
                                        Manage Hotels and Rooms
                                    </span>
                                    <span
                                        className={`text-xl text-gray-600 ml-auto transition-transform duration-300 ${
                                            isHotelRoomsOpen ? "rotate-180" : ""
                                        }`}
                                    >
                                        <FaAngleDown />
                                    </span>
                                </div>
                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                        isHotelRoomsOpen
                                            ? "max-h-96"
                                            : "max-h-0"
                                    }`}
                                >
                                    <ul className="pl-4 space-y-2 py-2">
                                        <li>
                                            <Link
                                                href="/admin/hotels/list"
                                                className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                                            >
                                                <span className="font-medium">
                                                    Hotels
                                                </span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/admin/room/list"
                                                className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                                            >
                                                <span className="font-medium">
                                                    Rooms
                                                </span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </>
                    )}
                    <li>
                        <Link
                            href="/admin/settings"
                            className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                        >
                            <span className="text-xl text-gray-600">
                                <FaCog />
                            </span>
                            <span className="font-medium">Settings</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
