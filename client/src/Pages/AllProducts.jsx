import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link, useLocation } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Breadcrumbs from '../components/Breadcrumbs';

const AllProducts = () => {
    const { products, toggleWishlist, wishlistItems } = useContext(ShopContext);
    const [filterProducts, setFilterProducts] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState([]);
    const [subCategoryFilter, setSubCategoryFilter] = useState("");
    const [itemTypeFilter, setItemTypeFilter] = useState("");
    const [priceRange, setPriceRange] = useState(100000);
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const cat = params.get('category');
        const sub = params.get('sub');
        const item = params.get('item');

        if (cat) setCategoryFilter([cat]);
        else setCategoryFilter([]);

        setSubCategoryFilter(sub || "");
        setItemTypeFilter(item || "");
    }, [location.search]);

    const toggleCategory = (e) => {
        if (categoryFilter.includes(e.target.value)) {
            setCategoryFilter(prev => prev.filter(item => item !== e.target.value));
        } else {
            setCategoryFilter(prev => [...prev, e.target.value]);
        }
    };

    const applyFilter = () => {
        let productsCopy = products.slice();

        // Category/Sub/Item Filters
        if (categoryFilter.length > 0) {
            productsCopy = productsCopy.filter(item => categoryFilter.map(c => c.toLowerCase()).includes((item.category || "").toLowerCase()));
        }

        if (subCategoryFilter) {
            productsCopy = productsCopy.filter(item => (item.subCategory || "").toLowerCase() === subCategoryFilter.toLowerCase());
        }

        if (itemTypeFilter) {
            productsCopy = productsCopy.filter(item => (item.itemType || "").toLowerCase() === itemTypeFilter.toLowerCase());
        }

        // Price Filter
        productsCopy = productsCopy.filter(item => {
            const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
            return price <= priceRange;
        });

        setFilterProducts(productsCopy);
    }

    useEffect(() => {
        applyFilter();
    }, [categoryFilter, subCategoryFilter, itemTypeFilter, priceRange, products]);

    return (
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t px-8 bg-gray-50 min-h-screen">

            {/* Filter Options */}
            <div className="min-w-60 mt-10">
                <p className="my-2 text-xl flex items-center cursor-pointer gap-2 font-bold uppercase tracking-wider">FILTERS</p>

                {/* Category Filter */}
                <div className="border border-gray-200 pl-5 py-4 mt-6 sm:block bg-white rounded-xl shadow-sm">
                    <p className="mb-4 text-sm font-bold border-b pb-2 text-orange-600">CATEGORIES</p>
                    <div className="flex flex-col gap-3 text-sm font-medium text-gray-600">
                        {['Men', 'Women', 'Kids', 'Electronics', 'Beauty'].map((cat) => (
                            <label key={cat} className="flex gap-3 cursor-pointer hover:text-black transition-colors">
                                <input className="w-4 accent-orange-600" type="checkbox" value={cat} checked={categoryFilter.includes(cat)} onChange={toggleCategory} /> {cat}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Price Filter */}
                <div className="border border-gray-200 px-5 py-4 mt-6 sm:block bg-white rounded-xl shadow-sm">
                    <p className="mb-4 text-sm font-bold border-b pb-2 text-orange-600">PRICE RANGE</p>
                    <div className="flex flex-col gap-4">
                        <input
                            type="range"
                            min="0"
                            max="100000"
                            step="500"
                            value={priceRange}
                            onChange={(e) => setPriceRange(parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                        />
                        <div className="flex justify-between text-xs font-bold text-gray-500">
                            <span>Rs. 0</span>
                            <span className="text-orange-600">Under Rs. {priceRange.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side */}
            <div className="flex-1 mt-10">
                <Breadcrumbs
                    category={categoryFilter[0]}
                    itemCount={filterProducts.length}
                />

                {/* Map Products */}
                {filterProducts.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-10">
                        {filterProducts.map((item) => (
                            <div key={item.id} className="text-gray-700 cursor-pointer group relative flex flex-col h-full bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 overflow-hidden">
                                <Link to={`/product/${item.id}`} className="flex-1 flex flex-col">
                                    <div className="overflow-hidden aspect-[3/4] relative">
                                        <img className="group-hover:scale-110 transition-transform duration-700 w-full h-full object-cover" src={item.image} alt={item.title} />
                                        {item.badge && (
                                            <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-white px-3 py-1 text-[10px] font-bold rounded-lg uppercase tracking-widest">
                                                {item.badge}
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4 flex flex-col flex-1">
                                        <p className="text-[10px] font-bold text-orange-600 uppercase tracking-widest mb-1">{item.subCategory || item.category}</p>
                                        <h3 className="text-sm font-bold group-hover:text-orange-600 transition-colors line-clamp-2 mb-2">{item.title}</h3>
                                        <div className="mt-auto flex items-center gap-3">
                                            <p className="text-base font-bold text-gray-900">{item.price}</p>
                                            {item.originalPrice && <p className="text-xs text-gray-400 line-through font-medium">{item.originalPrice}</p>}
                                        </div>
                                    </div>
                                </Link>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        toggleWishlist(item.id);
                                        if (wishlistItems.includes(item.id)) {
                                            toast.info('Removed from wishlist');
                                        } else {
                                            toast.success('Added to wishlist!');
                                        }
                                    }}
                                    className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center shadow-lg backdrop-blur-md transition-all duration-300 ${wishlistItems.includes(item.id) ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-400 hover:text-red-500'}`}
                                >
                                    <FaHeart size={14} className={wishlistItems.includes(item.id) ? 'animate-heart-beat' : ''} />
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-sm border border-dashed border-gray-300">
                        <p className="text-gray-400 text-lg mb-4">No products found matching these filters.</p>
                        <button onClick={() => { setCategoryFilter([]); setPriceRange(100000); }} className="text-orange-600 font-bold hover:underline">Clear all filters</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllProducts;
