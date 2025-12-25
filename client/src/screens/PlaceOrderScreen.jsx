import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import CheckoutSteps from '../components/CheckoutSteps';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/cartSlice';

const PlaceOrderScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);

    const [createOrder, { isLoading, error }] = useCreateOrderMutation();

    useEffect(() => {
        if (!cart.shippingAddress.address) {
            navigate('/shipping');
        } else if (!cart.paymentMethod) {
            navigate('/payment');
        }
    }, [cart.shippingAddress.address, cart.paymentMethod, navigate]);

    const placeOrderHandler = async () => {
        try {
            const res = await createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice
            }).unwrap();

            dispatch(clearCartItems());
            navigate(`/order/${res._id}`);
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <div className="container mx-auto mt-10">
            <CheckoutSteps step1 step2 step3 step4 />
            <h1 className="text-3xl font-bold mb-6">Review Order</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                    {/* Shipping */}
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">Shipping</h2>
                        <p className="mb-2"><strong>Address: </strong>
                            {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                        </p>
                    </div>

                    {/* Payment */}
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">Payment Method</h2>
                        <p className="mb-2"><strong>Method: </strong>{cart.paymentMethod}</p>
                    </div>

                    {/* Order Items */}
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">Order Items</h2>
                        {cart.cartItems.length === 0 ? <p>Your cart is empty</p> : (
                            <div className="space-y-4">
                                {cart.cartItems.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                                        <div className="flex items-center gap-4">
                                            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                                            <Link to={`/product/${item._id}`} className="text-gray-900 font-medium hover:text-primary-600">
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
                            <span>${cart.itemsPrice}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span>${cart.shippingPrice}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Tax</span>
                            <span>${cart.taxPrice}</span>
                        </div>
                        <div className="flex justify-between pt-3 border-t font-bold text-lg">
                            <span>Total</span>
                            <span>${cart.totalPrice}</span>
                        </div>
                    </div>

                    {error && <div className="text-red-500 mb-4">{error?.data?.message || error.error}</div>}

                    <button
                        type="button"
                        className="w-full bg-primary-600 text-white font-bold py-3 rounded hover:bg-primary-700 transition"
                        disabled={cart.cartItems === 0 || isLoading}
                        onClick={placeOrderHandler}
                    >
                        {isLoading ? 'Placing Order...' : 'Place Order'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PlaceOrderScreen;
