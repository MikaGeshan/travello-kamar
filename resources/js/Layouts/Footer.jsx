import React from "react";
import gojek from "../../../public/storage/logo-gojek.png";
import tokopedia from "../../../public/storage/logo-tokopedia.png";
import mastercard from "../../../public/storage/mastercard.png";
import bca from "../../../public/storage/bca.png";
import telkomsel from "../../../public/storage/telkomsel.png";
import bri from "../../../public/storage/bri.png";
import mandiri from "../../../public/storage/mandiri.png";
import sekolah from "../../../storage/app/public/sekolah.png";
import { FaInstagram, FaFacebook, FaYoutube, FaLinkedin } from "react-icons/fa";

function Footer() {
    return (
        <div className="w-full bg-white flex flex-col items-center py-8 text-black relative">
            <div className="w-full flex flex-col items-center">
                <h2 className="text-2xl font-bold mb-4">Our Partners</h2>
                <div className="relative w-full overflow-hidden flex justify-center">
                    <div className="flex animate-marquee space-x-10">
                        <img
                            src={gojek}
                            alt="Gojek"
                            className="w-40 h-20 object-contain"
                        />
                        <img
                            src={tokopedia}
                            alt="Tokopedia"
                            className="w-40 h-20 object-contain"
                        />
                        <img
                            src={mastercard}
                            alt="Mastercard"
                            className="w-40 h-20 object-contain"
                        />
                        <img
                            src={bca}
                            alt="BCA"
                            className="w-40 h-20 object-contain"
                        />
                        <img
                            src={bri}
                            alt="BRI"
                            className="w-40 h-20 object-contain"
                        />
                        <img
                            src={mandiri}
                            alt="Mandiri"
                            className="w-40 h-20 object-contain"
                        />
                        <img
                            src={telkomsel}
                            alt="Telkomsel"
                            className="w-40 h-20 object-contain"
                        />
                    </div>
                </div>
            </div>
            <div className="w-full max-w-screen-xl flex flex-col md:flex-row justify-between items-center mt-8 px-4 md:px-8 lg:px-16">
                <div className="flex flex-col">
                    <h1 className="text-lg font-bold">
                        Follow Us on Social Media
                    </h1>
                    <div className="flex space-x-6 mt-2">
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-2xl hover:text-pink-500"
                        >
                            <FaInstagram />
                        </a>
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-2xl hover:text-blue-600"
                        >
                            <FaFacebook />
                        </a>
                        <a
                            href="https://youtube.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-2xl hover:text-red-600"
                        >
                            <FaYoutube />
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-2xl hover:text-blue-500"
                        >
                            <FaLinkedin />
                        </a>
                    </div>
                </div>
                <div className="text-center md:text-left">
                    <h1 className="font-bold">Contact Us</h1>
                    <h2>travello@gmail.com</h2>
                </div>
                <div className="flex flex-col items-center">
                    <h1 className="text-lg font-bold">Supported By</h1>
                    <img
                        src={sekolah}
                        alt="SMK Negeri 2 Jakarta"
                        className="max-w-[200px] mx-auto mt-2"
                    />
                </div>
            </div>
        </div>
    );
}

export default Footer;
