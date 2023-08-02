import Product from "../../Models/Product";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
    let products = await Product.find().sort({ createdAt: -1 });
    let product = {};

    for (let item of products) {


        if (item.title in product) {
            if (!product[title].size.includes(size) && availableqty > 0) {
                product[title].size.push(size);
            }
        } else {
            product[item.title] = {
                size: item.availableqty > 0 ? [item.size] : [],
                img: item.img,
                price: item.price,
                availableqty: item.availableqty,
                slug: item.slug,
                desc: item.desc,
                category: item.category,
                title: item.title,
            };
        }
    }

    res.status(200).json({ products: Object.values(product) });
};

export default connectDb(handler);
