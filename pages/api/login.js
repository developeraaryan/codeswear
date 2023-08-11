import User from "../../Models/User"
import connectDb from "../../middleware/mongoose"
import 'react-toastify/dist/ReactToastify.css';
import CryptoJS from "crypto-js"
const Jwt = require('jsonwebtoken');

const handler = async (req, res) => {
    if (req.method == "POST") {
    }
}

export default connectDb(handler)