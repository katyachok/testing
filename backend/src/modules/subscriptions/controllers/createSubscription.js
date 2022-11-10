import { HttpStatusCode } from '#src/constants';
import chargebee from 'chargebee';

export const createSubscription = (req, res) => {
	chargebee.configure({site: process.env.CHARGEBEE_SITE,
		api_key: process.env.CHARGEBEE_API_KEY});
	const {id: customerId, plan_id, payment_intent} = req.body;
	chargebee.subscription.create_with_items(customerId,{
		subscription_items : [
			{
				item_price_id : plan_id,
				billing_cycles : 12,
				quantity : 1
			}],
		payment_intent
	})
		.request(function(error,result) {
			if(error){
				return res.status(HttpStatusCode.BAD_REQUEST).send(error);
			} else {
				return res.status(HttpStatusCode.OK).send(result);
			}
		});
};
