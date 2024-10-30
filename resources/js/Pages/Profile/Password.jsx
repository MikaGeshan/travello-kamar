import { useForm } from "@inertiajs/react";
import React, { useState } from "react";
import Sidebar from "../../Layouts/ProfileSidebar";
import ProfileHeader from "../../Layouts/ProfileHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Password() {
    const {
        data,
        setData,
        post,
        delete: destroy,
        processing,
        errors,
    } = useForm({
        old_password: "",
        new_password: "",
        new_password_confirmation: "",
    });

    const [isTyping, setIsTyping] = useState(false);

    const handleInputChange = (e) => {
        setIsTyping(true);
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/profile/update-password", {
            onSuccess: () => {
                toast.success("Password berhasil diperbarui");
                setData({
                    old_password: "",
                    new_password: "",
                    new_password_confirmation: "",
                });
                setIsTyping(false);
            },
        });
    };

    const handleDeleteAccount = () => {
        const confirmDelete = () => {
            destroy("/profile/delete-account", {
                onSuccess: () => {
                    toast.success("Your account has been successfully deleted");
                },
            });
        };

        toast.warn(
            <div>
                <p>Are you sure you want to delete your account?</p>
                <div className="mt-2">
                    <button
                        onClick={confirmDelete}
                        className="bg-red-500 text-white px-3 py-1 rounded mr-2"
                    >
                        Yes, delete
                    </button>
                    <button
                        onClick={() => toast.dismiss()}
                        className="bg-gray-500 text-white px-3 py-1 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </div>,
            {
                position: "top-center",
                autoClose: false,
                closeOnClick: false,
                draggable: false,
            }
        );
    };

    return (
        <div className="flex bg-gray-100 min-h-screen">
            <Sidebar />
            <div className="flex-1 bg-white p-6">
                <h1 className="text-2xl font-semibold mb-6">
                    Profile Settings
                </h1>
                <ProfileHeader />
                <div className="mb-8">
                    <h2 className="text-xl font-medium mb-4">
                        Manage Password
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label
                                htmlFor="old_password"
                                className="block text-gray-700"
                            >
                                Old Password
                            </label>
                            <input
                                type="password"
                                name="old_password"
                                value={data.old_password}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded p-2"
                            />
                            {errors.old_password && (
                                <div className="text-red-500">
                                    {errors.old_password}
                                </div>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="new_password"
                                className="block text-gray-700"
                            >
                                New Password
                            </label>
                            <input
                                type="password"
                                name="new_password"
                                value={data.new_password}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded p-2"
                            />
                            {errors.new_password && (
                                <div className="text-red-500">
                                    {errors.new_password}
                                </div>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="new_password_confirmation"
                                className="block text-gray-700"
                            >
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                name="new_password_confirmation"
                                value={data.new_password_confirmation}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded p-2"
                            />
                        </div>
                        {isTyping && (
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setData({
                                            old_password: "",
                                            new_password: "",
                                            new_password_confirmation: "",
                                        });
                                        setIsTyping(false);
                                    }}
                                    className="px-4 py-2 border border-gray-300 rounded text-gray-700"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded"
                                    disabled={processing}
                                >
                                    Save
                                </button>
                            </div>
                        )}
                    </form>
                </div>
                <div className="mb-8">
                    <h2 className="text-xl font-medium mb-4">Delete Account</h2>
                    <div className="bg-white shadow-lg p-4 max-w-3xl">
                        <div className="flex items-center">
                            <p className="mr-4">
                                Deleting your account is irreversible and will
                                remove all of your information from our system
                            </p>
                            <button
                                onClick={handleDeleteAccount}
                                className="text-blue-500 text-lg hover:underline"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
}
