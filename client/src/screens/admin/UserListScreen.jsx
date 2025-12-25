import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FaTrash, FaTimes, FaEdit, FaCheck } from 'react-icons/fa';
import { useGetUsersQuery, useDeleteUserMutation } from '../../slices/usersApiSlice';

const UserListScreen = () => {
    const { data: users, refetch, isLoading, error } = useGetUsersQuery();
    const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await deleteUser(id);
                refetch();
                toast.success('User deleted');
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-3xl font-bold mb-6">Users</h1>
            {loadingDelete && <div>Deleting...</div>}
            {isLoading ? (
                <div>Loading...</div>
            ) : error ? (
                <div className="text-red-500">{error?.data?.message || error.error}</div>
            ) : (
                <div className="overflow-x-auto bg-white rounded shadow-sm">
                    <table className="min-w-full text-left">
                        <thead className="bg-gray-100 border-b">
                            <tr>
                                <th className="py-3 px-4">ID</th>
                                <th className="py-3 px-4">NAME</th>
                                <th className="py-3 px-4">EMAIL</th>
                                <th className="py-3 px-4">ADMIN</th>
                                <th className="py-3 px-4">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id} className="border-b hover:bg-gray-50 transition">
                                    <td className="py-3 px-4 text-sm">{user._id}</td>
                                    <td className="py-3 px-4 font-medium text-gray-800">{user.name}</td>
                                    <td className="py-3 px-4 text-sm"><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                    <td className="py-3 px-4 text-sm">
                                        {user.role === 'admin' ? (
                                            <FaCheck className="text-green-500" />
                                        ) : (
                                            <FaTimes className="text-red-500" />
                                        )}
                                    </td>
                                    <td className="py-3 px-4 flex gap-3">
                                        <Link to={`/admin/user/${user._id}/edit`} className="text-blue-600 hover:text-blue-800">
                                            <FaEdit />
                                        </Link>
                                        <button
                                            onClick={() => deleteHandler(user._id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UserListScreen;
