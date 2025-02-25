import React, { useEffect } from "react";
import { useForm } from "@inertiajs/react";
import Select from "react-select";
import { FaRegAddressBook } from "react-icons/fa";
import AdminHeader from "../../../Layouts/AdminHeader";
import AdminSidebar from "../../../Layouts/AdminSidebar";
import Swal from "sweetalert2";

function CreateReservation({ rooms, customers }) {
    const today = new Date().toISOString().split("T")[0];

    const { data, setData, post, processing, errors } = useForm({
        reservation_code: "",
        customer_id: "",
        room_id: "",
        guests: "",
        check_in: today,
        check_out: "",
        total_price: 0,
        payment_status: "Pending",
    });

    const customerOptions = customers.map((customer) => ({
        value: customer.id,
        label: customer.name,
    }));

    const roomOptions = rooms
        .filter((room) => room.status !== "Booked")
        .map((room) => ({
            value: room.id,
            label: `${room.jenis_kamar} - ${
                room.nomor_kamar
            } (${room.harga.toLocaleString()} IDR)`,
        }));

    const calculateTotalPrice = (roomId, checkIn, checkOut) => {
        if (!roomId || !checkIn || !checkOut) return 0;

        const selectedRoom = rooms.find((room) => room.id === parseInt(roomId));
        if (!selectedRoom) return 0;

        const startDate = new Date(checkIn);
        const endDate = new Date(checkOut);
        if (startDate >= endDate) return 0;

        const stayDuration = Math.ceil(
            (endDate - startDate) / (1000 * 60 * 60 * 24)
        );
        return selectedRoom.harga * stayDuration;
    };

    useEffect(() => {
        const total = calculateTotalPrice(
            data.room_id,
            data.check_in,
            data.check_out
        );
        setData("total_price", total);
    }, [data]);

    const generateReservationCode = (checkIn, roomId) => {
        if (checkIn && roomId) {
            const selectedRoom = rooms.find(
                (room) => room.id === parseInt(roomId)
            );
            if (!selectedRoom || !selectedRoom.nomor_kamar) return "";

            const roomNumber = selectedRoom.nomor_kamar;
            const roomPrefix = roomNumber.substring(0, 3).toUpperCase();
            const formattedCheckIn = checkIn.split("-").reverse().join("");
            const roomSuffix = roomNumber.slice(-2).toUpperCase();

            return `${roomPrefix}-${formattedCheckIn}-${roomSuffix}`;
        }
        return "";
    };

    useEffect(() => {
        setData(
            "reservation_code",
            generateReservationCode(data.check_in, data.room_id)
        );
    }, [data.check_in, data.room_id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedTotalPrice = calculateTotalPrice(
            data.room_id,
            data.check_in,
            data.check_out
        );
        setData("total_price", updatedTotalPrice);
        post("/admin/reservations/create", data, {
            onSuccess: () => {
                Swal.fire({
                    title: "Success!",
                    text: "Reservation created successfully.",
                    icon: "success",
                    confirmButtonText: "OK",
                });
            },
            onError: (errors) => {
                console.error("Submission error:", errors);
                Swal.fire({
                    title: "Error!",
                    text: "Failed to create reservation. Please try again.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            },
        });
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
                                {/* Reservation Code */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Reservation Code
                                    </label>
                                    <input
                                        className="shadow border rounded w-full py-2 px-3 bg-gray-200 text-gray-700"
                                        type="text"
                                        value={data.reservation_code}
                                        readOnly
                                    />
                                </div>

                                {/* Room Type (Dipindahkan ke atas Check-in & Check-out) */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Room Type
                                    </label>
                                    <Select
                                        options={roomOptions}
                                        onChange={(option) =>
                                            setData(
                                                "room_id",
                                                option ? option.value : ""
                                            )
                                        }
                                        isSearchable
                                    />
                                </div>

                                {/* Check-in & Check-out */}
                                <div className="flex space-x-4 mb-4">
                                    <div className="w-1/2">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Check In
                                        </label>
                                        <input
                                            className="shadow border rounded w-full py-2 px-3 text-gray-700"
                                            type="date"
                                            value={data.check_in}
                                            onChange={(e) =>
                                                setData(
                                                    "check_in",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="w-1/2">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Check Out
                                        </label>
                                        <input
                                            className="shadow border rounded w-full py-2 px-3 text-gray-700"
                                            type="date"
                                            value={data.check_out}
                                            onChange={(e) =>
                                                setData(
                                                    "check_out",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                </div>

                                {/* Customer Name (Dipindahkan ke bawah Check-in & Check-out) */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Customer Name
                                    </label>
                                    <Select
                                        options={customerOptions}
                                        onChange={(option) =>
                                            setData(
                                                "customer_id",
                                                option ? option.value : ""
                                            )
                                        }
                                        isSearchable
                                    />
                                </div>

                                {/* Guests (Dipindahkan ke bawah Customer Name) */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Guests
                                    </label>
                                    <input
                                        className="shadow border rounded w-full py-2 px-3 text-gray-700"
                                        type="number"
                                        value={data.guests}
                                        onChange={(e) =>
                                            setData("guests", e.target.value)
                                        }
                                    />
                                </div>

                                {/* Total Price */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Total Price
                                    </label>
                                    <input
                                        className="shadow border rounded w-full py-2 px-3 bg-gray-200 text-gray-700"
                                        type="text"
                                        value={`Rp ${new Intl.NumberFormat(
                                            "id-ID"
                                        ).format(data.total_price)}`}
                                        readOnly
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                                    disabled={processing}
                                >
                                    {processing
                                        ? "Submitting..."
                                        : "Create Reservation"}
                                </button>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default CreateReservation;
