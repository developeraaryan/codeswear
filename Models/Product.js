const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title: { type: String, reuired: true },
    slug: { type: String, reuired: true, unique: true },
    desc: { type: String, reuired: true },
    img: { type: String, reuired: true },
    category: { type: String, reuired: true },
    size: { type: String, },
    color: { type: String, },
    price: { type: Number, required: true },
    availableqty: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model("Product", productSchema)
