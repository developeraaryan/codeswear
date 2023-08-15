import connectDb from "../../middleware/mongoose";
import Order from "../../Models/Order";

const handler = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.status(200).json({ success: true, "message": "Hello from the other side!" })
    res.redirect("/", 200);
}

export default connectDb(handler);