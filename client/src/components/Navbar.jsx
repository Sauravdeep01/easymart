import React, { useContext, useState } from 'react';
import { FaSearch, FaUser, FaShoppingCart, FaHeart, FaBell, FaChevronDown } from 'react-icons/fa';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import cloudinaryAssets from '../cloudinary-assets.json';
import { toast } from 'react-toastify';

const Navbar = () => {
    const { getCartCount, wishlistItems, userData, logout } = useContext(ShopContext);
    const [hoveredMenu, setHoveredMenu] = useState(null);
    const navigate = useNavigate();

    const menuItems = [
        // ... (omitting menuItems for brevity as it's large, assuming tool handles it)
        // Correct way is to just replace the specific section inside return
        {
            name: 'Men',
            subCategories: [
                { title: 'Topwear', items: ['T-Shirts', 'Casual Shirts', 'Formal Shirts', 'Sweatshirts', 'Jackets'] },
                { title: 'Bottomwear', items: ['Jeans', 'Casual Trousers', 'Formal Trousers', 'Shorts', 'Track Pants'] },
                { title: 'Footwear', items: ['Casual Shoes', 'Sports Shoes', 'Formal Shoes', 'Sneakers', 'Sandals'] }
            ]
        },
        {
            name: 'Women',
            subCategories: [
                { title: 'Indian Wear', items: ['Kurtas & Suits', 'Sarees', 'Ethnic Wear', 'Leggings & Salwars'] },
                { title: 'Western Wear', items: ['Tops', 'Dresses', 'Trousers', 'Skirts', 'Jackets'] },
                { title: 'Footwear', items: ['Flats', 'Heels', 'Boots', 'Sports Shoes'] }
            ]
        },
        {
            name: 'Kids',
            subCategories: [
                { title: 'Boys Clothing', items: ['T-Shirts', 'Shirts', 'Jeans', 'Trousers'] },
                { title: 'Girls Clothing', items: ['Dresses', 'Tops', 'Trousers', 'Skirts'] },
                { title: 'Infants', items: ['Bodysuits', 'Clothing Sets', 'Dresses'] }
            ]
        },
        {
            name: 'Electronics',
            subCategories: [
                { title: 'Mobiles', items: ['Smartphones', 'Tablets', 'Feature Phones', 'Accessories'] },
                { title: 'Laptops', items: ['Gaming Laptops', 'Thin & Light', 'Workstations', 'Tablets'] },
                { title: 'Audio', items: ['Headphones', 'Earphones', 'Speakers', 'Soundbars'] }
            ]
        },
        {
            name: 'Beauty',
            subCategories: [
                { title: 'Makeup', items: ['Lipsticks', 'Eyeliners', 'Foundations', 'Mascaras', 'Nail Polish'] },
                { title: 'Skincare', items: ['Face Wash', 'Moisturizers', 'Sunscreen', 'Serums', 'Face Masks'] },
                { title: 'Fragrances', items: ['Perfumes', 'Deodorants', 'Body Mists', 'Attar'] }
            ]
        }
    ];

    return (
        <nav
            className="bg-white shadow-sm sticky top-0 z-50 w-full"
            onMouseLeave={() => setHoveredMenu(null)}
        >
            <div className="flex items-center justify-between px-8 py-4 max-w-8xl mx-auto">
                <div className="flex items-center gap-12">
                    <Link to="/" className="text-2xl font-bold tracking-tighter flex items-center gap-2">
                        <img
                            src={cloudinaryAssets['NavbarLogo.png']}
                            alt="Lavana Logo"
                            className="h-6 w-14"
                        />
                        Lavana
                    </Link>
                    <ul className="hidden md:flex items-center gap-8 text-sm font-bold text-gray-700 uppercase tracking-wide">
                        {menuItems.map((item) => (
                            <li
                                key={item.name}
                                className="relative py-2 group cursor-pointer"
                                onMouseEnter={() => setHoveredMenu(item.name)}
                            >
                                <NavLink
                                    to={`/products?category=${item.name}`}
                                    className={({ isActive }) => `hover:text-orange-600 flex items-center gap-1 transition-colors ${isActive ? 'text-orange-600' : ''}`}
                                >
                                    {item.name}
                                    <FaChevronDown className={`text-[10px] transition-transform duration-300 ${hoveredMenu === item.name ? 'rotate-180' : ''}`} />
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex items-center gap-6">
                    <div className="relative hidden lg:block">
                        <input
                            type="text"
                            placeholder="Search for products, brands and more"
                            className="bg-gray-100 rounded-lg py-2 px-6 pl-10 text-sm focus:outline-none focus:ring-1 focus:ring-orange-200 w-[550px] transition-all border border-transparent focus:bg-white focus:border-orange-500"
                        />
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                    </div>
                    <div className="flex items-center gap-6 text-gray-600 font-medium">
                        <Link to="/wishlist" className="flex flex-col items-center gap-1 cursor-pointer hover:text-black transition-colors relative">
                            <FaHeart className="text-lg" />
                            <span className="text-[10px] uppercase font-bold">Wishlist</span>
                            {wishlistItems.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{wishlistItems.length}</span>
                            )}
                        </Link>
                        <Link to="/cart" className="flex flex-col items-center gap-1 cursor-pointer hover:text-black transition-colors relative">
                            <FaShoppingCart className="text-lg" />
                            <span className="text-[10px] uppercase font-bold">Cart</span>
                            <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{getCartCount()}</span>
                        </Link>
                        <div className="group relative">
                            <div className="flex flex-col items-center gap-1 cursor-default hover:text-orange-600 transition-colors">
                                <FaUser className="text-lg" />
                                <span className="text-[10px] uppercase font-bold">Profile</span>
                            </div>

                            {/* Profile Dropdown */}
                            <div className="group-hover:block hidden absolute right-[-80px] pt-4 z-50">
                                <div className="bg-white w-64 shadow-[0_8px_20px_rgba(0,0,0,0.15)] border border-gray-100 py-5 text-left">
                                    {userData ? (
                                        <>
                                            <div className="px-5 pb-3">
                                                <h3 className="font-bold text-gray-800 text-[14px]">Hello {userData.name.split(' ')[0]}</h3>
                                                <p className="text-gray-600 text-[13px] mt-0.5 truncate uppercase">{userData.email.split('@')[0]}</p>
                                            </div>

                                            <div className="border-t border-gray-100 my-2"></div>

                                            <div className="flex flex-col py-1">
                                                <Link to="/orders" className="px-5 py-2 text-[14px] text-gray-600 hover:font-bold hover:text-black transition-all">Orders</Link>
                                                <Link to="/wishlist" className="px-5 py-2 text-[14px] text-gray-600 hover:font-bold hover:text-black transition-all">Wishlist</Link>
                                                <Link to="/address" className="px-5 py-2 text-[14px] text-gray-600 hover:font-bold hover:text-black transition-all">Saved Address</Link>
                                            </div>

                                            <div className="border-t border-gray-100 my-2"></div>

                                            <div className="flex flex-col py-1">
                                                <Link to="/edit-profile" className="px-5 py-2 text-[14px] text-gray-600 hover:font-bold hover:text-black transition-all">Edit Profile</Link>
                                                <p onClick={() => { logout(); toast.success('Logged out successfully'); navigate('/login'); }} className="px-5 py-2 text-[14px] text-gray-600 hover:font-bold hover:text-black cursor-pointer transition-all">Logout</p>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="px-5 py-4">
                                            <h3 className="font-bold text-gray-800 text-[14px] mb-1">Welcome</h3>
                                            <p className="text-gray-500 text-[13px] mb-4">To access account and manage orders</p>
                                            <Link to="/login" className="inline-block border border-gray-200 px-6 py-2.5 text-[13px] font-bold text-orange-600 uppercase tracking-wider hover:border-orange-600 transition-colors">Login / Signup</Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mega Menu Dropdown */}
            <div
                className={`absolute left-0 w-full bg-white border-b shadow-xl transition-all duration-300 overflow-hidden ${hoveredMenu ? 'max-h-[500px] opacity-100 py-10 visible' : 'max-h-0 opacity-0 invisible'}`}
                onMouseEnter={() => setHoveredMenu(hoveredMenu)}
                onMouseLeave={() => setHoveredMenu(null)}
            >
                <div className="max-w-7xl mx-auto px-8 grid grid-cols-4 gap-12">
                    {menuItems.find(i => i.name === hoveredMenu)?.subCategories.map((sub, idx) => (
                        <div key={idx} className="flex flex-col gap-4">
                            <h4 className="font-bold text-orange-600 text-sm tracking-widest uppercase border-b pb-2">{sub.title}</h4>
                            <ul className="flex flex-col gap-2">
                                {sub.items.map((subItem, sIdx) => (
                                    <li key={sIdx}>
                                        <Link
                                            to={`/products?category=${hoveredMenu}&sub=${sub.title}&item=${subItem}`}
                                            className="text-gray-600 hover:text-black hover:font-semibold text-sm transition-all"
                                            onClick={() => setHoveredMenu(null)}
                                        >
                                            {subItem}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                    {/* Featured Image in Dropdown */}
                    <div className="rounded-xl overflow-hidden relative group cursor-pointer h-64 bg-gray-100 flex items-center justify-center">
                        <div className="text-center p-6">
                            <p className="text-orange-600 font-bold text-xs uppercase tracking-tighter mb-2">New Arrivals</p>
                            <h5 className="text-xl font-bold text-gray-900 mb-4">Summer Collection 2026</h5>
                            <button className="text-xs font-bold border-b-2 border-black pb-1 hover:text-orange-600 hover:border-orange-600 transition-all">SHOP NOW</button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
