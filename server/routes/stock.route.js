import express from 'express';
import { allocation, getHoldings, performance, summary } from '../controller/stock.controller.js';

const router = express.Router();

router.get('/holdings', getHoldings);
router.get('/allocation', allocation);
router.get('/performance', performance);
router.get('/summary', summary);

export default router;