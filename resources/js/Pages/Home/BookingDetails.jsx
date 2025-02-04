import React from "react";

function BookingDetails() {
    return (
        <div className="container p-4">
            <div className="booking-section bg-white p-4 rounded-lg shadow-md">
                <h1 className="text-xl font-bold">Booking Details</h1>
                <p className="text-gray-600">
                    Make sure you fill in all the information on this page
                    correctly before proceeding to checkout.
                </p>
            </div>
            <div className="booking-form bg-white p-4 rounded-lg shadow-md mt-4">
                <h2 className="text-lg font-semibold">Data Pemesan</h2>
                <p className="text-gray-600">
                    Isi semua kolom dengan benar untuk memastikan kamu dapat
                    menerima voucher konfirmasi pemesanan di email yang
                    dicantumkan.
                </p>
                <label className="block mt-2">Nama Lengkap</label>
                <input
                    type="text"
                    className="w-full border p-2 rounded"
                    placeholder="Name"
                />
                <label className="block mt-2">Email</label>
                <input
                    type="email"
                    className="w-full border p-2 rounded"
                    placeholder="Email"
                />
                <label className="block mt-2">Nomor Telepon</label>
                <input
                    type="tel"
                    className="w-full border p-2 rounded"
                    placeholder="Phone Number"
                />
            </div>
        </div>
    );
}

export default BookingDetails;
