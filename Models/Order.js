const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    email: { type: String, required: true },
    orderId: { type: String, required: true },
    oId: { type: String, required: true },
    paymentInfo: { type: String, default: "" },
    products: { type: Object, required: true },
    address: { type: String, required: true },
    amount: { type: Number, required: true },
    transactionId: { type: String },
    status: { type: String, default: "Initiated", required: true },
    deliverStatus: { type: String, default: "Unshipped", required: true }
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model("Order", orderSchema);