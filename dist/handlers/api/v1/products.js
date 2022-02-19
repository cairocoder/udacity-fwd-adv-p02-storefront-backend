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
const product_1 = require("../../../models/product");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const store = new product_1.ProductStore();
//Create handler api endpoint that return new created product.
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createProduct = {
            name: req.body.name,
            price: req.body.price,
        };
        // console.log(createProduct);
        const newProduct = yield store.create(createProduct);
        // console.log(newProduct);
        res.json(newProduct);
    }
    catch (error) {
        res.status(409);
        res.json(error);
    }
});
//Index handler api endpoint that return list of all  Products.
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield store.index();
        res.json(products);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
// Show handler that return only requested Product by id
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield store.show(parseInt(req.params.id));
        if (!product) {
            res.status(409);
            res.json(`No product found with ID ${req.params.id} ,please check requested ID and try again.`);
        }
        res.json(product);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const productsRoutes = (app) => {
    app.post('/api/v1/products', jwtAuth_1.default, create);
    app.get('/api/v1/products', index);
    app.get('/api/v1/products/:id', show);
};
exports.default = productsRoutes;
