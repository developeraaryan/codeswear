const https = require('https');
const PaytmChecksum = require('paytmchecksum');
import Order from '@/Models/Order';
import connectDb from '@/middleware/mongoose';
import Product from '@/Models/Product';

const handler = async (req, res) => {
    if (req.method == "POST") {
        //  check if cart is tampered
        let product, sumTotal = 0;
        let cart = req.body.cart;
        for (let item in cart) {
            console.log(cart);
            sumTotal += cart[item].price * cart[item].qty
            product = await Product.findOne({ slug: item })
            // check if cart items are out of stock
            if (product.availableqty < cart[item].qty) {
                res.staus(200).json({ success: flase, "error": "Some Items in your cart went out of stock, please try again!" })
                return
            }
            if (product.price != cart[item].price) {
                res.staus(200).json({ success: flase, "error": "The price of some items in your cart have changed please try again" })
                return
            }
        }
        if (sumTotal !== req.body.subTotal) {
            res.staus(200).json({ success: flase, "error": "The price of some items in your cart have changed please try again" })
            return

        }

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
        var paytmParams = {};
        paytmParams.body = {
            "requestType": "Payment",
            "mid": process.env.NEXT_PUBLIC_PAYTM_MID,
            "websiteName": "BLACK WORN",
            "orderId": req.body.oId,
            "callbackUrl": `${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`,
            "txnAmount": {
                "value": req.body.subTotal,
                "currency": "INR",
            },
            "userInfo": {
                "custId": req.body.email,
            },
        };

        const checksum = async () => {
            PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), process.env.NEXT_PUBLIC_PAYTM_KEY)

            paytmParams.head = {
                "signature": checksum
            };

            var post_data = JSON.stringify(paytmParams);
            const requestAsync = () => {
                return new Promise((resolve, reject) => {


                    var options = {

                        /* for Staging */
                        // hostname: 'securegw-stage.paytm.in',

                        /* for Production */
                        hostname: 'securegw.paytm.in',

                        port: 443,
                        path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_PAYTM_MID}&orderId=${req.body.oId}`,
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Content-Length': post_data.length
                        }
                    };

                    var response = "";
                    var post_req = https.request(options, function (post_res) {
                        post_res.on('data', function (chunk) {
                            response += chunk;
                        });

                        post_res.on('end', function () {
                            // console.log('Response: ', response);
                            let ress = JSON.parse(response).body
                            ress.success = true
                            resolve(ress)
                        });
                    });

                    post_req.write(post_data);
                    post_req.end();
                });
            }
            let myr = await requestAsync()
            res.status(200).json(myr)

        }
    }
}


export default connectDb(handler)
