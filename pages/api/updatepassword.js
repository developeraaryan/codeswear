import User from "../../Models/User"
import connectDb from "../../middleware/mongoose"
const Jwt = require('jsonwebtoken');
import CryptoJS from "crypto-js";


const handler = async (req, res) => {
    if (req.method == "POST") {
        let token = req.body.token
        let user = Jwt.verify(token, process.env.JWT_SECRET)
        let dbUser = await User.findOne({ email: user.email })
        const bytes = CryptoJS.AES.decrypt(dbUser.password, process.env.AES_SECRET)
        let decryptedPass = (bytes.toString(CryptoJS.enc.Utf8))
        if (decryptedPass == req.body.password && req.body.npassword == req.body.cpassword) {

            let dbUsr = await User.findOneAndUpdate({ email: dbUser.email }, { name: req.body.name, password: CryptoJS.AES.encrypt(req.body.cpassword, process.env.AES_SECRET).toString() })
            res.status(200).json({ success: true })
            return
        }
        res.status(200).json({ success: false })
        return

    } else {

        res.status(400).json({ error: "Some error occure" })
    }

}

export default connectDb(handler)