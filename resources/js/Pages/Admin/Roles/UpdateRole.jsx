import React from "react";
import { useForm } from "@inertiajs/react";
import AdminHeader from "./../../../Layouts/AdminHeader";
import AdminSidebar from "./../../../Layouts/AdminSidebar";
import Swal from "sweetalert2";

export default function UpdateRole({ role }) {
    const { data, setData, put, processing, errors } = useForm({
        name: role.name,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/admin/roles/${role.id}`, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                Swal.fire({
                    title: "Success!",
                    text: "Role has been updated successfully.",
                    icon: "success",
                    confirmButtonText: "OK",
                });
            },
            onError: () => {
                Swal.fire({
                    title: "Error!",
                    text: "There was an error updating the role.",
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
                <main className="flex-1 p-8 ml-50">
                    <div className="container mx-auto">
                        <h1 className="text-2xl font-bold text-gray-800 mb-6">
                            Edit Role
                        </h1>
                        <div className="rounded px-8 pt-6 pb-8 mb-4">
                            <form onSubmit={handleSubmit}>
                                <div className="flex space-x-4 mb-4">
                                    <div className="w-full">
                                        <label
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                            htmlFor="name"
                                        >
                                            Role Name
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="name"
                                            type="text"
                                            placeholder="Enter role name"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                        />
                                        {errors.name && (
                                            <div className="text-red-500 text-xs">
                                                {errors.name}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center justify-between mt-4">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
                                        type="submit"
                                        disabled={processing}
                                    >
                                        {processing
                                            ? "Updating..."
                                            : "Update Role"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
