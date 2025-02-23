import React, { useState } from "react";
import Select from "react-select";
import { FaRegAddressBook } from "react-icons/fa";
import AdminHeader from "../../../Layouts/AdminHeader";
import AdminSidebar from "../../../Layouts/AdminSidebar";

function CreateReservation({ rooms, customers }) {
    const today = new Date().toISOString().split("T")[0];
    const [checkIn, setCheckIn] = useState(today);
    const [checkOut, setCheckOut] = useState("");
    const [roomId, setRoomId] = useState("");
    const [price, setPrice] = useState("");
    const [reservationCode, setReservationCode] = useState("");
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState("Pending");

    const customerOptions = customers.map((customer) => ({
        value: customer.id,
        label: customer.name,
    }));

    const handleCustomerChange = (selectedOption) => {
        setSelectedCustomer(selectedOption);
    };

    const handlePaymentStatusChange = (e) => {
        setPaymentStatus(e.target.value);
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const [year, month, day] = dateString.split("-");
        return `${day}${month}${year.slice(2)}`;
    };

    const generateReservationCode = (checkIn, roomId) => {
        if (checkIn && roomId) {
            const formattedCheckIn = formatDate(checkIn);
            const selectedRoom = rooms.find(
                (room) => room.id === parseInt(roomId)
            );
            const roomInitial = selectedRoom
                ? selectedRoom.nama_kamar.charAt(0).toUpperCase()
                : "";
            const randomNum = Math.floor(1 + Math.random() * 9);
            const randomChar = String.fromCharCode(65 + (randomNum % 26));

            return `TO-${formattedCheckIn}-${roomInitial}${randomNum}${randomChar}`;
        }
        return "";
    };

    const calculateTotalPrice = (roomPrice, checkIn, checkOut) => {
        if (!checkIn || !checkOut) return roomPrice;
        const startDate = new Date(checkIn);
        const endDate = new Date(checkOut);
        const stayDuration = Math.max(
            1,
            (endDate - startDate) / (1000 * 60 * 60 * 24)
        );
        return roomPrice * stayDuration;
    };

    const handleCheckInChange = (e) => {
        setCheckIn(e.target.value);
        setReservationCode(generateReservationCode(e.target.value, roomId));
    };

    const handleCheckOutChange = (e) => {
        setCheckOut(e.target.value);
        const selectedRoom = rooms.find((room) => room.id === parseInt(roomId));
        if (selectedRoom) {
            setPrice(
                calculateTotalPrice(selectedRoom.harga, checkIn, e.target.value)
            );
        }
    };

    const handleRoomChange = (e) => {
        const selectedRoomId = e.target.value;
        setRoomId(selectedRoomId);
        const selectedRoom = rooms.find(
            (room) => room.id === parseInt(selectedRoomId)
        );
        if (selectedRoom) {
            setPrice(
                calculateTotalPrice(selectedRoom.harga, checkIn, checkOut)
            );
        } else {
            setPrice("");
        }
        setReservationCode(generateReservationCode(checkIn, selectedRoomId));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const reservationData = {
            reservationCode,
            customerId: selectedCustomer ? selectedCustomer.value : null,
            checkIn,
            checkOut,
            roomId,
            price,
            paymentStatus,
        };

        console.log("Reservation Data:", reservationData);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <AdminHeader />
            <div className="flex flex-1">
                <AdminSidebar />
                <main className="flex-1 p-8">
                    <div className="container mx-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                                <FaRegAddressBook className="mr-3" /> Create
                                Reservation
                            </h1>
                        </div>
                        <div className="bg-white shadow-md rounded-lg p-8">
                            <form onSubmit={handleSubmit}>
                                <div className="flex space-x-4 mb-4">
                                    <div className="w-1/2">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Reservation Code
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
                                            type="text"
                                            value={reservationCode}
                                            readOnly
                                        />
                                    </div>
                                    <div className="w-1/2">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Customer Name
                                        </label>
                                        <Select
                                            options={customerOptions}
                                            value={selectedCustomer}
                                            onChange={handleCustomerChange}
                                            placeholder="Select / Search Customer"
                                            isSearchable
                                            className="shadow border rounded w-full"
                                        />
                                    </div>
                                </div>
                                <div className="flex space-x-4 mb-4">
                                    <div className="w-1/2">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Check In
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            type="date"
                                            value={checkIn}
                                            onChange={handleCheckInChange}
                                        />
                                    </div>
                                    <div className="w-1/2">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Check Out
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            type="date"
                                            value={checkOut}
                                            onChange={handleCheckOutChange}
                                        />
                                    </div>
                                </div>
                                <div className="flex space-x-4 mb-4">
                                    <div className="w-1/2">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Room Name / Type
                                        </label>
                                        <select
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            value={roomId}
                                            onChange={handleRoomChange}
                                        >
                                            <option value="">
                                                Select Room
                                            </option>
                                            {rooms.map((room) => (
                                                <option
                                                    key={room.id}
                                                    value={room.id}
                                                >
                                                    {room.nama_kamar}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="w-1/2">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Price (Total)
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
                                            type="text"
                                            value={price}
                                            readOnly
                                        />
                                    </div>
                                    <div className="w-1/2">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Payment Status
                                        </label>
                                        <select
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            value={paymentStatus}
                                            onChange={handlePaymentStatusChange}
                                        >
                                            <option>Paid</option>
                                            <option>Pending</option>
                                            <option>Cancelled</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between mt-4">
                                    <button
                                        type="submit"
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                                    >
                                        Create Reservation
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default CreateReservation;
