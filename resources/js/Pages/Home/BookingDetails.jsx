import React, { useEffect, useState } from "react";
import Footer from "../../Layouts/Footer";
import Header from "../../Layouts/Header";
import Select from "react-select";
import { useForm } from "@inertiajs/react";

function BookingDetails({ userName, auth, rooms }) {
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [checkIn, setCheckIn] = useState("");
    const today = new Date().toISOString().split("T")[0];
    const [totalDays, setTotalDays] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
    const { data, setData } = useForm({
        reservation_code: "",
        customer_id: auth?.customer?.id || "",
        room_id: "",
        guests: "",
        check_in: today,
        check_out: "",
        total_price: 0,
        payment_status: "Pending",
    });

    console.log(data.customer_id);

    useEffect(() => {
        const handleScroll = () => {
            if (typeof window !== "undefined") {
                setIsHeaderVisible(window.scrollY < lastScrollY);
                setLastScrollY(window.scrollY);
            }
        };

        window.addEventListener("scroll", handleScroll);

        const today = new Date().toISOString().split("T")[0];
        setData("check_in", today);

        if (selectedRoom && data.check_in) {
            const roomNumber = selectedRoom.nomor_kamar
                ? String(selectedRoom.nomor_kamar)
                : "XX";

            // Ambil hanya huruf terakhir dari nomor_kamar
            const lastLetters = roomNumber.match(/[A-Za-z]+$/)?.[0] || "";

            // Ambil angka dari nomor_kamar
            const numericPart = roomNumber.match(/\d+/)?.[0] || "XX";

            // Format tanggal check-in: YYYY-MM-DD -> DDMMYYYY
            const checkInDate = data.check_in.split("-").reverse().join("");

            // Gabungkan format yang diinginkan: TRV-{DDMMYYYY}-{ANGKA}{HURUF_TERAKHIR}
            const newReservationCode = `TRV-${checkInDate}-${numericPart}${lastLetters}`;

            setData("reservation_code", newReservationCode);
        }

        if (data.check_in && data.check_out) {
            const checkInDate = new Date(data.check_in);
            const checkOutDate = new Date(data.check_out);
            if (checkOutDate > checkInDate) {
                const days = Math.ceil(
                    (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
                );
                setTotalDays(days);
                setData(
                    "total_price",
                    selectedRoom ? selectedRoom.price * days : 0
                );
            } else {
                setTotalDays(1);
            }
        }

        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY, selectedRoom, data.check_in, data.check_out]);

    const selectRoom = (selectedOption) => {
        setSelectedRoom(selectedOption);
        setData("room_id", selectedOption.value);
        setData("reservation_code", "");
    };

    const uniqueRooms = Array.from(
        new Map(rooms.map((room) => [room.jenis_kamar, room])).values()
    );

    const roomOptions = uniqueRooms.map((room) => ({
        value: room.id,
        label: `${room.jenis_kamar} - Rp ${
            room.harga ? room.harga.toLocaleString() : "0"
        }`,
        price: room.harga || 0,
        jenis_kamar: room.jenis_kamar,
        nomor_kamar: room.nomor_kamar,
    }));

    const checkInDate = (e) => {
        const newCheckIn = e.target.value;
        setData("check_in", newCheckIn);

        if (data.check_out && new Date(newCheckIn) > new Date(data.check_out)) {
            setData("check_out", "");
            setTotalDays(1);
        }
    };

    const checkOutDate = (e) => {
        const newCheckOut = e.target.value;
        setData("check_out", newCheckOut);
    };

    const totalGuests = (e) => {
        setData("guests", e.target.value);
    };

    const submitBook = (e) => {
        e.preventDefault();
        console.log("Data yang dikirim:", data);
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
                                <label className="block text-black font-bold mb-1">
                                    Customer Name
                                </label>
                                <input
                                    type="text"
                                    className="border-[3px] border-black rounded-md w-full py-3 px-4 bg-gray-100 text-black font-bold"
                                    value={auth?.customer?.name || ""}
                                    readOnly
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
                                    onChange={selectRoom}
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
                                        value={data.check_in}
                                        onChange={checkInDate}
                                    />
                                </div>
                                <div>
                                    <label className="block text-black font-bold shadow-[2px_2px_0px_#000] mb-1">
                                        Check Out
                                    </label>
                                    <input
                                        className="border-[3px] border-black rounded-md w-full py-3 px-4 shadow-[4px_4px_0px_#000]"
                                        type="date"
                                        value={data.check_out}
                                        onChange={checkOutDate}
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
                                    value={data.guests}
                                    onChange={totalGuests}
                                />
                            </div>
                        </div>
                    </form>
                    {/* Total Price & Finish Order */}
                    <div className="bg-white border-[4px] border-black shadow-[8px_8px_0px_#000] rounded-xl p-10 max-w-2xl mx-auto">
                        <div className="w-full space-y-6">
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
                            <button
                                type="submit"
                                onClick={submitBook}
                                className="mt-6 block w-full bg-[#d0ebff] text-black text-center py-3 rounded-md font-bold uppercase text-lg shadow-[4px_4px_0px_#000] border-[3px] border-black hover:bg-[#b0d4f1] transition-all duration-200"
                            >
                                Finish Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default BookingDetails;
