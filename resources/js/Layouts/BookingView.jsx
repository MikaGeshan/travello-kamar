import React, { useState } from "react";
import { FiUser } from "react-icons/fi";
import { jsPDF } from "jspdf";

function BookingView({
    reservation_code,
    check_in,
    check_out,
    guests,
    total_price,
    payment_status,
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const downloadTicket = () => {
        const doc = new jsPDF();
        doc.setFont("helvetica", "bold");
        doc.setFontSize(20);
        doc.text("Booking Ticket", 20, 20);

        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text(`Reservation Code: ${reservation_code}`, 20, 40);
        doc.text(`Check-in: ${check_in}`, 20, 50);
        doc.text(`Check-out: ${check_out}`, 20, 60);
        doc.text(`Guests: ${guests}`, 20, 70);
        doc.text(`Total Price: $${total_price}`, 20, 80);
        doc.text(`Payment Status: ${payment_status}`, 20, 90);

        doc.save(`Ticket_${reservation_code}.pdf`);
    };

    return (
        <>
            <div className="bg-white shadow-lg rounded-l p-4 w-full border border-gray-300 mx-auto flex items-center justify-between">
                <div className="flex flex-col">
                    <h2 className="text-xl font-extrabold text-gray-900">
                        {reservation_code}
                    </h2>
                    <div className="flex items-center text-gray-700 mt-1">
                        <FiUser className="mr-2 text-gray-500 text-xl" />
                        <span className="text-md font-medium">
                            Tamu ({guests})
                        </span>
                    </div>
                    <p className="text-md text-gray-500 mt-1">{check_in}</p>
                    <p
                        className={`text-lg font-bold mt-2 ${
                            payment_status === "Paid"
                                ? "text-green-500"
                                : "text-yellow-500"
                        }`}
                    >
                        {payment_status}
                    </p>
                </div>
                <button
                    onClick={openModal}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-full shadow-md"
                >
                    View
                </button>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            Ticket Details
                        </h2>
                        <p className="text-md text-gray-700">
                            <strong>Reservation Code:</strong>{" "}
                            {reservation_code}
                        </p>
                        <p className="text-md text-gray-700">
                            <strong>Check-in:</strong> {check_in}
                        </p>
                        <p className="text-md text-gray-700">
                            <strong>Check-out:</strong> {check_out}
                        </p>
                        <p className="text-md text-gray-700">
                            <strong>Guests:</strong> {guests}
                        </p>
                        <p className="text-md text-gray-700">
                            <strong>Total Price:</strong>{" "}
                            {new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                                minimumFractionDigits: 0,
                            }).format(total_price)}
                        </p>
                        <p
                            className={`text-lg font-bold mt-2 ${
                                payment_status === "Paid"
                                    ? "text-green-500"
                                    : "text-yellow-500"
                            }`}
                        >
                            <strong>Payment Status:</strong> {payment_status}
                        </p>

                        <div className="flex justify-end mt-6 space-x-4">
                            <button
                                onClick={closeModal}
                                className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md"
                            >
                                Close
                            </button>
                            <button
                                onClick={downloadTicket}
                                className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md"
                            >
                                Download Ticket
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default BookingView;
