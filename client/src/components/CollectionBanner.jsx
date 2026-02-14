import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const CollectionBanner = () => {
    return (
        <section className="px-8 py-20 bg-slate-50">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
                <div className="flex-1 space-y-6">
                    <span className="text-gray-500 font-bold uppercase tracking-widest text-sm">DESIGNER'S</span>
                    <h2 className="text-7xl font-bold leading-none">
                        2026 <br />
                        Collection
                    </h2>
                    <p className="text-gray-500 leading-relaxed max-w-md">
                        We are more than just an online store — we are a platform designed
                        to make shopping effortless, reliable, and enjoyable for everyone.
                    </p>
                    <Link to="/products" className="bg-pink-200 text-black px-8 py-4 rounded-full font-semibold hover:bg-pink-300 transition-colors inline-flex items-center gap-2">
                        Shop Collection <FaArrowRight className="text-sm" />
                    </Link>
                </div>
                <div className="flex-1 h-[500px] w-full relative">
                    <div className="absolute inset-0 bg-pink-100 rounded-[50px] -rotate-3 scale-95 z-0"></div>
                    <img
                        src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1000&auto=format&fit=crop"
                        alt="Collection"
                        className="w-full h-full object-cover rounded-[50px] relative z-10 hover:-rotate-1 transition-transform duration-500 shadow-xl"
                    />
                </div>
            </div>
        </section>
    );
};

export default CollectionBanner;
