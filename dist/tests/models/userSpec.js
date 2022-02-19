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
const user_1 = require("../../models/user");
const store = new user_1.UserStore();
describe('User Model Tests', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield store.create({
            user_name: 'admin',
            first_name: 'administrator',
            last_name: 'user',
            password: 'password@1234',
        });
    }));
    it('User model create method should add user successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.create({
            user_name: 'test_name',
            first_name: 'first_name',
            last_name: 'last_name',
            password: 'password@1234',
        });
        expect(result.user_name).toEqual('test_name');
        expect(result.first_name).toEqual('first_name');
        expect(result.last_name).toEqual('last_name');
    }));
    it('User model index method should return users successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.index();
        expect(result.length).toBeGreaterThanOrEqual(1);
    }));
    it('User model show method should return user name for user ID 1', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.show(1);
        expect(result.user_name).toEqual('admin');
    }));
    it('User model authenticate method returning user first_name successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.authenticate('admin', 'password@1234');
        expect(result === null || result === void 0 ? void 0 : result.first_name).toEqual('administrator');
    }));
});
