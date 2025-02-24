import React, { useEffect } from "react";
import AdminHeader from "../../../Layouts/AdminHeader";
import AdminSidebar from "../../../Layouts/AdminSidebar";
import { Link } from "@inertiajs/react";

function ReservationList({ reservations }) {
    useEffect(() => {
        console.log(reservations);
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <AdminHeader />
            <div className="flex flex-1">
                <AdminSidebar />
                <main className="flex-1 p-8">
                    <div className="container mx-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold text-gray-800">
                                Reservation List
                            </h1>
                            <Link
                                href={"/admin/reservations/create"}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Add New Reservation
                            </Link>
                        </div>
                        <div className="bg-white shadow-md rounded-lg overflow-hidden">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-200 border-b text-left">
                                        <th className="p-3">ID</th>
                                        <th className="p-3">Customer Name</th>
                                        <th className="p-3">
                                            Room Name / Type
                                        </th>
                                        <th className="p-3">Check In Date</th>
                                        <th className="p-3">Check Out Date</th>
                                        <th className="p-3">Total Price</th>
                                        <th className="p-3">Total Guest</th>
                                        <th className="p-3">Payment Status</th>
                                        <th className="p-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reservations.length > 0 ? (
                                        reservations.map((reservation) => (
                                            <tr
                                                key={reservation.id}
                                                className="border-b"
                                            >
                                                <td className="p-3">
                                                    {reservation.id}
                                                </td>
                                                <td className="p-3">
                                                    {reservation.customer
                                                        ?.name || "N/A"}
                                                </td>
                                                <td className="p-3">
                                                    {reservation.room
                                                        ?.jenis_kamar || "N/A"}
                                                </td>
                                                <td className="p-3">
                                                    {reservation.check_in ||
                                                        "N/A"}
                                                </td>
                                                <td className="p-3">
                                                    {reservation.check_out ||
                                                        "N/A"}
                                                </td>
                                                <td className="p-3">
                                                    Rp{" "}
                                                    {reservation.total_price
                                                        ? reservation.total_price.toLocaleString()
                                                        : "0"}
                                                </td>
                                                <td className="p-3">
                                                    {reservation.guests ||
                                                        "N/A"}
                                                </td>
                                                <td
                                                    className={`p-3 ${
                                                        reservation.payment_status ===
                                                        "Paid"
                                                            ? "text-green-600"
                                                            : "text-red-600"
                                                    }`}
                                                >
                                                    {reservation.payment_status ||
                                                        "Pending"}
                                                </td>
                                                <td className="p-3 flex space-x-2">
                                                    <Link
                                                        href={`/admin/reservations/${reservation.id}`}
                                                        className="text-blue-500 hover:underline"
                                                    >
                                                        View
                                                    </Link>
                                                    <Link
                                                        href={`/admin/reservations/${reservation.id}/edit`}
                                                        className="text-yellow-500 hover:underline"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() =>
                                                            confirm(
                                                                "Are you sure you want to delete this?"
                                                            )
                                                        }
                                                        className="text-red-500 hover:underline"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="9"
                                                className="text-center p-4 text-gray-500"
                                            >
                                                No reservations available.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default ReservationList;
