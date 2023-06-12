import User from "../../Models/User"
import connectDb from "../../middleware/mongoose"
const Jwt = require('jsonwebtoken');


const handler = async (req, res) => {
    if (req.method == "POST") {
        let token = req.body.token
        let user = Jwt.verify(token, process.env.JWT_SECRET)
        let dbUser = await User.findOne({ email: user.email })
        const { name, email, address, pincode,phone } = dbUser
        res.status(200).json({ name, email, address, pincode, phone })
    } else {

        res.status(400).json({ error: "Some error occure" })
    }

}

export default connectDb(handler)