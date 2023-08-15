import Order from "../../Models/Order"
import connectDb from "../../middleware/mongoose"
const Jwt = require("jsonwebtoken")

const handler = async (req, res) => {
    let phone = req?.body?.phone
    console.log(phone, 'phone');
    phone = phone?.slice(-10)
    console.log(phone, 'nphone');
    // const data = Jwt.verify(token, process.env.JWT_SECRET)
    let orders = await Order.find({ phone: phone, status: { $in: ["Paid", "COD"] } }).sort({ createdAt: -1 }).lean().exec()
    if (!orders) {
        res.status(200).json({ success: false, "error": "No orders found" })
        return
    }
    res.status(200).json({ orders })
}

export default connectDb(handler);