import {ConfigWrapper, Profiles} from 'klaviyo-api';

import { HttpStatusCode } from '#src/constants';

export const createProfile = (req, res) => {
	ConfigWrapper(process.env.KLAVIYO_API_KEY);
	const {first_name, last_name, email} = req.body;
	Profiles.createProfile({
		data: {
			type: 'profile',
			attributes: {
				email,
				first_name,
				last_name
			}
		}
	})
		.then(data => {
    	    res.status(HttpStatusCode.OK).send(data);
		})
		.catch(error => {
			console.log('error', error);
			return res.status(error.status).json({msg: error.response.text });
		});
};
