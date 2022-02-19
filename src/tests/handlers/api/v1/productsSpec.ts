import supertest from 'supertest';
import app from '../../../../server';
import { User } from '../../../../models/user';
import { Product } from '../../../../models/product';

const request = supertest(app);
const admin: User = {
    user_name: 'admin',
    first_name: 'administrator',
    last_name: 'user',
    password: 'password@1234',
};

const products: Product[] = [
    {
        name: 'Product1',
        price: 40,
    },
    {
        name: 'Product2',
        price: 70,
    },
];
let token: string;
describe('Products API Endpoints', () => {
    beforeAll(async () => {
        const response = await request.post('/api/v1/users/admin').send(admin);
        token = response.body;
        await request.post('/api/v1/products').send(products[1]);
    });

    it('Products CREATE api endpoint working with status 200 and return product', async () => {
        token = 'Bearer ' + token;
        const response = await request
            .post('/api/v1/products')
            .send(products[0])
            .set('Authorization', token);
        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    });

    it('Products INDEX api endpoint working with status 200 and return list of products', async () => {
        const response = await request.get('/api/v1/products');
        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    });

    it('Products SHOW api endpoint working with status 200 and return product with requested ID', async () => {
        const response = await request.get('/api/v1/products/1');
        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    });
});
