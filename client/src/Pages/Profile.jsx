import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';

const Profile = () => {
    const { userData, logout } = useContext(ShopContext);
    const navigate = useNavigate();

    if (!userData) {
        navigate('/login');
        return null;
    }

    return (
        <div className="pt-32 pb-20 px-8 min-h-screen bg-gray-50 flex justify-center">
            <div className="w-full max-w-sm">
                <div className="bg-white shadow-[0_8px_30px_rgba(0,0,0,0.05)] border border-gray-100 rounded-2xl overflow-hidden">
                    {/* Profile Header */}
                    <div className="px-8 py-8 border-b border-gray-50">
                        <h3 className="font-bold text-gray-800 text-xl">Hello {userData.name}</h3>
                        <p className="text-gray-500 text-sm mt-1">{userData.email}</p>
                    </div>

                    {/* Menu Options */}
                    <div className="py-4">
                        <div className="flex flex-col">
                            <Link to="/orders" className="px-8 py-4 text-[15px] text-gray-700 hover:bg-gray-50 hover:font-bold hover:text-black transition-all flex justify-between items-center group">
                                Orders
                                <span className="text-gray-300 group-hover:text-black transition-colors">→</span>
                            </Link>
                            <Link to="/wishlist" className="px-8 py-4 text-[15px] text-gray-700 hover:bg-gray-50 hover:font-bold hover:text-black transition-all flex justify-between items-center group">
                                Wishlist
                                <span className="text-gray-300 group-hover:text-black transition-colors">→</span>
                            </Link>
                            <Link to="/address" className="px-8 py-4 text-[15px] text-gray-700 hover:bg-gray-50 hover:font-bold hover:text-black transition-all flex justify-between items-center group">
                                Saved Address
                                <span className="text-gray-300 group-hover:text-black transition-colors">→</span>
                            </Link>
                        </div>

                        <div className="border-t border-gray-50 my-2"></div>

                        <div className="flex flex-col">
                            <Link to="/edit-profile" className="px-8 py-4 text-[15px] text-gray-700 hover:bg-gray-50 hover:font-bold hover:text-black transition-all flex justify-between items-center group">
                                Edit Profile
                                <span className="text-gray-300 group-hover:text-black transition-colors">→</span>
                            </Link>
                            <div
                                onClick={() => { logout(); toast.success('Logged out successfully'); navigate('/login'); }}
                                className="px-8 py-4 text-[15px] text-gray-700 hover:bg-gray-50 hover:font-bold hover:text-red-500 cursor-pointer transition-all flex justify-between items-center group"
                            >
                                Logout
                                <span className="text-gray-300 group-hover:text-red-500 transition-colors">→</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
