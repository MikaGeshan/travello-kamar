import React, { useEffect, useState } from "react";
import Header from "../../Layouts/Header";
import SearchBar from "../../Layouts/SearchBar";

export default function PilihKamar({ userName, auth, hotel, kamars }) {
    console.log("Data", hotel);
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
            <Header
                userName={userName}
                isVisible={isHeaderVisible}
                auth={auth}
            />
            <div className="pt-20">
                <div className="sticky top-16 z-10 bg-white shadow-md">
                    <SearchBar />
                </div>
            </div>
            <div className="p-4  ">
                <img
                    src={`${window.location.origin}/${hotel.gambar_hotel}`}
                    alt={hotel.nama_hotel}
                    className="overflow-hidden w-1/2 h-1/2"
                />
            </div>
            <div className="p-4 bg-white shadow-md rounded-md">
                <div>
                    <h1>{hotel.nama_hotel}</h1>
                    <h1>{hotel.deskripsi_hotel}</h1>
                    <div>{renderStars(hotel.rating_hotel)}</div>
                </div>

            </div>
        </div>
    );
}
