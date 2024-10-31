import React, { useState } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import AdminHeader from "./../../../Layouts/AdminHeader";
import AdminSidebar from "./../../../Layouts/AdminSidebar";
import { FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";

export default function CustomerList() {
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const { customers } = usePage().props;

    const handleDelete = (customerId) => {
        Swal.fire({
            title: "Apakah anda yakin?",
            text: "Data tidak dapat dikembalikan setelah dihapus!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, hapus!",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/admin/customers/${customerId}`, {
                    onSuccess: () => {
                        Swal.fire({
                            title: "Terhapus!",
                            text: "Customer berhasil dihapus.",
                            icon: "success",
                            timer: 2000,
                            showConfirmButton: false
                        });
                    },
                    onError: () => {
                        Swal.fire({
                            title: "Error!",
                            text: "Gagal menghapus customer.",
                            icon: "error",
                        });
                    },
                });
            }
        });
    };

    // const handlePageChange = (newPage) => {
    //     setCurrentPage(newPage);
    // };

    // const handlePerPageChange = (event) => {
    //     setPerPage(parseInt(event.target.value));
    //     setCurrentPage(1);
    // };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <AdminHeader />
            <div className="flex flex-1">
                <AdminSidebar />
                <main className="flex-1 p-8 ml-50">
                    <div className="container mx-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold text-gray-800">
                                Customer List
                            </h1>
                        </div>
                        <div className="bg-white shadow-md rounded-lg overflow-hidden">
                            <div className="p-4 border-b">
                                <div className="flex items-center">
                                    <input
                                        type="text"
                                        placeholder="Search customers"
                                        className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button className="bg-blue-500 text-white px-4 py-3 rounded-r-md">
                                        <FaSearch />
                                    </button>
                                </div>
                            </div>
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-white border-b text-left">
                                        <th className="p-3">ID</th>
                                        <th className="p-3">Name</th>
                                        <th className="p-3">Email</th>
                                        <th className="p-3">Jenis Kelamin</th>
                                        <th className="p-3">Tanggal Lahir</th>
                                        <th className="p-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customers.map((customer) => (
                                        <tr
                                            key={customer.id}
                                            className="border-b"
                                        >
                                            <td className="p-3">
                                                {customer.id}
                                            </td>
                                            <td className="p-3">
                                                {customer.name}
                                            </td>
                                            <td className="p-3">
                                                {customer.email}
                                            </td>
                                            <td className="p-3">
                                                {customer.jeniskelamin}
                                            </td>
                                            <td className="p-3">
                                                {customer.tanggallahir}
                                            </td>
                                            <td className="p-3">
                                                <button
                                                    className="text-red-500 hover:text-red-700 font-bold"
                                                    onClick={() =>
                                                        handleDelete(
                                                            customer.id
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {/* <div className="flex items-center justify-between p-4">
                                <span>Showing 0 to 0 of 0 results</span>
                                <div className="flex items-center">
                                    <select
                                        value={perPage}
                                        onChange={handlePerPageChange}
                                        className="border p-2 rounded mr-4"
                                    >
                                        <option value="5">5</option>
                                        <option value="10">10</option>
                                        <option value="15">15</option>
                                        <option value="20">20</option>
                                    </select>
                                    <span>per page</span>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
