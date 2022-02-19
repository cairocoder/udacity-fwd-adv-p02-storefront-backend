import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import verifyAuth from '../../../middleware/jwtAuth';
import { User, UserStore } from '../../../models/user';
import dotenv from 'dotenv';

dotenv.config();
let token = '';
const store = new UserStore();

// Return newly created user.
const create = async (req: Request, res: Response): Promise<User | void> => {
    try {
        const createUser: User = {
            user_name: req.body.user_name,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password,
        };
        const newUser = await store.create(createUser);
        if (process.env.TOKEN_SECRET) {
            token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET);
            res.json(token);
        }
    } catch (error) {
        res.status(409);
        res.json(error);
    }
};
// Return all users.
const index = async (_req: Request, res: Response) => {
    try {
        const users: User[] = await store.index();
        res.json(users);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

// Return user by id
const show = async (req: Request, res: Response) => {
    try {
        const user: User = await store.show(parseInt(req.params.id));
        if (!user) {
            res.status(409);
            res.json(`User not found.`);
        }
        res.json(user);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const login = async (req: Request, res: Response) => {
    const loginId: string = req.body.user_name;
    const password: string = req.body.password;
    try {
        const user: User | null = await store.authenticate(loginId, password);
        if (user === null) {
            res.status(409);
            res.json(`User not found.`);
        } else {
            res.json(user);
        }
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const usersRoutes = (app: express.Application) => {
    // Admin type
    app.post('/api/v1/users/admin', create);
    // User type
    app.get('/api/v1/users', verifyAuth, index);
    app.post('/api/v1/users', verifyAuth, create);
    app.get('/api/v1/users/:id', verifyAuth, show);
    app.post('/api/v1/users/login', login);
};
export default usersRoutes;
