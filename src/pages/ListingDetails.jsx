import React, { use, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { MapPin, Calendar, Mail, Heart, ShoppingBag } from 'lucide-react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

const ListingDetails = () => {

    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const { loading} = use(AuthContext)

    useEffect(() => {
        axios.get(`http://localhost:3000/products/${id}`)
            .then(res => {
                setProduct(res.data.result)
            })
            .catch(err => {
                console.log(err)
            })
    }, [id])

    if (loading || !product) {
        return <LoadingSpinner />
    }

    const isAdoption = product?.category === "Pets";

    return (
        <div className="w-11/12 mx-auto py-8 mb-10 px-4">
            <div className="max-w-390 mx-auto">
                <Link to={'/pets-supplies'} className="mb-8 text-pink-600 hover:text-pink-700 font-semibold flex items-center gap-2 text-lg">
                    ← Back to Lists
                </Link>

                <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-2 lg:gap-12  h-full rounded-3xl shadow-2xl overflow-hidden border-2 border-pink-100">
                    <div className="relative">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-96 md:h-full sm:h-full lg:h-200 object-cover"
                        />
                        {isAdoption && (
                            <div className="absolute top-6 left-6 bg-red-500 text-white px-4 py-2 md:px-8 md:py-4 rounded-full font-medium md:font-bold md:text-xl shadow-2xl animate-pulse">
                                FREE ADOPTION
                            </div>
                        )}
                    </div> 
                    <div className="px-8 py-4 md:p-12 flex flex-col justify-between space-y-4">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">
                                {product.name}
                            </h1>
                            <div className="flex items-center gap-3">
                                <span className={`px-6 py-2 rounded-full text-white font-bold text-lg shadow-lg ${product.category === "Pets" ? "bg-pink-500" :
                                    product.category === "Pet Food" ? "bg-amber-500" :
                                        product.category === "Accessories" ? "bg-sky-500" :
                                            "bg-emerald-500"
                                    }`}>
                                    {product.category}
                                </span>
                                {isAdoption && <Heart className="w-10 h-10 text-pink-500 fill-pink-500 animate-pulse" />}
                            </div>
                        </div>
                        <div className="text-3xl mb-3 font-extrabold">
                            {isAdoption ? (
                                <span className="text-green-600">Free Adoption</span>
                            ) : (
                                <span className="text-pink-600">Price: {product.price}</span>
                            )}
                        </div>
                        <div className="grid grid-cols-1 gap-2 text-lg">
                            <div className="flex items-center gap-3 bg-pink-50 p-4 rounded-2xl">
                                <MapPin className="w-8 h-8 text-pink-500" />
                                <div>
                                    <p className="font-semibold text-gray-600">Location</p>
                                    <p className="md:text-xl font-bold">{product.location}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 bg-pink-50 p-4 rounded-2xl">
                                <Calendar className="w-8 h-8 text-pink-500" />
                                <div>
                                    <p className="font-semibold text-gray-600">Available From</p>
                                    <p className="text-xl font-bold">
                                        {new Date(product.date).toLocaleDateString('en-GB', {
                                            day: 'numeric', month: 'long', year: 'numeric'
                                        })}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 bg-pink-50 p-4 rounded-2xl">
                                <Mail className="w-8 h-8 text-pink-500" />
                                <div>
                                    <p className="font-semibold text-gray-600">Contact Owner</p>
                                    <p className="text-[16px] sm:text-xl font-bold text-pink-600">{product.email}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">About this {isAdoption ? "Pet" : "Product"}</h3>
                            <p className="text-gray-600 text-lg leading-relaxed bg-gray-50 p-6 rounded-2xl">
                                {product.description}
                            </p>
                        </div>
                        <button className={`w-full py-4 rounded-2xl font-bold text-xl sm:text-2xl text-white shadow-2xl transform flex items-center justify-center gap-4 ${isAdoption
                            ? "bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600"
                            : "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                            }`}>
                            {isAdoption ? <Heart className="w-10 h-10 fill-white" /> : <ShoppingBag className=" w-8 sm:w-10 h-10" />}
                            {isAdoption ? "Adopt Now" : "Order Now"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListingDetails;