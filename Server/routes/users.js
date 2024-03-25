import express from 'express';
import { index, store, update, show } from '../controllers/UserController.js';
var router = express.Router();

router.get('/', index);
router.post('/', store);
router.put('/:id', update);
router.get('/:id', show);

export default router;
