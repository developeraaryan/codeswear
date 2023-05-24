import User from "@/Models/User"
import connectDb from "@/middleware/mongoose"
import 'react-toastify/dist/ReactToastify.css';
import CryptoJS from "crypto-js"


const handler = async (req, res) => {
    if (req.method == "POST") {
        let user = await User.findOne({ "email": req.body.email })
        const bytes = CryptoJS.AES.decrypt(user.password, "secret123")
        let decryptPass = (bytes.toString(CryptoJS.enc.Utf8))
        if (user) {

            if (req.body.email == user.email && req.body.password == decryptPass) {
                res.status(200).json({ success: true, name: user.name, email: user.email });

            }
            else {
                res.status(401).json({ success: false, "message": "Invalid Credentials" })

            }
        }
        else {
            res.status(404).json({ success: false, "message": "user not found" })

        }
    }
    else {
        res.status(400).json({ error: "This method is not allowed" });

    }
}

export default connectDb(handler)