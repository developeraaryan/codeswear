import mongoose from "mongoose";

const WishlistSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
    email: {
        type: String,
        required: true
    }
});

export default mongoose.models.Wishlist || mongoose.model("Wishlist", WishlistSchema);