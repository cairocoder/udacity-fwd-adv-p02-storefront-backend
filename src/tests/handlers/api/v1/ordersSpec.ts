import supertest from 'supertest';
import app from '../../../../server';
import { User } from '../../../../models/user';

const request = supertest(app);
const admin: User = {
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

let token: string;
describe('Orders API Endpoints', () => {
    beforeAll(async () => {
        const response = await request.post('/api/v1/users/admin').send(admin);
        token = response.body;
    });
    it('Orders CREATE api endpoint working with status 200 and return order', async () => {
        const token1 = 'Bearer ' + token;
        const response = await request
            .post('/api/v1/orders')
            .set('Authorization', token1)
            .send(orders[0]);
        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    });
    it('Order SHOW api endpoint working with status 200 and return orders with user ID 1', async () => {
        const token2 = 'Bearer ' + token;
        const response = await request
            .get('/api/v1/orders/user/1')
            .set('Authorization', token2);
        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    });
});
