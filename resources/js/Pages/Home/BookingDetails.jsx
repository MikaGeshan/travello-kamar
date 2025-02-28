import React, { useEffect, useState } from "react";
import Footer from "../../Layouts/Footer";
import Header from "../../Layouts/Header";
import Select from "react-select";
import { Link } from "@inertiajs/react";

function BookingDetails({ userName, auth }) {
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

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

            {/* Kontainer utama dengan form lebih besar */}
            <div className="flex justify-center items-center min-h-screen p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
                    {/* Form Booking lebih besar */}
                    <form className="bg-white border-[4px] border-black shadow-[8px_8px_0px_#000] rounded-xl p-10 max-w-2xl mx-auto">
                        <h2 className="text-2xl font-extrabold text-center mb-6 uppercase shadow-[3px_3px_0px_#000] text-black">
                            Booking Details
                        </h2>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-black font-bold shadow-[2px_2px_0px_#000] mb-1">
                                    Customer Name
                                </label>
                                <input
                                    className="border-[3px] border-black rounded-md w-full py-3 px-4 shadow-[4px_4px_0px_#000] focus:outline-none focus:ring-2 focus:ring-black"
                                    type="text"
                                    placeholder="Enter your name"
                                />
                            </div>

                            <div>
                                <label className="block text-black font-bold shadow-[2px_2px_0px_#000] mb-1">
                                    Select Room
                                </label>
                                <Select className="border-[3px] border-black rounded-md shadow-[4px_4px_0px_#000]" />
                            </div>

                            {/* Check In & Check Out dalam satu baris */}
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-black font-bold shadow-[2px_2px_0px_#000] mb-1">
                                        Check In
                                    </label>
                                    <input
                                        className="border-[3px] border-black rounded-md w-full py-3 px-4 shadow-[4px_4px_0px_#000] focus:outline-none focus:ring-2 focus:ring-black text-sm"
                                        type="date"
                                    />
                                </div>

                                <div>
                                    <label className="block text-black font-bold shadow-[2px_2px_0px_#000] mb-1">
                                        Check Out
                                    </label>
                                    <input
                                        className="border-[3px] border-black rounded-md w-full py-3 px-4 shadow-[4px_4px_0px_#000] focus:outline-none focus:ring-2 focus:ring-black text-sm"
                                        type="date"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-black font-bold shadow-[2px_2px_0px_#000] mb-1">
                                    Guests
                                </label>
                                <input
                                    className="border-[3px] border-black rounded-md w-full py-3 px-4 shadow-[4px_4px_0px_#000] focus:outline-none focus:ring-2 focus:ring-black"
                                    type="number"
                                    placeholder="Total Guest"
                                />
                            </div>
                        </div>
                    </form>

                    {/* Form Total Price & Button lebih besar */}
                    <div className="bg-white border-[4px] border-black shadow-[8px_8px_0px_#000] rounded-xl p-10 max-w-2xl mx-auto">
                        <div className="w-full space-y-6">
                            <div>
                                <label className="block text-black font-bold shadow-[2px_2px_0px_#000] mb-1">
                                    Total Price
                                </label>
                                <input
                                    className="border-[3px] border-black rounded-md w-full py-4 px-4 shadow-[4px_4px_0px_#000] bg-gray-100 text-black font-bold text-xl text-center"
                                    type="number"
                                    placeholder="Total Price"
                                    readOnly
                                />
                            </div>

                            {/* Tombol lebih besar dan tidak terlalu dekat dengan input */}
                            <Link
                                href="#"
                                className="block w-full bg-[#d0ebff] text-black text-center py-4 rounded-md font-bold uppercase text-xl shadow-[4px_4px_0px_#000] border-[3px] border-black
                                hover:bg-[#b0d4f1] transition-all duration-200"
                            >
                                Finish Order
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default BookingDetails;
