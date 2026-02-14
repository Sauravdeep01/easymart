import React, { useState } from 'react';
import { featuredProducts } from '../constants';
import { Link } from 'react-router-dom';

const FeaturedProducts = ({ title = "FEATURED PRODUCTS" }) => {
    const [isPaused, setIsPaused] = useState(false);

    return (
        <section className="py-20 bg-white mt-10">
            <div className="max-w-8xl mx-auto px-8 mb-10">
                <h2 className="text-2xl font-bold font-serif bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent uppercase">{title}</h2>
            </div>

            <div className="max-w-8xl mx-auto px-8">
                <div className="h-[420px] w-full bg-white rounded-lg overflow-hidden">
                    <div className="relative h-full w-full">
                        <div className="absolute inset-0 flex gap-8 overflow-hidden">
                            <div
                                className="flex gap-8 h-full"
                                style={{
                                    animation: 'scroll 30s linear infinite',
                                    animationPlayState: isPaused ? 'paused' : 'running',
                                    width: 'max-content'
                                }}
                                onMouseEnter={() => setIsPaused(true)}
                                onMouseLeave={() => setIsPaused(false)}
                            >
                                {[...featuredProducts, ...featuredProducts].map((product, index) => (
                                    <Link
                                        to={`/product/${product.id}`}
                                        key={`${product.id}-${index}`}
                                        className="group cursor-pointer flex-shrink-0 block no-underline text-inherit"
                                        style={{
                                            width: '256px',
                                            height: '420px'
                                        }}
                                    >
                                        <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden h-80 mb-4 relative shadow-md group-hover:shadow-xl transition-all duration-300 ease-out">
                                            <div className="w-full h-full relative overflow-hidden bg-gray-100">
                                                <img
                                                    src={product.image}
                                                    alt={product.title}
                                                    className="w-full h-full object-cover block transition-transform duration-500 ease-out group-hover:scale-105"
                                                />
                                            </div>
                                            {product.badge && (
                                                <div className="absolute bottom-3 left-3 bg-white px-2 py-1 text-xs font-bold rounded shadow-md group-hover:shadow-lg transition-all duration-300 ease-out">{product.badge}</div>
                                            )}
                                        </div>
                                        <h3 className="font-bold text-sm mb-1 truncate group-hover:text-orange-600 transition-colors duration-300 ease-out">{product.title}</h3>
                                        <p className="text-gray-500 text-xs mb-2 group-hover:text-gray-700 transition-colors duration-300 ease-out">{product.category}</p>
                                        <div className="flex gap-2 text-sm items-center">
                                            <span className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300 ease-out">{product.price}</span>
                                            {product.originalPrice && (
                                                <span className="text-gray-400 line-through text-xs group-hover:text-gray-500 transition-colors duration-300 ease-out">{product.originalPrice}</span>
                                            )}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};


export default FeaturedProducts;
