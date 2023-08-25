import Order from "../../Models/Order";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
    if (req.method === "POST") {
        const { oId, deliverStatus, reason } = req.body;
        const order = await Order.findOneAndUpdate({ oId }, { deliverStatus, reason });

        res.status(200).json({ success: true, order });
    }
    else {
        res.status(400).json({ success: false, message: "Method not allowed" });
    }
};

export default connectDb(handler);