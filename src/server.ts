import express, { Application, Request, Response } from 'express';
import usersRoutes from './handlers/api/v1/users';
import productsRoutes from './handlers/api/v1/products';
import ordersRoutes from './handlers/api/v1/orders';
import bodyParser from 'body-parser';
import helmet from 'helmet';

const app: Application = express();
app.use(bodyParser.json());
app.use(helmet());

const port = 3000;
const host = 'localhost';

app.listen(port, host, () =>
    console.log('Server ' + host + ' is listening on port ' + port)
);

app.get('/', (req: Request, res: Response) => {
    res.status(200).send('Server is running successfully!!');
});

usersRoutes(app);
productsRoutes(app);
ordersRoutes(app);

export default app;
