const express = require('express');
const router = express.Router();
const {
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
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getProducts);
router.get('/categories', getCategories);
router.get('/brands', getBrands);
router.get('/top/rated', getTopProducts);
router.get('/top/bestsellers', getBestSellers);
router.get('/:id', getProductById);
router.get('/:id/reviews', getProductReviews);

// Protected routes
router.post('/', protect, admin, createProduct);
router.put('/:id', protect, admin, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);
router.post('/:id/reviews', protect, createProductReview);

module.exports = router;
