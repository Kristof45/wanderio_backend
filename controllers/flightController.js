const {getAllFlights, searchFlight, createFlight, updateFlight, deleteFlight} = require('../models/flightModel')

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
        const flights = await searchFlight(req.query.starting)
        return res.status(200).json(flights)
    } catch (err) {
        return res.status(500).json({error: 'Hiba a repülőjegyek keresésekor', err})
    }
}

//uj flight letrehozasa
async function createflight(req, res) {
    try {
        const {airlineId, starting, arivval, price} = req.body
        
        if (!arivval|| !price) {
            return res.status(400).json({error: 'Minden mezot tolts ki a uj repulojegy letrehozasahoz', err})
        }

        const {insertId} = await createFlight(airlineId, starting, arivval, price)

        res.status(201).json({message: 'Sikeres repjegy letrehozas', insertId})
    } catch (err) {
        console.log(err);
        return res.status(500).json({error: 'Hiba a repülőjegy létrehozásakor', err})
    }
}

//egy meglevo flight modositasa
async function updateflight(req, res) {
    try {
        const {flightsId, airlineId, starting, arivval, price} = req.body
        //console.log(flightsId, airlineId);

        await updateFlight(flightsId, airlineId, starting, arivval, price)
        return res.status(201).json({message: 'Sikeres repjegy modositas'})
    } catch (err) {
        return res.status(500).json({error: 'Hiba a repülőjegy módosításakor', err})
    }
}

//egy meglevo flight torlese
async function deleteflight(req, res) {
    try {
        const {flightsId} = req.body
        console.log(flightsId);

        await deleteFlight(flightsId)
        return res.status(200).json({message: 'Sikeresen töröltél egy repjegyet'})
    } catch (err) {
        return res.status(500).json({error: 'Hiba a repülőjegy törlése során', err})
    }
}

module.exports = {getallflights, searchflight, createflight, updateflight, deleteflight}