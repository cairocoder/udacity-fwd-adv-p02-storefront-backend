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
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../../../server"));
const request = (0, supertest_1.default)(server_1.default);
const admin = {
    user_name: 'admin',
    first_name: 'administrator',
    last_name: 'user',
    password: 'password@1234',
};
const products = [
    {
        name: 'Product1',
        price: 40,
    },
    {
        name: 'Product2',
        price: 70,
    },
];
let token;
describe('Products API Endpoints', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post('/api/v1/users/admin').send(admin);
        token = response.body;
        yield request.post('/api/v1/products').send(products[1]);
    }));
    it('Products CREATE api endpoint working with status 200 and return product', () => __awaiter(void 0, void 0, void 0, function* () {
        token = 'Bearer ' + token;
        const response = yield request
            .post('/api/v1/products')
            .send(products[0])
            .set('Authorization', token);
        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    }));
    it('Products INDEX api endpoint working with status 200 and return list of products', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/v1/products');
        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    }));
    it('Products SHOW api endpoint working with status 200 and return product with requested ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/v1/products/1');
        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    }));
});
