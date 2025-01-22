import React, { useEffect, useState } from "react";
import Header from "../../Layouts/Header";
import SearchBar from "../../Layouts/SearchBar";
import HotelCard from "../../Layouts/HotelCard";

export default function Explore({ userName, auth }) {
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
                <div className="sticky top-16 z-10 bg-white shadow-md">
                    <SearchBar />
                </div>
            </div>
        </div>
    );
}
