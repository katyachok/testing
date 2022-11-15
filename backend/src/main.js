import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { listeningPort, RESOUSE_NOT_FOUND } from './constants.js';
import { errorHandlerMiddleware } from './middleware/error-handler.js';
import customerRouter from './modules/customers/routes/index.js';
import subscriptionsRouter from './modules/subscriptions/routes/index.js';
import itemsRouter from './modules/items/routes/index.js';
import PaymentRouter from './modules/payment/routes/index.js';
import InvoiceRouter from './modules/invoices/routes/index.js';
import EmailRouter from './modules/email/routes/index.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/customers', customerRouter);
app.use('/api/subscriptions', subscriptionsRouter);
app.use('/api/items', itemsRouter);
app.use('/api/payment', PaymentRouter);
app.use('/api/invoices', InvoiceRouter);
app.use('/api/email', EmailRouter);
app.use(errorHandlerMiddleware);

app.all('*', (req, res) => {
	res.status(404).send(RESOUSE_NOT_FOUND);
});

app.listen(port, () => {
	console.log(listeningPort(port));
});
