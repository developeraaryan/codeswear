const mongoose = require('mongoose')

let Product;

try {
    Product = mongoose.model("Product")

} catch {
    const productSchema = new mongoose.Schema({
        title: { type: String, reuired: true },
        slug: { type: String, reuired: true, unique: true },
        desc: { type: String, reuired: true },
        img: [
            {
                public_id: {
                    type: String,
                    required: true
                },
                url: {
                    type: String,
                    required: true
                }
            }
        ],
        category: { type: String, reuired: true },
        size: { type: String, },
        sprice: { type: Number, required: true },
        lprice: { type: Number, required: true },
        availableqty: { type: Number, required: true },
    }, { timestamps: true });

    Product = mongoose.model("Product", productSchema)
}

export default Product;
