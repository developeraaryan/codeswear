import Order from "@/Models/Order"
import Product from "@/Models/Product";
import connectDb from "@/middleware/mongoose"
import { log } from "console";
import crypto from 'crypto';


const handler = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body
    const paymentResponse = req.body
    const secretKey = process.env.RAZORPAY_SECRET

    // claculating checksum

    const calculateChecksum = (secretKey, paymentResponse) => {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = paymentResponse;

        const generatedSignature = crypto
            .createHmac('sha256', secretKey)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest('hex');

        return generatedSignature;

    }


    const generatedChecksum = calculateChecksum(secretKey, paymentResponse);



    const calculateSignature = (razorpay_order_id, razorpay_payment_id) => {
        // Calculate the signature using your secret key and the order ID and payment ID
        // Refer to Razorpay's documentation for the signature calculation process

        // Sample implementation using crypto library:
        const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET);
        hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
        return hmac.digest('hex');

    }

    // validate razorpay signature

    const generatedSignature = calculateSignature(razorpay_order_id, razorpay_payment_id);
    if (generatedSignature !== razorpay_signature) {
        res.status(400).json({ error: 'Invalid signature' });
        return;
    }




    // update the status into the order table after checking the order table
    else {

        if (generatedChecksum !== razorpay_signature) {
            res.status(500).send("Checksum verification failed");
            return

        }
        else {

            let order;
            if (req.body.razorpay_order_id) {
                order = await Order.findOneAndUpdate({ orderId: req.body.razorpay_order_id }, { status: "Paid", paymentInfo: JSON.stringify(req.body) })
                let products = order.products;
                for (let slug in products) {
                    await Product.findOneAndUpdate({ slug: slug }, { $inc: { "availableqty": - products[slug].qty } })
                }
            }
            else if (req.body.STATUS == "PENDING") {
                order = await Order.findOneAndUpdate({ orderId: req.body.ORDERID }, { status: "Pending", paymentInfo: JSON.stringify(req.body) })
            }
            // initaite shipping 
            // Redirect user to the Order confirmation page
            res.redirect(`/order?id=${order._id}&clearcart=${1}`, 200)
        }
    }
}

export default connectDb(handler);