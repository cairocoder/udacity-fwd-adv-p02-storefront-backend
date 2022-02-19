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
const orders = [
    {
        user_id: '1',
        order_status: 'Active',
    },
];
let token;
describe('Orders API Endpoints', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post('/api/v1/users/admin').send(admin);
        token = response.body;
    }));
    it('Orders CREATE api endpoint working with status 200 and return order', () => __awaiter(void 0, void 0, void 0, function* () {
        const token1 = 'Bearer ' + token;
        const response = yield request
            .post('/api/v1/orders')
            .set('Authorization', token1)
            .send(orders[0]);
        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    }));
    it('Order SHOW api endpoint working with status 200 and return orders with user ID 1', () => __awaiter(void 0, void 0, void 0, function* () {
        const token2 = 'Bearer ' + token;
        const response = yield request
            .get('/api/v1/orders/user/1')
            .set('Authorization', token2);
        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    }));
});
