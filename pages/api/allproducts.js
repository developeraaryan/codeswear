import Product from "../../Models/Product";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
    let products = await Product.find({category: 'tshirts'});
    let product = {};

    for (let item of products) {
        const {
            title,
            size,
            availableqty,
            img,
            price,
            slug,
            desc,
            category,
        } = item;

        if (title in product) {
            if (!product[title].size.includes(size) && availableqty > 0) {
                product[title].size.push(size);
            }
        } else {
            product[title] = {
                size: availableqty > 0 ? [size] : [],
                img,
                price,
                availableqty,
                slug,
                desc,
                category,
                title,
            };
        }
    }

    res.status(200).json({ products: Object.values(product) });
};

export default connectDb(handler);
