import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { useGetOrdersQuery } from '../../slices/ordersApiSlice';

const OrderListScreen = () => {
    const { data: orders, isLoading, error } = useGetOrdersQuery();

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-3xl font-bold mb-6">Orders</h1>
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
                                <th className="py-3 px-4">USER</th>
                                <th className="py-3 px-4">DATE</th>
                                <th className="py-3 px-4">TOTAL</th>
                                <th className="py-3 px-4">PAID</th>
                                <th className="py-3 px-4">DELIVERED</th>
                                <th className="py-3 px-4">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id} className="border-b hover:bg-gray-50 transition">
                                    <td className="py-3 px-4 text-sm">{order._id}</td>
                                    <td className="py-3 px-4 font-medium text-gray-800">{order.user && order.user.name}</td>
                                    <td className="py-3 px-4 text-sm">{order.createdAt.substring(0, 10)}</td>
                                    <td className="py-3 px-4 text-sm">${order.totalPrice}</td>
                                    <td className="py-3 px-4 text-sm">
                                        {order.isPaid ? (
                                            <span className="text-green-600 font-bold">{order.paidAt.substring(0, 10)}</span>
                                        ) : (
                                            <FaTimes className="text-red-500" />
                                        )}
                                    </td>
                                    <td className="py-3 px-4 text-sm">
                                        {order.isDelivered ? (
                                            <span className="text-green-600 font-bold">{order.deliveredAt.substring(0, 10)}</span>
                                        ) : (
                                            <FaTimes className="text-red-500" />
                                        )}
                                    </td>
                                    <td className="py-3 px-4 text-sm">
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
    );
};

export default OrderListScreen;
