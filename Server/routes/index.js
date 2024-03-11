import express from 'express';
import categories from './categories.js';
import products from './products.js';
import users from './users.js';
const router = express.Router();

// router Categories
router.use('/categories', categories);
// router Products
router.use('/products', products);
// router user
router.use('/auth', users);

export default router;
