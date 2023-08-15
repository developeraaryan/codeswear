import Product from "../../Models/Product"
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {
    if (req.method == "DELETE") {
        for (let i = 0; i < req.body.length; i++) {
            let p = await Product.findByIdAndDelete(req.body[i]._id)
        }
        res.status(200).json({ success: "success" })
    }
    else {
        res.status(400).json({ error: "This method is not allowed" })

    }
}

export default connectDb(handler)