import React, { useEffect, useState } from "react";
import Header from "../../Layouts/Header";
import bali from "../../../../public/storage/bali.jpg";
import singapore from "../../../../public/storage/singapore.jpg";
import france from "../../../../public/storage/france.jpeg";
import { Link } from "@inertiajs/react";

export default function Home({ userName }) {
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
        <div className="flex flex-col min-h-screen">
            <Header userName={userName} isVisible={isHeaderVisible} />
            <div className="relative w-full bg-green-500 min-h-[80vh] flex flex-col items-center justify-center">
                <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-center py-20">
                    <h1 className="text-white text-4xl font-bold">
                        Booking Hotel & Penginapan Murah{" "}
                    </h1>
                    <Link href="/home" className="text-white mt-4 text-2xl">
                        Explore Now →
                    </Link>
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
                                <input
                                    type="date"
                                    className="border border-gray-300 p-3 rounded-lg w-full mt-2"
                                />
                            </div>
                        </div>
                        <div className="flex justify-center mt-6">
                            <button className="bg-black text-white font-semibold text-lg px-6 py-3 rounded-lg w-35">
                                Search Hotel
                            </button>
                        </div>
                    </div>
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
