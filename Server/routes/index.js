import express from 'express';
import categories from './categories.js';
const router = express.Router();

// router Categories
router.use('/categories', categories);

export default router;
