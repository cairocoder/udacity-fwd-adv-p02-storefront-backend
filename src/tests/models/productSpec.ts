import { ProductStore } from '../../models/product';

const store = new ProductStore();

describe('Product Model Tests', () => {
    beforeAll(async () => {
        await store.create({
            name: 'ProductTest',
            price: 40,
        });
    });
    it('Product model create method should add Product successfully', async () => {
        const result = await store.create({
            name: 'productName',
            price: 60,
        });
        expect(result.name).toEqual('productName');
        expect(result.price).toEqual(60);
    });

    it('Product model index method should return List of products successfully', async () => {
        const result = await store.index();
        expect(result.length).toBeGreaterThanOrEqual(1);
    });

    it('Product model show method should return requested product ID 1', async () => {
        const result = await store.show(1);
        expect(result.id).toEqual(1);
    });
});
