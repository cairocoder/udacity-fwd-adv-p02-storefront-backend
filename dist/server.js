"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("./handlers/api/v1/users"));
const products_1 = __importDefault(require("./handlers/api/v1/products"));
const orders_1 = __importDefault(require("./handlers/api/v1/orders"));
const body_parser_1 = __importDefault(require("body-parser"));
const helmet_1 = __importDefault(require("helmet"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, helmet_1.default)());
const port = 3000;
const host = 'localhost';
app.listen(port, host, () => console.log('Server ' + host + ' is listening on port ' + port));
app.get('/', (req, res) => {
    res.status(200).send('Server is running successfully!!');
});
(0, users_1.default)(app);
(0, products_1.default)(app);
(0, orders_1.default)(app);
exports.default = app;
