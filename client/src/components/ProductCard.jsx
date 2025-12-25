import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Rating from './Rating';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import { useState } from 'react';
import { addToCart } from '../slices/cartSlice';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
    const [isLiked, setIsLiked] = useState(false);
    const dispatch = useDispatch();

    const handleAddToCart = (e) => {
        e.preventDefault();
        if (product.countInStock === 0) {
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
            qty: 1
        }));
        toast.success('Added to cart!');
    };

    return (
        <div className="product-card hover-lift group">
            {/* Image Container */}
            <div className="relative overflow-hidden aspect-square bg-gradient-to-br from-slate-100 to-slate-200">
                <Link to={`/product/${product._id}`}>
                    <img
                        src={product.images?.[0] || product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/400x400?text=Product+Image';
                        }}
                    />
                </Link>

                {/* Overlay Buttons */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                        onClick={() => setIsLiked(!isLiked)}
                        className={`p-3 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 ${isLiked
                            ? 'bg-red-500 text-white'
                            : 'bg-white/90 text-slate-700 hover:bg-red-500 hover:text-white'
                            }`}
                        title={isLiked ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                        <FaHeart />
                    </button>
                </div>

                {/* Stock Badge */}
                {product.countInStock === 0 && (
                    <div className="absolute top-4 left-4">
                        <span className="badge bg-red-500 text-white">Out of Stock</span>
                    </div>
                )}

                {product.countInStock > 0 && product.countInStock < 5 && (
                    <div className="absolute top-4 left-4">
                        <span className="badge bg-orange-500 text-white">Only {product.countInStock} left!</span>
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div className="p-5">
                <Link to={`/product/${product._id}`}>
                    <h3 className="font-bold text-lg mb-2 text-slate-800 hover:text-blue-600 transition-colors line-clamp-2 min-h-[3.5rem]">
                        {product.name}
                    </h3>
                </Link>

                <div className="mb-3">
                    <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                </div>

                <div className="flex items-center justify-between mb-4">
                    <div>
                        <span className="text-2xl font-bold gradient-text">
                            ${product.price?.toFixed(2)}
                        </span>
                        {product.originalPrice && product.originalPrice > product.price && (
                            <div className="text-sm text-slate-500 line-through">
                                ${product.originalPrice?.toFixed(2)}
                            </div>
                        )}
                    </div>
                    {product.brand && (
                        <span className="badge bg-slate-100 text-slate-700">
                            {product.brand}
                        </span>
                    )}
                </div>

                <div className="space-y-2">
                    <button
                        onClick={handleAddToCart}
                        disabled={product.countInStock === 0}
                        className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <FaShoppingCart />
                        <span>{product.countInStock === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
                    </button>
                    <Link
                        to={`/product/${product._id}`}
                        className="btn-secondary w-full text-center"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
