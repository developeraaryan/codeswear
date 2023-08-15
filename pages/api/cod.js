import Order from "../../Models/Order";
import Product from "../../Models/Product";

export default async function handler(req, res) {
    if (req.method === "POST") {
        //  check if cart is tampered

        let product, sumTotal = 0;
        let cart = req.body.cart;

        if (req.body.subTotal <= 0) {
            res.status(200).json({ success: false, "error": "Your cart is empty,Please build your cart and try again!", clearCart: false })
            return
        }

        for (let item in cart) {
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


        // Create an order -> generate the OrderID -> Send it to the Front-end
        // Also, check the amount and currency on the backend (Security measure)


        // initiate an order correspoding to this orderID
        try {
            let order = new Order({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                orderId: "COD",
                oId: req.body.oId,
                address: req.body.address,
                city: req.body.city,
                state: req.body.state,
                pincode: req.body.pincode,
                amount: req.body.subTotal,
                products: req.body.cart,
                status: "COD",
            })
            await order.save()
            res.status(200).json({ success: true, "message": "Order Placed Successfully", clearCart: true })
            res.redirect(`/postcod?oId=${req.body.oId}`, 200)

        } catch (err) {
            res.status(400).json(err);
        }
    } else {
        // Handle any other HTTP method
    }
}
