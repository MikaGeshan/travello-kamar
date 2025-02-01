import React, { useEffect, useState } from "react";
import Header from "../../Layouts/Header";
import SearchBar from "../../Layouts/SearchBar";
import RoomCard from "./../../Layouts/RoomCard";

export default function PilihKamar({ userName, auth, hotel, kamars }) {
    console.log("Data", kamars);
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

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            if (i < rating) {
                stars.push(
                    <span key={i} style={{ color: "yellow" }}>
                        &#9733;
                    </span>
                );
            } else {
                stars.push(
                    <span key={i} style={{ color: "yellow" }}>
                        &#9734;
                    </span>
                );
            }
        }
        return stars;
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollY]);

    return (
        <div className="flex flex-col min-h-screen">
            <div className="top-16 z-10 ">
                <Header
                    userName={userName}
                    isVisible={isHeaderVisible}
                    auth={auth}
                />
            </div>
            <div className="pt-20">
                <div>
                    <SearchBar />
                </div>
            </div>
            <div className="flex justify-center p-4">
                <img
                    src={`${window.location.origin}/${hotel.gambar_hotel}`}
                    alt={hotel.nama_hotel}
                    className="overflow-hidden w-3/4 max-w-2xl h-auto rounded-md"
                />
            </div>
            <div className="flex justify-center p-4">
                <div className="bg-white shadow-xl rounded-md p-6 w-3/4 max-w-2xl">
                    <div>
                        <h1 className="text-2xl font-bold">
                            {hotel.nama_hotel}
                        </h1>
                        <p className="text-gray-600 mt-2">
                            {hotel.deskripsi_hotel}
                        </p>
                        <div className="mt-2">
                            {renderStars(hotel.rating_hotel)}
                        </div>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold mt-4">
                            Available Rooms
                        </h2>
                        {kamars.length > 0 ? (
                            kamars.map((kamar) => (
                                <RoomCard
                                    key={kamar.id}
                                    name={kamar.nama_kamar}
                                    type={kamar.jenis_kamar}
                                    price={kamar.harga}
                                    facilities={kamar.fasilitas}
                                    image={`http://localhost:8001/storage/${kamar.gambar_kamar}`}
                                />
                            ))
                        ) : (
                            <p className="text-gray-500">No rooms available.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
