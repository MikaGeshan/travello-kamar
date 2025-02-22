import { Link } from "@inertiajs/react";
import React from "react";

export default function RoomCard({ id, name, image, facilities, price, type }) {
    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    return (
        <div className="flex border rounded-lg shadow-lg p-4 bg-white">
            <div className="w-1/3">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-40 object-cover rounded-lg"
                />
            </div>
            <div className="w-2/3 pl-4">
                <h2 className="text-lg font-bold">{name}</h2>
                <div className="flex items-center justify-between border rounded-md p-3 mt-3">
                    <div>
                        <h3 className="font-semibold">{type}</h3>
                        <p className="text-xs text-gray-500 mt-1">
                            {facilities}
                        </p>
                    </div>
                    <div className="flex flex-col items-end">
                        <p className="text-red-500 font-bold text-lg">
                            Rp {formatPrice(price)}
                        </p>
                        <p className="text-xs text-gray-500 mb-2">
                            Di luar pajak & biaya
                        </p>
                        <Link
                            href={`/booking/${id}`}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                            Pilih
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
