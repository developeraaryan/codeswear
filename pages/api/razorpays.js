import Order from "@/Models/Order";
import Product from "@/Models/Product";

const Razorpay = require("razorpay");
// const shortid = require("shortid");

export default async function handler(req, res) {
    if (req.method === "POST") {

        //  check if cart is tampered
        // let product, sumTotal = 0;
        // let cart = req.body.cart;
        // for (let item in cart) {
        //     console.log(cart);
        //     sumTotal += cart[item].price * cart[item].qty
        //     product = await Product.findOne({ slug: item })
        //     // check if cart items are out of stock
        //     if (product.availableqty < cart[item].qty) {
        //         res.staus(200).json({ success: flase, "error": "Some Items in your cart went out of stock, please try again!" })
        //         return
        //     }
        //     if (product.price != cart[item].price) {
        //         res.staus(200).json({ success: flase, "error": "The price of some items in your cart have changed please try again" })
        //         return
        //     }
        // }
        // if (sumTotal !== req.body.subTotal) {
        //     res.staus(200).json({ success: flase, "error": "The price of some items in your cart have changed please try again" })
        //     return

        // }

        // check if details are valid


        // initiate an order correspoding to this orderID
        let order = new Order({
            email: req.body.email,
            orderId: req.body.oId,
            address: req.body.address,
            amount: req.body.subTotal,
            products: req.body.cart
        })
        await order.save()

        // Initialize razorpay object
        const razorpay = new Razorpay({
            key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
            key_secret: process.env.NEXT_PUBLIC_RAZORPAY_SECRET,
        });

        // Create an order -> generate the OrderID -> Send it to the Front-end
        // Also, check the amount and currency on the backend (Security measure)
        const payment_capture = 1;
        const amount = req.body.subTotal;
        const currency = "INR";
        const options = {
            amount: (amount * 100).toString(),
            currency,
            receipt: req.body.oId,
            payment_capture,
        };

        try {
            const response = await razorpay.orders.create(options);
            res.status(200).json({
                id: response.id,
                currency: response.currency,
                amount: response.amount,
            });
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    }
}
