import express from 'express';
import { addProfileToList } from '../controllers/addProfileToList.js';

import { createProfile } from '../controllers/createProfile.js';
import { getEmailList } from '../controllers/getEmailList.js';
import { getEmailLists } from '../controllers/getEmailLists.js';
import { getListProfiles } from '../controllers/getListProfiles.js';
import { sendEmail } from '../controllers/sendEmail.js';

const router = express.Router();

router.route('/').get(getEmailLists).post(sendEmail);
router.route('/:id').get(getEmailList);
router.route('/profiles/:id').get(getListProfiles);
router.route('/profiles').post(createProfile);
router.route('/lists/:id/relationships/:related_resource').post(addProfileToList);

export default router;
