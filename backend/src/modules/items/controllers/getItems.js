import { HttpStatusCode } from '#src/constants';
import {CustomAPIError} from '#errors/custom-error';
import chargebee from 'chargebee';

export const getItems = (req, res) => {
	chargebee.configure({site: process.env.CHARGEBEE_SITE,
		api_key: process.env.CHARGEBEE_API_KEY});
	chargebee.item.list({
		item_family_id: 'product-family2'
	}).request(function(error,result) {
		if(error) {
			new CustomAPIError(HttpStatusCode.BAD_REQUEST, error);
			return res.status(HttpStatusCode.BAD_REQUEST).send(error);
		} else {
			const newRes = result.list.map(({item}) => {
				return {name: item.external_name, description: item.description, 
					item_family_id: item.item_family_id,
					id: item.id
				};
			});
			return res.status(HttpStatusCode.OK).send(newRes);
		}
	});
};
