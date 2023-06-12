import User from "../../Models/User"
import connectDb from "../../middleware/mongoose"
import 'react-toastify/dist/ReactToastify.css';
import CryptoJS from "crypto-js"
const Jwt = require('jsonwebtoken');

const handler = async (req, res) => {
    if (req.method == "POST") {
        let user = await User.findOne({ "email": req.body.email })
        const bytes = CryptoJS.AES.decrypt(user.password, process.env.AES_SECRET)
        let decryptPass = (bytes.toString(CryptoJS.enc.Utf8))
        if (user) {

            if (req.body.email == user.email && req.body.password == decryptPass) {
                let token = Jwt.sign({ name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: "2d" })
                res.status(200).json({ success: true, token, email: user.email });

            }
            else {
                res.status(401).json({ success: false, "message": "Invalid Credentials" })

            }
        }
        else {
            res.status(404).json({ "message": "user not found" })

        }
    }
    else {
        res.status(400).json({ error: "This method is not allowed" });

    }
}

export default connectDb(handler)