import User from "@/Models/User"
import connectDb from "@/middleware/mongoose"

const handler = async (req, res) => {
    if (req.method == "POST") {
        let newUser = new User(req.body);
        await newUser.save();
        res.status(200).json({ success: "success" });
    }
    else {
        res.status(400).json({ error: "This method is not allowed" });

    }
}

export default connectDb(handler)