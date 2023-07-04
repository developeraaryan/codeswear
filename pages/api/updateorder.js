import Order from "../../Models/Order";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
    if (req.method === "POST") {
        const { oId, deliverStatus } = req.body;
        const order = await Order.findOneAndUpdate({ oId }, { deliverStatus });

        res.status(200).json({ success: true, order });
    }
};

export default connectDb(handler);