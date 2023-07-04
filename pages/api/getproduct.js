import Product from "../../Models/Product";
import dbConnect from "../../middleware/mongoose";

const handler = async (req, res) => {
    // res.setHeader("Access-Control-Allow-Origin", "*");
    if (req.method !== 'POST') {
        return res.status(400).json({ success: false })
    }
    else {
        const { id } = req.body;
        const product = await Product.findOne({ _id: id });
        res.status(200).json({ name: 'John Doe', product })
    }
}


export default dbConnect(handler);