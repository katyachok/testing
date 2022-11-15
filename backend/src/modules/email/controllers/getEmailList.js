import { HttpStatusCode } from '#src/constants';
import {ConfigWrapper, Lists} from 'klaviyo-api';

export const getEmailList = (req, res) => {
	ConfigWrapper(process.env.KLAVIYO_API_KEY);
	Lists.getList(req.params.id)
		.then(data => {
		    res.status(HttpStatusCode.OK).send(data);
		})
		.catch(error => console.log('error', error));
};
