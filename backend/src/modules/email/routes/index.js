import express from 'express';

import { sendEmail } from '../controllers/sendEmail.js';

const router = express.Router();

router.route('/').post(sendEmail);

export default router;
