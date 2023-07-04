import Product from "../../Models/Product"
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {
    if (req.method == "POST") {
        let p;
        p = await Product.findByIdAndUpdate(req.body._id, req.body, { new: true })
        res.status(200).json({ success: "success", p })
    }
    else {
        res.status(400).json({ error: "This method is not allowed" })

    }
}

export default connectDb(handler)