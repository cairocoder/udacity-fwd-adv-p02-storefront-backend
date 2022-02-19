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
const product_1 = require("../../models/product");
const store = new product_1.ProductStore();
describe('Product Model Tests', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield store.create({
            name: 'ProductTest',
            price: 40,
        });
    }));
    it('Product model create method should add Product successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.create({
            name: 'productName',
            price: 60,
        });
        expect(result.name).toEqual('productName');
        expect(result.price).toEqual(60);
    }));
    it('Product model index method should return List of products successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.index();
        expect(result.length).toBeGreaterThanOrEqual(1);
    }));
    it('Product model show method should return requested product ID 1', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.show(1);
        expect(result.id).toEqual(1);
    }));
});
