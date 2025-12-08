import React, { use, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { MapPin, Calendar, Mail, Heart, ShoppingBag } from 'lucide-react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';

const ListingDetails = () => {

    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [quantity, setQuantity] = useState(1);
    const { user, loading } = use(AuthContext)

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

    const handleOrderSubmit = (e) => {
        e.preventDefault();

        const orderData = {
            productId: product._id,
            productName: product.name,
            buyerName: user?.displayName || user?.name || "Guest User",
            email: user?.email,
            quantity: isAdoption ? 1 : Number(quantity),
            price: isAdoption ? 0 : Number(product.Price),
            address: e.target.address.value,
            phone: e.target.phone.value,
            date: new Date().toISOString().split("T")[0],
            additionalNotes: e.target.notes.value,
        };


        axios.post('http://localhost:3000/orders', orderData)
            .then(res => {
                console.log(res)
                Swal.fire({
                    title: (isAdoption ? "Adoption request sent successfully!" : "Order placed successfully!"),
                    icon: "success",
                    draggable: true
                });
                e.target.reset()
                setQuantity(1);
            })
            .catch(err => {
                console.log(err)
            })
        document.getElementById("my_modal_5").close();
    };
    return (
        <div className="w-11/12 mx-auto py-8 mb-10 px-4">
            <Helmet>
                <title>{product ? `${product.name} - PawMart` : "Loading... - PawMart"}</title>
            </Helmet>

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
                            <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
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
                                <span className="text-pink-600">Price: {product.Price}</span>
                            )}
                        </div>
                        <div className="grid grid-cols-1 gap-2 text-lg">
                            <div className="flex items-center gap-3 bg-pink-50 p-4 rounded-2xl">
                                <MapPin className="w-8 h-8 text-pink-500" />
                                <div>
                                    <p className="font-semibold text-gray-600">Location</p>
                                    <p className="md:text-xl text-black font-bold">{product.location}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 bg-pink-50 p-4 rounded-2xl">
                                <Calendar className="w-8 h-8 text-pink-500" />
                                <div>
                                    <p className="font-semibold text-gray-600">Available From</p>
                                    <p className="text-xl text-black font-bold">
                                        {product.date}
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
                            <h3 className="text-2xl font-bold mb-4">About this {isAdoption ? "Pet" : "Product"}</h3>
                            <p className="text-gray-600 text-lg leading-relaxed bg-gray-50 p-6 rounded-2xl">
                                {product.description}
                            </p>
                        </div>
                        <button onClick={() => document.getElementById('my_modal_5').showModal()} className={`w-full py-4 rounded-2xl font-bold text-xl sm:text-2xl text-white shadow-2xl transform flex items-center justify-center gap-4 ${isAdoption
                            ? "bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600"
                            : "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                            }`}>
                            {isAdoption ? <Heart className="w-10 h-10 fill-white" /> : <ShoppingBag className=" w-8 sm:w-10 h-10" />}
                            {isAdoption ? "Adopt Now" : "Order Now"}
                        </button>
                    </div>
                </div>
                {/* modal */}
                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box mx-auto w-11/12 max-w-2xl">
                        <form method="dialog">
                            <button className="btn btn-xl btn-circle btn-ghost absolute right-4 top-4">✕</button>
                        </form>

                        <h3 className="text-3xl font-bold text-center mb-8 text-pink-600">
                            {isAdoption ? "Adoption Request Form" : "Order Form"}
                        </h3>

                        <form onSubmit={handleOrderSubmit} className="space-y-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block font-semibold  mb-1">Your Name</label>
                                    <input type="text" value={user?.displayName || "Guest User"} readOnly className="input input-bordered  focus:border-pink-500 focus:outline-none w-full" />
                                </div>
                                <div>
                                    <label className="block font-semibold mb-1">Email</label>
                                    <input type="email" value={user?.email || ""} readOnly className="input input-bordered  focus:border-pink-500 focus:outline-none w-full" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block font-semibold mb-1">Listing ID</label>
                                    <input type="text" value={product?._id || ""} readOnly className="input input-bordered  focus:border-pink-500 focus:outline-none w-full text-sm" />
                                </div>
                                <div>
                                    <label className="block font-semibold mb-1">Product/Pet Name</label>
                                    <input type="text" value={product?.name || ""} readOnly className="input input-bordered  focus:border-pink-500 focus:outline-none w-full" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block font-semibold  mb-1">Quantity</label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={isAdoption ? 1 : quantity}
                                        onChange={(e) => !isAdoption && setQuantity(e.target.value)}
                                        disabled={isAdoption}
                                        className={`input input-bordered  focus:border-pink-500 focus:outline-none w-full ${isAdoption ? "" : ""}`}
                                    />
                                    {isAdoption && <p className="text-sm text-gray-500 mt-1">Only 1 pet can be adopted</p>}
                                </div>
                                <div>
                                    <label className="block font-semibold  mb-1">Price</label>
                                    <input
                                        type="text"
                                        value={isAdoption ? "Free Adoption" : `${product?.Price}`}
                                        readOnly
                                        className="input input-bordered w-full font-bold text-pink-600  focus:border-pink-500 focus:outline-none"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block font-semibold  mb-1">
                                    Delivery / Pickup Address <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    required
                                    rows="3"
                                    name='address'
                                    placeholder="Full address (House, Road, Area, Thana, District)"
                                    className="textarea textarea-bordered w-full  focus:border-pink-500 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block font-semibold mb-1">
                                    Mobile Number <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    required
                                    name='phone'
                                    placeholder="017xxxxxxxx"
                                    className="input input-bordered w-full  focus:border-pink-500 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block font-semibold  mb-1">Additional Notes (Optional)</label>
                                <textarea
                                    rows="3"
                                    name='notes'
                                    placeholder="Any special request, time, payment method, etc."
                                    className="textarea textarea-bordered  focus:border-pink-500 focus:outline-none w-full"
                                />
                            </div>
                            <div className="text-center mt-10">
                                <button
                                    type="submit"
                                    className={`btn text-xl px-7 py-6 rounded-md shadow-pink-500 font-bold text-white ${isAdoption
                                        ? "bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600"
                                        : "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                                        }`}
                                >
                                    {isAdoption ? "Send Adoption Request" : "Confirm Order"}
                                </button>
                            </div>
                        </form>
                    </div>
                </dialog>
            </div>
        </div>
    );
};

export default ListingDetails;