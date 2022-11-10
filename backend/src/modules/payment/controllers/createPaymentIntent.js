

import chargebee from 'chargebee';

import { HttpStatusCode, CURRENCY_CODE } from '#src/constants';
import {CustomAPIError} from '#errors/custom-error';

export const createPaymentIntent = (req, res) => {
	chargebee.configure({site: process.env.CHARGEBEE_SITE,
		api_key: process.env.CHARGEBEE_API_KEY});

	const { amount} = req.body;
	chargebee.payment_intent.create({
		amount,
		gateway_account_id: process.env.CHARGEBEE_GATEWAY_ACCOUNT_ID,
		currency_code : CURRENCY_CODE,
	}).request(function(error,result) {
		if(error){
			new CustomAPIError(HttpStatusCode.BAD_REQUEST, error);
			return res.status(HttpStatusCode.BAD_REQUEST).send(error);
		}else{
			return res.status(HttpStatusCode.OK).send(result.payment_intent);
		}
	});
};
