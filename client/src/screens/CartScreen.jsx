import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash, FaArrowLeft, FaShoppingBag } from 'react-icons/fa';
import { addToCart, removeFromCart } from '../slices/cartSlice';

const CartScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const addToCartHandler = async (product, qty) => {
        dispatch(addToCart({ ...product, qty }));
    };

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    const checkoutHandler = () => {
        navigate('/login?redirect=/shipping');
    };

    const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2);
    const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

    return (
        <div className="min-h-screen py-8 px-4">
            <div className="container mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-4xl font-bold">
                        <span className="gradient-text">Shopping Cart</span>
                    </h1>
                    <Link
                        to="/"
                        className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors"
                    >
                        <FaArrowLeft />
                        <span className="font-semibold">Continue Shopping</span>
                    </Link>
                </div>

                {cartItems.length === 0 ? (
                    <div className="card p-16 text-center animate-fadeIn">
                        <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                            <FaShoppingBag className="text-6xl text-blue-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-700 mb-4">Your cart is empty</h2>
                        <p className="text-slate-600 mb-8 text-lg">
                            Looks like you haven't added anything to your cart yet
                        </p>
                        <Link to="/" className="btn-primary inline-block text-lg px-8 py-4">
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {cartItems.map((item, index) => (
                                <div
                                    key={item._id}
                                    className="card p-6 flex flex-col sm:flex-row gap-6 animate-fadeIn"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    {/* Product Image */}
                                    <Link
                                        to={`/product/${item._id}`}
                                        className="w-full sm:w-32 h-32 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl overflow-hidden flex-shrink-0"
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-contain hover:scale-110 transition-transform duration-300"
                                            onError={(e) => {
                                                e.target.src = 'https://via.placeholder.com/200x200?text=Product';
                                            }}
                                        />
                                    </Link>

                                    {/* Product Info */}
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <Link
                                                to={`/product/${item._id}`}
                                                className="font-bold text-lg text-slate-800 hover:text-blue-600 transition-colors line-clamp-2 mb-2"
                                            >
                                                {item.name}
                                            </Link>
                                            {item.brand && (
                                                <p className="text-sm text-slate-500 mb-2">{item.brand}</p>
                                            )}
                                        </div>

                                        <div className="flex flex-wrap items-center gap-4">
                                            {/* Price */}
                                            <div className="text-2xl font-bold gradient-text">
                                                ${item.price}
                                            </div>

                                            {/* Quantity Selector */}
                                            <select
                                                value={item.qty}
                                                onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                                                className="input-field w-20 py-2"
                                            >
                                                {[...Array(Math.min(item.countInStock, 10)).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))}
                                            </select>

                                            {/* Remove Button */}
                                            <button
                                                onClick={() => removeFromCartHandler(item._id)}
                                                className="p-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Item Total */}
                                    <div className="text-right">
                                        <p className="text-sm text-slate-500 mb-1">Subtotal</p>
                                        <p className="text-2xl font-bold text-slate-800">
                                            ${(item.qty * item.price).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="card p-6 sticky top-24 space-y-6">
                                <h2 className="text-2xl font-bold text-slate-800">Order Summary</h2>

                                <div className="space-y-4">
                                    <div className="flex justify-between text-slate-600">
                                        <span>Items ({totalItems})</span>
                                        <span className="font-semibold">${subtotal}</span>
                                    </div>

                                    <div className="flex justify-between text-slate-600">
                                        <span>Shipping</span>
                                        <span className="font-semibold text-green-600">FREE</span>
                                    </div>

                                    <div className="border-t border-slate-200 pt-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-semibold text-slate-800">Total</span>
                                            <span className="text-3xl font-bold gradient-text">${subtotal}</span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={checkoutHandler}
                                    disabled={cartItems.length === 0}
                                    className="btn-primary w-full text-lg py-4"
                                >
                                    Proceed to Checkout
                                </button>

                                {/* Trust Badges */}
                                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                                    <div className="text-center">
                                        <div className="w-12 h-12 mx-auto mb-2 bg-green-100 rounded-full flex items-center justify-center">
                                            <span className="text-2xl">🔒</span>
                                        </div>
                                        <p className="text-xs text-slate-600">Secure Payment</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="w-12 h-12 mx-auto mb-2 bg-blue-100 rounded-full flex items-center justify-center">
                                            <span className="text-2xl">🚚</span>
                                        </div>
                                        <p className="text-xs text-slate-600">Fast Delivery</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartScreen;
