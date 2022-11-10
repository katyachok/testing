import { HttpStatusCode } from '#src/constants';
import {CustomAPIError} from '#errors/custom-error';
import { PROVIDE_VALUES } from '../constants/index.js';
import chargebee from 'chargebee';

export const createCustomer = (req, res) => {
	const noParameters = !Object.keys(req.body).length;
	if (noParameters) {
		throw new CustomAPIError(HttpStatusCode.BAD_REQUEST, PROVIDE_VALUES);
	}
	const {first_name, last_name, email} = req.body;
	chargebee.configure({site: process.env.CHARGEBEE_SITE,
		api_key: process.env.CHARGEBEE_API_KEY});
	chargebee.customer.create({
		first_name,
		last_name,
		email,
		//   locale : "fr-CA",
		//   billing_address : {
		//     first_name : "John",
		//     last_name : "Doe",
		//     line1 : "PO Box 9999",
		//     city : "Walnut",
		//     state : "California",
		//     zip : "91789",
		//     country : "US"
		//     }
	}).request(function(error,result) {
		if(error){
			new CustomAPIError(HttpStatusCode.BAD_REQUEST, error);
		} else {
			var customer = result.customer;
			return res.status(HttpStatusCode.CREATED).json(customer);
		}
	});
};
