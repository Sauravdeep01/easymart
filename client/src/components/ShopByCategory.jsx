import React from 'react';
import { shopCategories } from '../constants';

const ShopByCategory = () => {
    return (
        <section className="px-8 py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-center text-3xl font-bold mb-20 uppercase tracking-tight font-serif bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent" style={{ marginBottom: '3rem' }}>Shop By Category</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 pt-8">
                        {shopCategories.map((category, index) => (
                            <div key={index} className="relative h-48 group overflow-hidden rounded-xl cursor-pointer shadow-lg transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl">
                                <img
                                    src={category.img}
                                    alt={category.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-all duration-500"></div>
                                <div className="absolute bottom-3 left-0 right-0 text-center transform translate-y-1 group-hover:translate-y-0 transition-all duration-500">
                                    <h3 className="text-white font-bold text-lg tracking-wider uppercase drop-shadow-md group-hover:text-orange-300 transition-colors duration-500">{category.title}</h3>
                                    <span className="text-white/90 text-xs mt-1 opacity-0 group-hover:opacity-100 transition-all duration-500 block px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full">Explore</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
    );
};

export default ShopByCategory;
