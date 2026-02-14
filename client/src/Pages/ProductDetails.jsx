import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { FaStar, FaStarHalfAlt, FaRegStar, FaHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Breadcrumbs from '../components/Breadcrumbs';

const ProductDetails = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const { products, addToCart, toggleWishlist, wishlistItems } = useContext(ShopContext);
    const [productData, setProductData] = useState(null);
    const [size, setSize] = useState('');

    const fetchProductData = async () => {
        products.map((item) => {
            if (item.id === parseInt(productId) || item.id === productId) {
                setProductData(item);
                return null;
            }
        })
    }

    useEffect(() => {
        fetchProductData();
        window.scrollTo(0, 0);
    }, [productId, products]);

    if (!productData) return <div className="opacity-0"></div>;

    const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

    return (
        <div className="pt-6 pb-20 px-4 sm:px-10 bg-gray-50 min-h-screen font-sans selection:bg-orange-100">
            <div className="max-w-6xl mx-auto">
                <Breadcrumbs category={productData.category} subCategory={productData.subCategory} title={productData.title} />

                <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden p-6 sm:p-10 transition-all duration-700 hover:shadow-xl">
                    <div className="flex gap-10 lg:gap-16 flex-col md:flex-row items-start">

                        {/* Product Image Section */}
                        <div className="w-full md:w-[40%] flex justify-center sticky top-24">
                            <div className="relative group max-w-[380px] w-full">
                                <div className="absolute inset-0 bg-orange-200 rounded-3xl blur-2xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
                                <img
                                    className="w-full h-auto rounded-3xl shadow-2xl relative z-10 border border-white transform transition-transform duration-700 hover:scale-[1.03]"
                                    src={productData.image}
                                    alt={productData.title}
                                />
                                {productData.badge && (
                                    <span className="absolute top-4 left-4 z-20 bg-black/80 backdrop-blur-md text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                                        {productData.badge}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Product Info Section */}
                        <div className="flex-1 w-full space-y-6">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold font-serif text-gray-900 tracking-tight leading-tight mb-2">
                                    {productData.title}
                                </h1>
                                <div className="flex items-center gap-1.5 text-orange-500 text-xs">
                                    <div className="flex gap-0.5">
                                        <FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalfAlt />
                                    </div>
                                    <span className="text-gray-400 font-bold ml-1 uppercase tracking-tighter">(122 Reviews)</span>
                                </div>
                            </div>

                            <div className="flex items-baseline gap-3">
                                <span className="text-3xl font-black text-gray-900 tracking-tighter">{productData.price}</span>
                                {productData.originalPrice && (
                                    <span className="text-lg text-gray-400 line-through font-medium">{productData.originalPrice}</span>
                                )}
                            </div>

                            <p className="text-gray-500 leading-relaxed text-sm max-w-xl">
                                Elevate your wardrobe with this <span className="text-orange-600 font-bold">{productData.category}</span> essential.
                                Masterfully crafted for those who value both high-end aesthetics and everyday functionality.
                            </p>

                            <hr className="border-gray-100" />

                            {/* Size Selection */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center max-w-xs">
                                    <p className="font-black text-gray-900 uppercase tracking-[0.2em] text-[10px]">Select Size</p>
                                    <button className="text-[10px] font-bold text-orange-600 hover:underline">Size Guide</button>
                                </div>
                                <div className="flex gap-2 flex-wrap">
                                    {sizes.map((item, index) => (
                                        <button
                                            onClick={() => setSize(item)}
                                            key={index}
                                            className={`w-11 h-11 flex items-center justify-center rounded-xl font-bold text-xs transition-all duration-300 border-2 ${item === size ? 'border-orange-600 bg-orange-600 text-white shadow-md' : 'bg-gray-50 border-gray-100 text-gray-500 hover:border-orange-200 hover:bg-white'}`}
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Action Buttons - Vertically Aligned */}
                            <div className="flex flex-col gap-3 max-w-xs pt-4">
                                <div className="flex gap-3 h-12">
                                    <button
                                        onClick={() => {
                                            if (!size) { toast.error('Please select a size'); return; }
                                            addToCart(productData.id, size);
                                            toast.success('Added to cart!');
                                        }}
                                        className="flex-1 bg-white border-2 border-gray-900 text-gray-900 text-[11px] font-black active:scale-[0.98] rounded-xl shadow-sm hover:bg-gray-900 hover:text-white transition-all uppercase tracking-widest"
                                    >
                                        ADD TO CART
                                    </button>
                                    <button
                                        onClick={() => {
                                            toggleWishlist(productData.id);
                                            wishlistItems.includes(productData.id) ? toast.info('Removed from wishlist') : toast.success('Added to wishlist!');
                                        }}
                                        className={`w-12 rounded-xl border-2 transition-all flex items-center justify-center ${wishlistItems.includes(productData.id) ? 'bg-red-50 border-red-500 text-red-500' : 'bg-gray-50 border-gray-100 text-gray-300 hover:border-red-400 hover:text-red-400'}`}
                                    >
                                        <FaHeart size={16} className={wishlistItems.includes(productData.id) ? 'animate-heart-beat' : ''} />
                                    </button>
                                </div>

                                <button
                                    onClick={() => {
                                        if (!size) { toast.error('Please select a size'); return; }
                                        addToCart(productData.id, size);
                                        navigate('/address');
                                    }}
                                    className="h-12 w-full bg-orange-600 text-white text-[11px] font-black active:scale-[0.98] rounded-xl shadow-lg hover:bg-orange-700 hover:shadow-orange-200 transition-all uppercase tracking-widest"
                                >
                                    BUY NOW
                                </button>
                            </div>

                            <div className="pt-6 grid grid-cols-2 gap-4 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                                <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> 100% Original</div>
                                <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Easy Returns</div>
                            </div>
                        </div>
                    </div>

                    {/* Tabs Section */}
                    <div className="mt-16 border-t border-gray-100 pt-10">
                        <div className="flex gap-8 mb-6">
                            <button className="text-sm font-black border-b-2 border-orange-600 pb-2 uppercase tracking-widest text-gray-900">Description</button>
                            <button className="text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-widest pb-2">Reviews (142)</button>
                        </div>
                        <div className="text-xs text-gray-500 leading-relaxed max-w-4xl space-y-4">
                            <p>This premium {productData.category} selection represents the pinnacle of our creative vision. Every stitch and detail has been considered to ensure you receive a product that lasts a lifetime. Whether for special occasions or daily elegance, it's designed to make you feel as good as you look.</p>
                            <p>The materials used are sourced ethically and chosen for their durability and texture, providing a sensory experience that generic alternatives cannot match.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
