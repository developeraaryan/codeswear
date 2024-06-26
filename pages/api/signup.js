import User from "../../Models/User"
import connectDb from "../../middleware/mongoose"
const handler = async (req, res) => {
    if (req.method == "POST") {
        const { firstName, lastName, email, phone } = req.body;
        const userExists = await User.findOne({ phone })
        if (userExists) {
            res.status(200).json({ message: "User already exists", exist: true });
            return;
        }
        const user = await User.create({
            firstName,
            lastName,
            email,
            phone
        })
        res.status(201).json({ success: "success", user, exist: true });
    }
    else {
        res.status(400).json({ error: "This method is not allowed" });

    }
}

export default connectDb(handler)