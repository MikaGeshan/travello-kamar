import React, { useState, useEffect } from "react";
import bghotel from "../../../../public/storage/bghotel.png";
import bali from "../../../../public/storage/bali.jpg";
import singapore from "../../../../public/storage/singapore.jpg";
import france from "../../../../public/storage/france.jpg";
import rome from "../../../../public/storage/rome.jpg";
import ExploreNow from "../../Layouts/ExploreNow";
import Header from "../../Layouts/Header";
import Footer from "../../Layouts/Footer";

export default function Home({ auth, userName }) {
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const imageScroll = () => {
        if (typeof window !== "undefined") {
            const scrollY = window.scrollY;
            setIsHeaderVisible(scrollY <= lastScrollY);
            setLastScrollY(scrollY);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", imageScroll);
        return () => {
            window.removeEventListener("scroll", imageScroll);
        };
    }, [lastScrollY]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#d0ebff]">
            <Header
                isVisible={isHeaderVisible}
                auth={auth}
                userName={userName}
            />
            <div
                className="relative w-full h-[80vh] md:h-[100vh] flex flex-col items-center justify-center bg-cover bg-center"
                style={{ backgroundImage: `url(${bghotel})` }}
            >
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 md:p-20 bg-black bg-opacity-50">
                    <h1 className="text-white text-3xl md:text-5xl font-bold leading-tight">
                        Booking Hotel & Penginapan Murah
                    </h1>
                    <ExploreNow />
                </div>
            </div>
            <div className="flex flex-col items-center mt-8 mb-8 text-black w-full px-4">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                    Travel the world!
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
                    {[
                        { img: bali, title: "Bali", location: "Indonesia" },
                        {
                            img: singapore,
                            title: "Merlion",
                            location: "Singapore",
                        },
                        { img: france, title: "Paris", location: "France" },
                        { img: rome, title: "Rome", location: "Italy" },
                    ].map((place, index) => (
                        <div
                            key={index}
                            className="rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 bg-white"
                        >
                            <img
                                src={place.img}
                                alt={place.title}
                                className="w-full h-56 sm:h-64 object-cover"
                            />
                            <div className="p-4 text-center">
                                <h3 className="font-bold text-lg md:text-xl">
                                    {place.title}
                                </h3>
                                <p className="text-sm md:text-base text-gray-600">
                                    {place.location}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
}
