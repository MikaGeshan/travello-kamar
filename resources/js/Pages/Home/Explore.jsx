import React, { useEffect, useState } from "react";
import Header from "../../Layouts/Header";
import Standard from "../../../../public/storage/standard.jpg";

export default function Explore({ userName, auth, rooms }) {
    console.log(rooms);
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
            <Header
                userName={userName}
                isVisible={isHeaderVisible}
                auth={auth}
            />
            <div className="pt-20">
                <div className="top-16 z-10 ">
                    <div className="bg-white shadow-lg rounded-lg p-4 w-full max-w-xs">
                        <img
                            src={Standard}
                            alt="Standard Room"
                            className="w-full h-48 object-cover rounded-md"
                        />
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold">
                                Standard Room
                            </h3>
                            <div className="text-gray-500 text-sm mt-2">
                                <p>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Voluptate, quas.
                                </p>
                            </div>
                            <div className="flex justify-between items-center mt-4">
                                <span className="text-lg font-bold">
                                    Starting from Rp 800.000 /night
                                </span>
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                                    Book now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="top-16 z-10 ">
                    <div className="bg-white shadow-lg rounded-lg p-4 w-full max-w-xs">
                        <img
                            src={Standard}
                            alt="Standard Room"
                            className="w-full h-48 object-cover rounded-md"
                        />
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold">
                                Standard Room
                            </h3>
                            <div className="text-gray-500 text-sm mt-2">
                                <p>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Voluptate, quas.
                                </p>
                            </div>
                            <div className="flex justify-between items-center mt-4">
                                <span className="text-lg font-bold">
                                    Starting from Rp 800.000 /night
                                </span>
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                                    Book now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="top-16 z-10 ">
                    <div className="bg-white shadow-lg rounded-lg p-4 w-full max-w-xs">
                        <img
                            src={Standard}
                            alt="Standard Room"
                            className="w-full h-48 object-cover rounded-md"
                        />
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold">
                                Standard Room
                            </h3>
                            <div className="text-gray-500 text-sm mt-2">
                                <p>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Voluptate, quas.
                                </p>
                            </div>
                            <div className="flex justify-between items-center mt-4">
                                <span className="text-lg font-bold">
                                    Starting from Rp 800.000 /night
                                </span>
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                                    Book now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-4 mb-4 space-y-4 max-w-4xl mx-auto"></div>
            </div>
        </div>
    );
}
