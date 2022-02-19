import { UserStore } from '../../models/user';

const store = new UserStore();

describe('User Model Tests', () => {
    beforeAll(async () => {
        await store.create({
            user_name: 'admin',
            first_name: 'administrator',
            last_name: 'user',
            password: 'password@1234',
        });
    });

    it('User model create method should add user successfully', async () => {
        const result = await store.create({
            user_name: 'test_name',
            first_name: 'first_name',
            last_name: 'last_name',
            password: 'password@1234',
        });
        expect(result.user_name).toEqual('test_name');
        expect(result.first_name).toEqual('first_name');
        expect(result.last_name).toEqual('last_name');
    });

    it('User model index method should return users successfully', async () => {
        const result = await store.index();
        expect(result.length).toBeGreaterThanOrEqual(1);
    });

    it('User model show method should return user name for user ID 1', async () => {
        const result = await store.show(1);
        expect(result.user_name).toEqual('admin');
    });

    it('User model authenticate method returning user first_name successfully', async () => {
        const result = await store.authenticate('admin', 'password@1234');
        expect(result?.first_name).toEqual('administrator');
    });
});
