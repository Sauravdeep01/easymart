import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { FaShoppingCart, FaUser, FaSearch, FaSignOutAlt, FaUserCircle, FaBox, FaUsers, FaClipboardList, FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import toast from 'react-hot-toast';

const Header = () => {
    const [keyword, setKeyword] = useState('');
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { cartItems } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth);

    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/login');
            toast.success('Logged out successfully');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/search/${keyword}`);
            setKeyword('');
        } else {
            navigate('/');
        }
    };

    const cartItemsCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

    return (
        <header className="sticky top-0 z-50 glass shadow-lg border-b border-white/20">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-3 group">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                            <FaShoppingCart className="text-white text-xl" />
                        </div>
                        <span className="text-2xl font-bold gradient-text hidden sm:block">ShopMate</span>
                    </Link>

                    {/* Search Bar - Desktop */}
                    <form onSubmit={submitHandler} className="hidden md:flex flex-1 max-w-xl mx-8">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Search for products..."
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                className="input-field pr-12 w-full"
                            />
                            <button
                                type="submit"
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-2.5 rounded-lg hover:shadow-lg transition-all duration-300"
                            >
                                <FaSearch />
                            </button>
                        </div>
                    </form>

                    {/* Right Section */}
                    <div className="flex items-center space-x-4">
                        {/* Cart */}
                        <Link
                            to="/cart"
                            className="relative p-3 rounded-xl hover:bg-white/50 transition-all duration-300 group"
                        >
                            <FaShoppingCart className="text-xl text-slate-700 group-hover:text-blue-600 transition-colors" />
                            {cartItemsCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg animate-pulse-glow">
                                    {cartItemsCount}
                                </span>
                            )}
                        </Link>

                        {/* User Menu */}
                        {userInfo ? (
                            <div className="relative">
                                <button
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    className="flex items-center space-x-2 p-2 px-4 rounded-xl hover:bg-white/50 transition-all duration-300"
                                >
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
                                        {userInfo.name.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="hidden lg:block font-semibold text-slate-700">{userInfo.name}</span>
                                </button>

                                {showUserMenu && (
                                    <div className="absolute right-0 mt-2 w-56 glass rounded-2xl shadow-2xl py-2 animate-fadeIn">
                                        <Link
                                            to="/profile"
                                            className="flex items-center space-x-3 px-4 py-3 hover:bg-white/50 transition-all"
                                            onClick={() => setShowUserMenu(false)}
                                        >
                                            <FaUserCircle className="text-blue-600" />
                                            <span>My Profile</span>
                                        </Link>

                                        {userInfo.isAdmin && (
                                            <>
                                                <div className="border-t border-slate-200 my-2"></div>
                                                <Link
                                                    to="/admin/productlist"
                                                    className="flex items-center space-x-3 px-4 py-3 hover:bg-white/50 transition-all"
                                                    onClick={() => setShowUserMenu(false)}
                                                >
                                                    <FaBox className="text-indigo-600" />
                                                    <span>Products</span>
                                                </Link>
                                                <Link
                                                    to="/admin/userlist"
                                                    className="flex items-center space-x-3 px-4 py-3 hover:bg-white/50 transition-all"
                                                    onClick={() => setShowUserMenu(false)}
                                                >
                                                    <FaUsers className="text-purple-600" />
                                                    <span>Users</span>
                                                </Link>
                                                <Link
                                                    to="/admin/orderlist"
                                                    className="flex items-center space-x-3 px-4 py-3 hover:bg-white/50 transition-all"
                                                    onClick={() => setShowUserMenu(false)}
                                                >
                                                    <FaClipboardList className="text-green-600" />
                                                    <span>Orders</span>
                                                </Link>
                                            </>
                                        )}

                                        <div className="border-t border-slate-200 my-2"></div>
                                        <button
                                            onClick={() => {
                                                logoutHandler();
                                                setShowUserMenu(false);
                                            }}
                                            className="flex items-center space-x-3 px-4 py-3 hover:bg-red-50 text-red-600 w-full transition-all"
                                        >
                                            <FaSignOutAlt />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="flex items-center space-x-2 btn-primary"
                            >
                                <FaUser />
                                <span className="hidden sm:block">Sign In</span>
                            </Link>
                        )}

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setShowMobileMenu(!showMobileMenu)}
                            className="md:hidden p-3 rounded-xl hover:bg-white/50 transition-all"
                        >
                            {showMobileMenu ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Search */}
                {showMobileMenu && (
                    <div className="md:hidden pb-4 animate-slideIn">
                        <form onSubmit={submitHandler} className="w-full">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search for products..."
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                    className="input-field pr-12 w-full"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-2.5 rounded-lg"
                                >
                                    <FaSearch />
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
