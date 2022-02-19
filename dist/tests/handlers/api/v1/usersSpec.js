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
const users = [
    {
        user_name: 'admin',
        first_name: 'administrator',
        last_name: 'user',
        password: 'password@1234',
    },
    {
        user_name: 'username',
        first_name: 'userfirst',
        last_name: 'userlast',
        password: 'password@1234',
    },
];
let token;
describe('Users API Endpoints', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .post('/api/v1/users/admin')
            .send(users[0]);
        token = response.body;
    }));
    it('Users CREATE api endpoint working with status 200 and return token', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post('/api/v1/users').send(users[1]);
        expect(response.status).toBe(200);
        token = response.body;
        expect(token).toBeTruthy();
    }));
    it('Users INDEX api endpoint working with status 200 and return list of users', () => __awaiter(void 0, void 0, void 0, function* () {
        const adminToken = 'Bearer ' + token;
        const response = yield request
            .get('/api/v1/users')
            .set('Authorization', adminToken);
        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    }));
    it('Users INDEX status 401 because of invalid token', () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidToken = 'Bearer ' +
            'euJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VyX25hbWUiOiJhcml6ayIsImZpcnN0X25hbWUiOiJBaG1lZCIsImxhc3RfbmFtZSI6IlJpemsiLCJwYXNzd29yZCI6IiQyYiQxMCRZZDhST0pjNTdhMkh1eEZBRnhjMHplczhEVWRFbTJkVVp5NEtwbW1DUVVMVm5aMWx1SGRYNiJ9LCJpYXQiOjE2NDEzOTM0NDN9.MWMKEi_l-pswyooDNvFD8I7Bgpx7Rlu9-pG_MYMFdVI';
        const response = yield request
            .get('/api/v1/users')
            .set('Authorization', invalidToken);
        expect(response.status).toBe(401);
    }));
    it('Users SHOW api endpoint working with status 200 and return user with requested ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const adminToken = 'Bearer ' + token;
        const response = yield request
            .get('/api/v1/users/1')
            .set('Authorization', adminToken);
        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    }));
});
