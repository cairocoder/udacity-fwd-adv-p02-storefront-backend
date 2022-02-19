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
exports.UserStore = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const saltRounds = process.env.SALT_ROUNDS;
const pepper = process.env.BCRYPT_PASSWORD;
class UserStore {
    // create a new user token required
    create(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hash = bcrypt_1.default.hashSync(u.password + pepper, parseInt(saltRounds));
                // console.log(hash);
                const conn = yield database_1.default.connect();
                const sql = `INSERT INTO users (user_name, first_name, last_name, password) VALUES ($1, $2, $3, $4) RETURNING *`;
                const result = yield conn.query(sql, [
                    u.user_name,
                    u.first_name,
                    u.last_name,
                    hash,
                ]);
                // console.log(result);
                const user = result.rows[0];
                conn.release();
                return user;
            }
            catch (err) {
                throw new Error(`unable create user (${u.user_name}): ${err}`);
            }
        });
    }
    // index list of all users token required
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT id, user_name, first_name, last_name FROM users';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not get users. Error: ${err}`);
            }
        });
    }
    //show user by id token required.
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT id, user_name, first_name, last_name FROM users WHERE id=($1)';
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Can not get user with the ID ${id}. Error: ${error}`);
            }
        });
    }
    authenticate(loginId, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            const sql = 'SELECT id, user_name, first_name, last_name, password FROM users WHERE user_name=($1)';
            const result = yield conn.query(sql, [loginId]);
            // console.log(password + pepper);
            const userPlaintextPassword = password + pepper;
            // console.log(userPlaintextPassword);
            if (result.rows.length) {
                const user = result.rows[0];
                const hash = user.password;
                // console.log(hash);
                const passwordMatch = bcrypt_1.default.compareSync(userPlaintextPassword, hash);
                if (passwordMatch) {
                    return user;
                }
                else {
                    console.log('The Password you provide is not matching');
                    return null;
                }
            }
            return null;
        });
    }
}
exports.UserStore = UserStore;
