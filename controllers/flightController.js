const {getAllFlights, searchFlight, createFlight, updateFlight, deleteFlight, adGetFlights} = require('../models/flightModel')

//az osszes flight lekérése
async function getallflights(req, res) {
    try {
        const flights = await getAllFlights()

        return res.status(200).json(flights)
    } catch (err) {
        return res.status(500).json({error: 'Hiba a repülőjegyek lekérésekor', err})
    }
}

//flight kereses indulasi ido indulasi es erkezesi helyszin alapjan
async function searchflight(req, res) {
    try {
        const { starting, departure, destination} = req.body
        //console.log(starting, departure, destination);
        if (!starting || !departure || !destination) {
            return res.status(404).json({error: 'Tolts ki minden mezot'})
        }

        const flights = await searchFlight(starting, departure, destination)
        //console.log(flights);
        return res.status(200).json(flights)
    } catch (err) {
        return res.status(500).json({error: 'Hiba a repülőjegyek keresésekor', err})
    }
}

//uj flight letrehozasa
async function createflight(req, res) {
    try {
        const {airlineId, starting, arivval, price, departureCityID, destinationCityID} = req.body
        
        if (!airlineId || !starting || !arivval|| !price || !departureCityID || !destinationCityID) {
            return res.status(400).json({error: 'Minden mezot tolts ki a uj repulojegy letrehozasahoz', err})
        }

        const {insertId} = await createFlight(airlineId, starting, arivval, price, departureCityID, destinationCityID)

        res.status(201).json({message: 'Sikeres repjegy letrehozas', insertId})
    } catch (err) {
        console.log(err);
        return res.status(500).json({error: 'Hiba a repülőjegy létrehozásakor', err})
    }
}

//egy meglevo flight modositasa
async function updateflight(req, res) {
    try {
        const flightsId = req.params.flightsId
        const { airlineId, starting, arivval, price, departureCityID, destinationCityID} = req.body
        //console.log(flightsId, airlineId, starting, arivval, price, departureCityID, destinationCityID);

        await updateFlight(flightsId, airlineId, starting, arivval, price, departureCityID, destinationCityID)
        return res.status(201).json({message: 'Sikeres repjegy modositas'})
    } catch (err) {
        console.log(err);
        
        return res.status(500).json({error: 'Hiba a repülőjegy módosításakor', err})
    }
}

//egy meglevo flight torlese
async function deleteflight(req, res) {
    try {
        const flightsId = req.params.flightsId
        //console.log(flightsId);

        await deleteFlight(flightsId)
        return res.status(200).json({message: 'Sikeresen töröltél egy repjegyet'})
    } catch (err) {
        return res.status(500).json({error: 'Hiba a repülőjegy törlése során', err})
    }
}

async function adgetflights(req, res) {
    try {
        const result = await adGetFlights()
        return res.status(200).json(result)
    } catch (err) {
        return res.status(500).json({error: 'Hiba az admin repülőjegy lekerese során'})
    }
}

module.exports = {getallflights, searchflight, createflight, updateflight, deleteflight, adgetflights}