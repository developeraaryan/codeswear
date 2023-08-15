import Forgot from "../../Models/Forgot";
import User from "../../Models/User";
import connectDb from "../../middleware/mongoose";
import { v4 as uuidv4 } from 'uuid';
import CryptoJS from 'crypto-js';
import sgMail from '@sendgrid/mail';

const handler = async (req, res) => {
    if (req.method === "POST") {
        try {
            if (req.body.sendMail) {
                const { email } = req.body;
                const user = await User.findOne({ email });

                if (user) {
                    const token = uuidv4();

                    await Forgot.findOneAndDelete({ email });
                    const forgot = await new Forgot({
                        userId: user._id,
                        email,
                        token,
                    });
                    await forgot.save();

                    const emailMsg = `<p>We have sent you this email in response to your request to reset your password on https://blackworn.in.</p>
          <p>To reset your password, please follow the link below:</p>
          <a href="http://localhost:3000/forgot?token=${token}">Forgot password</a>
          <p>We recommend that you keep your password secure and not share it with anyone. If you feel your password has been compromised, you can change it by going to your My Account Page and clicking on the "Change Password" button.</p>
          <p>If you need help, or you have any other questions, feel free to email blackwornofficial@gmail.com, or call https://www.blackworn.in customer service toll-free at 000000000000</p>
          <p>BLACK WORN Customer Service</p>`;

                    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                    const msg = {
                        to: email,
                        from: 'aryanak9163@gmail.com',
                        subject: 'Forget Password',
                        html: emailMsg,
                    };

                    await sgMail.send(msg);
                    return res.status(200).json({ success: true, mailSent: true, msg: "Mail sent successfully" });
                }
            } else {

                const forgot = await Forgot.findOne({ email: req.body.email });

                if (forgot && forgot.token === req.body.token) {
                    const encryptedPassword = CryptoJS.AES.encrypt(req.body.password, process.env.AES_SECRET).toString();
                    const dbUser = await User.findOneAndUpdate({ email: req.body.email }, { password: encryptedPassword });

                    return res.status(200).json({ success: true });
                } else {
                }
            }
        } catch (error) {
            return res.status(500).json({ success: false, error: "Failed to process request" });
        }
    } else {
        return res.status(405).json({ success: false, error: "Method not allowed" });
    }
};

export default connectDb(handler);
