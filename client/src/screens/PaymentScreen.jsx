import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../slices/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentScreen = () => {
    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    useEffect(() => {
        if (!shippingAddress.address) {
            navigate('/shipping');
        }
    }, [shippingAddress, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder');
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <CheckoutSteps step1 step2 step3 />
            <h1 className="text-2xl font-bold mb-6">Payment Method</h1>
            <form onSubmit={submitHandler}>
                <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-2">Select Method</label>
                    <div className="flex items-center mb-4">
                        <input
                            type="radio"
                            id="PayPal"
                            name="paymentMethod"
                            value="PayPal"
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500"
                        />
                        <label htmlFor="PayPal" className="ml-2 text-sm font-medium text-gray-900">
                            PayPal or Credit Card
                        </label>
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full bg-primary-600 text-white font-bold py-2 px-4 rounded hover:bg-primary-700 transition"
                >
                    Continue
                </button>
            </form>
        </div>
    );
};

export default PaymentScreen;
