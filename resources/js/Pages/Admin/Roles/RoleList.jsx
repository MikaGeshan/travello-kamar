import React, { useState } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import AdminHeader from "./../../../Layouts/AdminHeader";
import AdminSidebar from "./../../../Layouts/AdminSidebar";
import { FaSearch, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

export default function RoleList() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <AdminHeader />
            <div className="flex flex-1">
                <AdminSidebar />
                <main className="flex-1 p-8 ml-50">
                    <div className="container mx-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold text-gray-800">
                                User List
                            </h1>
                            <Link
                                href="/admin/roles/create"
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md text-base"
                            >
                                Add New Role
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
