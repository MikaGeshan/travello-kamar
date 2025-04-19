import React, { useState } from "react";
import { usePage, router } from "@inertiajs/react";
import AdminHeader from "./../../../Layouts/AdminHeader";
import AdminSidebar from "./../../../Layouts/AdminSidebar";
import { FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";

export default function CustomerList() {
    const { customers } = usePage().props;
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCustomers, setSelectedCustomers] = useState([]);

    const handleDelete = (customerId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Data cannot be recovered once deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/admin/customers/${customerId}`, {
                    onSuccess: () => {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Customer has been deleted successfully.",
                            icon: "success",
                            timer: 2000,
                            showConfirmButton: false,
                        });
                    },
                    onError: () => {
                        Swal.fire({
                            title: "Error!",
                            text: "An error occurred while deleting the customer.",
                            icon: "error",
                        });
                    },
                });
            }
        });
    };

    const handleDeleteSelected = () => {
        if (selectedCustomers.length === 0) {
            Swal.fire(
                "Error",
                "Select at least one customer to delete",
                "error"
            );
            return;
        }

        Swal.fire({
            title: "Are you sure?",
            text: `You are about to delete ${selectedCustomers.length} selected customers!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/admin/customers`, {
                    data: { ids: selectedCustomers },
                    onSuccess: () => {
                        Swal.fire(
                            "Deleted!",
                            `${selectedCustomers.length} customers have been deleted successfully.`,
                            "success"
                        );
                        setSelectedCustomers([]);
                    },
                });
            }
        });
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const currentPageCustomerIds = customers
                .slice(start - 1, end)
                .map((customer) => customer.id);
            setSelectedCustomers(currentPageCustomerIds);
        } else {
            setSelectedCustomers([]);
        }
    };

    const handleSelectOne = (customerId) => {
        setSelectedCustomers((prev) => {
            if (prev.includes(customerId)) {
                return prev.filter((id) => id !== customerId);
            } else {
                return [...prev, customerId];
            }
        });
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handlePerPageChange = (event) => {
        setPerPage(parseInt(event.target.value));
        setCurrentPage(1);
    };

    const totalCustomers = customers.length;
    const totalPages = Math.ceil(totalCustomers / perPage);
    const start = (currentPage - 1) * perPage + 1;
    const end = Math.min(currentPage * perPage, totalCustomers);

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
                                        <th className="p-3 w-12">
                                            <input
                                                type="checkbox"
                                                onChange={handleSelectAll}
                                                checked={
                                                    selectedCustomers.length ===
                                                        customers.slice(
                                                            start - 1,
                                                            end
                                                        ).length &&
                                                    customers.slice(
                                                        start - 1,
                                                        end
                                                    ).length > 0
                                                }
                                                className="w-4 h-4 rounded border-gray-300 cursor-pointer"
                                            />
                                        </th>
                                        <th className="p-3">ID</th>
                                        <th className="p-3">Name</th>
                                        <th className="p-3">Email</th>
                                        <th className="p-3">Jenis Kelamin</th>
                                        <th className="p-3">Tanggal Lahir</th>
                                        <th className="p-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customers
                                        .slice(start - 1, end)
                                        .map((customer) => (
                                            <tr
                                                key={customer.id}
                                                className="border-b"
                                            >
                                                <td className="p-3">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedCustomers.includes(
                                                            customer.id
                                                        )}
                                                        onChange={() =>
                                                            handleSelectOne(
                                                                customer.id
                                                            )
                                                        }
                                                        className="w-4 h-4 rounded border-gray-300 cursor-pointer"
                                                    />
                                                </td>
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
                            <div className="flex items-center justify-between p-4">
                                <span>
                                    Showing {start} to {end} of {totalCustomers}{" "}
                                    results
                                </span>
                                <div className="flex items-center">
                                    <select
                                        value={perPage}
                                        onChange={handlePerPageChange}
                                        className="border p-2 rounded mr-2"
                                    >
                                        <option value="5">5</option>
                                        <option value="10">10</option>
                                        <option value="15">15</option>
                                        <option value="20">20</option>
                                    </select>
                                    <span>per page</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <button
                                        disabled={currentPage === 1}
                                        onClick={() =>
                                            handlePageChange(currentPage - 1)
                                        }
                                        className="px-2 py-1 border rounded-l-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                                    >
                                        {"<"}
                                    </button>
                                    {[...Array(totalPages)].map((_, index) => (
                                        <button
                                            key={index + 1}
                                            onClick={() =>
                                                handlePageChange(index + 1)
                                            }
                                            className={`px-3 py-1 border ${
                                                currentPage === index + 1
                                                    ? "bg-blue-500 text-white"
                                                    : "bg-gray-200 hover:bg-gray-300"
                                            }`}
                                        >
                                            {index + 1}
                                        </button>
                                    ))}
                                    <button
                                        disabled={currentPage === totalPages}
                                        onClick={() =>
                                            handlePageChange(currentPage + 1)
                                        }
                                        className="px-2 py-1 border rounded-r-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                                    >
                                        {">"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
