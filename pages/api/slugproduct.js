import Product from "../../Models/Product";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
    if (req.method !== "POST") {
        return res.status(400).json({ message: "We only accept GET requests" });
    }
    let products = await Product.find({ slug: req.body.slug });
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
