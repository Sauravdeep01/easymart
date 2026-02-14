const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    subCategory: { type: String },
    itemType: { type: String },
    price: { type: String, required: true },
    originalPrice: { type: String },
    image: { type: String, required: true },
    badge: { type: String },
    rating: { type: Number, default: 4.5 },
    reviews: { type: Number, default: 120 }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
