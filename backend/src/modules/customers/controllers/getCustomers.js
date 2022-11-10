import { HttpStatusCode } from '#src/constants';
import {CustomAPIError} from '#errors/custom-error';
import chargebee from 'chargebee';

export const getCustomers = (req, res) => {
	chargebee.configure({site: process.env.CHARGEBEE_SITE,
		api_key: process.env.CHARGEBEE_API_KEY});
	chargebee.customer.list().request(function(error,result) {
		if(error){
			new CustomAPIError(HttpStatusCode.BAD_REQUEST, error);
		} else {
			return res.status(HttpStatusCode.OK).send(result.list);
		}
	});
};
