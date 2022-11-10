import express from 'express';

import { getItems } from '../controllers/getItems.js';
import {getItemsPrices} from '../controllers/getItemsPrices.js';

const router = express.Router();

router.route('/').get(getItems);
router.route('/prices').get(getItemsPrices)

export default router;
