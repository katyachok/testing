import { HttpStatusCode } from '#src/constants';
import {ConfigWrapper, Lists} from 'klaviyo-api';

export const getEmailLists = (req, res) => {
	ConfigWrapper(process.env.KLAVIYO_API_KEY);
	Lists.getLists()
		.then(data => {
		    res.status(HttpStatusCode.OK).send(data);
		})
		.catch(error => console.log('error', error));
};
