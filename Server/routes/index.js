import express from 'express';
import categories from './categories.js';
import products from './products.js';
const router = express.Router();

// router Categories
router.use('/categories', categories);
// router Products
router.use('/products', products);

export default router;
