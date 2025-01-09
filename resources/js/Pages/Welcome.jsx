import React, { useState, useEffect } from "react";
import bali from "../../../public/storage/bali.jpg";
import singapore from "../../../public/storage/singapore.jpg";
import france from "../../../public/storage/france.jpeg";
import SearchField from "../Layouts/SearchField";
import Header from "./../Layouts/Header";

export default function Welcome({ auth }) {
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const handleScroll = () => {
        if (typeof window !== "undefined") {
            const scrollY = window.scrollY;
            if (scrollY > lastScrollY) {
                setIsHeaderVisible(false);
            } else {
                setIsHeaderVisible(true);
            }
            setLastScrollY(scrollY);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollY]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            {/* <header
                className={`bg-white text-gray-100 py-4 px-8 flex justify-between items-center fixed top-0 left-0 w-full z-10 transition-transform duration-300 ${
                    isHeaderVisible ? "translate-y-0" : "-translate-y-full"
                }`}
            >
                <h1 className="text-2xl font-bold">
                    <a href="/" className="text-gray-900 hover:text-gray-600">
                        Travello
                    </a>
                </h1>
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
                <div className="flex items-center space-x-4">
                    <Link
                        href="/register"
                        className="text-gray-800 hover:text-gray-600"
                    >
                        Register
                    </Link>
                    <Link
                        href="/login"
                        className="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-900"
                    >
                        Sign In
                    </Link>
                </div>
            </header> */}
            <Header isVisible={isHeaderVisible} auth={auth} />
            <div className="relative w-full  bg-gradient-to-r from-green-600 to-green-800  min-h-[80vh] flex flex-col items-center justify-center">
                <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-center py-20">
                    <h1 className="text-white text-4xl font-bold">
                        Booking Hotel & Penginapan Murah{" "}
                    </h1>
                    <SearchField />
                </div>
            </div>
            <div className="flex flex-col items-center mt-8 mb-8">
                <h2 className="text-2xl font-bold mb-4">Travel the world!</h2>
                <div className="grid grid-cols- 1 md:grid-cols-3 gap-4">
                    <div className="rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105">
                        <img
                            src={bali}
                            alt="Bali"
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="font-bold">Bali</h3>
                            <p>Indonesia</p>
                        </div>
                    </div>
                    <div className="rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105">
                        <img
                            src={singapore}
                            alt="Merlion"
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="font-bold">Merlion</h3>
                            <p>Singapore</p>
                        </div>
                    </div>
                    <div className="rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105">
                        <img
                            src={france}
                            alt="Paris"
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="font-bold">Paris</h3>
                            <p>France</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
