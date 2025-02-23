import React from "react";
import AdminHeader from "../../../Layouts/AdminHeader";
import AdminSidebar from "../../../Layouts/AdminSidebar";
import { Link } from "@inertiajs/react";
import { FaBed } from "react-icons/fa";

function ReservationList() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <AdminHeader />
            <div className="flex flex-1">
                <AdminSidebar />
                <main className="flex-1 p-8">
                    <div className="container mx-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                                <FaBed className="mr-3" /> Reservation List
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
                                        <th className="p-3 w-12">#</th>
                                        <th className="p-3">ID</th>
                                        <th className="p-3">Room Name</th>
                                        <th className="p-3">Room Type</th>
                                        <th className="p-3">Price</th>
                                        <th className="p-3">Facilities</th>
                                        <th className="p-3">Status</th>
                                        <th className="p-3">Image</th>
                                        <th className="p-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td
                                            colSpan="9"
                                            className="text-center p-4 text-gray-500"
                                        >
                                            No reservations available.
                                        </td>
                                    </tr>
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
