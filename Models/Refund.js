const mongoose = require('mongoose');

const refundSchema = new mongoose.Schema({
    orderId: { type: String, required: true, unique: true },
    reason: { type: String, default: "" },
    paymentInfo: {
        name: { type: String, required: true },
        phone: { type: Number, required: true },
        email: { type: String, required: true },
    },
    bankInfo: {
        AccountNo: { type: Number },
        IFSC: { type: String },
        BankName: { type: String },
        AccountHolderName: { type: String },

    },
    upiInfo: { type: String }
}, { timestamps: true });

// Validate that either bankInfo or upiInfo is provided, but not both
refundSchema.pre('save', function (next) {
    if ((!this.bankInfo && !this.upiInfo) || (this.bankInfo && this.upiInfo)) {
        return next(new Error('Provide either bank information or UPI information, but not both.'));
    }
    next();
});


refundSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        const field = Object.keys(error.keyValue)[0];
        const errorMessage = `The ${field} you provided is already in use.`;

        // Modify the error message and propagate it
        const customError = new Error(errorMessage);
        customError.name = 'CustomError'; // You can set a custom name if needed
        return next(customError);
    }
    next(error);
});




export default mongoose.models.Refund || mongoose.model("Refund", refundSchema);
