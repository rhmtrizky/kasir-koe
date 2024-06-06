import express from 'express';
import { index, store } from '../controllers/OrderController.js';
import jwtAuth from '../middlewares/jwtAuth.js';
import role from '../middlewares/role.js';
var router = express.Router();

router.get('/', [jwtAuth(), role(['admin', 'cashier', 'waiter'])], index);
router.post('/', [jwtAuth(), role(['admin', 'cashier', 'waiter'])], store);

export default router;
