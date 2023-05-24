import User from "@/Models/User"
import connectDb from "@/middleware/mongoose"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const handler = async (req, res) => {
    if (req.method == "POST") {
        let user = await User.findOne({ email: req.body.email })
        if (user) {

            if (req.body.email == user.email && req.body.password == user.password) {
                res.status(200).json({ success: true, name: user.name, email: user.email });

            }
            else {
                res.status(401).json({ success: false })

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