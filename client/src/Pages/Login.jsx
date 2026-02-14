import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ShopContext } from '../context/ShopContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const { login } = useContext(ShopContext);

    const handleLogin = async (e) => {
        e.preventDefault();

        const result = await login(email, password);

        if (result.success) {
            if (result.data.isAdmin) {
                toast.success("Welcome, Admin!");
                navigate('/admin');
            } else {
                toast.success("Login Successful!");
                navigate('/profile');
            }
        } else {
            toast.error(result.message || "Invalid credentials");
        }
    };

    return (
        <div className="pt-24 min-h-screen px-8 flex items-center justify-center bg-gray-50">
            <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Login</h1>
                    <p className="text-gray-500 mt-2">Access your Lavana account</p>
                </div>
                <form onSubmit={handleLogin} className="space-y-6">
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
                    <button className="w-full bg-black text-white font-bold py-4 rounded-xl hover:bg-gray-900 transition-all shadow-lg hover:shadow-black/20 uppercase tracking-widest">
                        Sign In
                    </button>
                    <div className="text-center mt-6">
                        <p className="text-sm text-gray-500">
                            Don't have an account? <Link to="/register" className="text-black font-bold hover:underline">Sign up here</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
