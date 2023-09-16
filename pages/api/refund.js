import connectDb from '../../middleware/mongoose';
import Refund from '../../Models/Refund';

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const { orderId, reason, paymentInfo, bankInfo, upiInfo } = req.body;

        // Validate that either bankInfo or upiInfo is provided, but not both
        try {
            const r = new Refund({
                orderId,
                reason,
                paymentInfo,
                bankInfo,
                upiInfo,
            });
            const refund = await r.save();
            res.status(201).json({ success: 'success', refund });
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while creating the refund.', msg: error.message });
        }
    } else {
        res.status(400).json({ error: 'This method is not allowed.' });
    }
};

export default connectDb(handler);
