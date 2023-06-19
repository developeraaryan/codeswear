import SocailUser from "../../Models/SocailUser"
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ msg: 'Method not allowed' })
    }
    else {
        const { name, email, image } = req.body
        const dbUser = await SocailUser.findOne({ email })
        if (!dbUser) {
            const user = new SocailUser({
                name,
                email,
                image
            })
            await user.save()
            return res.status(201).json({
                status: 'success',
                response: req.body,
                msg: "Welcome to the black worn"
            })
        }
        else {
            return res.status(200).json({
                status: 'success',
                response: req.body,
                msg: `Welcome back ${name}`
            })
        }
    }
}

export default connectDb(handler)