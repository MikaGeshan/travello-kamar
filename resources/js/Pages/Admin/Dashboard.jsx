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
    const { auth } = usePage().props;

    const roomStats = {
        labels: ["Deluxe", "Suite", "Standard"],
        datasets: [
            {
                label: "Reservasi",
                data: [30, 50, 40],
                backgroundColor: ["#4CAF50", "#FFC107", "#2196F3"],
            },
        ],
    };

    const revenueStats = {
        labels: ["Total Pendapatan"],
        datasets: [
            {
                data: [5000000],
                backgroundColor: ["#4CAF50"],
            },
        ],
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <AdminHeader user={auth.user} />
            <div className="flex flex-1">
                <AdminSidebar />
                <main className="flex-1 p-8 ml-64">
                    <div className="container mx-auto">
                        <h1 className="text-2xl font-semibold text-gray-800">
                            Dashboard
                        </h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                            {/* Chart Statistik Kamar */}
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h2 className="text-lg font-semibold text-gray-700 mb-4">
                                    Kamar Terpopuler
                                </h2>
                                <Bar data={roomStats} />
                            </div>

                            {/* Chart Total Pendapatan */}
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h2 className="text-lg font-semibold text-gray-700 mb-4">
                                    Total Pendapatan
                                </h2>
                                <Doughnut data={revenueStats} />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
