const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Review = require('../models/Review');

// @desc    Fetch all products with filters, search, and pagination
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    const pageSize = parseInt(req.query.pageSize) || 12;
    const page = parseInt(req.query.page) || 1;
    const keyword = req.query.keyword ? { $text: { $search: req.query.keyword } } : {};
    const category = req.query.category ? { category: req.query.category } : {};
    const brand = req.query.brand ? { brand: req.query.brand } : {};
    const minPrice = req.query.minPrice ? parseFloat(req.query.minPrice) : 0;
    const maxPrice = req.query.maxPrice ? parseFloat(req.query.maxPrice) : Number.MAX_VALUE;
    const minRating = req.query.minRating ? parseFloat(req.query.minRating) : 0;
    const inStock = req.query.inStock === 'true' ? { countInStock: { $gt: 0 } } : {};
    const bestSeller = req.query.bestSeller === 'true' ? { bestSeller: true } : {};

    const sortBy = req.query.sort || '-createdAt';

    const filter = {
        ...keyword,
        ...category,
        ...brand,
        ...inStock,
        ...bestSeller,
        isActive: true,
        price: { $gte: minPrice, $lte: maxPrice },
        rating: { $gte: minRating }
    };

    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter)
        .populate('category', 'name slug')
        .sort(sortBy)
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .lean();

    res.json({
        products,
        page,
        pages: Math.ceil(total / pageSize),
        total
    });
});

// @desc    Fetch product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
        .populate('category', 'name slug')
        .populate({
            path: 'reviews',
            populate: { path: 'user', select: 'name avatar' }
        });

    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }

    // Increment views
    product.views += 1;
    await product.save();

    res.json(product);
});

// @desc    Get product categories
// @route   GET /api/products/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find({ isActive: true }).lean();
    res.json(categories);
});

// @desc    Get brands
// @route   GET /api/products/brands
// @access  Public
const getBrands = asyncHandler(async (req, res) => {
    const brands = await Product.aggregate([
        { $match: { isActive: true } },
        { $group: { _id: '$brand' } },
        { $project: { brand: '$_id', _id: 0 } },
        { $sort: { brand: 1 } }
    ]);
    res.json(brands.map(b => b.brand));
});

// @desc    Create product review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;

    if (!rating || !comment) {
        res.status(400);
        throw new Error('Please provide rating and comment');
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }

    // Check if user already reviewed
    const existingReview = await Review.findOne({
        product: req.params.id,
        user: req.user._id
    });

    if (existingReview) {
        res.status(400);
        throw new Error('You have already reviewed this product');
    }

    const review = await Review.create({
        user: req.user._id,
        product: req.params.id,
        name: req.user.name,
        rating: Number(rating),
        comment
    });

    product.reviews.push(review._id);
    product.numReviews = product.reviews.length;
    product.rating = (
        product.reviews.reduce((acc, rev) => acc + rev.rating, 0) /
        product.reviews.length
    ).toFixed(1);

    await product.save();

    res.status(201).json(review);
});

// @desc    Get product reviews
// @route   GET /api/products/:id/reviews
// @access  Public
const getProductReviews = asyncHandler(async (req, res) => {
    const reviews = await Review.find({ product: req.params.id })
        .populate('user', 'name avatar')
        .sort('-createdAt')
        .lean();

    res.json(reviews);
});

// @desc    Create product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const { name, brand, category, description, price, countInStock, specifications } = req.body;

    if (!name || !brand || !category || !description || !price) {
        res.status(400);
        throw new Error('Please provide all required fields');
    }

    const product = await Product.create({
        user: req.user._id,
        name,
        images: req.body.images || [],
        brand,
        category,
        description,
        price,
        countInStock: countInStock || 0,
        specifications: specifications || {}
    });

    res.status(201).json(product);
});

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }

    // Check authorization
    if (product.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
        res.status(403);
        throw new Error('Not authorized to update this product');
    }

    product = await Product.findByIdAndUpdate(
        req.params.id,
        { ...req.body },
        { new: true, runValidators: true }
    );

    res.json(product);
});

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }

    // Check authorization
    if (product.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
        res.status(403);
        throw new Error('Not authorized to delete this product');
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: 'Product deleted successfully' });
});

// @desc    Get top-rated products
// @route   GET /api/products/top/rated
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({ isActive: true })
        .sort({ rating: -1, numReviews: -1 })
        .limit(8)
        .lean();

    res.json(products);
});

// @desc    Get best-seller products
// @route   GET /api/products/top/bestsellers
// @access  Public
const getBestSellers = asyncHandler(async (req, res) => {
    const products = await Product.find({ isActive: true, bestSeller: true })
        .limit(8)
        .lean();

    res.json(products);
});

module.exports = {
    getProducts,
    getProductById,
    getCategories,
    getBrands,
    createProductReview,
    getProductReviews,
    createProduct,
    updateProduct,
    deleteProduct,
    getTopProducts,
    getBestSellers
};
