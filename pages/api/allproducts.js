import Product from "../../Models/Product"
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {
    let products = await Product.find({})
    let product = {}
    for (let items of products) {
        if (items.title in product) {
            if (!product[items.title].color.includes(items.color) && items.availableqty > 0) {
                product[items.title].color.push(items.color)
            }
            if (!product[items.title].size.includes(items.size) && items.availableqty > 0) {
                product[items.title].size.push(items.size)
            }

        } else {
            product[items.title] = JSON.parse(JSON.stringify(items))
            if (items.availableqty > 0) {
                product[items.title].color = [items.color]
                product[items.title].size = [items.size]
            }
            else {
                product[items.title].color = []
                product[items.title].size = []
            }
        }
    }
    res.status(200).json({ products: JSON.parse(JSON.stringify(product)) })

}

export default connectDb(handler)