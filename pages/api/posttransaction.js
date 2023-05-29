import Order from "@/Models/Order"
import connectDb from "@/middleware/mongoose"

const handler = async (req, res) => {

    // validate paytm checksum
    // update the status into the order table after checking the order table
    if (req.body.STATUS == "TXN_SUCCESS") {
        Order.findOneAndUpdate({ orderId: req.body.ORDERID }, { status: "Paid", paymentInfo: JSON.stringify(req.body) })
    }
    else if (req.body.STATUS == "PENDING") {
        Order.findOneAndUpdate({ orderId: req.body.ORDERID }, { status: "peNDING", paymentInfo: JSON.stringify(req.body) })
    }
    // initaite shipping 
    // Redirect user to the Order confirmation page
    res.redirect("/order", 200)
}

export default connectDb(handler);