import React, { useState, useEffect } from 'react';
import { FaSearch, FaUser, FaShoppingCart, FaHeart, FaBell } from 'react-icons/fa';

const Navbar = () => {
    return (
        <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-sm sticky top-0 z-50">
            <div className="flex items-center gap-12">
                <div className="text-2xl font-bold tracking-tighter flex items-center gap-2">
                    <img 
                        src="/src/assets/NavbarLogo.png" 
                        alt="Lavana Logo" 
                        className="h-6 w-14"
                    />
                    Lavana
                </div>
                <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
                    <li className="text-black font-semibold cursor-pointer">Popular</li>
                    <li className="hover:text-black cursor-pointer transition-colors">Men</li>
                    <li className="hover:text-black cursor-pointer transition-colors">Women</li>
                    <li className="hover:text-black cursor-pointer transition-colors">Kids</li>
                    <li className="hover:text-black cursor-pointer transition-colors">Beauty</li>
                    <li className="hover:text-black cursor-pointer transition-colors">Bags & Footwear</li>
                </ul>
            </div>

            <div className="flex items-center gap-6">
                <div className="relative hidden lg:block">
                    <input
                        type="text"
                        placeholder="Search"
                        className="bg-gray-100 rounded-full py-2 px-4 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 w-150"
                    />
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                </div>
                <div className="flex items-center gap-6 text-gray-600">
                    {/* Wishlist */}
                    <div className="relative cursor-pointer hover:text-black transition-colors">
                        <FaHeart />
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] w-3 h-3 rounded-full flex items-center justify-center">0</span>
                    </div>
                    {/* Notification */}
                    <div className="relative cursor-pointer hover:text-black transition-colors">
                        <FaBell />
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] w-3 h-3 rounded-full flex items-center justify-center">2</span>
                    </div>
                    {/* Cart */}
                    <div className="relative cursor-pointer hover:text-black transition-colors">
                        <FaShoppingCart />
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">0</span>
                    </div>
                    <FaUser className="cursor-pointer hover:text-black transition-colors" />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
