const {getHotelOrd} = require('../models/hotelOrdersModel.js')

//hotel orders lekerese
async function gethotelord(req, res) {
    try {
        const result = await getHotelOrd()
        return res.status(200).json(result)
    } catch (err) {
        return res.status(500).json('Hiba a hotel orders lekeresekor')
    }
}

module.exports = {gethotelord}