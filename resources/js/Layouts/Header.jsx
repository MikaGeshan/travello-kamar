import { Link } from "@inertiajs/react";
import React from "react";
import { FaUserCircle } from "react-icons/fa";

const Header = ({ auth, isVisible }) => {
    return (
        <header
            className={`bg-white text-gray-100 py-4 px-8 flex justify-between items-center fixed top-0 left-0 w-full z-10 transition-transform duration-300 ${
                isVisible ? "translate-y-0" : "-translate-y-full"
            }`}
        >
            <h1 className="text-2xl font-bold">
                <a href="/" className="text-gray-900 hover:text-gray-600">
                    Travello
                </a>
            </h1>
            {auth && auth.user ? (
                <>
                    <nav className="text-gray-800 font-semibold text-base flex-1 flex justify-end pr-20 space-x-6">
                        <a href="/" className="hover:text-gray-600">
                            Home
                        </a>
                        <a href="#" className="hover:text-gray-600">
                            Manage Booking
                        </a>
                        <a href="#" className="hover:text-gray-600">
                            Customer Service
                        </a>
                    </nav>
                    <div className="flex items-center space-x-2">
                        <Link
                            href="/profile"
                            className="text-gray-800 hover:text-gray-600 flex items-center space-x-4 border border-gray-300 rounded-full px-3 py-2"
                        >
                            <FaUserCircle size={22} />
                            <span className="font-base text-lg text-gray-900 ml-1">
                                {auth.user.name}
                            </span>
                        </Link>
                    </div>
                </>
            ) : (
                <div className="flex items-center space-x-4">
                    <nav className="text-gray-800 font-semibold text-base flex justify-end space-x-6">
                        <a href="/" className="hover:text-gray-600">
                            Home
                        </a>
                        <a href="#" className="hover:text-gray-600">
                            About
                        </a>
                        <a href="#" className="hover:text-gray-600">
                            Contact
                        </a>
                    </nav>
                    <div className="flex items-center space-x-4">
                        <Link
                            href="/register"
                            className="text-gray-800 hover:text-gray-600"
                        >
                            Register
                        </Link>
                        <Link
                            href="/login"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-300"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
