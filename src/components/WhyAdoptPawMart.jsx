import React, { useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css"; 

const WhyAdoptPawMart = () => {
    useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
    return (
        <div>
            <section  data-aos="fade-up" className="py-20">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-pink-600 mb-6">
                        Why Adopt from PawMart?
                    </h2>
                    <p className="text-lg max-w-3xl mx-auto leading-relaxed mb-12">
                        Every pet deserves a loving home. When you adopt from us, you're not just bringing home a friend —
                        you're saving a life and fighting against puppy mills & unethical breeding.
                    </p>

                    <div className="grid md:grid-cols-3 gap-10">
                        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                            <div className="w-16 h-16 mx-auto mb-5 bg-pink-100 rounded-full flex items-center justify-center">
                                <span className="text-3xl">❤️</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">You Save a Life</h3>
                            <p className="text-gray-600">Each adoption creates space for another rescued pet.</p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                            <div className="w-16 h-16 mx-auto mb-5 bg-amber-100 rounded-full flex items-center justify-center">
                                <span className="text-3xl">🛡️</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">Health Checked & Vaccinated</h3>
                            <p className="text-gray-600">All our pets are vet-checked, vaccinated & dewormed.</p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                            <div className="w-16 h-16 mx-auto mb-5 bg-emerald-100 rounded-full flex items-center justify-center">
                                <span className="text-3xl">🏡</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">Lifetime Support</h3>
                            <p className="text-gray-600">We’re always here for you — even after adoption!</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default WhyAdoptPawMart;