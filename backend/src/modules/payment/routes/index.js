import express from 'express';

import { createPaymentIntent } from '../controllers/createPaymentIntent.js';

const router = express.Router();

router.route('/').post(createPaymentIntent);

export default router;
