import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { FaBox, FaShippingFast, FaCheckCircle, FaTimesCircle, FaRedo } from 'react-icons/fa';

const Orders = () => {
    const { products, currency } = useContext(ShopContext);

    // Mock orders data
    const orders = [
        {
            id: 'ORD-2026-6742',
            date: '20 Jan 2026',
            status: 'Delivered',
            total: 'Rs. 4,499',
            items: [
                { id: "m1", title: "Premium Slim Fit Cotton Shirt", size: "M", price: "Rs. 1,499", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop" },
                { id: "m2", title: "Urban Denim Jacket - Classic Indigo", size: "L", price: "Rs. 2,999", image: "https://images.unsplash.com/photo-1576872859244-c1ac275f502c?q=80&w=800&auto=format&fit=crop" }
            ]
        },
        {
            id: 'ORD-2026-9012',
            date: '22 Jan 2026',
            status: 'Processing',
            total: 'Rs. 2,199',
            items: [
                { id: "w1", title: "Floral Printed Summer Dress", size: "S", price: "Rs. 2,199", image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800&auto=format&fit=crop" }
            ]
        }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered': return 'text-green-600 bg-green-50 border-green-200';
            case 'Processing': return 'text-orange-600 bg-orange-50 border-orange-200';
            case 'Cancelled': return 'text-red-600 bg-red-50 border-red-200';
            default: return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    return (
        <div className="border-t pt-14 px-8 min-h-screen bg-gray-50 pb-20">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <h2 className="text-3xl font-bold font-serif bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent uppercase tracking-wider">My Orders</h2>
                    <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-bold uppercase">{orders.length} Orders</span>
                </div>

                <div className="flex flex-col gap-8">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500">
                            {/* Order Header */}
                            <div className="bg-gray-50 px-8 py-4 border-b flex flex-wrap justify-between items-center gap-4">
                                <div className="flex gap-10">
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Order Placed</p>
                                        <p className="font-bold text-gray-800 text-sm">{order.date}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Amount</p>
                                        <p className="font-bold text-gray-800 text-sm">{order.total}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Order ID</p>
                                        <p className="font-bold text-gray-800 text-sm">#{order.id}</p>
                                    </div>
                                </div>
                                <div className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-wider ${getStatusColor(order.status)}`}>
                                    {order.status === 'Delivered' ? <FaCheckCircle /> : <FaShippingFast className="animate-pulse" />}
                                    {order.status}
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="p-8">
                                <div className="flex flex-col gap-8">
                                    {order.items.map((item, idx) => (
                                        <div key={idx} className="flex gap-6 items-center">
                                            <img src={item.image} alt={item.title} className="w-24 h-32 object-cover rounded-2xl shadow-md" />
                                            <div className="flex-1">
                                                <h4 className="font-bold text-gray-900 text-lg mb-1">{item.title}</h4>
                                                <p className="text-gray-500 text-xs font-bold mb-4">Size: {item.size} | Color: Classic | Qty: 1</p>
                                                <div className="flex gap-4">
                                                    <button className="text-orange-600 text-xs font-bold border border-orange-200 px-4 py-2 rounded-lg hover:bg-orange-50 transition-all flex items-center gap-2">
                                                        <FaRedo /> REORDER
                                                    </button>
                                                    <button className="text-gray-600 text-xs font-bold border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition-all">
                                                        VIEW ITEM
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-lg font-black text-gray-900">{item.price}</p>
                                                <p className="text-green-600 text-xs font-bold mt-2">7 Days Returnable</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Order Footer */}
                            <div className="bg-gray-50 px-8 py-4 border-t flex justify-between items-center">
                                <p className="text-xs font-bold text-orange-600 uppercase tracking-widest flex items-center gap-2">
                                    <FaBox /> Package {order.status === 'Delivered' ? 'was delivered to you' : 'is being prepared'}
                                </p>
                                <button className="text-blue-600 text-xs font-bold hover:underline py-2">
                                    Need help with this order?
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Orders;
