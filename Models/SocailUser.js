const mongoose = require("mongoose");

const socailUserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phone: { type: Number, unique: true },
        image: { type: String, default: "" },
        password: { type: String, },
        address: { type: String, default: "" },
        pincode: { type: Number, default: "" },
        role: { type: String, default: "user" },
    },
    { timestamps: true }
);
export default mongoose.models.SocailUser || mongoose.model("SocailUser", socailUserSchema);
