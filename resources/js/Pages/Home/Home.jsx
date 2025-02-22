import React, { useState, useEffect } from "react";
import bghotel from "../../../../public/storage/bghotel.jpg";
import bali from "../../../../public/storage/bali.jpg";
import singapore from "../../../../public/storage/singapore.jpg";
import france from "../../../../public/storage/france.jpeg";
import rome from "../../../../public/storage/rome.jpg";
import BookNow from "../../Layouts/BookNow";
import Header from "./../../Layouts/Header";
import Footer from "../../Layouts/Footer";

export default function Home({ auth, userName }) {
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const imageScroll = () => {
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
        window.addEventListener("scroll", imageScroll);
        return () => {
            window.removeEventListener("scroll", imageScroll);
        };
    }, [lastScrollY]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
            <Header
                isVisible={isHeaderVisible}
                auth={auth}
                userName={userName}
            />
            <div
                className="relative w-full min-h-[90vh] md:min-h-[100vh] flex flex-col items-center justify-center"
                style={{
                    backgroundImage: `url(${bghotel})`,
                    backgroundSize: "100% 100%",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-center py-20 bg-black bg-opacity-50">
                    <h1 className="text-white text-4xl font-bold">
                        Booking Hotel & Penginapan Murah
                    </h1>
                    <BookNow />
                </div>
            </div>

            <div className="flex flex-col items-center mt-8 mb-8 text-black">
                <h2 className="text-2xl font-bold mb-4">Travel the world!</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 bg-white">
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
                    <div className="rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 bg-white">
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
                    <div className="rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 bg-white">
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
                    <div className="rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 bg-white">
                        <img
                            src={rome}
                            alt="Rome"
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="font-bold">Rome</h3>
                            <p>Italy</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-screen">
                <Footer />
            </div>
        </div>
    );
}
