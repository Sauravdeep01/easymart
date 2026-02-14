import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ShopContext } from '../context/ShopContext';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const { register } = useContext(ShopContext);

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        const result = await register(name, email, password);

        if (result.success) {
            toast.success("Account created successfully!");
            navigate('/profile');
        } else {
            toast.error(result.message || "Registration failed");
        }
    };

    return (
        <div className="pt-24 min-h-screen px-8 flex items-center justify-center bg-gray-50 pb-20">
            <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Create Account</h1>
                    <p className="text-gray-500 mt-2">Join Lavana Luxury E-Commerce</p>
                </div>
                <form onSubmit={handleRegister} className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border border-gray-200 rounded-xl p-3 focus:border-black outline-none transition-all font-medium"
                            placeholder="Saurav Deep"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-200 rounded-xl p-3 focus:border-black outline-none transition-all font-medium"
                            placeholder="your-email@example.com"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-200 rounded-xl p-3 focus:border-black outline-none transition-all font-medium"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full border border-gray-200 rounded-xl p-3 focus:border-black outline-none transition-all font-medium"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <button className="w-full bg-black text-white font-bold py-4 rounded-xl hover:bg-gray-900 transition-all shadow-lg hover:shadow-black/20 uppercase tracking-widest">
                        Sign Up
                    </button>
                    <div className="text-center mt-6">
                        <p className="text-sm text-gray-500">
                            Already have an account? <Link to="/login" className="text-black font-bold hover:underline">Login here</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
