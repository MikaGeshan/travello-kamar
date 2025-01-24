import React, { useState, useEffect } from "react";
import bali from "../../../public/storage/bali.jpg";
import singapore from "../../../public/storage/singapore.jpg";
import france from "../../../public/storage/france.jpeg";
import gojek from "../../../public/storage/logo-gojek.png";
import tokopedia from "../../../public/storage/logo-tokopedia.png";
import mastercard from "../../../public/storage/mastercard.png";
import bca from "../../../public/storage/bca.jpg";
import telkomsel from "../../../public/storage/telkomsel.png";
import bri from "../../../public/storage/Bank BRI Logo.png";
import mandiri from "../../../public/storage/mandiri.png";
import SearchField from "../Layouts/SearchField";
import Header from "./../Layouts/Header";
import Footer from "../Layouts/Footer";

export default function Welcome({ auth }) {
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
        <div className="flex flex-col items-center justify-center min-h-screen">
            <Header isVisible={isHeaderVisible} auth={auth.customer} />
            <div className="relative w-full bg-gradient-to-r from-blue-500 to-blue-300 min-h-[80vh] flex flex-col items-center justify-center">
                <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-center py-20">
                    <h1 className="text-white text-4xl font-bold">
                        Booking Hotel & Penginapan Murah{" "}
                    </h1>
                    <SearchField />
                </div>
            </div>
            <div className="flex flex-col items-center mt-8 mb-8">
                <h2 className="text-2xl font-bold mb-4">Travel the world!</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <div className="flex flex-col items-center">
                <h2 className="text-2xl font-bold mb-4">Our Partners</h2>
                <div className="relative w-full overflow-hidden">
                    <div className="flex animate-marquee space-x-10">
                        <img
                            src={gojek}
                            alt="Gojek"
                            className="w-40 h-20 object-contain"
                        />
                        <img
                            src={tokopedia}
                            alt="Tokopedia"
                            className="w-40 h-20 object-contain"
                        />
                        <img
                            src={mastercard}
                            alt="Mastercard"
                            className="w-40 h-20 object-contain"
                        />
                        <img
                            src={bca}
                            alt="BCA"
                            className="w-40 h-20 object-contain"
                        />
                        <img
                            src={bri}
                            alt="BRI"
                            className="w-40 h-20 object-contain"
                        />
                        <img
                            src={mandiri}
                            alt="Mandiri"
                            className="w-40 h-20 object-contain"
                        />
                        <img
                            src={telkomsel}
                            alt="Telkomsel"
                            className="w-40 h-20 object-contain"
                        />
                    </div>
                </div>
            </div>
            <div className="w-screen">
                <Footer />
            </div>
        </div>
    );
}
