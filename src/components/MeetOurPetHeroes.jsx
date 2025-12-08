import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import AOS from "aos";
import "aos/dist/aos.css";

const MeetOurPetHeroes = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
    return (
        <div>
            <div data-aos="fade-up" className="max-w-7xl mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-bold text-center text-pink-600 mb-4">
                    Meet Our Pet Heroes
                </h2>
                <p className="text-center text-lg mb-12 max-w-2xl mx-auto">
                    The Real-Life Heroes Making the Pet World Kinder, Saluting the Lifesavers Who Fight for Every Paw
                </p>
                <div className="grid md:grid-cols-4 gap-8">
                    <div className="text-center py-10 shadow-lg hover:shadow-xl transition-shadow bg-pink-50 p-3 rounded-2xl">
                        <div className="overflow-hidden justify-items-center rounded-2xl mb-4">
                            <img
                                src="https://i.pinimg.com/1200x/16/7a/55/167a552a996517263576cd34ff54597b.jpg"
                                alt="Rina & Milo"
                                className="w-50 h-50 rounded-full border object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                        <h3 className="font-bold text-xl text-gray-800">Alif Khan</h3>
                        <p className="text-pink-600 font-medium">Dog Caregiver</p>
                        <p className="text-gray-600 mt-2 text-sm">Arif fosters street dogs and ensures they get medical care before adoption</p>
                    </div>
                    <div className="text-center py-10 shadow-lg hover:shadow-xl transition-shadow bg-pink-50 p-3 rounded-2xl">
                        <div className="overflow-hidden justify-items-center rounded-2xl mb-4">
                            <img
                                src="https://i.pinimg.com/736x/f9/f3/fd/f9f3fde7951dc8ae466ae03b173870c8.jpg"
                                alt=""
                                className="w-50 h-50 border rounded-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                        <h3 className="font-bold text-xl text-gray-800">Sadia Rahman</h3>
                        <p className="text-pink-600 font-medium">Pet Volunteer</p>
                        <p className="text-gray-600 mt-2 text-sm">Sadia organizes weekend pet drives and helps abandoned animals find homes</p>
                    </div>
                    <div className="text-center py-10 shadow-lg hover:shadow-xl transition-shadow bg-pink-50 p-3 rounded-2xl">
                        <div className="overflow-hidden justify-items-center rounded-2xl mb-4">
                            <img
                                src="https://i.pinimg.com/1200x/6f/1e/31/6f1e314d9b7e1bd2c50380f7c0c7c1ef.jpg"
                                alt="Tahi & Taisy"
                                className="w-50 h-50 border rounded-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                        <h3 className="font-bold text-xl text-gray-800">Tahiya Tahi</h3>
                        <p className="text-pink-600 font-medium">Cat Adopter</p>
                        <p className="text-gray-600 mt-2 text-sm">Tahi has opened her heart and home to 3 rescued cats and gives them endless love</p>
                    </div>
                    <div className="text-center py-10 shadow-lg hover:shadow-xl transition-shadow bg-pink-50 p-3 rounded-2xl">
                        <div className="overflow-hidden justify-items-center rounded-2xl mb-4">
                            <img
                                src="https://i.pinimg.com/736x/5f/f1/b6/5ff1b63d0b41e13d55eb075e2cf5ae2a.jpg"
                                alt="Rina & Milo"
                                className="w-50 h-50 rounded-full border object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                        <h3 className="font-bold text-xl text-gray-800">Tanvir Ahmed</h3>
                        <p className="text-pink-600 font-medium">Street Feeder Legend</p>
                        <p className="text-gray-600 mt-2 text-sm">Every single night after office, Tanvir takes his bike and feeds 40+ street dogs & cats</p>
                    </div>
                </div>

                <div className="text-center my-16">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="my-btn px-5 py-3 font-bold text-2xl shadow-2xl"
                    >
                        Be a Pet Hero Too
                    </button>
                </div>
                {isModalOpen && (
                    <div
                        className="fixed inset-0 mx-auto max-w-[500px] flex items-center justify-center z-50 p-4"
                        onClick={() => setIsModalOpen(false)}
                    >
                        <div
                            className="bg-white rounded-3xl max-w-4xl w-full p-10 relative shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-2 right-3 text-3xl text-gray-500 hover:text-gray-800"
                            >
                                ×
                            </button>

                            <h2 className="text-2xl font-bold text-pink-600 text-center mb-3">
                                Choose How You Want to Help
                            </h2>
                            <p className="text-center text-gray-600 text-sm mb-5">
                                Every small action counts. Be a hero today!
                            </p>

                            <div className="grid grid-cols-1 gap-8">
                                <Link to="/add-listing" onClick={() => setIsModalOpen(false)} className="bg-pink-600 text-white p-4 rounded-3xl text-center hover:scale-105 transition shadow-xl">
                                    <span className="text-2xl mb-4">Add Pet for Adoption</span>
                                    <p>Help a rescued pet</p>
                                </Link>

                                <Link to="" onClick={() => setIsModalOpen(false)} className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-3xl text-center hover:scale-105 transition shadow-xl">
                                    <span className="text-2xl mb-4">Donate Food/Money</span>
                                    <p>Support street animal feeding</p>
                                </Link>

                                <Link to="" onClick={() => setIsModalOpen(false)} className="bg-green-600 text-white p-4 rounded-2xl text-center hover:scale-105 transition shadow-xl">
                                    <span className="text-3xl mb-4">Become a Volunteer</span>
                                    <p>Join weekend rescue drives</p>
                                </Link>

                                <Link to="/report" onClick={() => setIsModalOpen(false)} className="bg-orange-600 text-white p-4 rounded-3xl text-center hover:scale-105 transition shadow-xl">
                                    <span className="text-2xl mb-4">Report Animal in Need</span>
                                    <p>Help us rescue faster</p>
                                </Link>
                            </div>

                            <p className="text-center mt-12 text-gray-600 text-lg font-medium">
                                You are one click away from becoming a real-life hero
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MeetOurPetHeroes;