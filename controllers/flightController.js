const {getAllFlights, searchFlight, createFlight,createTicketOrder, updateFlight, deleteFlight, adGetFlights} = require('../models/flightModel')

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
async function createBooking(req, res) {
    try {
        const userId = req.user.userID
        const flightData = req.body
        const airlineId = flightData.airlineId
        
        if (!userId || !airlineId) {
            return res.status(401).json({ error: "Felhasználói azonosítás sikertelen." });
        }

        const newFlight = await createFlight(flightData)
        await createTicketOrder(userId, newFlight, airlineId)

        return res.status(201).json({message: 'Flight successfully booked:'})
    } catch (err) {
        console.log(err);
        return res.status(500).json({error: 'Sever error during booking', err})
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

async function searchFlights(req, res) {
    try {
        const { departure, destination, date } = req.query;

        if (!departure || !destination || !date) {
            return res.status(400).json({ error: "Indulási hely, célállomás és dátum megadása kötelező." });
        }

        const airlines = [
            { id: 1, name: "Lufthansa" },
            { id: 3, name: "Wizz Air" },
            { id: 4, name: "Ryanair" }
        ];

        const generatedFlights = [
            {
                id: `gen-1-${Date.now()}`,
                airlineId: 3,
                airlineName: "Wizz Air",
                departureCity: departure,
                destinationCity: destination,
                departureTime: `${date}T08:30:00`,
                arrivalTime: `${date}T10:30:00`,
                price: Math.floor(Math.random() * 50) + 80
            },
            {
                id: `gen-2-${Date.now()}`,
                airlineId: 1,
                airlineName: "Lufthansa",
                departureCity: departure,
                destinationCity: destination,
                departureTime: `${date}T14:00:00`,
                arrivalTime: `${date}T16:00:00`,
                price: Math.floor(Math.random() * 60) + 120
            },
            {
                id: `gen-3-${Date.now()}`,
                airlineId: 4,
                airlineName: "Ryanair",
                departureCity: departure,
                destinationCity: destination,
                departureTime: `${date}T20:15:00`,
                arrivalTime: `${date}T22:15:00`,
                price: Math.floor(Math.random() * 70) + 150
            }
        ];

        return res.status(200).json(generatedFlights);

    } catch (err) {
        return res.status(500).json({ error: "Hiba a járatok keresése közben." });
    }
}


module.exports = {getallflights, searchflight, createBooking, updateflight, deleteflight, adgetflights,searchFlights}