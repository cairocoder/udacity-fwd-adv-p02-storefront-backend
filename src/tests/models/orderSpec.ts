import { OrderStore } from '../../models/order';
import { ProductStore } from '../../models/product';
import { UserStore } from '../../models/user';

const store = new OrderStore();

describe('Order Model Tests', () => {
    beforeAll(async () => {
        const userStore = new UserStore();
        await userStore.create({
            user_name: 'userOrder',
            first_name: 'user',
            last_name: 'order',
            password: 'password@1234',
        });

        const productStore = new ProductStore();
        await productStore.create({
            name: 'ProductOrder',
            price: 60,
        });
    });

    it('Order model create method should add order successfully', async () => {
        const result = await store.create({
            user_id: 1,
            order_status: 'Active',
        });
        expect(result.user_id).toEqual(1);
        expect(result.order_status).toEqual('Active');
    });

    it('Order model index method should return a list of orders successfully', async () => {
        const result = await store.index();
        expect(result.length).toBeGreaterThanOrEqual(1);
    });

    it('Order model show method should return an order with ID 1', async () => {
        const result = await store.show(1);
        expect(result.id).toEqual(1);
    });

    it('Order model show method should return an order with User ID 1', async () => {
        const result = await store.showByUserId(1);
        expect(result.user_id).toEqual(1);
    });

    it('Order model addProduct method should add a product with the specified quantity successfully', async () => {
        const result = await store.addProduct(12, 1, 1);
        expect(result.quantity).toEqual(12);
    });
});
