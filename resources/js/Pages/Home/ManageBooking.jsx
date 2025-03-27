import React, { useEffect, useState } from "react";
import Header from "../../Layouts/Header";
import BookingView from "../../Layouts/BookingView";
import Footer from "../../Layouts/Footer";

function ManageBooking({ auth, userName, reservations }) {
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const handleScroll = () => {
        if (typeof window !== "undefined") {
            const scrollY = window.scrollY;
            setIsHeaderVisible(scrollY <= lastScrollY);
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
        <div className="flex flex-col min-h-screen bg-gray-100">
            <div className="sticky top-0 z-50 bg-white shadow-md">
                <Header
                    isVisible={isHeaderVisible}
                    auth={auth}
                    userName={userName}
                />
            </div>
            <div className="w-full px-2 pt-20 md:pt-20 py-10 flex-grow">
                {reservations.length > 0 ? (
                    <div className="flex flex-col items-start space-y-4 w-full">
                        {reservations.map((reservation) => (
                            <div key={reservation.id} className="w-full">
                                <BookingView
                                    {...reservation}
                                    className="w-full max-w-none"
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-center mt-5">
                        No new reservations found.
                    </p>
                )}
            </div>

            <Footer />
        </div>
    );
}

export default ManageBooking;
