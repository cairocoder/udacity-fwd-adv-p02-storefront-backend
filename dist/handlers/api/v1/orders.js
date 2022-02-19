"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwtAuth_1 = __importDefault(require("../../../middleware/jwtAuth"));
const order_1 = require("../../../models/order");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const store = new order_1.OrderStore();
const create = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = _req.body.user_id;
    const orderStatus = _req.body.order_status;
    const newOrder = { user_id: userId, order_status: orderStatus };
    try {
        const order = yield store.create(newOrder);
        res.json(order);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield store.index();
        res.json(orders);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield store.show(parseInt(req.params.id));
        res.json(order);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const showOrderByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield store.showByUserId(parseInt(req.params.userID));
        res.json(order);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderId = parseInt(req.params.orderID);
        const productId = parseInt(req.body.product_id);
        const quantity = parseInt(req.body.quantity);
        const addedProduct = yield store.addProduct(quantity, orderId, productId);
        res.json(addedProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const ordersRoutes = (app) => {
    app.get('/api/v1/orders', jwtAuth_1.default, index);
    app.get('/api/v1/orders/:id', jwtAuth_1.default, show);
    app.get('/api/v1/orders/user/:userID', jwtAuth_1.default, showOrderByUserId);
    app.post('/api/v1/orders', jwtAuth_1.default, create);
    // add product to cart (open order for user)
    app.post('/api/v1/orders/:orderID/products', jwtAuth_1.default, addProduct);
};
exports.default = ordersRoutes;
