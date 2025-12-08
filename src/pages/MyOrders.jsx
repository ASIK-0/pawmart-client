import axios from "axios";
import React, { useEffect, useState, use } from "react";
import { AuthContext } from "../contexts/AuthContext";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Helmet } from "react-helmet-async";


const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const { user } = use(AuthContext);

    useEffect(() => {
        document.title = "My Orders | PawMart";
    }, []);


    useEffect(() => {
        axios.get(`http://localhost:3000/orders?email=${user?.email}`)
            .then((res) => {
                setOrders(res.data);
            })
            .catch((err) => {
                console.log(err)
            });
    }, [user?.email]);

    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        doc.text("My Orders Report", 14, 10);

        const tableData = orders.map((order) => [
            order.productName,
            order.buyerName,
            order.price,
            order.quantity,
            order.address,
            order.phone,
            order.date,
        ]);

        autoTable(doc, {
            head: [["Product", "Buyer Name", "Price", "Qty", "Address", "Phone", "Date"]],
            body: tableData,
            startY: 20,
        });

        doc.save("orders-report.pdf");
    };


    return (
        <div className="w-11/12 max-w-7xl mx-auto my-14">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl md:text-5xl font-bold text-pink-600">
                        My Orders
                    </h1>
                    <p className=" mt-2 text-sm md:text-lg">
                        You have {orders.length} order {orders.length !== 1 && "0"} placed
                    </p>
                </div>

                <button
                    onClick={handleDownloadPDF}
                    disabled={orders.length === 0}
                    className={`px-3 py-2 md:px-8 md:py-4 rounded-lg font-bold transition-all transform hover:scale-105 ${orders.length === 0
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-pink-400 hover:bg-pink-600 shadow-lg"
                        }`}
                >
                    {orders.length === 0 ? "No Orders" : "Download Report"}
                </button>
            </div>

            {/* Table */}
            <div className=" hidden md:block rounded-3xl shadow-xl border border-pink-200 overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="text-white bg-pink-400">
                        <tr>
                            <th className="py-4 px-6">Product Name</th>
                            <th className="py-4 px-6 text-center">Buyer Name</th>
                            <th className="py-4 px-6 text-center">Price</th>
                            <th className="py-4 px-6 text-center">Quantity</th>
                            <th className="py-4 px-6">Address</th>
                            <th className="py-4 px-6">Phone</th>
                            <th className="py-4 px-6">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="text-center py-16 text-gray-500">
                                    No orders found.
                                </td>
                            </tr>
                        ) : (
                            orders.map((order) => (
                                <tr
                                    key={order._id}
                                    className="border-b border-pink-100 hover:bg-pink-500/50 transition"
                                >
                                    <td className="py-4 px-6 font-semibold">
                                        {order.productName}
                                    </td>
                                    <td className="py-4 px-6 text-center">{order.buyerName}</td>

                                    <td className="py-4 px-6 text-center text-pink-600 font-bold">
                                        {order.price}
                                    </td>

                                    <td className="py-4 px-6 text-center">{order.quantity}</td>

                                    <td className="py-4 px-6">
                                        {order.address}
                                    </td>

                                    <td className="py-4 px-6 font-semibold">
                                        {order.phone}
                                    </td>

                                    <td className="py-4 px-6">{order.date}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <div className="block md:hidden space-y-6">
                {orders.length === 0 ? (
                    <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-200">
                        <p className="text-xl text-gray-500">No orders found.</p>
                    </div>
                ) : (
                    orders.map((order) => (
                        <div
                            key={order._id}
                            className=" rounded-3xl shadow-lg border border-pink-100 p-6 hover:bg-pink-500/50 transition-all"
                        >
                            <h3 className="text-xl font-bold text-pink-600 mb-4">{order.productName}</h3>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-gray-500">Buyer Name</p>
                                    <p className="font-semibold">{order.buyerName}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Price</p>
                                    <p className="font-bold text-pink-600">${order.price}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Quantity</p>
                                    <p className="font-semibold">{order.quantity}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Phone</p>
                                    <p className="font-semibold">{order.phone}</p>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-pink-100">
                                <p className="text-gray-500 text-sm">Delivery Address</p>
                                <p className="text-gray-300">{order.address}</p>
                            </div>

                            <div className="mt-3 text-right">
                                <p className="text-sm text-gray-500">
                                    {new Date(order.date).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>


        </div>
    );
};

export default MyOrders;
