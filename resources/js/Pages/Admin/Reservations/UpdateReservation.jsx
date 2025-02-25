import { useForm } from "@inertiajs/react";
import React, { useEffect } from "react";
import AdminHeader from "../../../Layouts/AdminHeader";
import AdminSidebar from "../../../Layouts/AdminSidebar";
import Select from "react-select";
import Swal from "sweetalert2";

function UpdateReservation({ reservation, rooms, customers }) {
    const today = new Date().toISOString().split("T")[0];

    const { data, setData, put, processing } = useForm({
        reservation_code: reservation?.reservation_code || "",
        customer_id: reservation?.customer_id || "",
        room_id: reservation?.room_id || "",
        guests: reservation?.guests || "",
        check_in: reservation?.check_in || today,
        check_out: reservation?.check_out || "",
        total_price: reservation?.total_price || 0,
        payment_status: reservation?.payment_status || "Pending",
    });

    // Fungsi menghitung total harga
    const calculateTotalPrice = (roomId, checkIn, checkOut) => {
        if (!roomId || !checkIn || !checkOut) return 0;

        const selectedRoom = rooms.find((room) => room.id === parseInt(roomId));
        if (!selectedRoom) return 0;

        const startDate = new Date(checkIn);
        const endDate = new Date(checkOut);
        if (startDate >= endDate) return 0; // Hindari durasi negatif

        const stayDuration = Math.ceil(
            (endDate - startDate) / (1000 * 60 * 60 * 24)
        );
        return selectedRoom.harga * stayDuration;
    };

    // Perbarui total_price setiap kali room_id, check_in, atau check_out berubah
    useEffect(() => {
        const total = calculateTotalPrice(
            data.room_id,
            data.check_in,
            data.check_out
        );
        setData("total_price", total);
    }, [data.room_id, data.check_in, data.check_out]);

    // Generate kode reservasi
    const generateReservationCode = (checkIn, roomId) => {
        if (!checkIn || !roomId) return "";

        const selectedRoom = rooms.find((room) => room.id === parseInt(roomId));
        if (!selectedRoom || !selectedRoom.nomor_kamar) return "";

        const roomPrefix = selectedRoom.nomor_kamar
            .substring(0, 3)
            .toUpperCase();
        const formattedCheckIn = checkIn.split("-").reverse().join("");
        const roomSuffix = selectedRoom.nomor_kamar.slice(-2).toUpperCase();

        return `${roomPrefix}-${formattedCheckIn}-${roomSuffix}`;
    };

    // Perbarui kode reservasi ketika check_in atau room_id berubah
    useEffect(() => {
        setData(
            "reservation_code",
            generateReservationCode(data.check_in, data.room_id)
        );
    }, [data.check_in, data.room_id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/admin/reservations/${reservation.id}`, {
            onSuccess: () => {
                Swal.fire(
                    "Success!",
                    "Reservation updated successfully.",
                    "success"
                ).then(() => {
                    window.location.href = "/admin/reservations/list";
                });
            },
            onError: (errors) => {
                Swal.fire(
                    "Error!",
                    "Failed to update reservation. Try again.",
                    "error"
                );
                console.error(errors);
            },
        });
    };

    const customerOptions = customers.map((c) => ({
        value: c.id,
        label: c.name,
    }));
    const roomOptions = rooms.map((r) => ({
        value: r.id,
        label: `${r.jenis_kamar} - ${
            r.nomor_kamar
        } (${r.harga.toLocaleString()} IDR)`,
    }));

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <AdminHeader />
            <div className="flex flex-1">
                <AdminSidebar />
                <main className="flex-1 p-8">
                    <div className="container mx-auto">
                        <h1 className="text-2xl font-bold text-gray-800 mb-6">
                            Update Reservation
                        </h1>
                        <div className="bg-white shadow-md rounded-lg p-8">
                            <form onSubmit={handleSubmit}>
                                {/* Reservation Code */}
                                <FormInput
                                    label="Reservation Code"
                                    value={data.reservation_code}
                                    readOnly
                                />

                                {/* Room Selection */}
                                <FormSelect
                                    label="Room Type"
                                    options={roomOptions}
                                    value={data.room_id}
                                    onChange={(val) => setData("room_id", val)}
                                />

                                {/* Check In & Check Out */}
                                <div className="flex space-x-4 mb-4">
                                    <FormInput
                                        label="Check In"
                                        type="date"
                                        value={data.check_in}
                                        onChange={(e) =>
                                            setData("check_in", e.target.value)
                                        }
                                    />
                                    <FormInput
                                        label="Check Out"
                                        type="date"
                                        value={data.check_out}
                                        onChange={(e) =>
                                            setData("check_out", e.target.value)
                                        }
                                    />
                                </div>

                                {/* Customer Selection */}
                                <FormSelect
                                    label="Customer Name"
                                    options={customerOptions}
                                    value={data.customer_id}
                                    onChange={(val) =>
                                        setData("customer_id", val)
                                    }
                                    isDisabled
                                />

                                {/* Guests */}
                                <FormInput
                                    label="Guests"
                                    type="number"
                                    value={data.guests}
                                    onChange={(e) =>
                                        setData("guests", e.target.value)
                                    }
                                />

                                {/* Total Price */}
                                <FormInput
                                    label="Total Price"
                                    value={`Rp ${data.total_price.toLocaleString()}`}
                                    readOnly
                                />

                                {/* Payment Status */}
                                <FormSelect
                                    label="Payment Status"
                                    options={[
                                        { value: "Pending", label: "Pending" },
                                        { value: "Paid", label: "Paid" },
                                        {
                                            value: "Cancelled",
                                            label: "Cancelled",
                                        },
                                    ]}
                                    value={data.payment_status}
                                    onChange={(val) =>
                                        setData("payment_status", val)
                                    }
                                />

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                                    disabled={processing}
                                >
                                    {processing
                                        ? "Updating..."
                                        : "Update Reservation"}
                                </button>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

// Component Input
const FormInput = ({
    label,
    type = "text",
    value,
    onChange,
    readOnly = false,
}) => (
    <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
            {label}
        </label>
        <input
            className={`shadow border rounded w-full py-2 px-3 ${
                readOnly ? "bg-gray-200" : "text-gray-700"
            }`}
            type={type}
            value={value}
            onChange={onChange}
            readOnly={readOnly}
        />
    </div>
);

// Component Select
const FormSelect = ({
    label,
    options,
    value,
    onChange,
    isDisabled = false,
}) => (
    <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
            {label}
        </label>
        <Select
            options={options}
            value={options.find((option) => option.value === value)}
            onChange={(selected) => onChange(selected ? selected.value : "")}
            isDisabled={isDisabled}
            className="shadow border rounded w-full"
        />
    </div>
);

export default UpdateReservation;
