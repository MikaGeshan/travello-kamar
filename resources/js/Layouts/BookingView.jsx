import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

function BookingView({
    reservation_code,
    check_in,
    check_out,
    guests,
    total_price,
    payment_status,
}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className={`relative bg-white shadow-xl rounded-3xl p-10 border-4 border-gray-400 w-full max-w-2xl overflow-hidden cursor-pointer transition-transform duration-500`}
            onClick={() => setIsOpen(!isOpen)}
        >
            {/* ✂ Bagian Atas (Lingkaran Sobekan Kiri & Kanan) */}
            <div className="absolute -top-4 left-0 right-0 flex justify-between">
                <div className="w-8 h-8 bg-[#d0ebff] rounded-full"></div>
                <div className="w-8 h-8 bg-[#d0ebff] rounded-full"></div>
            </div>

            {/* 🏷️ Bagian Tiket */}
            <div className="flex justify-between items-center">
                {/* 🎫 Bagian Kiri */}
                <div>
                    <p className="text-gray-500 text-sm uppercase font-bold">
                        Reservation Code
                    </p>
                    <p className="text-blue-600 font-extrabold text-3xl">
                        {reservation_code}
                    </p>

                    <p className="text-gray-500 text-sm mt-4 uppercase font-bold">
                        Check-in
                    </p>
                    <p className="text-black font-semibold text-xl">
                        {check_in}
                    </p>

                    <p className="text-gray-500 text-sm mt-4 uppercase font-bold">
                        Check-out
                    </p>
                    <p className="text-black font-semibold text-xl">
                        {check_out}
                    </p>
                </div>

                {/* ✂ Garis Putus-putus Tengah */}
                <div className="h-32 border-l-4 border-dashed mx-10"></div>

                {/* 🎟️ Bagian Kanan */}
                <div className="text-right">
                    <p className="text-gray-500 text-sm uppercase font-bold">
                        Guests
                    </p>
                    <p className="text-black font-semibold text-xl">{guests}</p>

                    <p className="text-gray-500 text-sm mt-4 uppercase font-bold">
                        Total Price
                    </p>
                    <p className="text-black font-extrabold text-2xl">
                        Rp {total_price.toLocaleString()}
                    </p>

                    <p className="text-gray-500 text-sm mt-4 uppercase font-bold">
                        Payment Status
                    </p>
                    <p
                        className={`font-extrabold text-2xl ${
                            payment_status === "Paid"
                                ? "text-green-500"
                                : "text-yellow-500"
                        }`}
                    >
                        {payment_status}
                    </p>
                </div>
            </div>

            {/* ✂ Bagian Bawah (Lingkaran Sobekan Kiri & Kanan) */}
            <div className="absolute -bottom-4 left-0 right-0 flex justify-between">
                <div className="w-8 h-8 bg-[#d0ebff] rounded-full"></div>
                <div className="w-8 h-8 bg-[#d0ebff] rounded-full"></div>
            </div>

            {/* 🛠️ Bagian QR Code (Muncul Saat Tiket Dibuka) */}
            <div
                className={`mt-6 transition-opacity duration-500 ${
                    isOpen ? "opacity-100 max-h-40" : "opacity-0 max-h-0"
                }`}
            >
                <p className="text-center text-gray-500 text-sm uppercase font-bold">
                    Scan QR Code
                </p>
                <div className="flex justify-center mt-2">
                    <QRCodeCanvas
                        value={reservation_code}
                        size={128}
                        bgColor="#ffffff"
                        fgColor="#000000"
                        level="H"
                    />
                </div>
            </div>
        </div>
    );
}

export default BookingView;
