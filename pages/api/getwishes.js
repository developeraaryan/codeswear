import Wishlist from "../../Models/Wishlist";
import Product from "../../Models/Product";
import dbConnect from "../../middleware/mongoose";

// const handler = async (req, res) => {
//     if (req.method === "GET") {
//         return res.status(405).json({ success: false });
//     }
//     const phone = req.body.phone
//     const wishes = await Wishlist.find({ phone: phone })
//     let result = [];
//     if (wishes.length > 0) {
//         for (let i = 0; i < wishes.length; i++) {
//             result[i] = wishes[i]?.product.toString()
//         }
//     }

//     let data = [];
//     if (result.length > 0) {
//         for (let i = 0; i < result.length; i++) {
//             data[i] = await Product.findById(result[i])
//         }
//     }

//     res.status(200).json({ success: true, data: data });

// };

const handler = async (req, res) => {
    if (req.method === "GET") {
        return res.status(405).json({ success: false });
    }
    const phone = req.body.phone;

    try {
        const wishlistItems = await Wishlist.find({ phone: phone }).exec();

        const productIds = wishlistItems.map(item => item?.product?.toString());

        const productPromises = productIds.map(productId => Product.findById(productId).exec());

        const products = await Promise.all(productPromises);

        res.status(200).json({ success: true, data: products });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};




export default dbConnect(handler);
