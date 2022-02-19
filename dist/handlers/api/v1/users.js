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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtAuth_1 = __importDefault(require("../../../middleware/jwtAuth"));
const user_1 = require("../../../models/user");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let token = '';
const store = new user_1.UserStore();
//Create handler api endpoint that return new created user.
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createUser = {
            user_name: req.body.user_name,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password,
        };
        const newUser = yield store.create(createUser);
        if (process.env.TOKEN_SECRET) {
            token = jsonwebtoken_1.default.sign({ user: newUser }, process.env.TOKEN_SECRET);
            res.json(token);
        }
    }
    catch (error) {
        res.status(409);
        res.json(error);
    }
});
//Index handler api endpoint that return list of all  users.
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield store.index();
        res.json(users);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
// Show handler that return only requested user by id
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield store.show(parseInt(req.params.id));
        if (!user) {
            res.status(409);
            res.json(`No user found with ID ${req.params.id} ,please check requested ID and try again.`);
        }
        res.json(user);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loginId = req.body.user_name;
    const password = req.body.password;
    try {
        const user = yield store.authenticate(loginId, password);
        if (user === null) {
            res.status(409);
            res.json(`No user found with ID ${loginId} ,please check login ID and try again.`);
        }
        else {
            res.json(user);
        }
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const usersRoutes = (app) => {
    // To create admin first without token
    app.post('/api/v1/users/admin', create);
    // Routes for users not admins
    app.get('/api/v1/users', jwtAuth_1.default, index);
    app.post('/api/v1/users', jwtAuth_1.default, create);
    app.get('/api/v1/users/:id', jwtAuth_1.default, show);
    app.post('/api/v1/users/login', login);
};
exports.default = usersRoutes;
