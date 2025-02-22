import React, { useEffect, useState } from "react";
import Header from "../../Layouts/Header";
import SearchBar from "../../Layouts/SearchBar";

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
                <div className="top-16 z-10 ">
                    <SearchBar />
                </div>
                <div className="p-4 mb-4 space-y-4 max-w-4xl mx-auto"></div>
            </div>
        </div>
    );
}
