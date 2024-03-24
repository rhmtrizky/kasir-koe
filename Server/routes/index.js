import express from 'express';
import categories from './categories.js';
import products from './products.js';
import users from './users.js';
import auth from './auth.js';
const router = express.Router();

// router Categories
router.use('/categories', categories);
// router Products
router.use('/products', products);
// router auth
router.use('/auth', auth);
// router users
router.use('/users', users);

export default router;
