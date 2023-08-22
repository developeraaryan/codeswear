import Product from "../../Models/Product";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {

    try {
        let products = await Product.find({}).sort({ createdAt: -1 });;
        let tshirts = {};
        for (let items of products) {
            if (items.title in tshirts) {
                if (!tshirts[items.title].color.includes(items.color) && items.availableqty > 0) {
                    tshirts[items.title].color.push(items.color);
                }
                if (!tshirts[items.title].size.includes(items.size) && items.availableqty > 0) {
                    tshirts[items.title].size.push(items.size);
                }
            } else {
                tshirts[items.title] = JSON.parse(JSON.stringify(items));
                if (items.availableqty > 0) {
                    tshirts[items.title].color = [items.color];
                    tshirts[items.title].size = [items.size];
                } else {
                    tshirts[items.title].color = [];
                    tshirts[items.title].size = [];
                }
            }
        }
        res.status(200).json({ products: tshirts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


export default connectDb(handler);
