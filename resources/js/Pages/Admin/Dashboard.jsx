import React from "react";
import { usePage } from "@inertiajs/react";
import AdminHeader from "../../Layouts/AdminHeader";
import AdminSidebar from "../../Layouts/AdminSidebar";
import { Bar, Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

export default function Dashboard() {
    const { auth, totalRooms, totalReservation, totalKeuntungan } =
        usePage().props;

    const totalKamar = {
        labels: ["Total Kamar", "Total Reservasi"],
        datasets: [
            {
                label: "Jumlah",
                data: [totalRooms, totalReservation],
                backgroundColor: ["#4CAF50", "#FFC107"],
            },
        ],
    };

    const totalPendapatan = {
        labels: ["Total Pendapatan"],
        datasets: [
            {
                data: [totalKeuntungan],
                backgroundColor: ["#4CAF50"],
            },
        ],
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <AdminHeader user={auth.user} />
            <div className="flex flex-1">
                <AdminSidebar />
                <main className="flex flex-col items-center justify-center flex-1 p-8">
                    <div className="max-w-4xl w-full mx-auto">
                        <h1 className="text-3xl font-semibold text-gray-800 text-center">
                            Dashboard
                        </h1>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 text-center">
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h2 className="text-lg font-semibold text-gray-700">
                                    Total Kamar
                                </h2>
                                <p className="text-2xl font-bold text-blue-600">
                                    {totalRooms}
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h2 className="text-lg font-semibold text-gray-700">
                                    Total Reservasi
                                </h2>
                                <p className="text-2xl font-bold text-green-600">
                                    {totalReservation}
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h2 className="text-lg font-semibold text-gray-700">
                                    Total Pendapatan
                                </h2>
                                <p className="text-2xl font-bold text-red-600">
                                    Rp {totalKeuntungan.toLocaleString("id-ID")}
                                </p>
                            </div>
                        </div>

                        {/* Grafik */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">
                                    Jumlah Kamar & Reservasi
                                </h2>
                                <Bar data={totalKamar} />
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow">
                                <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">
                                    Total Pendapatan
                                </h2>
                                <Doughnut data={totalPendapatan} />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
