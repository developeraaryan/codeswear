import Order from "@/Models/Order";
import Product from "@/Models/Product";
const Razorpay = require("razorpay");
const shortid = require("shortid");
import pincodes from "../../pincodes.json"

export default async function handler(req, res) {
    console.log("subtotal :", (req.body.subTotal));
    if (req.method === "POST") {
        // check if pincode is serviceable
        if ((!Object.keys(pincodes).includes(req.body.pincode))) {
            res.status(200).json({ success: false, "error": "pincode not serviceable!", clearCart: false })
            return

        }


        //  check if cart is tampered

        let product, sumTotal = 0;
        let cart = req.body.cart;

        if (req.body.subTotal <= 0) {
            res.status(200).json({ success: false, "error": "Your cart is empty,Please build your cart and try again!", clearCart: false })
            return
        }

        for (let item in cart) {
            console.log(cart);
            sumTotal += cart[item].price * cart[item].qty
            product = await Product.findOne({ slug: item })
            // check if cart items are out of stock
            if (product.availableqty < cart[item].qty) {
                res.status(200).json({ success: false, "error": "Some Items in your cart went out of stock, please try again!", clearCart: true })
                return
            }
            if (product.price != cart[item].price) {
                res.status(200).json({ success: false, "error": "The price of some items in your cart have changed please try again", clearCart: true })
                return
            }
        }
        if (sumTotal !== req.body.subTotal) {
            res.status(200).json({ success: false, "error": "The price of some items in your cart have changed please try again", clearCart: false })
            return

        }

        // check detail validation
        if ((req.body.phone).length !== 10 || !Number.isInteger(Number(req.body.phone))) {
            res.status(200).json({ success: false, "error": "Please enter your 10 digit phone number", clearCart: false })
            return
        }
        if ((req.body.pincode).length !== 6 || !Number.isInteger(Number(req.body.pincode))) {
            res.status(200).json({ success: false, "error": "Please enter your 6 digit PINCODE", clearCart: false })
            return
        }



        console.log(req.body.phone, typeof req.body.phone);

        // Initialize razorpay object
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY,
            key_secret: process.env.RAZORPAY_SECRET,
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
                success: true,
                clearCart: false,
                id: response.id,
                currency: response.currency,
                amount: response.amount,
                message: req.body

            });
            // initiate an order correspoding to this orderID

            let order = new Order({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                orderId: response.id,
                oId: req.body.oId,
                address: req.body.address,
                city: req.body.city,
                state: req.body.state,
                pincode: req.body.pincode,
                amount: req.body.subTotal,
                products: req.body.cart
            })
            await order.save()
            console.log("this is res id", response.id);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    } else {
        // Handle any other HTTP method
    }
}
