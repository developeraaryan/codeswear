import User from "@/Models/User"
import connectDb from "@/middleware/mongoose"
const Jwt = require('jsonwebtoken');


const handler = async (req, res) => {
    if (req.method == "POST") {
        let token = req.body.token
        let user = Jwt.verify(token, process.env.JWT_SECRET)
        let dbUser = await User.findOneAndUpdate({ email: user.email }, { name: req.body.name, address: req.body.address, phone: req.body.phone, pincode: req.body.pincode })

        res.status(200).json({ success: true })
    } else {

        res.status(400).json({ error: "Some error occure" })
    }

}

export default connectDb(handler)