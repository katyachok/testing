import { HttpStatusCode } from '#src/constants';
import {CustomAPIError} from '#errors/custom-error';
import chargebee from 'chargebee';

export const getItemsPrices = (req, res) => {
	chargebee.configure({site: process.env.CHARGEBEE_SITE,
		api_key: process.env.CHARGEBEE_API_KEY});
	chargebee.item_price.list({
		item_family_id: 'product-family2'
	}).request(function(error,result) {
		if(error){
			new CustomAPIError(HttpStatusCode.BAD_REQUEST, error);
			return res.status(HttpStatusCode.BAD_REQUEST).send(error);
		} else {
			const newRes = result.list.map(({item_price}) => ({
				id: item_price.id, 
				item_id: item_price.item_id, 
				price: item_price.price
			}));
			return res.status(HttpStatusCode.OK).send(newRes);
		}
	});
};
