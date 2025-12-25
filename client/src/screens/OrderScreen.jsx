import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { useGetOrderDetailsQuery, usePayOrderMutation, useDeliverOrderMutation, useGetPaypalClientIdQuery } from '../slices/ordersApiSlice';

const OrderScreen = () => {
    const { id: orderId } = useParams();

    const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);
    const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
    const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();
    const { userInfo } = useSelector((state) => state.auth);

    // Mock Pay for now
    const onPayHandler = async () => {
        try {
            await payOrder({ orderId, details: { payer: {} } });
            refetch();
            toast.success('Order is paid');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    const deliverHandler = async () => {
        try {
            await deliverOrder(orderId);
            refetch();
            toast.success('Order delivered');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    return isLoading ? <div>Loading...</div> : error ? <div className="text-red-500">{error?.data?.message || error.error}</div> : (
        <div className="container mx-auto mt-10">
            <h1 className="text-3xl font-bold mb-6">Order {order._id}</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                    {/* Shipping */}
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">Shipping</h2>
                        <p className="mb-2"><strong>Name: </strong> {order.user.name}</p>
                        <p className="mb-2"><strong>Email: </strong> <a href={`mailto:${order.user.email}`} className="text-primary-600 underline">{order.user.email}</a></p>
                        <p className="mb-4"><strong>Address: </strong>
                            {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                        </p>
                        {order.isDelivered ? (
                            <div className="bg-green-100 text-green-700 px-4 py-2 rounded">Delivered on {order.deliveredAt.substring(0, 10)}</div>
                        ) : (
                            <div className="bg-red-100 text-red-700 px-4 py-2 rounded">Not Delivered</div>
                        )}
                    </div>

                    {/* Payment */}
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">Payment Method</h2>
                        <p className="mb-4"><strong>Method: </strong>{order.paymentMethod}</p>
                        {order.isPaid ? (
                            <div className="bg-green-100 text-green-700 px-4 py-2 rounded">Paid on {order.paidAt.substring(0, 10)}</div>
                        ) : (
                            <div className="bg-red-100 text-red-700 px-4 py-2 rounded">Not Paid</div>
                        )}
                    </div>

                    {/* Order Items */}
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">Order Items</h2>
                        {order.orderItems.length === 0 ? <p>Order is empty</p> : (
                            <div className="space-y-4">
                                {order.orderItems.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                                        <div className="flex items-center gap-4">
                                            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                                            <Link to={`/product/${item.product}`} className="text-gray-900 font-medium hover:text-primary-600">
                                                {item.name}
                                            </Link>
                                        </div>
                                        <div className="text-gray-600">
                                            {item.qty} x ${item.price} = <span className="font-bold text-gray-900">${(item.qty * item.price).toFixed(2)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Summary */}
                <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
                    <h2 className="text-xl font-bold mb-6 border-b pb-2">Order Summary</h2>
                    <div className="space-y-3 mb-6">
                        <div className="flex justify-between">
                            <span>Items</span>
                            <span>${order.itemsPrice}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span>${order.shippingPrice}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Tax</span>
                            <span>${order.taxPrice}</span>
                        </div>
                        <div className="flex justify-between pt-3 border-t font-bold text-lg">
                            <span>Total</span>
                            <span>${order.totalPrice}</span>
                        </div>
                    </div>

                    {!order.isPaid && (
                        <button
                            onClick={onPayHandler}
                            className="w-full bg-primary-600 text-white font-bold py-3 rounded hover:bg-primary-700 transition"
                        >
                            {loadingPay ? 'Processing...' : 'Mark As Paid (Mock)'}
                        </button>
                    )}

                    {userInfo && userInfo.role === 'admin' && order.isPaid && !order.isDelivered && (
                        <button
                            onClick={deliverHandler}
                            className="w-full bg-gray-800 text-white font-bold py-3 rounded mt-4 hover:bg-gray-900 transition"
                        >
                            {loadingDeliver ? 'Processing...' : 'Mark As Delivered'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderScreen;
