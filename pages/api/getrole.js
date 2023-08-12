import connectDb from "../../middleware/mongoose";
import User from "../../models/User"; // Make sure the path is correct and case-sensitive

const handler = async (req, res) => {
    if (req.method === "POST") { // Use strict equality (===) for comparison
        try {
            let phone = req.body.phone; // Assuming phone is a property in the request body
            phone = Number.parseInt(phone);

            const user = await User.findOne({ phone });

            if (user) { // Check if user exists before accessing properties
                console.log("This user's role is", user.role);
                res.status(200).json({ success: true, role: user.role }); // Changed success value to true
            } else {
                res.status(404).json({ success: false, message: "User not found" });
            }
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ success: false, message: "An error occurred" });
        }
    } else {
        res.status(405).json({ success: false, message: "Method not allowed" });
    }
};

export default connectDb(handler);
