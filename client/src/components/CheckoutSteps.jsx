import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <nav className="flex justify-center mb-8">
            <ol className="flex items-center w-full max-w-2xl text-sm font-medium text-center text-gray-500 sm:text-base">
                <li className={`flex md:w-full items-center ${step1 ? 'text-blue-600' : 'text-gray-500'}`}>
                    <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200">
                        {step1 ? <Link to="/login" className="hover:text-blue-700">Sign In</Link> : <span className="cursor-not-allowed">Sign In</span>}
                    </span>
                </li>
                <li className={`flex md:w-full items-center ${step2 ? 'text-blue-600' : 'text-gray-500'} before:content-[''] before:w-full before:h-0.5 before:bg-gray-200 before:hidden sm:before:inline-block before:mr-2`}>
                    <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200">
                        {step2 ? <Link to="/shipping" className="hover:text-blue-700">Shipping</Link> : <span className="cursor-not-allowed">Shipping</span>}
                    </span>
                </li>
                <li className={`flex md:w-full items-center ${step3 ? 'text-blue-600' : 'text-gray-500'} before:content-[''] before:w-full before:h-0.5 before:bg-gray-200 before:hidden sm:before:inline-block before:mr-2`}>
                    <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200">
                        {step3 ? <Link to="/payment" className="hover:text-blue-700">Payment</Link> : <span className="cursor-not-allowed">Payment</span>}
                    </span>
                </li>
                <li className={`flex items-center ${step4 ? 'text-blue-600' : 'text-gray-500'} before:content-[''] before:w-full before:h-0.5 before:bg-gray-200 before:hidden sm:before:inline-block before:mr-2`}>
                    {step4 ? <Link to="/placeorder" className="hover:text-blue-700">Place Order</Link> : <span className="cursor-not-allowed">Place Order</span>}
                </li>
            </ol>
        </nav>
    );
};

export default CheckoutSteps;
