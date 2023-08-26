import User from "../../Models/User"
import connectDb from "../../middleware/mongoose"


const handler = async (req, res) => {
    if (req.method == "POST") {
        const { phone } = req.body
        const user = await User.findOne({ phone: phone })
        res.status(200).json({ success: true, user: user })
    } else {

        res.status(400).json({ error: "Some error occure" })
    }

}

export default connectDb(handler)