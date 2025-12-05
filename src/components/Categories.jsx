import React from 'react';
import { Link } from "react-router";
import p1 from '../assets/logo/pet1.png'
import p2 from '../assets/logo/food.png'
import p3 from '../assets/logo/ac.png'
import p4 from '../assets/logo/careProduct.png'

const Categories = () => {
    return (
        <div className='w-11/12 mx-auto px-4 sm:px-6'>
            <h1 className='font-bold text-3xl md:text-5xl text-center text-pink-600'>Categories</h1>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 py-10 gap-8 justify-center justify-items-center'>
                <Link to="/category-filtered-product/Pets">
                    <div className="group p-5 w-[250px] h-[150px] shadow-md rounded-xl bg-pink-100/50 cursor-pointer 
                        flex flex-col items-center justify-center
                        hover:shadow-xl hover:-translate-y-1 hover:bg-pink-100/80
                        transition-all duration-400 ease-out">
                        <img src={p1} className="w-20 mb-2 group-hover:scale-110 transition-transform duration-300" alt="Pets" />
                        <h3 className="font-semibold text-gray-800">Pets</h3>
                    </div>
                </Link>
                <Link to="/category-filtered-product/Pet Food">
                    <div className="group p-5 w-[250px] h-[150px] shadow-md rounded-xl bg-amber-100/50 cursor-pointer 
                        flex flex-col items-center justify-center
                        hover:shadow-xl hover:-translate-y-1 hover:bg-amber-100/80
                        transition-all duration-400 ease-out">
                        <img src={p2} className="w-20 mb-2 group-hover:scale-110 transition-transform duration-300" alt="Pet Food" />
                        <h3 className="font-semibold text-gray-800">Pet Food</h3>
                    </div>
                </Link>
                <Link to="/category-filtered-product/Accessories">
                    <div className="group p-5 w-[250px] h-[150px] shadow-md rounded-xl bg-sky-100/95 cursor-pointer 
                        flex flex-col items-center justify-center
                        hover:shadow-xl hover:-translate-y-1 hover:bg-sky-100
                        transition-all duration-400 ease-out">
                        <img src={p3} className="w-20 mb-2 group-hover:scale-110 transition-transform duration-300" alt="Accessories" />
                        <h3 className="font-semibold text-gray-800">Accessories</h3>
                    </div>
                </Link>
                <Link to="/category-filtered-product/Pet Care Products">
                    <div className="group p-5 w-[250px] h-[150px] shadow-md rounded-xl bg-emerald-100/50 cursor-pointer 
                        flex flex-col items-center justify-center
                        hover:shadow-xl hover:-translate-y-1 hover:bg-emerald-100/80
                        transition-all duration-400 ease-out">
                        <img src={p4} className="w-20 mb-2 group-hover:scale-110 transition-transform duration-300" alt="Pet Care" />
                        <h3 className="font-semibold text-gray-800">Pet Care Products</h3>
                    </div>
                </Link>

            </div>
        </div>
    );
};

export default Categories;
