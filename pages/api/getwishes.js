import Wishlist from "../../Models/Wishlist";
import Product from "../../Models/Product";
import dbConnect from "../../middleware/mongoose";

const handler = async (req, res) => {
    if (req.method !== "GET") {
        return res.status(405).json({ success: false });
    }

    const wishes = await Wishlist.find({ email: 'aryanak9163@gmail.com' })
    let result = [];
    if (wishes.length > 0) {
        for (let i = 0; i < wishes.length; i++) {
            result[i] = wishes[i]?.product.toString()
        }
    }

    let data = [];
    if (result.length > 0) {
        for (let i = 0; i < result.length; i++) {
            data[i] = await Product.findById(result[i])
        }
    }

    console.log(data, 'result');
    res.status(200).json({ success: true, data: data });

};

export default dbConnect(handler);
