import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useProfileMutation } from '../slices/usersApiSlice';
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice';
import { setCredentials } from '../slices/authSlice';

const ProfileScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { userInfo } = useSelector((state) => state.auth);
    const { data: orders, isLoading: loadingOrders, error: errorOrders } = useGetMyOrdersQuery();

    const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();

    const dispatch = useDispatch();

    useEffect(() => {
        setName(userInfo.name);
        setEmail(userInfo.email);
    }, [userInfo.email, userInfo.name]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
        } else {
            try {
                const res = await updateProfile({
                    _id: userInfo._id,
                    name,
                    email,
                    password,
                }).unwrap();
                dispatch(setCredentials({ ...res }));
                toast.success('Profile updated successfully');
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    return (
        <div className="container mx-auto mt-10 grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="md:col-span-1">
                <h2 className="text-2xl font-bold mb-6">User Profile</h2>
                <form onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Name</label>
                        <input
                            type="text"
                            placeholder="Enter name"
                            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Email Address</label>
                        <input
                            type="email"
                            placeholder="Enter email"
                            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Password</label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2">Confirm Password</label>
                        <input
                            type="password"
                            placeholder="Confirm password"
                            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <button
                        className="w-full bg-primary-600 text-white font-bold py-2 px-4 rounded hover:bg-primary-700 transition"
                        type="submit"
                        disabled={loadingUpdateProfile}
                    >
                        {loadingUpdateProfile ? 'Updating...' : 'Update'}
                    </button>
                </form>
            </div>

            <div className="md:col-span-3">
                <h2 className="text-2xl font-bold mb-6">My Orders</h2>
                {loadingOrders ? (
                    <div>Loading...</div>
                ) : errorOrders ? (
                    <div className="text-red-500">{errorOrders?.data?.message || errorOrders.error}</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200">
                            <thead>
                                <tr className="bg-gray-100 text-left">
                                    <th className="py-2 px-4 border-b">ID</th>
                                    <th className="py-2 px-4 border-b">DATE</th>
                                    <th className="py-2 px-4 border-b">TOTAL</th>
                                    <th className="py-2 px-4 border-b">PAID</th>
                                    <th className="py-2 px-4 border-b">DELIVERED</th>
                                    <th className="py-2 px-4 border-b"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order._id} className="hover:bg-gray-50">
                                        <td className="py-2 px-4 border-b text-sm">{order._id}</td>
                                        <td className="py-2 px-4 border-b text-sm">{order.createdAt.substring(0, 10)}</td>
                                        <td className="py-2 px-4 border-b text-sm">${order.totalPrice}</td>
                                        <td className="py-2 px-4 border-b text-sm">
                                            {order.isPaid ? (
                                                <span className="text-green-600 font-bold">{order.paidAt.substring(0, 10)}</span>
                                            ) : (
                                                <FaTimes className="text-red-500" />
                                            )}
                                        </td>
                                        <td className="py-2 px-4 border-b text-sm">
                                            {order.isDelivered ? (
                                                <span className="text-green-600 font-bold">{order.deliveredAt.substring(0, 10)}</span>
                                            ) : (
                                                <FaTimes className="text-red-500" />
                                            )}
                                        </td>
                                        <td className="py-2 px-4 border-b text-sm">
                                            <Link to={`/order/${order._id}`} className="bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300">
                                                Details
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileScreen;
