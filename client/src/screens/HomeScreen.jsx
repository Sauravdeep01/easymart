import { useGetProductsQuery } from '../slices/productsApiSlice';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import { FaShippingFast, FaShieldAlt, FaHeadset, FaUndo, FaFire, FaTags, FaChevronRight, FaStar } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const HomeScreen = () => {
    const { data, isLoading, error } = useGetProductsQuery({});
    const [currentSlide, setCurrentSlide] = useState(0);

    const heroSlides = [
        {
            title: "Mega Electronics Sale",
            subtitle: "Up to 70% OFF on Top Brands",
            description: "Limited time offer on smartphones, laptops & more",
            bgImage: "/hero-electronics.png"
        },
        {
            title: "New Arrivals",
            subtitle: "Latest Tech Gadgets 2024",
            description: "Discover the newest products in electronics",
            bgImage: "/hero-new-arrivals.png"
        },
        {
            title: "Premium Collection",
            subtitle: "Exclusive Luxury Deals",
            description: "Shop premium products at unbeatable prices",
            bgImage: "/hero-premium.png"
        }
    ];

    const categories = [
        { name: 'Electronics', icon: '📱', color: 'from-blue-500 to-blue-600', count: '2000+ items' },
        { name: 'Fashion', icon: '👕', color: 'from-pink-500 to-pink-600', count: '5000+ items' },
        { name: 'Home & Kitchen', icon: '🏠', color: 'from-green-500 to-green-600', count: '3000+ items' },
        { name: 'Beauty', icon: '💄', color: 'from-purple-500 to-purple-600', count: '1500+ items' },
        { name: 'Sports', icon: '⚽', color: 'from-orange-500 to-orange-600', count: '1000+ items' },
        { name: 'Books', icon: '📚', color: 'from-indigo-500 to-indigo-600', count: '10000+ items' },
        { name: 'Toys', icon: '🧸', color: 'from-red-500 to-red-600', count: '2500+ items' },
        { name: 'Automotive', icon: '🚗', color: 'from-gray-600 to-gray-700', count: '800+ items' }
    ];

    const features = [
        { icon: <FaShippingFast />, title: 'Free Shipping', desc: 'On orders over $100', color: 'blue' },
        { icon: <FaShieldAlt />, title: 'Secure Payment', desc: '100% protected', color: 'green' },
        { icon: <FaHeadset />, title: '24/7 Support', desc: 'Dedicated support', color: 'purple' },
        { icon: <FaUndo />, title: 'Easy Returns', desc: '30 days return', color: 'orange' }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Top Banner */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-4">
                <div className="container mx-auto flex items-center justify-center gap-2 text-sm">
                    <FaFire className="text-yellow-300" />
                    <span className="font-semibold">FLASH SALE:</span>
                    <span>Get up to 70% OFF on selected items!</span>
                    <Link to="/" className="underline hover:text-yellow-300 ml-2">Shop Now →</Link>
                </div>
            </div>

            {/* Hero Carousel with Full-Width Background Images */}
            <section className="relative h-[600px] overflow-hidden">
                {heroSlides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-all duration-1000 ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                            }`}
                    >
                        {/* Background Image */}
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${slide.bgImage})` }}
                        >
                            {/* Dark Overlay for better text readability */}
                            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
                        </div>

                        {/* Text Content Overlay */}
                        <div className="relative h-full container mx-auto px-4 flex items-center">
                            <div className="max-w-2xl text-white space-y-6 animate-fadeIn">
                                <div className="inline-block px-6 py-2 bg-red-600 rounded-full text-sm font-bold uppercase tracking-wider">
                                    <FaTags className="inline mr-2" />
                                    {slide.title}
                                </div>
                                <h1 className="text-7xl font-extrabold leading-tight drop-shadow-2xl">
                                    {slide.subtitle}
                                </h1>
                                <p className="text-2xl font-medium opacity-95 drop-shadow-lg">
                                    {slide.description}
                                </p>
                                <div className="flex gap-4 pt-4">
                                    <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-10 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all shadow-xl">
                                        Shop Now
                                    </button>
                                    <button className="bg-white/20 backdrop-blur-md border-2 border-white text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all">
                                        Explore More
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Carousel Controls */}
                <button
                    onClick={prevSlide}
                    className="absolute left-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-2xl transition-all z-20 text-2xl font-bold text-slate-700 hover:scale-110"
                >
                    ←
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-2xl transition-all z-20 text-2xl font-bold text-slate-700 hover:scale-110"
                >
                    →
                </button>

                {/* Dots Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                    {heroSlides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`h-3 rounded-full transition-all shadow-lg ${index === currentSlide
                                ? 'bg-white w-12'
                                : 'bg-white/50 w-3 hover:bg-white/75'
                                }`}
                        />
                    ))}
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-8 bg-white border-b">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold">Shop by Category</h2>
                        <Link to="/" className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2">
                            View All <FaChevronRight className="text-sm" />
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                        {categories.map((cat, index) => (
                            <Link
                                key={index}
                                to="/"
                                className="card p-6 text-center hover-lift group"
                            >
                                <div className={`w-16 h-16 mx-auto mb-3 bg-gradient-to-br ${cat.color} rounded-2xl flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform`}>
                                    {cat.icon}
                                </div>
                                <h3 className="font-semibold text-sm mb-1">{cat.name}</h3>
                                <p className="text-xs text-slate-500">{cat.count}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Bar */}
            <section className="py-6 bg-gradient-to-r from-slate-100 to-slate-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {features.map((feature, index) => {
                            const colorMap = {
                                'blue': 'bg-blue-100 text-blue-600',
                                'green': 'bg-green-100 text-green-600',
                                'purple': 'bg-purple-100 text-purple-600',
                                'orange': 'bg-orange-100 text-orange-600'
                            };
                            return (
                                <div key={index} className="flex items-center gap-4">
                                    <div className={`w-14 h-14 ${colorMap[feature.color]} rounded-xl flex items-center justify-center text-2xl flex-shrink-0`}>
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-sm">{feature.title}</h3>
                                        <p className="text-xs text-slate-600">{feature.desc}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Deals of the Day */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center text-white text-2xl">
                                <FaFire />
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold">Deals of the Day</h2>
                                <p className="text-slate-600">Limited time offers - Don't miss out!</p>
                            </div>
                        </div>
                        <div className="hidden md:flex items-center gap-2 bg-red-100 text-red-600 px-6 py-3 rounded-xl font-bold">
                            <span>Ends in:</span>
                            <span className="text-2xl">12:34:56</span>
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="text-center">
                                <div className="spinner mx-auto mb-4"></div>
                                <p className="text-slate-600 text-lg">Loading amazing deals...</p>
                            </div>
                        </div>
                    ) : error ? (
                        <div className="card p-12 text-center">
                            <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
                                <span className="text-4xl">😔</span>
                            </div>
                            <h3 className="text-2xl font-bold text-red-600 mb-4">Oops! Something went wrong</h3>
                            <p className="text-slate-600 mb-6">{error?.data?.message || error.error}</p>
                            <button onClick={() => window.location.reload()} className="btn-primary">
                                Try Again
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {data?.products?.slice(0, 4).map((product, index) => (
                                <div key={product._id} className="animate-fadeIn" style={{ animationDelay: `${index * 0.1}s` }}>
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* All Products */}
            <section className="py-12 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold">All Products</h2>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 bg-white border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all">
                                Latest
                            </button>
                            <button className="px-4 py-2 bg-white border-2 border-slate-200 text-slate-600 rounded-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-all">
                                Popular
                            </button>
                            <button className="px-4 py-2 bg-white border-2 border-slate-200 text-slate-600 rounded-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-all">
                                Best Rated
                            </button>
                        </div>
                    </div>

                    {!isLoading && !error && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {data?.products?.map((product, index) => (
                                <div key={product._id} className="animate-fadeIn" style={{ animationDelay: `${index * 0.05}s` }}>
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>
                    )}

                    {!isLoading && !error && data?.products?.length === 0 && (
                        <div className="card p-12 text-center">
                            <div className="w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-4xl">🛍️</span>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-700 mb-4">No Products Found</h3>
                            <p className="text-slate-600">Check back soon for new arrivals!</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-4">Subscribe to Our Newsletter</h2>
                    <p className="text-xl opacity-90 mb-8">Get exclusive deals and updates delivered to your inbox</p>
                    <div className="max-w-md mx-auto flex gap-2">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-6 py-4 rounded-xl text-slate-900 outline-none"
                        />
                        <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all">
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomeScreen;
