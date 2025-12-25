const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: [true, 'Please provide a product name'],
        trim: true,
        minlength: [3, 'Product name must be at least 3 characters'],
        maxlength: [100, 'Product name cannot exceed 100 characters']
    },
    images: [{
        type: String,
        required: true
    }],
    brand: {
        type: String,
        required: [true, 'Please provide a brand'],
        trim: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Please provide a category'],
        ref: 'Category'
    },
    description: {
        type: String,
        required: [true, 'Please provide a description'],
        minlength: [10, 'Description must be at least 10 characters'],
        maxlength: [2000, 'Description cannot exceed 2000 characters']
    },
    specifications: {
        color: String,
        size: String,
        weight: String,
        dimensions: String,
        material: String,
        warranty: String
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    numReviews: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, 'Please provide a price'],
        min: [0, 'Price cannot be negative']
    },
    originalPrice: {
        type: Number
    },
    discount: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    countInStock: {
        type: Number,
        required: [true, 'Please provide stock count'],
        min: 0,
        default: 0
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }],
    seller: {
        name: String,
        rating: Number
    },
    tags: [String],
    isActive: {
        type: Boolean,
        default: true
    },
    views: {
        type: Number,
        default: 0
    },
    bestSeller: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

// Index for search and filtering
productSchema.index({ name: 'text', description: 'text', brand: 'text' });
productSchema.index({ category: 1, price: 1 });
productSchema.index({ rating: -1, numReviews: -1 });
productSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Product', productSchema);
