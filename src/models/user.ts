import Client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const saltRounds = process.env.SALT_ROUNDS as string;
const pepper = process.env.BCRYPT_PASSWORD;

export type User = {
    id?: number;
    user_name: string;
    first_name: string;
    last_name: string;
    password: string;
};

export class UserStore {
    async create(u: User): Promise<User> {
        try {
            const hash = bcrypt.hashSync(
                u.password + pepper,
                parseInt(saltRounds)
            );

            const conn = await Client.connect();
            const sql = `INSERT INTO users (user_name, first_name, last_name, password) VALUES ($1, $2, $3, $4) RETURNING *`;

            const result = await conn.query(sql, [
                u.user_name,
                u.first_name,
                u.last_name,
                hash,
            ]);

            const user = result.rows[0];

            conn.release();

            return user;
        } catch (err) {
            throw new Error(`Error: ${err}`);
        }
    }

    async index(): Promise<User[]> {
        try {
            const conn = await Client.connect();
            const sql =
                'SELECT id, user_name, first_name, last_name FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Error: ${err}`);
        }
    }

    async show(id: number): Promise<User> {
        try {
            const sql =
                'SELECT id, user_name, first_name, last_name FROM users WHERE id=($1)';
            const conn = await Client.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`User not found: ${error}`);
        }
    }

    async authenticate(
        loginId: string,
        password: string
    ): Promise<User | null> {
        const conn = await Client.connect();
        const sql =
            'SELECT id, user_name, first_name, last_name, password FROM users WHERE user_name=($1)';

        const result = await conn.query(sql, [loginId]);
        const userPlaintextPassword: string = password + pepper;

        if (result.rows.length) {
            const user = result.rows[0];
            const hash: string = user.password;

            const passwordMatch = bcrypt.compareSync(
                userPlaintextPassword,
                hash
            );

            if (passwordMatch) {
                return user;
            } else {
                console.log('Wrong password.');
                return null;
            }
        }

        return null;
    }
}
