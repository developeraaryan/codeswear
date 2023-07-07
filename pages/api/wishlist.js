import Wishlist from "../../Models/Wishlist";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
    if (req.method !== "POST") {
        return;
    }
    const { product, email } = req.body;

    const wishlistExist = await Wishlist.findOne({ product, email });
    console.log(wishlistExist);

    if (wishlistExist) {
        return res.status(400).json({ success: false, message: "Product already in wishlist" });
    }
    else {
        const newWish = Wishlist.create({
            product,
            email
        });


        res.status(200).json({ success: true, data: newWish });
    }
}


export default connectDb(handler);
