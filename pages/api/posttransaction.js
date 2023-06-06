import Order from "@/Models/Order"
import Product from "@/Models/Product";
import connectDb from "@/middleware/mongoose"

const handler = async (req, res) => {

    // validate paytm checksum
    // update the status into the order table after checking the order table
    let order;
    if (req.body.STATUS == "TXN_SUCCESS") {
        order = await Order.findOneAndUpdate({ orderId: req.body.ORDERID }, { status: "Paid", paymentInfo: JSON.stringify(req.body) })
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

export default connectDb(handler);