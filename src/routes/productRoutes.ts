import express from 'express';
import { getFilteredProducts, createProduct } from '../controllers/productController';

const router = express.Router();

router.get('/filtered', getFilteredProducts);
router.post('/', createProduct)

export default router;