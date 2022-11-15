import { HttpStatusCode } from '#src/constants';
import {ConfigWrapper, Lists} from 'klaviyo-api';

export const getListProfiles = (req, res) => {
	ConfigWrapper(process.env.KLAVIYO_API_KEY);
	Lists.getListProfiles(req.params.id)
		.then(data => {
		    res.status(HttpStatusCode.OK).send(data);
		})
		.catch(error => console.log('error', error));
};
