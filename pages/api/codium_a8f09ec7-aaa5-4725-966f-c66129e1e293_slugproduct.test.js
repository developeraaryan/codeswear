

import Product from "../../Models/Product";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
    if (req.method !== "GET") {
            return res.status(400).json({ message: "We only accept GET requests" });
        }
        let products = await Product.find({ slug: req.query.slug });
    let product = {};
    if (!products) {
        return res.status(404).json({ message: "Product not found" });
    }
    let product_with_same_title = await Product.find({ title: products[0].title });

    for (let item of product_with_same_title) {
        const { title, size, availableqty } = item;

        if (title in product) {
            if (!product[title].size.includes(size) && availableqty > 0) {
                product[title].size.push(size);
            }
        } else {
            product[title] = {
                _id: item._id,
                slug: item.slug,
                title: item.title,
                category: item.category,
                desc: item.desc,
                size: availableqty > 0 ? [size] : [],
                price: item.price,
                availableqty: availableqty,
                img: item.img,
            };
        }
    }


    res.status(200).json({ products: Object.values(product) });
};

export default connectDb(handler);


// Generated by CodiumAI

describe('handler', () => {

    // Tests that a GET request with multiple products with the same title returns the correct product object
    it('should return the correct product object when a GET request with multiple products with the same title is made', async () => {
        const req = { method: 'GET', query: { slug: 'valid-slug' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const mockProduct1 = { _id: 'valid-id-1', slug: 'valid-slug-1', title: 'valid-title', category: 'valid-category-1', desc: 'valid-desc-1', size: ['valid-size-1'], price: 'valid-price-1', availableqty: 1, img: 'valid-img-1' };
        const mockProduct2 = { _id: 'valid-id-2', slug: 'valid-slug-2', title: 'valid-title', category: 'valid-category-2', desc: 'valid-desc-2', size: ['valid-size-2'], price: 'valid-price-2', availableqty: 1, img: 'valid-img-2' };
        Product.find = jest.fn().mockResolvedValue([mockProduct1, mockProduct2]);
        await handler(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ products: [mockProduct1] });
    });
});
