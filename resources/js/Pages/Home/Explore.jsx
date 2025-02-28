import React, { useEffect, useState } from "react";
import Header from "../../Layouts/Header";
import Footer from "../../Layouts/Footer";
import Standard from "../../../../public/storage/standard.jpg";
import Deluxe from "../../../../public/storage/deluxe.jpg";
import Suite from "../../../../public/storage/suite.jpg";
import { Link } from "@inertiajs/react";

export default function Explore({ userName, auth }) {
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);

    const rooms = [
        {
            id: 1,
            title: "Standard Room",
            description: `Kamar Standard menawarkan suasana yang nyaman dengan desain minimalis yang modern.
            Cocok untuk solo traveler atau pasangan yang mencari penginapan dengan harga terjangkau namun tetap nyaman.
            Kamar ini dilengkapi dengan tempat tidur empuk berkualitas tinggi, meja kerja, TV kabel, dan kamar mandi
            dengan shower air panas. Selain itu, tersedia akses WiFi gratis, layanan kebersihan harian, serta air minum
            kemasan gratis. Lokasi kamar ini sangat strategis dan memberikan kenyamanan bagi tamu yang ingin menikmati
            perjalanan dengan anggaran yang efisien.`,
            price: "Rp 800.000 /night",
            image: Standard,
        },
        {
            id: 2,
            title: "Deluxe Room",
            description: `Kamar Deluxe menawarkan ruang yang lebih luas dengan fasilitas tambahan yang nyaman, cocok untuk keluarga kecil
            atau pelancong bisnis. Ruangan ini dilengkapi dengan tempat tidur king-size, sofa empuk, meja kerja ergonomis, serta TV layar datar
            dengan berbagai saluran hiburan. Kamar mandi pribadi dilengkapi dengan bathtub dan shower air panas untuk pengalaman relaksasi yang lebih baik.
            Selain itu, tersedia minibar, mesin pembuat kopi, serta layanan kamar 24 jam. Nikmati pengalaman menginap yang lebih mewah dengan suasana
            elegan dan fasilitas terbaik yang menjamin kenyamanan Anda.`,
            price: "Rp 1.200.000 /night",
            image: Deluxe,
        },
        {
            id: 3,
            title: "Suite Room",
            description: `Suite Room adalah pilihan paling mewah dengan ruang tamu terpisah dan fasilitas premium yang dirancang untuk
            memberikan pengalaman menginap yang istimewa. Cocok untuk tamu VIP, pasangan bulan madu, atau tamu yang ingin menikmati kenyamanan maksimal.
            Kamar ini memiliki ruang tamu luas dengan sofa mewah, meja makan, tempat tidur king-size, serta kamar mandi dengan bathtub jacuzzi.
            Tamu Suite Room juga mendapatkan layanan eksklusif seperti sarapan gratis, akses ke lounge pribadi, serta layanan butler yang siap
            membantu kapan saja. Desain kamar yang modern dan elegan memberikan pengalaman menginap yang tak terlupakan dengan sentuhan kemewahan.`,
            price: "Rp 3.500.000 /night",
            image: Suite,
        },
    ];

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === rooms.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? rooms.length - 1 : prevIndex - 1
        );
    };

    useEffect(() => {
        const handleScroll = () => {
            if (typeof window !== "undefined") {
                setIsHeaderVisible(window.scrollY < lastScrollY);
                setLastScrollY(window.scrollY);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <div className="flex flex-col min-h-screen bg-[#d0ebff]">
            <Header
                userName={userName}
                isVisible={isHeaderVisible}
                auth={auth}
            />
            <div className="flex justify-center items-center min-h-screen p-4">
                <div className="flex bg-white border-[4px] border-black shadow-[8px_8px_0px_#000] rounded-xl overflow-hidden w-[900px] h-[550px] relative">
                    <div className="relative w-1/2 h-full">
                        <img
                            src={rooms[currentIndex].image}
                            alt={rooms[currentIndex].title}
                            className="w-full h-full object-cover border-r-[4px] border-black"
                        />
                        <button
                            onClick={handlePrev}
                            className="absolute left-2 top-1/2 transform -translate-y-1/2
                            w-10 h-10 flex items-center justify-center bg-black text-white rounded-full
                            opacity-80 hover:opacity-100 transition duration-300 shadow-md z-10"
                        >
                            ❮
                        </button>
                        <button
                            onClick={handleNext}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2
                            w-10 h-10 flex items-center justify-center bg-black text-white rounded-full
                            opacity-80 hover:opacity-100 transition duration-300 shadow-md z-10"
                        >
                            ❯
                        </button>
                    </div>
                    <div className="p-6 w-1/2 h-full flex flex-col justify-between bg-[#a3daff] border-l-[4px] border-black">
                        <div>
                            <h3 className="text-2xl font-extrabold uppercase text-black shadow-[2px_2px_0px_#000]">
                                {rooms[currentIndex].title}
                            </h3>
                            <p className="text-black text-md mt-2 leading-relaxed">
                                {rooms[currentIndex].description}
                            </p>
                        </div>
                        <div className="mt-4">
                            <span className="text-lg font-bold block mb-2 shadow-[2px_2px_0px_#000]">
                                {rooms[currentIndex].price}
                            </span>
                            <Link
                                href="/booking-details"
                                className="w-full bg-black text-white px-6 py-3 rounded-md font-bold uppercase
                                hover:bg-gray-800 transition shadow-[4px_4px_0px_#000] border-[3px] border-black text-center block"
                            >
                                Book Now
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
