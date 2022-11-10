import { HttpStatusCode } from '#src/constants';
import chargebee from 'chargebee';

export const updateSubscription = (req, res) => {
	chargebee.configure({site: process.env.CHARGEBEE_SITE,
		api_key: process.env.CHARGEBEE_API_KEY});
	const {plan_id, token_id} = req.body;

	chargebee.subscription.update_for_items('BTM4gATM1qOSJF9e',{
		invoice_immediately : true,
		subscription_items : [
			{
				item_price_id : plan_id,
				quantity : 4,
				// unit_price : 1,
				token_id
			}]
	})
		.request(function(error,result) {
			if(error){
				return res.status(HttpStatusCode.BAD_REQUEST).send(error);
			} else {
				return res.status(HttpStatusCode.OK).send(result);
			}
		});
};
