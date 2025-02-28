import React, { useEffect, useState } from "react";
import Footer from "../../Layouts/Footer";
import Header from "../../Layouts/Header";
import Select from "react-select";
import { Link } from "@inertiajs/react";

function BookingDetails({ userName, auth, rooms }) {
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [totalDays, setTotalDays] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);

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

    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        setCheckIn(today);
    }, []);

    const roomOptions = rooms.map((room) => ({
        value: room.jenis_kamar,
        label: `${room.jenis_kamar} - Rp ${
            room.harga ? room.harga.toLocaleString() : "0"
        }`,
        price: room.harga || 0,
    }));

    const totalCheckIn = (e) => {
        const newCheckIn = e.target.value;
        setCheckIn(newCheckIn);

        if (checkOut && new Date(newCheckIn) > new Date(checkOut)) {
            setCheckOut("");
            setTotalDays(1);
        }
    };

    const totalCheckOut = (e) => {
        const newCheckOut = e.target.value;
        setCheckOut(newCheckOut);

        if (checkIn && newCheckOut) {
            const checkInDateObj = new Date(checkIn);
            const checkOutDateObj = new Date(newCheckOut);

            const timeDiff = checkOutDateObj - checkInDateObj;
            const days = Math.max(
                1,
                Math.ceil(timeDiff / (1000 * 60 * 60 * 24))
            );
            setTotalDays(days);
        }
    };

    useEffect(() => {
        if (selectedRoom) {
            setTotalPrice(selectedRoom.price * totalDays);
        } else {
            setTotalPrice(0);
        }
    }, [selectedRoom, totalDays, checkIn]);

    return (
        <div className="flex flex-col min-h-screen bg-[#d0ebff]">
            <Header
                userName={userName}
                isVisible={isHeaderVisible}
                auth={auth}
            />

            <div className="flex justify-center items-center min-h-screen p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
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
                                    type="text"
                                    className="border-[3px] border-black rounded-md w-full py-3 px-4 shadow-[4px_4px_0px_#000] bg-gray-100 text-black font-bold"
                                    value={auth?.customer?.name || ""}
                                    readOnly
                                    onFocus={(e) => e.target.blur()}
                                />
                                <input
                                    type="hidden"
                                    name="customer_id"
                                    value={auth?.customer?.id || ""}
                                />
                            </div>

                            {/* Pilih Tipe Kamar */}
                            <div>
                                <label className="block text-black font-bold shadow-[2px_2px_0px_#000] mb-1">
                                    Select Room Type
                                </label>
                                <Select
                                    options={roomOptions}
                                    className="border-[3px] border-black rounded-md shadow-[4px_4px_0px_#000]"
                                    value={selectedRoom}
                                    onChange={(selectedOption) =>
                                        setSelectedRoom(selectedOption)
                                    }
                                />
                            </div>

                            {/* Check In & Check Out */}
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-black font-bold shadow-[2px_2px_0px_#000] mb-1">
                                        Check In
                                    </label>
                                    <input
                                        className="border-[3px] border-black rounded-md w-full py-3 px-4 shadow-[4px_4px_0px_#000]"
                                        type="date"
                                        value={checkIn}
                                        onChange={totalCheckIn}
                                    />
                                </div>

                                <div>
                                    <label className="block text-black font-bold shadow-[2px_2px_0px_#000] mb-1">
                                        Check Out
                                    </label>
                                    <input
                                        className="border-[3px] border-black rounded-md w-full py-3 px-4 shadow-[4px_4px_0px_#000]"
                                        type="date"
                                        value={checkOut}
                                        onChange={totalCheckOut}
                                        min={checkIn}
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

                    {/* Total Price & Finish Order */}
                    <div className="bg-white border-[4px] border-black shadow-[8px_8px_0px_#000] rounded-xl p-10 max-w-2xl mx-auto">
                        <div className="w-full space-y-6">
                            {/* Total Price */}
                            <div>
                                <label className="block text-black font-bold shadow-[2px_2px_0px_#000] mb-1">
                                    Total Price
                                </label>
                                <input
                                    className="border-[3px] border-black rounded-md w-full py-2 px-3 shadow-[4px_4px_0px_#000] bg-gray-100 text-black font-bold text-xl text-center"
                                    type="text"
                                    value={`Rp ${
                                        totalPrice
                                            ? totalPrice.toLocaleString()
                                            : "0"
                                    }`}
                                    readOnly
                                />
                            </div>

                            {/* Finish Order Button */}
                            <Link
                                href="#"
                                className="block w-full bg-[#d0ebff] text-black text-center py-3 rounded-md font-bold uppercase text-lg shadow-[4px_4px_0px_#000] border-[3px] border-black
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
