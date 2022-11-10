import express from 'express';

import { createCustomer } from '../controllers/createCustomer.js';
import { getCustomers } from '../controllers/getCustomers.js';

const router = express.Router();

router.route('/').get(getCustomers).post(createCustomer);

export default router;
