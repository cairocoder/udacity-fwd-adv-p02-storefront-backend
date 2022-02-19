import { Application, Request, Response } from 'express';
import verifyAuth from '../../../middleware/jwtAuth';
import { Order, OrderStore } from '../../../models/order';
import dotenv from 'dotenv';

dotenv.config();
const store = new OrderStore();

const create = async (_req: Request, res: Response) => {
    const userId: number = _req.body.user_id;
    const orderStatus: string = _req.body.order_status;
    const newOrder: Order = { user_id: userId, order_status: orderStatus };

    try {
        const order: Order = await store.create(newOrder);
        res.json(order);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const index = async (_req: Request, res: Response) => {
    try {
        const orders = await store.index();
        res.json(orders);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const show = async (req: Request, res: Response) => {
    try {
        const order = await store.show(parseInt(req.params.id));
        res.json(order);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const showOrderByUserId = async (req: Request, res: Response) => {
    try {
        const order = await store.showByUserId(parseInt(req.params.userID));
        res.json(order);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const addProduct = async (req: Request, res: Response) => {
    try {
        const orderId: number = parseInt(req.params.orderID);
        const productId: number = parseInt(req.body.product_id);
        const quantity: number = parseInt(req.body.quantity);
        const addedProduct = await store.addProduct(
            quantity,
            orderId,
            productId
        );
        res.json(addedProduct);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const ordersRoutes = (app: Application) => {
    app.get('/api/v1/orders', verifyAuth, index);
    app.get('/api/v1/orders/:id', verifyAuth, show);
    app.get('/api/v1/orders/user/:userID', verifyAuth, showOrderByUserId);
    app.post('/api/v1/orders', verifyAuth, create);
    // cart
    app.post('/api/v1/orders/:orderID/products', verifyAuth, addProduct);
};

export default ordersRoutes;
