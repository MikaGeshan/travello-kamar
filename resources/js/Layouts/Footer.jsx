import React from "react";
import sekolah from "../../../storage/app/public/sekolah.png";
import { FaInstagram, FaFacebook, FaYoutube, FaLinkedin } from "react-icons/fa";
import { FiHome } from "react-icons/fi";

function Footer() {
    return (
        <div className="w-screen bg-white flex flex-col items-center py-8 text-black relative">
            <div className="flex justify-between w-screen max-w-full px-8 md:px-16 lg:px-24">
                <div className="flex flex-col space-y-4">
                    <div className="text-center flex flex-col items-center">
                        <FiHome className="mb-2 text-3xl" />
                        <h1 className="text-4xl font-bold text-blue-500 mb-2">
                            Holiday Inn
                        </h1>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex flex-col">
                            <h1 className="text-lg font-bold">
                                Follow Us on Social Media
                            </h1>
                            <div className="flex space-x-6 mt-2">
                                <a
                                    href="https://instagram.com"
                                    target="_blank"
                                    rel="nothing"
                                    className="text-2xl hover:text-pink-500"
                                >
                                    <FaInstagram />
                                </a>
                                <a
                                    href="https://facebook.com"
                                    target="_blank"
                                    rel="nothing"
                                    className="text-2xl hover:text-blue-600"
                                >
                                    <FaFacebook />
                                </a>
                                <a
                                    href="https://youtube.com"
                                    target="_blank"
                                    rel="nothing"
                                    className="text-2xl hover:text-red-600"
                                >
                                    <FaYoutube />
                                </a>
                                <a
                                    href="https://linkedin.com"
                                    target="_blank"
                                    rel="nothing"
                                    className="text-2xl hover:text-blue-500"
                                >
                                    <FaLinkedin />
                                </a>
                            </div>
                        </div>
                        <div className="flex flex-col mt-4">
                            <h1 className="font-bold">Contact Us</h1>
                            <h2>travello@gmail.com</h2>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <div className="text-center">
                        <h1 className="text-lg font-bold">Supported By</h1>
                        <img
                            src={sekolah}
                            alt="SMK Negeri 2 Jakarta"
                            className="max-w-[200px] mx-auto mt-2"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
