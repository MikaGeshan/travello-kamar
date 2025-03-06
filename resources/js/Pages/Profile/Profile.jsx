import { useForm } from "@inertiajs/react";
import React from "react";
import Sidebar from "../../Layouts/ProfileSidebar";
import ProfileHeader from "../../Layouts/ProfileHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Profile({
    userName,
    userEmail,
    userNomorTelepon,
    userJenisKelamin,
    userTanggalLahir,
}) {
    const { data, setData, post, processing, errors } = useForm({
        name: userName,
        email: userEmail,
        nomor_telepon: userNomorTelepon || "",
        jeniskelamin: userJenisKelamin || "",
        tanggallahir: userTanggalLahir || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!data.jeniskelamin) {
            toast.error("Silakan pilih jenis kelamin");
            return;
        }
        post("/profile/update", {
            onSuccess: () => {
                toast.success("Profile successfully updated");
            },
            onError: () => {
                toast.error("An error occurred while updating profile");
            },
        });
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
                        Personal Information
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-gray-700"
                            >
                                Nama Lengkap
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className="w-full border border-gray-300 rounded p-2"
                            />
                            {errors.name && (
                                <div className="text-red-500">
                                    {errors.name}
                                </div>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-gray-700"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                className="w-full border border-gray-300 rounded p-2"
                            />
                            {errors.email && (
                                <div className="text-red-500">
                                    {errors.email}
                                </div>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="text"
                                className="block text-gray-700"
                            >
                                Phone Number
                            </label>
                            <input
                                type="text"
                                name="nomor_telepon"
                                value={data.nomor_telepon || ""}
                                onChange={(e) =>
                                    setData("nomor_telepon", e.target.value)
                                }
                                className="w-full border border-gray-300 rounded p-2"
                            />
                            {errors.nomor_telepon && (
                                <div className="text-red-500">
                                    {errors.nomor_telepon}
                                </div>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="jeniskelamin"
                                className="block text-gray-700"
                            >
                                Jenis Kelamin
                            </label>
                            <select
                                name="jeniskelamin"
                                value={data.jeniskelamin}
                                onChange={(e) => {
                                    if (e.target.value === "default") {
                                        setData("jeniskelamin", "");
                                        toast.error(
                                            "Silakan pilih jenis kelamin yang valid"
                                        );
                                    } else {
                                        setData("jeniskelamin", e.target.value);
                                    }
                                }}
                                className="w-full border border-gray-300 rounded p-2"
                            >
                                <option value="default">
                                    Pilih Jenis Kelamin
                                </option>
                                <option value="Laki-Laki">Laki-Laki</option>
                                <option value="Perempuan">Perempuan</option>
                            </select>
                            {errors.jeniskelamin && (
                                <div className="text-red-500">
                                    {errors.jeniskelamin}
                                </div>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="tanggallahir"
                                className="block text-gray-700"
                            >
                                Tanggal Lahir
                            </label>
                            <input
                                type="date"
                                name="tanggallahir"
                                value={data.tanggallahir}
                                onChange={(e) =>
                                    setData("tanggallahir", e.target.value)
                                }
                                className="w-full border border-gray-300 rounded p-2"
                            />
                            {errors.tanggallahir && (
                                <div className="text-red-500">
                                    {errors.tanggallahir}
                                </div>
                            )}
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button
                                type="button"
                                className="px-4 py-2 border border-gray-300 rounded text-gray-700"
                            >
                                Cancel{" "}
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded"
                                disabled={processing}
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
