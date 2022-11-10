// import { HttpStatusCode } from '#src/constants';
// import {ConfigWrapper, Lists} from 'klaviyo-api'
import fetch from 'node-fetch';

export const sendEmail = (req, res) => {
	// ConfigWrapper(process.env.KLAVIYO_API_KEY)
	// Lists.getList(id, opts)
	// .then(data => {
	//     console.log(data);
	//     res.status(HttpStatusCode.OK).send(data);
	// })
	// .catch(error => console.log('error', error));

	console.log('req, res', req, res);


	const encodedParams = new URLSearchParams();

	encodedParams.set('from_email', 'george.washington@klaviyo.com');
	encodedParams.set('from_name', 'George Washington');
	encodedParams.set('subject', 'Happy Fourth!');
	encodedParams.set('to', '[{"name":"Abraham Lincoln","email":"dupersecret@proton.me"}]');
	encodedParams.set('context', '{ "name" : "George Washington", "state" : "VA" }');

	console.log('encodedParams', encodedParams, process.env.KLAVIYO_API_KEY);

	const url = `https://a.klaviyo.com/api/v1/email-template/TEMPLATE_ID/send?api_key=${process.env.KLAVIYO_API_KEY}`;

	const options = {
		method: 'POST',
		headers: {
			accept: 'application/json',
			'content-type': 'application/x-www-form-urlencoded'
		},
		body: encodedParams
	};

	fetch(url, options)
		.then(res => res.json())
		.then(json => console.log(json))
		.catch(err => console.error('error:' + err));
};
