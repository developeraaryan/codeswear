import User from "@/Models/User"
import connectDb from "@/middleware/mongoose"
import CryptoJS from "crypto-js"
const handler = async (req, res) => {
    if (req.method == "POST") {
        const { name, email } = req.body
        let newUser = new User({ name, email, password: CryptoJS.AES.encrypt(req.body.password, "secret123").toString() });
        await newUser.save();
        res.status(200).json({ success: "success" });
    }
    else {
        res.status(400).json({ error: "This method is not allowed" });

    }
}

export default connectDb(handler)