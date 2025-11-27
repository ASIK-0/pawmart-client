import React from 'react';
import { NavLink } from 'react-router';
import logo from '../assets/logo/pngegg.png';

const Footer = () => {
    return (
        <footer className="bg-pink-100 border-t border-pink-200">
            <div className="px-[10px] md:px-[80px] py-[10px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="flex flex-col items-start">
                        <div className="flex items-center gap-2 mb-4">
                            <img className="w-[45px]" src={logo} alt="PawMart Logo" />
                            <h2 className="font-bold text-2xl">
                                <span className="text-black">Paw</span>
                                <span className="text-pink-600">Mart</span>
                            </h2>
                        </div>
                        <p className="text-gray-700 text-xl max-w-xs">
                            PawMart connects local pet owners and buyers for adoption and pet care products.
                        </p>
                        <div className="flex gap-4 mt-5">
                            <a href="https://www.facebook.com/share/14SJAeG8YZL/"><i className="fa-brands fa-facebook"></i></a>
                            <a href=""><i className="fa-brands fa-x-twitter"></i></a>
                            <a href="https://www.instagram.com/_ash1ik_?igsh=MW5hZWFheGtoaWNqNw=="><i className="fa-brands fa-instagram"></i></a>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold text-2xl text-gray-800 mb-4">Quick Links</h3>
                        <ul className="space-y-3">
                            <li>
                                <NavLink to="/" className="text-gray-600 hover:text-pink-600 transition font-medium">
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/pets-supplies" className="text-gray-600 hover:text-pink-600 transition font-medium">
                                    Pets & Supplies
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/contact" className="text-gray-600 hover:text-pink-600 transition font-medium">
                                    Contact
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/terms" className="text-gray-600 hover:text-pink-600 transition font-medium">
                                    Terms & Conditions
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-2xl text-gray-800 mb-4">Contact Us</h3>
                        <div className="space-y-3 text-gray-600 text-sm">
                            <div className="flex items-center gap-2">
                                <span className="text-pink-600"><i className="fa-solid fa-house"></i></span>
                                <p>Dhaka, Bangladesh</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-pink-600"><i className="fa-regular fa-envelope"></i></span>
                                <p>exe.ashiqui@gmail.com</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-pink-600">☎️</span>
                                <p>+880 123 456 789</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-10 pt-6 border-t border-pink-200 text-center text-gray-600 text-sm">
                    <p>© 2025 PawMart. All rights reserved.</p>
                    <p className="mt-1 text-xs text-gray-500">
                        Developed with ❤️ by Muhammad Asikulla Atik
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;