const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String,  },
    lastName: { type: String,  },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true, unique: true },
    role: { type: String, default: "user" },
  },
  { timestamps: true }
);
export default mongoose.models.User || mongoose.model("User", userSchema);
