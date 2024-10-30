import { Link, usePage } from "@inertiajs/react";
import React from "react";

export default function ProfileHeader() {
    const { url } = usePage();

    return (
        <div className="border-b border-gray-200 mb-6">
            <Link
                href="/profile"
                className={`inline-block py-2 px-4 font-medium ${
                    url === "/profile"
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-600 hover:text-blue-600"
                }`}
            >
                Account Information
            </Link>
            <Link
                href="/profile/password"
                className={`inline-block py-2 px-4 font-medium ${
                    url === "/profile/password"
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-600 hover:text-blue-600"
                }`}
            >
                Security and Password
            </Link>
        </div>
    );
}
