import mongoose from "mongoose";

const WishlistSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
    phone: {
        type: Number,
        required: true
    }
});

export default mongoose?.models?.Wishlist || mongoose.model("Wishlist", WishlistSchema);