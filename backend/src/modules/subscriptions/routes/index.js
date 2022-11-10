import express from 'express';

import { createSubscription } from '../controllers/createSubscription.js';
import { getSubscriptions } from '../controllers/getSubscriptions.js';
import {updateSubscription} from '../controllers/updateSubscription.js';

const router = express.Router();

router.route('/').get(getSubscriptions).post(createSubscription).put(updateSubscription);

export default router;
