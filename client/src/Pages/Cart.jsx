import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { products, currency, cartItems, updateQuantity, getCartAmount } = useContext(ShopContext);
    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        const tempData = [];
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                if (cartItems[items][item] > 0) {
                    tempData.push({
                        id: items,
                        size: item,
                        quantity: cartItems[items][item]
                    });
                }
            }
        }
        setCartData(tempData);
    }, [cartItems]);

    return (
        <div className="border-t pt-14 px-8 min-h-screen bg-gray-50">
            <div className="text-2xl mb-3">
                <h2 className="text-3xl font-bold font-serif bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent">YOUR SHOPPING CART</h2>
            </div>

            <div className="flex flex-col lg:flex-row gap-10 mt-8">

                {/* Cart Items List */}
                <div className="flex-1">
                    {cartData.length === 0 ? (
                        <div className="bg-white p-20 rounded-xl shadow-sm border border-dashed border-gray-300 flex flex-col items-center">
                            <p className="text-gray-400 mb-5">Your cart is currently empty</p>
                            <Link to="/products" className="bg-orange-600 text-white px-8 py-3 rounded-lg font-bold">START SHOPPING</Link>
                        </div>
                    ) : (
                        cartData.map((item, index) => {
                            const productData = products.find((product) => product.id === item.id || product.id === parseInt(item.id));
                            if (!productData) return null;

                            return (
                                <div key={index} className="py-4 border-b border-gray-200 flex items-center gap-4 bg-white p-4 rounded-lg mb-4 shadow-sm">
                                    <div className="flex items-start gap-6 w-full">
                                        <img className="w-20 sm:w-24 rounded-lg object-cover h-24" src={productData.image} alt={productData.title} />
                                        <div className="flex-1">
                                            <p className="text-sm sm:text-lg font-bold text-gray-800">{productData.title}</p>
                                            <div className="flex items-center gap-5 mt-2">
                                                <p className="font-bold text-orange-600">{productData.price}</p>
                                                <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50 text-xs rounded">Size: {item.size}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <input
                                        onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item.id, item.size, Number(e.target.value))}
                                        className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 rounded text-center"
                                        type="number"
                                        min={1}
                                        defaultValue={item.quantity}
                                    />
                                    <FaTrash
                                        onClick={() => updateQuantity(item.id, item.size, 0)}
                                        className="w-4 mr-4 sm:w-5 cursor-pointer text-gray-400 hover:text-red-500 transition-colors"
                                    />
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Cart Summary */}
                <div className="lg:w-1/3">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-bold mb-6 border-b pb-2">ORDER SUMMARY</h3>
                        <div className="flex flex-col gap-3">
                            <div className="flex justify-between">
                                <p className="text-gray-600">Subtotal</p>
                                <p className="font-bold">{currency}{getCartAmount().toFixed(2)}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-gray-600">Shipping Fee</p>
                                <p className="font-bold">{currency}10.00</p>
                            </div>
                            <hr />
                            <div className="flex justify-between text-lg font-bold mt-2">
                                <p>Total</p>
                                <p className="text-orange-600">{currency}{(getCartAmount() === 0 ? 0 : getCartAmount() + 10).toFixed(2)}</p>
                            </div>
                        </div>
                        <button
                            disabled={cartData.length === 0}
                            className={`w-full mt-8 py-4 rounded-lg font-bold transition-all shadow-md ${cartData.length === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-orange-600 text-white hover:bg-orange-700 hover:shadow-lg active:scale-95'}`}
                        >
                            PROCEED TO CHECKOUT
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
