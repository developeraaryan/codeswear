import connectDb from "../../../middleware/mongoose"
import User from "../../../Models/User"
import CryptoJS from "crypto-js"

const handler = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ msg: 'Method not allowed' })
    }
    else {
        if (!req.body) {
            return res.status(404).json({ error: "No data" })
        }

        const { name, email, phone, password } = req.body


        // check duplicate user
        const checkExistance = await User.findOne({ email })
        if (checkExistance) {
            return res.status(422).json({ error: "User already exists" })
        }
        else {
            const user = new User({
                name,
                email,
                phone,
                password: CryptoJS.AES.encrypt(password, process.env.AES_SECRET).toString()
            })
            await user.save()
            return res.status(201).json({
                status: 'success',
                response: user,
                msg: "Welcome to the black worn"
            })
        }

    }
}

export default connectDb(handler)