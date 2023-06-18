const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, default: "" },
    pincode: { type: Number, default: "" },
    role: { type: String, default: "user" },
  },
  { timestamps: true }
);
export default mongoose.models.User || mongoose.model("User", userSchema);
