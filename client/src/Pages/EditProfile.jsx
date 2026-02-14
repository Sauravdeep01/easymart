import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import { FaCheckCircle, FaUser, FaLock, FaCalendarAlt, FaPhoneAlt, FaEnvelope, FaCamera, FaChevronRight } from 'react-icons/fa';

const EditProfile = () => {
    const { userData, updateUserProfile } = useContext(ShopContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        gender: '',
        birthday: '',
        password: ''
    });

    const [focusedField, setFocusedField] = useState(null);

    useEffect(() => {
        if (userData) {
            setFormData({
                name: userData.name || '',
                email: userData.email || '',
                phone: userData.phone || '',
                gender: userData.gender || '',
                birthday: userData.birthday || '',
                password: ''
            });
        } else {
            navigate('/login');
        }
    }, [userData, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updateData = { ...formData };
        if (!updateData.password) {
            delete updateData.password;
        }

        const result = await updateUserProfile(updateData);
        if (result.success) {
            toast.success("Profile updated successfully!");
            navigate('/profile');
        } else {
            toast.error(result.message || "Failed to update profile");
        }
    };

    const inputClasses = (field) => `
        w-full text-lg font-medium text-gray-800 outline-none bg-transparent transition-all duration-300
        ${focusedField === field ? 'translate-x-1' : ''}
    `;

    const containerClasses = (field) => `
        group relative border rounded-2xl p-5 transition-all duration-500 flex items-center gap-4
        ${focusedField === field
            ? 'border-orange-500 bg-orange-50/30 shadow-[0_10px_40px_-15px_rgba(249,115,22,0.2)] scale-[1.02]'
            : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-lg hover:shadow-gray-100'}
    `;

    return (
        <div className="pt-28 pb-20 px-4 min-h-screen bg-[#fafafa] flex justify-center items-start animate-fade-in">
            <style>
                {`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.8s ease-out forwards;
                }
                `}
            </style>

            <div className="w-full max-w-2xl">
                <div className="flex flex-col items-center mb-10">
                    <div className="relative group cursor-pointer mb-4">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-2xl transition-transform duration-500 group-hover:scale-105">
                            <img
                                src={`https://ui-avatars.com/api/?name=${formData.name}&background=f97316&color=fff&size=200`}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute bottom-1 right-1 bg-orange-500 text-white p-2.5 rounded-full shadow-lg border-4 border-white transform transition-transform group-hover:rotate-12">
                            <FaCamera size={14} />
                        </div>
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">Edit Profile</h2>
                    <p className="text-gray-500 font-medium mt-1">Keep your information up to date</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Full Name */}
                    <div className={containerClasses('name')}>
                        <div className={`p-3 rounded-xl transition-colors duration-300 ${focusedField === 'name' ? 'bg-orange-500 text-white' : 'bg-gray-50 text-gray-400'}`}>
                            <FaUser size={18} />
                        </div>
                        <div className="flex-1">
                            <label className={`text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 ${focusedField === 'name' ? 'text-orange-500' : 'text-gray-400'}`}>Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                onFocus={() => setFocusedField('name')}
                                onBlur={() => setFocusedField(null)}
                                className={inputClasses('name')}
                                placeholder="Saurav Deep"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className={containerClasses('email')}>
                        <div className={`p-3 rounded-xl transition-colors duration-300 ${focusedField === 'email' ? 'bg-orange-500 text-white' : 'bg-gray-50 text-gray-400'}`}>
                            <FaEnvelope size={18} />
                        </div>
                        <div className="flex-1">
                            <label className={`text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 ${focusedField === 'email' ? 'text-orange-500' : 'text-gray-400'}`}>Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                onFocus={() => setFocusedField('email')}
                                onBlur={() => setFocusedField(null)}
                                className={inputClasses('email')}
                                placeholder="saurav@example.com"
                            />
                        </div>
                        <button type="button" className="text-[10px] font-black text-orange-600 uppercase tracking-widest px-3 py-1 hover:bg-orange-50 rounded-lg transition-colors">Change</button>
                    </div>

                    {/* Phone */}
                    <div className={containerClasses('phone')}>
                        <div className={`p-3 rounded-xl transition-colors duration-300 ${focusedField === 'phone' ? 'bg-orange-500 text-white' : 'bg-gray-50 text-gray-400'}`}>
                            <FaPhoneAlt size={18} />
                        </div>
                        <div className="flex-1">
                            <label className={`text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 ${focusedField === 'phone' ? 'text-orange-500' : 'text-gray-400'}`}>Mobile Number</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField('phone')}
                                    onBlur={() => setFocusedField(null)}
                                    className={inputClasses('phone')}
                                    placeholder="+91 87890 95893"
                                />
                                {formData.phone && <FaCheckCircle className="text-teal-500 animate-bounce" size={14} />}
                            </div>
                        </div>
                        <button type="button" className="text-[10px] font-black text-orange-600 uppercase tracking-widest px-3 py-1 hover:bg-orange-50 rounded-lg transition-colors">Verify</button>
                    </div>

                    {/* Birthday & Gender Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className={containerClasses('birthday')}>
                            <div className={`p-3 rounded-xl transition-colors duration-300 ${focusedField === 'birthday' ? 'bg-orange-500 text-white' : 'bg-gray-50 text-gray-400'}`}>
                                <FaCalendarAlt size={18} />
                            </div>
                            <div className="flex-1">
                                <label className={`text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 ${focusedField === 'birthday' ? 'text-orange-500' : 'text-gray-400'}`}>Birthday</label>
                                <input
                                    type="text"
                                    name="birthday"
                                    value={formData.birthday}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField('birthday')}
                                    onBlur={() => setFocusedField(null)}
                                    className={inputClasses('birthday')}
                                    placeholder="DD/MM/YYYY"
                                />
                            </div>
                        </div>

                        <div className="bg-white border border-gray-100 rounded-2xl p-1 flex shadow-sm transition-all hover:shadow-md">
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, gender: 'Male' })}
                                className={`flex-1 py-4 text-xs font-black uppercase tracking-widest rounded-xl transition-all duration-300 ${formData.gender === 'Male' ? 'bg-orange-500 text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                Male
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, gender: 'Female' })}
                                className={`flex-1 py-4 text-xs font-black uppercase tracking-widest rounded-xl transition-all duration-300 ${formData.gender === 'Female' ? 'bg-orange-500 text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                Female
                            </button>
                        </div>
                    </div>

                    {/* New Password */}
                    <div className={containerClasses('password')}>
                        <div className={`p-3 rounded-xl transition-colors duration-300 ${focusedField === 'password' ? 'bg-black text-white' : 'bg-gray-50 text-gray-400'}`}>
                            <FaLock size={18} />
                        </div>
                        <div className="flex-1">
                            <label className={`text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 ${focusedField === 'password' ? 'text-black' : 'text-gray-400'}`}>Security</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                onFocus={() => setFocusedField('password')}
                                onBlur={() => setFocusedField(null)}
                                className={inputClasses('password')}
                                placeholder="Change Password"
                            />
                        </div>
                        <FaChevronRight className="text-gray-200" />
                    </div>

                    <div className="pt-8">
                        <button
                            type="submit"
                            className="w-full bg-gray-900 group flex items-center justify-center gap-3 text-white font-black py-5 rounded-2xl text-xs uppercase tracking-[0.2em] transition-all duration-500 hover:bg-orange-600 hover:shadow-[0_20px_40px_-10px_rgba(249,115,22,0.4)] hover:-translate-y-1 active:scale-[0.98]"
                        >
                            Save All Changes
                            <FaChevronRight className="transition-transform group-hover:translate-x-1" size={10} />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
