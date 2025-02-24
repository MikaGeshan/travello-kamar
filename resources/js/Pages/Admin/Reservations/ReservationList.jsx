import React, { useState } from "react";
import AdminHeader from "../../../Layouts/AdminHeader";
import AdminSidebar from "../../../Layouts/AdminSidebar";
import { Link } from "@inertiajs/react";
import { FaRegAddressBook, FaSearch } from "react-icons/fa";

function ReservationList({ reservations }) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredReservations = reservations.filter((reservation) =>
        reservation.customer?.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <AdminHeader />
            <div className="flex flex-1">
                <AdminSidebar />
                <main className="flex-1 p-8">
                    <div className="container mx-auto">
                        {/* HEADER */}
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-2">
                                <FaRegAddressBook className="w-6 h-6 text-gray-700" />
                                <h1 className="text-2xl font-bold text-gray-800">
                                    Reservation List
                                </h1>
                            </div>
                            <Link
                                href={"/admin/reservations/create"}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 shadow"
                            >
                                Add New Reservation
                            </Link>
                        </div>

                        {/* SEARCH BAR */}
                        <div className="bg-white rounded-lg shadow p-4 mb-4 flex items-center">
                            <input
                                type="text"
                                placeholder="Search by customer name"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow">
                                <FaSearch />
                            </button>
                        </div>

                        {/* RESERVATION TABLE */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <table className="w-full border rounded-lg overflow-hidden">
                                <thead>
                                    <tr className="text-left bg-gray-50 border-b">
                                        <th className="p-3 w-8">
                                            <input
                                                type="checkbox"
                                                className="rounded border-gray-300"
                                            />
                                        </th>
                                        <th className="p-3">ID</th>
                                        <th className="p-3">Customer Name</th>
                                        <th className="p-3">
                                            Room Name / Type
                                        </th>
                                        <th className="p-3">Check In</th>
                                        <th className="p-3">Check Out</th>
                                        <th className="p-3">Total Price</th>
                                        <th className="p-3">Total Guest</th>
                                        <th className="p-3">Payment Status</th>
                                        <th className="p-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredReservations.length > 0 ? (
                                        filteredReservations.map(
                                            (reservation) => (
                                                <tr
                                                    key={reservation.id}
                                                    className="border-b hover:bg-gray-50 transition"
                                                >
                                                    <td className="p-3">
                                                        <input
                                                            type="checkbox"
                                                            className="rounded border-gray-300"
                                                        />
                                                    </td>
                                                    <td className="p-3">
                                                        {reservation.id}
                                                    </td>
                                                    <td className="p-3">
                                                        {reservation.customer
                                                            ?.name || "N/A"}
                                                    </td>
                                                    <td className="p-3">
                                                        {reservation.room
                                                            ?.jenis_kamar ||
                                                            "N/A"}
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
                                                    <td className="p-3">
                                                        <span
                                                            className={`px-2 py-1 rounded-full text-sm ${
                                                                reservation.payment_status ===
                                                                "Paid"
                                                                    ? "bg-green-100 text-green-800"
                                                                    : "bg-yellow-100 text-yellow-800"
                                                            }`}
                                                        >
                                                            {reservation.payment_status ||
                                                                "Pending"}
                                                        </span>
                                                    </td>
                                                    <td className="p-3">
                                                        <div className="flex gap-2 text-sm">
                                                            <Link
                                                                href={`/admin/reservations/${reservation.id}/edit`}
                                                                className="text-blue-500 hover:underline"
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
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        )
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="10"
                                                className="text-center p-4 text-gray-500"
                                            >
                                                No reservations found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                            {/* PAGINATION */}
                            <div className="flex items-center justify-between mt-4">
                                <div className="text-sm text-gray-600">
                                    Showing 1 to {filteredReservations.length}{" "}
                                    of {filteredReservations.length} results
                                </div>
                                <div className="flex items-center gap-2">
                                    <select className="border rounded px-2 py-1">
                                        <option>10</option>
                                        <option>25</option>
                                        <option>50</option>
                                    </select>
                                    <div className="flex gap-1">
                                        <button className="px-3 py-1 border rounded-l-lg bg-gray-200 hover:bg-gray-300">
                                            &lt;
                                        </button>
                                        <button className="px-3 py-1 bg-blue-500 text-white rounded">
                                            1
                                        </button>
                                        <button className="px-3 py-1 border rounded-r-lg bg-gray-200 hover:bg-gray-300">
                                            &gt;
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default ReservationList;
