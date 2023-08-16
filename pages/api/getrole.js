import connectDb from "../../middleware/mongoose";
import User from "../../Models/User"; // Make sure the path is correct and case-sensitive

const handler = async (req, res) => {
    if (req.method === "POST") { // Use strict equality (===) for comparison
        let { phone } = req.body; // Assuming phone is a property in the request body

        const user = await User.findOne({ phone });

        if (user) { // Check if user exists before accessing properties
            res.status(200).json({ success: true, role: user?.role }); // Changed success value to true
        } else {
            res.status(200).json({ success: false, message: "User not found" });
        }
    } else {
        res.status(405).json({ success: false, message: "Method not allowed" });
    }
};

export default connectDb(handler);
