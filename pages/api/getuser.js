import User from "../../Models/User"
import connectDb from "../../middleware/mongoose"
const Jwt = require('jsonwebtoken');


const handler = async (req, res) => {
    if (req.method == "POST") {
        const {phone} = req.body
        const user = await User.findOne({ phone: phone })
        res.status(200).json({ user: user })
    } else {

        res.status(400).json({ error: "Some error occure" })
    }

}

export default connectDb(handler)