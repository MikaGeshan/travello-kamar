import React, { useEffect, useState } from "react";
import Header from "../../Layouts/Header";
import BookingView from "../../Layouts/BookingView";
import Footer from "../../Layouts/Footer";
// import { QRCodeCanvas } from "qrcode.react";

function ManageBooking({ auth, userName, reservations }) {
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    // const [selectedTicket, setSelectedTicket] = useState(null);

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
            <Header
                isVisible={isHeaderVisible}
                auth={auth}
                userName={userName}
            />

            {/* Konten utama */}
            <div className="container mx-auto px-5 py-10 flex-grow">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
                    Your Bookings
                </h1>

                {reservations.length > 0 ? (
                    <div className="flex flex-col items-center space-y-4">
                        {reservations.map((reservation) => (
                            <div
                                key={reservation.id}
                                onClick={() => setSelectedTicket(reservation)}
                            >
                                <BookingView {...reservation} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-center mt-5">
                        No reservations found.
                    </p>
                )}
            </div>

            <Footer />

            {/* Modal QR Code
            {selectedTicket && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h2 className="text-xl font-bold mb-4">Scan QR Code</h2>
                        <QRCodeCanvas
                            value={`https://yourwebsite.com/tickets/${selectedTicket.id}/download`} // ✅ Gunakan QRCodeCanvas
                            size={200}
                        />
                        <p className="text-gray-600 mt-2">
                            Scan or click to download
                        </p>
                        <button
                            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                            onClick={() => setSelectedTicket(null)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )} */}
        </div>
    );
}

export default ManageBooking;
