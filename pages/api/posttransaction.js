import Order from "@/Models/Order"
import Product from "@/Models/Product";
import connectDb from "@/middleware/mongoose"
import crypto from 'crypto';
import fetch from "node-fetch";


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



    // Razorpay API endpoint for fetching payment details
    const razorpayEndpoint = 'https://api.razorpay.com/v1/payments/PAYMENT_ID';

    // Razorpay API key
    const razorpayApiKey = process.env.RAZORPAY_KEY;

    // Function to check if a transaction is pending
    async function isTransactionPending(razorpay_payment_id) {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${razorpayApiKey}`,
            },
        };

        try {
            const response = await fetch(`${razorpayEndpoint}/${razorpay_payment_id}`, requestOptions);
            const paymentDetails = await response.json();

            // Check the status of the payment
            if (paymentDetails.status === 'pending') {
                console.log('pending');
                return true;
            } else {
                console.log('not pending');
                return false;
            }
        } catch (error) {
            console.error('Error:', error);
            return false;
        }
    }

    // Example usage





    // validate razorpay signature

    const generatedSignature = calculateSignature(razorpay_order_id, razorpay_payment_id);
    if (generatedSignature !== razorpay_signature) {
        res.status(400).json({ error: 'Invalid signature' });
        return;
    }




    else {

        if (generatedChecksum !== razorpay_signature) {
            res.status(500).send("Checksum verification failed");
            return

        }
        else {
            // update the status into the order table after checking the order table

            let order;
            if (req.body.razorpay_order_id) {
                order = await Order.findOneAndUpdate({ orderId: req.body.razorpay_order_id }, { status: "Paid", paymentInfo: JSON.stringify(req.body), transactionId: req.body.razorpay_payment_id })
                let products = order.products;
                for (let slug in products) {
                    await Product.findOneAndUpdate({ slug: slug }, { $inc: { "availableqty": - products[slug].qty } })
                }
            }
            else if (isTransactionPending(razorpay_payment_id) == "pending") {
                order = await Order.findOneAndUpdate({ orderId: req.body.razorpay_order_id }, { status: "Pending", paymentInfo: JSON.stringify(req.body), transactionId: req.body.razorpay_payment_id })
            }
            // initaite shipping 
            // Redirect user to the Order confirmation page
            res.redirect(`/order?id=${order._id}&clearcart=${1}`, 200)
        }
    }
}

export default connectDb(handler);