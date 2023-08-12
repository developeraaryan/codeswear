import User from "../../Models/User"
import connectDb from "../../middleware/mongoose"
const handler = async (req, res) => {
    try {
        if (req.method === "POST") {
            const { phone } = req.body;
            const userExists = await User.findOne({ phone });
            if (userExists) {
                res.status(200).json({ message: "User already exists", exist: true });
            } else {
                res.status(200).json({ message: "User doesn't exist", exist: false });
            }
        } else {
            res.status(400).json({ error: "This method is not allowed" });
        }
    } catch (error) {
        res.status(500).json({ error: "An error occurred" });
    }
}

export default connectDb(handler)