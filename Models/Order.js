const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    userId: { type: String, reuired: true },
    products: [
        {
            productId: { type: String, required: true },
            quantity: { type: Number, default: 1 }
        }
    ],
    address: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: "pending", required: true }
}, { timestamps: true });

mongoose.models = {}
export default mongoose.model("order", orderSchema);