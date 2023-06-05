export default function handler(req, res) {
    let pincode = {
        "843301": ["Sitamarhi", "Bihar"],
        "800013": ["Patna", "Bihar"],
        "843302": ["Aamghata", "Bihar"],
        "843316": ["Dumra", "Bihar"]
    }
    res.status(200).json(pincode)
}