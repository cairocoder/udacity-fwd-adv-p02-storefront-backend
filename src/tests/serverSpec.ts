import app from '../server';
import supertest from 'supertest';

const request = supertest(app);

describe('Test Express Server is running', () => {
    it('Success: check "http://localhost:5000" response status is 200 ok!', async () => {
        const response = await request.get('/');
        expect(response.status).toBe(200);
    });
});
