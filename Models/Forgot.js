const mongoose = require('mongoose')

const forgotSchema = new mongoose.Schema({
    userId: { type: String, required: true, },
    email: { type: String, required: true,unique:true },
    token: { type: String, required: true },
}, { timestamps: true });
export default mongoose.models.Forgot || mongoose.model("Forgot", forgotSchema)
