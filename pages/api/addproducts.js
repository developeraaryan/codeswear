import Product from "../../Models/Product";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
    if (req.method === "POST") {
        if (!req.body) {
            return res.status(200).json({ error: "No data provided" });
        }
        const {
            title,
            slug,
            desc,
            img,
            category,
            size,
            sprice,
            lprice,
            availableqty,
        } = req.body;

        const product = new Product({
            title,
            slug: slug + Math.floor(Math.random() * Date.now()),
            desc,
            img,
            category,
            size,
            sprice,
            lprice,
            availableqty,
        });

        try {
            const savedProduct = await product.save();
            res.status(200).json({ success: "Product added successfully" });
        } catch (error) {
            res.status(500).json({ error: "Failed to add the product" });
        }
    } else {
        res.status(400).json({ error: "This method is not allowed" });
    }
};

export default connectDb(handler);
