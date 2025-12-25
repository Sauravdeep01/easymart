import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FaArrowLeft } from 'react-icons/fa';
import { useGetUserDetailsQuery, useUpdateUserMutation } from '../../slices/usersApiSlice';

const UserEditScreen = () => {
    const { id: userId } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const { data: user, isLoading, error, refetch } = useGetUserDetailsQuery(userId);
    const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.role === 'admin');
        }
    }, [user]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await updateUser({ userId, name, email, role: isAdmin ? 'admin' : 'user' });
            toast.success('User updated successfully');
            refetch();
            navigate('/admin/userlist');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <div className="container mx-auto mt-10 max-w-2xl">
            <Link to="/admin/userlist" className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition">
                <FaArrowLeft className="mr-2" /> Go Back
            </Link>
            <h1 className="text-3xl font-bold mb-6">Edit User</h1>
            {isLoading ? <div>Loading...</div> : error ? <div className="text-red-500">{error?.data?.message || error.error}</div> : (
                <form onSubmit={submitHandler} className="bg-white p-8 rounded shadow-sm">
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Name</label>
                        <input
                            type="text"
                            placeholder="Enter name"
                            className="w-full px-3 py-2 border rounded shadow-sm outline-none focus:ring-2 focus:ring-primary-500"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Email Address</label>
                        <input
                            type="email"
                            placeholder="Enter email"
                            className="w-full px-3 py-2 border rounded shadow-sm outline-none focus:ring-2 focus:ring-primary-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="isAdmin"
                                className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            />
                            <label htmlFor="isAdmin" className="ml-2 text-sm font-bold text-gray-900">
                                Is Admin
                            </label>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-primary-600 text-white font-bold py-2 px-4 rounded hover:bg-primary-700 transition"
                        disabled={loadingUpdate}
                    >
                        {loadingUpdate ? 'Updating...' : 'Update'}
                    </button>
                </form>
            )}
        </div>
    );
};

export default UserEditScreen;
