import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import { FaHeart, FaTrash, FaShoppingCart } from 'react-icons/fa';

const Wishlist = () => {
    const { products, wishlistItems, toggleWishlist, addToCart } = useContext(ShopContext);

    const wishlistProducts = products.filter(product => wishlistItems.includes(product.id));

    return (
        <div className="border-t pt-14 px-8 min-h-screen bg-gray-50">
            <div className="flex items-center gap-4 mb-8">
                <h2 className="text-3xl font-bold font-serif bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent uppercase tracking-wider">My Wishlist</h2>
                <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-bold">{wishlistProducts.length} Items</span>
            </div>

            {wishlistProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-sm border border-dashed border-gray-300">
                    <div className="relative mb-6">
                        <div className="w-32 h-32 bg-orange-50 rounded-full flex items-center justify-center animate-pulse">
                            <FaHeart className="text-5xl text-orange-200" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center animate-bounce">
                            <span className="text-orange-500 font-bold">!</span>
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Your wishlist is empty!!</h3>
                    <p className="text-gray-500 mb-8 max-w-xs text-center">Save items that you like in your wishlist. Review them anytime and easily move them to the cart.</p>
                    <Link
                        to="/products"
                        className="bg-orange-600 text-white px-10 py-4 rounded-xl font-bold shadow-lg shadow-orange-200 hover:bg-orange-700 hover:shadow-orange-300 transition-all active:scale-95 uppercase tracking-widest text-sm"
                    >
                        Explore Now
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {wishlistProducts.map((item) => (
                        <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full border border-gray-100">
                            {/* Product Image */}
                            <div className="relative h-72 overflow-hidden">
                                <Link to={`/product/${item.id}`}>
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </Link>
                                <button
                                    onClick={() => toggleWishlist(item.id)}
                                    className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-red-500 shadow-md hover:bg-red-500 hover:text-white transition-all duration-300"
                                >
                                    <FaTrash size={14} />
                                </button>
                                {item.badge && (
                                    <div className="absolute bottom-4 left-4 bg-black text-white px-3 py-1 text-[10px] font-bold rounded-lg uppercase tracking-tighter">
                                        {item.badge}
                                    </div>
                                )}
                            </div>

                            {/* Product Details */}
                            <div className="p-5 flex flex-col flex-1">
                                <Link to={`/product/${item.id}`}>
                                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">{item.category}</p>
                                    <h3 className="font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors line-clamp-1">{item.title}</h3>
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="text-lg font-bold text-gray-900">{item.price}</span>
                                        {item.originalPrice && (
                                            <span className="text-sm text-gray-400 line-through font-medium">{item.originalPrice}</span>
                                        )}
                                    </div>
                                </Link>

                                <button
                                    onClick={() => {
                                        // Since size is required, we link to product page for selection
                                        window.location.href = `/product/${item.id}`;
                                    }}
                                    className="mt-auto w-full bg-gray-900 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-orange-600 transition-all duration-300 active:scale-95"
                                >
                                    <FaShoppingCart />
                                    SELECT SIZE
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;
