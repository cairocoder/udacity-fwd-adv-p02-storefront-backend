import supertest from 'supertest';
import app from '../../../../server';

const request = supertest(app);

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

let token: string;
describe('Users API Endpoints', () => {
    beforeAll(async () => {
        const response = await request
            .post('/api/v1/users/admin')
            .send(users[0]);
        token = response.body;
    });
    it('Users CREATE api endpoint working with status 200 and return token', async () => {
        const response = await request.post('/api/v1/users').send(users[1]);
        expect(response.status).toBe(200);
        token = response.body;
        expect(token).toBeTruthy();
    });

    it('Users INDEX api endpoint working with status 200 and return list of users', async () => {
        const adminToken = 'Bearer ' + token;
        const response = await request
            .get('/api/v1/users')
            .set('Authorization', adminToken);
        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    });

    it('Users INDEX status 401 because of invalid token', async () => {
        const invalidToken =
            'Bearer ' +
            'euJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VyX25hbWUiOiJhcml6ayIsImZpcnN0X25hbWUiOiJBaG1lZCIsImxhc3RfbmFtZSI6IlJpemsiLCJwYXNzd29yZCI6IiQyYiQxMCRZZDhST0pjNTdhMkh1eEZBRnhjMHplczhEVWRFbTJkVVp5NEtwbW1DUVVMVm5aMWx1SGRYNiJ9LCJpYXQiOjE2NDEzOTM0NDN9.MWMKEi_l-pswyooDNvFD8I7Bgpx7Rlu9-pG_MYMFdVI';
        const response = await request
            .get('/api/v1/users')
            .set('Authorization', invalidToken);
        expect(response.status).toBe(401);
    });

    it('Users SHOW api endpoint working with status 200 and return user with requested ID', async () => {
        const adminToken = 'Bearer ' + token;
        const response = await request
            .get('/api/v1/users/1')
            .set('Authorization', adminToken);
        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    });
});
