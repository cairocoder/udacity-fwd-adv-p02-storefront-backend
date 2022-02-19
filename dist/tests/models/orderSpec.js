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
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../../models/order");
const product_1 = require("../../models/product");
const user_1 = require("../../models/user");
const store = new order_1.OrderStore();
describe('Order Model Tests', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const userStore = new user_1.UserStore();
        yield userStore.create({
            user_name: 'userOrder',
            first_name: 'user',
            last_name: 'order',
            password: 'password@1234',
        });
        const productStore = new product_1.ProductStore();
        yield productStore.create({
            name: 'ProductOrder',
            price: 60,
        });
    }));
    it('Order model create method should add order successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.create({
            user_id: 1,
            order_status: 'Active',
        });
        expect(result.user_id).toEqual(1);
        expect(result.order_status).toEqual('Active');
    }));
    it('Order model index method should return a list of orders successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.index();
        expect(result.length).toBeGreaterThanOrEqual(1);
    }));
    it('Order model show method should return an order with ID 1', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.show(1);
        expect(result.id).toEqual(1);
    }));
    it('Order model show method should return an order with User ID 1', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.showByUserId(1);
        expect(result.user_id).toEqual(1);
    }));
    it('Order model addProduct method should add a product with the specified quantity successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.addProduct(12, 1, 1);
        expect(result.quantity).toEqual(12);
    }));
});
