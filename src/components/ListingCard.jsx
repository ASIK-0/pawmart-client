import React from 'react';
import { BiHeart, BiMapPin, BiSolidShoppingBag } from 'react-icons/bi';
import { Link } from 'react-router';

const ListingCard = ({ product }) => {

    const isAdoption = product.category == "Pets";
    const priceText = isAdoption ? "Free Adoption" : `${product.Price}`;
    return (
        <div className="group relative bg-pink-50 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-400 overflow-hidden cursor-pointer">

            <div className="relative  overflow-hidden p-5">

                <div className='h-[380px] lg:h-[450px]'>
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full rounded-sm border border-pink-300  group-hover:scale-110 transition-transform duration-800"
                    />
                </div>
                <div className={`absolute top-7 left-6 px-4 py-1.5 rounded-full text-white text-sm font-semibold animate-pulse shadow-lg ${product.category === "Pets" ? "bg-pink-500" :
                    product.category === "Pet Food" ? "bg-amber-500" :
                        product.category === "Accessories" ? "bg-sky-500" :
                            "bg-emerald-500"}`}>
                    {product.category}
                </div>

                {isAdoption && (
                    <div className="absolute top-7 right-6 bg-red-500 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg animate-pulse">
                        FREE
                    </div>
                )}
            </div>
            <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 line-clamp-1 group-hover:text-pink-600 transition-colors">
                    {product.name}
                </h3>

                <div className="flex items-center gap-2 mt-2 text-gray-600">
                    <BiMapPin size={18} />
                    <span className="text-sm">{product.location}</span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                    <p className={`text-2xl font-bold ${isAdoption ? "text-green-600" : "text-pink-600"}`}>
                        {priceText}
                    </p>
                    {isAdoption && <BiHeart className="text-pink-500 fill-pink-500" size={28} />}
                    {!isAdoption && <BiSolidShoppingBag className="text-gray-400" size={24} />}
                </div>
                <Link to={`/listingDetails/${product?._id}`}
                    onClick={''}
                    className="mt-5 block w-full text-center my-btn font-bold py-3.5 rounded-xl"
                >
                    See Details
                </Link>
            </div>
        </div>
    );
};

export default ListingCard;