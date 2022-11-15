
import { HttpStatusCode } from '#src/constants';
import {ConfigWrapper, Lists} from 'klaviyo-api';

export const addProfileToList = (req, res) => {
	ConfigWrapper(process.env.KLAVIYO_API_KEY);
	Lists.createListRelationships({
		data: [
			{
				type: 'profile',
				id: req.body.id
			}
		]
	}, req.params.id, req.params.related_resource)
		.then(data => {
		    res.status(HttpStatusCode.OK).send(data);
		})
		.catch(error => console.log('error', error));
};
