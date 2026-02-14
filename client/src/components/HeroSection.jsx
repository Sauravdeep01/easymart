import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaShoppingBag } from 'react-icons/fa';
import { heroSlides } from '../constants';

const HeroSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    const slide = heroSlides[currentSlide];

    return (
        <section className="relative bg-gradient-to-br from-white via-slate-50 to-gray-100 overflow-hidden min-h-[600px] flex items-center">
            <div className="max-w-7xl mx-auto px-8 w-full py-12 md:py-20">
                <div
                    className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center transition-all duration-500 ease-in-out opacity-100"
                    style={{ minHeight: '400px' }}
                >
                    {/* LEFT CONTENT */}
                    <div className="space-y-8 animate-fadeIn">
                        <span className="text-orange-500 font-bold tracking-wider text-sm uppercase">
                            {slide.tag}
                        </span>

                        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                            {slide.title.map((line, index) => (
                                <span key={index} className="block">
                                    {line}
                                </span>
                            ))}
                        </h1>

                        <p className="text-gray-500 max-w-md leading-relaxed">
                            {slide.description}
                        </p>

                        <div className="flex items-center gap-6">
                            <Link
                                to="/products"
                                className={`${slide.btnColor} text-white px-8 py-4 rounded-lg font-bold shadow-lg transition-all active:scale-95 flex items-center gap-2 hover:shadow-xl hover:-translate-y-1`}
                            >
                                Shop Now <FaArrowRight className="text-sm" />
                            </Link>
                        </div>
                    </div>

                    {/* RIGHT IMAGES */}
                    <div className="relative" style={{ height: '384px', width: '100%' }}>
                        <div className="grid grid-cols-2 gap-4 absolute inset-0 animate-slideInRight">
                            <div className={`${slide.images[0].bg} rounded-3xl overflow-hidden p-4 h-full`}>
                                <img
                                    src={slide.images[0].src}
                                    alt={slide.images[0].alt}
                                    className="w-full h-full object-cover rounded-2xl relative z-10 hover:scale-105 transition-transform duration-500"
                                />
                            </div>

                            <div className={`${slide.images[1].bg} rounded-3xl overflow-hidden p-4 h-full`}>
                                <img
                                    src={slide.images[1].src}
                                    alt={slide.images[1].alt}
                                    className="w-full h-full object-cover rounded-2xl relative z-10 hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* SLIDE DOTS */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
                    {heroSlides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-colors ${currentSlide === index ? 'bg-orange-500' : 'bg-gray-300'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
