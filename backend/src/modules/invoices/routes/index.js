import express from 'express';

import { getInvoicesPdf } from '../controllers/getInvoicePdf.js';
import { getInvoices } from '../controllers/getInvoices.js';

const router = express.Router();

router.route('/').get(getInvoices);
router.route('/pdf').get(getInvoicesPdf);

export default router;
