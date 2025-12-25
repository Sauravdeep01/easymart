import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useGetProductDetailsQuery } from '../slices/productsApiSlice';
import { addToCart } from '../slices/cartSlice';
import Rating from '../components/Rating';
import { FaShoppingCart, FaArrowLeft, FaCheck, FaTruck, FaShieldAlt, FaHeart } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ProductScreen = () => {
    const { id: productId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [qty, setQty] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isLiked, setIsLiked] = useState(false);

    const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);

    const addToCartHandler = () => {
        if (!product || product.countInStock === 0) {
            toast.error('Product is out of stock');
            return;
        }

        dispatch(addToCart({
            _id: product._id,
            name: product.name,
            image: product.images?.[0] || product.image,
            price: product.price,
            countInStock: product.countInStock,
            brand: product.brand,
            qty: qty
        }));
        toast.success('Added to cart!');
        navigate('/cart');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="spinner mx-auto mb-4"></div>
                    <p className="text-slate-600 text-lg">Loading product details...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="card p-12 text-center max-w-2xl">
                    <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
                        <span className="text-4xl">😔</span>
                    </div>
                    <h3 className="text-2xl font-bold text-red-600 mb-4">Product Not Found</h3>
                    <p className="text-slate-600 mb-6">{error?.data?.message || error.error}</p>
                    <Link to="/" className="btn-primary inline-block">
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    const images = product?.images && product.images.length > 0 ? product.images : (product?.image ? [product.image] : []);

    return (
        <div className="min-h-screen py-8 px-4">
            <div className="container mx-auto">
                {/* Back Button */}
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 mb-8 transition-colors"
                >
                    <FaArrowLeft />
                    <span className="font-semibold">Back to Products</span>
                </Link>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Left Side - Images */}
                    <div className="space-y-4 animate-fadeIn">
                        {/* Main Image */}
                        <div className="card p-4 aspect-square bg-gradient-to-br from-slate-100 to-slate-200">
                            <img
                                src={images[selectedImage] || 'https://via.placeholder.com/600x600?text=Product+Image'}
                                alt={product.name}
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/600x600?text=Product+Image';
                                }}
                            />
                        </div>

                        {/* Thumbnail Images */}
                        {images.length > 1 && (
                            <div className="grid grid-cols-4 gap-4">
                                {images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`card p-2 aspect-square cursor-pointer transition-all ${selectedImage === index
                                                ? 'ring-4 ring-blue-500'
                                                : 'hover:ring-2 hover:ring-blue-300'
                                            }`}
                                    >
                                        <img
                                            src={img}
                                            alt={`${product.name} ${index + 1}`}
                                            className="w-full h-full object-contain"
                                            onError={(e) => {
                                                e.target.src = 'https://via.placeholder.com/100x100?text=Img';
                                            }}
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right Side - Product Info */}
                    <div className="space-y-6 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                        {/* Brand */}
                        {product.brand && (
                            <div className="badge bg-blue-100 text-blue-700 text-sm">
                                {product.brand}
                            </div>
                        )}

                        {/* Product Name */}
                        <h1 className="text-4xl font-bold text-slate-900">{product.name}</h1>

                        {/* Rating */}
                        <div className="flex items-center gap-4">
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-4">
                            <span className="text-5xl font-bold gradient-text">
                                ${product.price?.toFixed(2)}
                            </span>
                            {product.originalPrice && product.originalPrice > product.price && (
                                <span className="text-2xl text-slate-400 line-through">
                                    ${product.originalPrice?.toFixed(2)}
                                </span>
                            )}
                        </div>

                        {/* Description */}
                        <div className="card p-6">
                            <h3 className="font-bold text-lg mb-3">Product Description</h3>
                            <p className="text-slate-600 leading-relaxed">{product.description}</p>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="card p-4 text-center">
                                <FaTruck className="text-3xl text-blue-600 mx-auto mb-2" />
                                <p className="text-sm font-semibold">Free Shipping</p>
                            </div>
                            <div className="card p-4 text-center">
                                <FaShieldAlt className="text-3xl text-green-600 mx-auto mb-2" />
                                <p className="text-sm font-semibold">Secure Payment</p>
                            </div>
                            <div className="card p-4 text-center">
                                <FaCheck className="text-3xl text-purple-600 mx-auto mb-2" />
                                <p className="text-sm font-semibold">Quality Assured</p>
                            </div>
                        </div>

                        {/* Purchase Section */}
                        <div className="card p-6 space-y-4">
                            {/* Stock Status */}
                            <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                                <span className="font-semibold text-slate-700">Status:</span>
                                <span className={`badge ${product.countInStock > 0
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-red-100 text-red-700'
                                    }`}>
                                    {product.countInStock > 0 ? `In Stock (${product.countInStock})` : 'Out of Stock'}
                                </span>
                            </div>

                            {/* Quantity Selector */}
                            {product.countInStock > 0 && (
                                <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                                    <span className="font-semibold text-slate-700">Quantity:</span>
                                    <select
                                        value={qty}
                                        onChange={(e) => setQty(Number(e.target.value))}
                                        className="input-field w-24 py-2"
                                    >
                                        {[...Array(Math.min(product.countInStock, 10)).keys()].map((x) => (
                                            <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex gap-4">
                                <button
                                    onClick={addToCartHandler}
                                    disabled={product.countInStock === 0}
                                    className="btn-primary flex-1 flex items-center justify-center gap-2 text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <FaShoppingCart />
                                    <span>{product.countInStock === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
                                </button>
                                <button
                                    onClick={() => setIsLiked(!isLiked)}
                                    className={`p-4 rounded-xl transition-all ${isLiked
                                            ? 'bg-red-500 text-white'
                                            : 'bg-white border-2 border-slate-200 text-slate-700 hover:border-red-500 hover:text-red-500'
                                        }`}
                                >
                                    <FaHeart className="text-2xl" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductScreen;
