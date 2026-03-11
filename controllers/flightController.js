const {getAllFlights, searchFlight} = require('../models/flightModel')

//az osszes flight lekérése
async function getallflights(req, res) {
    try {
        const flights = await getAllFlights()

        return res.status(200).json(flights)
    } catch (err) {
        return res.status(500).json({error: 'Hiba a repülőjegyek lekérésekor', err})
    }
}

//flight kereses indulasi ido alapjan
async function searchflight(req, res) {
    try {
        const flights = await searchFlight(starting)
        return res.status(200).json(flights)
    } catch (err) {
        return res.status(500).json({error: 'Hiba a repülőjegyek keresésekor', err})
    }
}

module.exports = {getallflights, searchflight}