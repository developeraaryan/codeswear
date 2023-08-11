import Product from "../../Models/Product";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
    let products = await Product.find().sort({ createdAt: -1 });

    res.status(200).json({ products: Object.values(products) });
};

export default connectDb(handler);
