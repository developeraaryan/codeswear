import connectDb from "../../middleware/mongoose";
import User from "../../Models/User"
const handler = async (req, res) => {
    if (req.method == "POST") {
        let email = req.body
        if (typeof req.body == "object") {
            email = req.body.email
        }
        console.log(email);
        const user = await User.findOne({ email })
        console.log("This user is", user?.role);
        res.status(200).json({ success: "success", role: user?.role })
    }
}

export default connectDb(handler);