import connectDb from "../../middleware/mongoose";
import Wishlist from "../../Models/Wishlist";

const handler = async (req, res) => {
    if (req.method === "POST") {
        const { id } = req.body;
        const wishlistExist = await Wishlist.findOneAndDelete({ product: id });
        if (wishlistExist) {
            res.status(200).json({ success: true, message: "Product removed from wishlist" });
        }
        else {
            res.status(400).json({ success: false, message: "Product not found in wishlist" });
        }
    }
    else {
        res.status(405).json({ success: false, message: "Method not allowed" });
        return;
    }
}

export default connectDb(handler);